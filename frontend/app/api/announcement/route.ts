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
  updatedAt: new Date().toISOString()
};

function getAnnouncementData() {
  try {
    // 1. Check /tmp first for recent runtime updates
    if (fs.existsSync(TMP_FILE)) {
      const content = fs.readFileSync(TMP_FILE, 'utf-8');
      return JSON.parse(content);
    }
    // 2. Check bundled file in project
    if (fs.existsSync(BUNDLED_FILE)) {
      const content = fs.readFileSync(BUNDLED_FILE, 'utf-8');
      return JSON.parse(content);
    }
  } catch (error) {
    console.error('Error reading announcement data:', error);
  }
  return DEFAULT_ANNOUNCEMENT;
}

export async function GET() {
  const data = getAnnouncementData();
  return NextResponse.json({ success: true, data }, {
    headers: {
      'Cache-Control': 'no-store, max-age=0'
    }
  });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { title, message, imageUrl, active, password } = body;

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
      updatedAt: new Date().toISOString()
    };

    let saved = false;

    // Try saving to project directory (works in local dev / persistent filesystems)
    try {
      const dir = path.dirname(BUNDLED_FILE);
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }
      fs.writeFileSync(BUNDLED_FILE, JSON.stringify(updatedData, null, 2), 'utf-8');
      saved = true;
    } catch (e) {
      // Ignored: read-only filesystem on serverless platforms like Vercel
    }

    // Also write to /tmp (writable in serverless lambda environments)
    try {
      fs.writeFileSync(TMP_FILE, JSON.stringify(updatedData, null, 2), 'utf-8');
      saved = true;
    } catch (e) {
      console.warn('Failed writing announcement to /tmp:', e);
    }

    return NextResponse.json({
      success: true,
      message: 'Notice updated successfully!',
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
