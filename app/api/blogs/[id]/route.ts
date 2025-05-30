import { NextRequest, NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import Blog from '@/models/Blog';

export async function GET(
  request: NextRequest
): Promise<NextResponse> {
  const id = request.nextUrl.pathname.split('/').pop() || '';
  try {
    // id is extracted from the URL path

    await connectToDatabase();
    const blog = await Blog.findById(id);

    if (!blog) {
      return NextResponse.json({ error: 'Blog not found' }, { status: 404 });
    }

    return NextResponse.json(blog);
  } catch (error) {
    console.error('Error fetching blog:', error);
    return NextResponse.json({ error: 'Failed to fetch blog' }, { status: 500 });
  }
}

export async function PUT(
  request: NextRequest
): Promise<NextResponse> {
  const id = request.nextUrl.pathname.split('/').pop() || '';
  try {
    // id is extracted from the URL path
    const { title, content } = await request.json();

    if (!title || !content) {
      return NextResponse.json(
        { error: 'Title and content are required' },
        { status: 400 }
      );
    }

    await connectToDatabase();
    const updatedBlog = await Blog.findByIdAndUpdate(
      id,
      { title, content },
      { new: true }
    );

    if (!updatedBlog) {
      return NextResponse.json({ error: 'Blog not found' }, { status: 404 });
    }

    return NextResponse.json(updatedBlog);
  } catch (error) {
    console.error('Error updating blog:', error);

    // Check for MongoDB quota error
    if (error instanceof Error && error.message.includes('over your space quota')) {
      return NextResponse.json(
        { error: 'Database storage limit reached. Please contact the administrator.' },
        { status: 507 }
      );
    }

    return NextResponse.json({ error: 'Failed to update blog' }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest
): Promise<NextResponse> {
  const id = request.nextUrl.pathname.split('/').pop() || '';
  try {
    // id is extracted from the URL path

    await connectToDatabase();
    const deletedBlog = await Blog.findByIdAndDelete(id);

    if (!deletedBlog) {
      return NextResponse.json({ error: 'Blog not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Blog deleted successfully' });
  } catch (error) {
    console.error('Error deleting blog:', error);
    return NextResponse.json({ error: 'Failed to delete blog' }, { status: 500 });
  }
}
