import { NextRequest, NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import Blog from '@/models/Blog';

export async function GET() {
  try {
    await connectToDatabase();
    const blogs = await Blog.find({}).sort({ createdAt: -1 });

    return NextResponse.json(blogs);
  } catch (error) {
    console.error('Error fetching blogs:', error);
    return NextResponse.json({ error: 'Failed to fetch blogs' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const { title, content } = await request.json();

    if (!title || !content) {
      return NextResponse.json(
        { error: 'Title and content are required' },
        { status: 400 }
      );
    }

    await connectToDatabase();
    const newBlog = await Blog.create({ title, content });

    return NextResponse.json(newBlog, { status: 201 });
  } catch (error) {
    console.error('Error creating blog:', error);

    // Check for MongoDB quota error
    if (error instanceof Error && error.message.includes('over your space quota')) {
      return NextResponse.json(
        { error: 'Database storage limit reached. Please contact the administrator.' },
        { status: 507 }
      );
    }

    return NextResponse.json({ error: 'Failed to create blog' }, { status: 500 });
  }
}
