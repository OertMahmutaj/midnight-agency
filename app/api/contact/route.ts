import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { sendDiscordMessage } from '@/app/actions';

const RATE_LIMIT_WINDOW_MS = 2 * 60 * 60 * 1000;
const fallbackSubmissions = new Map<string, number>();

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, message } = body;

    if (
      typeof name !== 'string' ||
      typeof email !== 'string' ||
      typeof message !== 'string' ||
      !name.trim() ||
      !email.trim() ||
      !message.trim()
    ) {
      return NextResponse.json(
        { success: false, error: 'Missing fields' },
        { status: 400 },
      );
    }

    const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown';
    const normalizedEmail = email.trim().toLowerCase();
    const fallbackKey = ip === 'unknown' ? `email:${normalizedEmail}` : `ip:${ip}`;
    const now = Date.now();
    let databaseAvailable = true;

    try {
      const oneDayAgo = new Date(now - RATE_LIMIT_WINDOW_MS);
      const recentSubmission = await prisma.contactLog.findFirst({
        where: {
          ...(ip === 'unknown' ? { email: normalizedEmail } : { ip }),
          createdAt: { gte: oneDayAgo },
        },
      });

      if (recentSubmission) {
        return NextResponse.json(
          { success: false, error: "You've already submitted today. Please try again tomorrow." },
          { status: 429 },
        );
      }

      await prisma.contactLog.create({
        data: {
          name: name.trim(),
          email: normalizedEmail,
          message: message.trim(),
          ip,
        },
      });
    } catch (databaseError) {
      databaseAvailable = false;
      console.error(
        'Contact database unavailable; continuing with Discord delivery:',
        databaseError,
      );

      const fallbackTimestamp = fallbackSubmissions.get(fallbackKey);

      if (fallbackTimestamp && now - fallbackTimestamp < RATE_LIMIT_WINDOW_MS) {
        return NextResponse.json(
          { success: false, error: "You've already submitted today. Please try again tomorrow." },
          { status: 429 },
        );
      }

      if (fallbackTimestamp) {
        fallbackSubmissions.delete(fallbackKey);
      }
    }

    await sendDiscordMessage({
      name: name.trim(),
      email: normalizedEmail,
      message: message.trim(),
    });

    if (!databaseAvailable) {
      fallbackSubmissions.set(fallbackKey, now);
    }

    return NextResponse.json({ success: true }, { status: 201 });
  } catch (error) {
    console.error('Contact route error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to send' },
      { status: 500 },
    );
  }
}
