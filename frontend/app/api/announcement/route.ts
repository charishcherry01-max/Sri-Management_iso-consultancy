import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const BUNDLED_FILE = path.join(process.cwd(), 'data', 'announcement.json');
const TMP_FILE = path.join('/tmp', 'announcement.json');

const DEFAULT_ANNOUNCEMENT = {
  active: true,
  title: "Welcome to Sri Management",
  message: "We provide AI-driven ISO certification consulting, corporate training, and gap audits. Speak with our lead auditors today to get started!",
  imageUrl: "",
  linkUrl: "",
  linkText: "",
  updatedAt: new Date().toISOString()
};

function getKvConfig() {
  const url = process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN;
  return { url, token };
}

async function getFromKv() {
  const { url, token } = getKvConfig();
  if (!url || !token) return null;

  try {
    const res = await fetch(`${url}/get/sri_announcement`, {
      headers: { Authorization: `Bearer ${token}` },
      cache: 'no-store'
    });
    if (!res.ok) return null;

    const data = await res.json();
    if (data && data.result) {
      const parsed = typeof data.result === 'string' ? JSON.parse(data.result) : data.result;
      if (parsed && typeof parsed === 'object') {
        return parsed;
      }
    }
  } catch (err) {
    console.error('Error reading from Upstash KV:', err);
  }
  return null;
}

async function saveToKv(payload: any) {
  const { url, token } = getKvConfig();
  if (!url || !token) return false;

  try {
    const res = await fetch(`${url}/set/sri_announcement`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    });
    return res.ok;
  } catch (err) {
    console.error('Error saving to Upstash KV:', err);
    return false;
  }
}

function getLocalFallback() {
  try {
    if (fs.existsSync(TMP_FILE)) {
      const content = fs.readFileSync(TMP_FILE, 'utf-8');
      return JSON.parse(content);
    }
    if (fs.existsSync(BUNDLED_FILE)) {
      const content = fs.readFileSync(BUNDLED_FILE, 'utf-8');
      return JSON.parse(content);
    }
  } catch (error) {
    console.error('Error reading fallback announcement:', error);
  }
  return DEFAULT_ANNOUNCEMENT;
}

export async function GET() {
  // 1. Try cloud persistent database first
  const kvData = await getFromKv();
  if (kvData) {
    return NextResponse.json({ success: true, data: kvData }, {
      headers: {
        'Cache-Control': 'no-store, max-age=0'
      }
    });
  }

  // 2. Fallback to local files
  const localData = getLocalFallback();
  return NextResponse.json({ success: true, data: localData }, {
    headers: {
      'Cache-Control': 'no-store, max-age=0'
    }
  });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { title, message, imageUrl, linkUrl, linkText, active, password } = body;

    const validPin = process.env.NOTICE_PIN || '1234';
    if (password !== validPin) {
      return NextResponse.json(
        { success: false, message: 'Incorrect PIN code. Access denied.' },
        { status: 401 }
      );
    }

    const updatedData = {
      active: Boolean(active),
      title: (title || '').trim(),
      message: (message || '').trim(),
      imageUrl: (imageUrl || '').trim(),
      linkUrl: (linkUrl || '').trim(),
      linkText: (linkText || '').trim(),
      updatedAt: new Date().toISOString()
    };

    // 1. Save to cloud persistent KV (survives all redeploys, resets, and restarts forever)
    const savedToCloud = await saveToKv(updatedData);

    // 2. Also save to local filesystem as fallback
    try {
      const dir = path.dirname(BUNDLED_FILE);
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }
      fs.writeFileSync(BUNDLED_FILE, JSON.stringify(updatedData, null, 2), 'utf-8');
    } catch (e) {
      // Read-only filesystem in production serverless
    }

    try {
      fs.writeFileSync(TMP_FILE, JSON.stringify(updatedData, null, 2), 'utf-8');
    } catch (e) {
      // Ignored
    }

    return NextResponse.json({
      success: true,
      message: savedToCloud 
        ? 'Notice published permanently to Cloud Database!' 
        : 'Notice updated successfully!',
      data: updatedData
    });
  } catch (error: any) {
    console.error('Error saving announcement:', error);
    return NextResponse.json(
      { success: false, message: error.message || 'Server error saving notice' },
      { status: 500 }
    );
  }
}
