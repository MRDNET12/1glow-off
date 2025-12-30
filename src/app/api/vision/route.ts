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

    const images = await db.visionBoardImage.findMany({
      where: { userId: user.id },
      orderBy: { position: 'asc' }
    });

    return NextResponse.json(images);
  } catch (error) {
    console.error('Error fetching vision board images:', error);
    return NextResponse.json(
      { error: 'Failed to fetch vision board images' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { imageUrl, caption, position } = body;

    const user = await db.user.findFirst();

    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    const image = await db.visionBoardImage.create({
      data: {
        userId: user.id,
        imageUrl,
        caption,
        position: position || 0
      }
    });

    return NextResponse.json(image, { status: 201 });
  } catch (error) {
    console.error('Error creating vision board image:', error);
    return NextResponse.json(
      { error: 'Failed to create vision board image' },
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

    await db.visionBoardImage.delete({
      where: { id }
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting vision board image:', error);
    return NextResponse.json(
      { error: 'Failed to delete vision board image' },
      { status: 500 }
    );
  }
}
