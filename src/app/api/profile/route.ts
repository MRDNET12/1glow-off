import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET() {
  try {
    const user = await db.user.findFirst();

    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    let profile = await db.userProfile.findUnique({
      where: { userId: user.id }
    });

    if (!profile) {
      profile = await db.userProfile.create({
        data: {
          userId: user.id,
          theme: 'light',
          notificationsEnabled: true,
          dailyReminderEnabled: true,
          reminderTime: '09:00',
          totalGlowUpDays: 0
        }
      });
    }

    return NextResponse.json(profile);
  } catch (error) {
    console.error('Error fetching user profile:', error);
    return NextResponse.json(
      { error: 'Failed to fetch user profile' },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { theme, notificationsEnabled, dailyReminderEnabled, reminderTime, glowUpStartDate } = body;

    const user = await db.user.findFirst();

    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    const profile = await db.userProfile.upsert({
      where: { userId: user.id },
      update: {
        theme,
        notificationsEnabled,
        dailyReminderEnabled,
        reminderTime,
        glowUpStartDate: glowUpStartDate ? new Date(glowUpStartDate) : undefined
      },
      create: {
        userId: user.id,
        theme: theme || 'light',
        notificationsEnabled: notificationsEnabled !== false,
        dailyReminderEnabled: dailyReminderEnabled !== false,
        reminderTime: reminderTime || '09:00',
        glowUpStartDate: glowUpStartDate ? new Date(glowUpStartDate) : null,
        totalGlowUpDays: 0
      }
    });

    return NextResponse.json(profile);
  } catch (error) {
    console.error('Error updating user profile:', error);
    return NextResponse.json(
      { error: 'Failed to update user profile' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email } = body;

    const user = await db.user.create({
      data: {
        name,
        email
      }
    });

    return NextResponse.json(user, { status: 201 });
  } catch (error) {
    console.error('Error creating user:', error);
    return NextResponse.json(
      { error: 'Failed to create user' },
      { status: 500 }
    );
  }
}
