import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const date = searchParams.get('date');

    const user = await db.user.findFirst();

    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    let tracker;

    if (date) {
      tracker = await db.dailyTracker.findFirst({
        where: {
          userId: user.id,
          date: new Date(date)
        }
      });
    } else {
      tracker = await db.dailyTracker.findFirst({
        where: { userId: user.id },
        orderBy: { date: 'desc' }
      });
    }

    return NextResponse.json(tracker || null);
  } catch (error) {
    console.error('Error fetching daily tracker:', error);
    return NextResponse.json(
      { error: 'Failed to fetch daily tracker' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      hydration,
      hydrationGoal,
      sleepHours,
      sleepQuality,
      mood,
      activity,
      activityMinutes,
      skincareDone,
      date
    } = body;

    const user = await db.user.findFirst();

    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    // Check if a tracker already exists for this date
    const existingTracker = await db.dailyTracker.findFirst({
      where: {
        userId: user.id,
        date: date ? new Date(date) : new Date()
      }
    });

    let tracker;

    if (existingTracker) {
      tracker = await db.dailyTracker.update({
        where: { id: existingTracker.id },
        data: {
          hydration,
          hydrationGoal,
          sleepHours,
          sleepQuality,
          mood,
          activity,
          activityMinutes,
          skincareDone
        }
      });
    } else {
      tracker = await db.dailyTracker.create({
        data: {
          userId: user.id,
          date: date ? new Date(date) : new Date(),
          hydration,
          hydrationGoal,
          sleepHours,
          sleepQuality,
          mood,
          activity,
          activityMinutes,
          skincareDone
        }
      });
    }

    return NextResponse.json(tracker, { status: 201 });
  } catch (error) {
    console.error('Error updating daily tracker:', error);
    return NextResponse.json(
      { error: 'Failed to update daily tracker' },
      { status: 500 }
    );
  }
}
