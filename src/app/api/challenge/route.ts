import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET() {
  try {
    // Get the first user (in a real app, you'd use auth to get the current user)
    const user = await db.user.findFirst();

    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    let progress = await db.challengeProgress.findUnique({
      where: { userId: user.id }
    });

    if (!progress) {
      progress = await db.challengeProgress.create({
        data: {
          userId: user.id,
          currentDay: 1,
          completedDays: '',
          dayNotes: ''
        }
      });
    }

    const completedDays = progress.completedDays ? JSON.parse(progress.completedDays) : [];
    const dayNotes = progress.dayNotes ? JSON.parse(progress.dayNotes) : {};

    return NextResponse.json({
      ...progress,
      completedDays,
      dayNotes
    });
  } catch (error) {
    console.error('Error fetching challenge progress:', error);
    return NextResponse.json(
      { error: 'Failed to fetch challenge progress' },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { currentDay, completedDays, dayNotes } = body;

    const user = await db.user.findFirst();

    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    const progress = await db.challengeProgress.upsert({
      where: { userId: user.id },
      update: {
        currentDay,
        completedDays: JSON.stringify(completedDays || []),
        dayNotes: JSON.stringify(dayNotes || {})
      },
      create: {
        userId: user.id,
        currentDay: currentDay || 1,
        completedDays: JSON.stringify(completedDays || []),
        dayNotes: JSON.stringify(dayNotes || {})
      }
    });

    return NextResponse.json({
      ...progress,
      completedDays: JSON.parse(progress.completedDays),
      dayNotes: JSON.parse(progress.dayNotes)
    });
  } catch (error) {
    console.error('Error updating challenge progress:', error);
    return NextResponse.json(
      { error: 'Failed to update challenge progress' },
      { status: 500 }
    );
  }
}
