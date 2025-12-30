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

    const routineItems = await db.routineItem.findMany({
      where: { userId: user.id },
      orderBy: { order: 'asc' }
    });

    return NextResponse.json(routineItems);
  } catch (error) {
    console.error('Error fetching routine items:', error);
    return NextResponse.json(
      { error: 'Failed to fetch routine items' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { title, description, time, order, isActive } = body;

    const user = await db.user.findFirst();

    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    const routineItem = await db.routineItem.create({
      data: {
        userId: user.id,
        title,
        description,
        time,
        order,
        isActive: isActive !== false
      }
    });

    return NextResponse.json(routineItem, { status: 201 });
  } catch (error) {
    console.error('Error creating routine item:', error);
    return NextResponse.json(
      { error: 'Failed to create routine item' },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, title, description, time, order, isActive } = body;

    const user = await db.user.findFirst();

    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    const routineItem = await db.routineItem.update({
      where: { id },
      data: {
        title,
        description,
        time,
        order,
        isActive
      }
    });

    return NextResponse.json(routineItem);
  } catch (error) {
    console.error('Error updating routine item:', error);
    return NextResponse.json(
      { error: 'Failed to update routine item' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        { error: 'ID is required' },
        { status: 400 }
      );
    }

    await db.routineItem.delete({
      where: { id }
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting routine item:', error);
    return NextResponse.json(
      { error: 'Failed to delete routine item' },
      { status: 500 }
    );
  }
}
