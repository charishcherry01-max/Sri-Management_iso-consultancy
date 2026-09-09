import { NextResponse } from 'next/server';
import { sendContactQueryEmail } from '../../../lib/mailer';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, phone, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json(
        { success: false, message: 'Please provide your name, email, and message.' },
        { status: 400 }
      );
    }

    const emailSent = await sendContactQueryEmail({ name, email, phone, message });

    if (!emailSent) {
      console.error('Failed to send contact query email.');
      return NextResponse.json(
        { success: false, message: 'Failed to send your message. Please try again or reach out directly by phone.' },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, message: 'Your message has been sent successfully.' });
  } catch (error: any) {
    console.error('API /api/contact error:', error);
    return NextResponse.json({ success: false, message: error.message || 'Server error' }, { status: 500 });
  }
}
