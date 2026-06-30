import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { sendDiscordMessage } from '@/app/actions';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json({ success: false, error: "Missing fields" }, { status: 400 });
    }

    const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown';

    // Check for a submission from this IP in the last 24 hours
    const oneDayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);
    const recentSubmission = await prisma.contactLog.findFirst({
      where: {
        ip,
        createdAt: { gte: oneDayAgo },
      },
    });

    if (recentSubmission) {
      return NextResponse.json(
        { success: false, error: "You've already submitted today. Please try again tomorrow." },
        { status: 429 }
      );
    }

    const newLog = await prisma.contactLog.create({
      data: { name, email, message, ip },
    });

    await sendDiscordMessage({ name, email, message });

    return NextResponse.json({ success: true, data: newLog }, { status: 201 });
  } catch (error) {
    console.error("Contact route error:", error);
    return NextResponse.json({ success: false, error: "Failed to save" }, { status: 500 });
  }
}