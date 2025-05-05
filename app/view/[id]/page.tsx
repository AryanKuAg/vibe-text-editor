import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Button } from '@/components/ui/button';

async function getBlog(id: string) {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/api/blogs/${id}`, {
      cache: 'no-store',
    });

    if (!res.ok) {
      if (res.status === 404) {
        return null;
      }
      throw new Error('Failed to fetch blog');
    }

    return res.json();
  } catch (error) {
    console.error('Error loading blog:', error);
    throw error;
  }
}

export default async function ViewBlogPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const blog = await getBlog(resolvedParams.id);

  if (!blog) {
    notFound();
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">{blog.title}</h1>
        <div className="flex gap-4">
          <Link href={`/edit/${blog._id}`} passHref>
            <Button variant="outline">Edit</Button>
          </Link>
          <Link href="/" passHref>
            <Button variant="ghost">Back to Blogs</Button>
          </Link>
        </div>
      </div>

      <div className="text-sm text-muted-foreground mb-6">
        Created: {new Date(blog.createdAt).toLocaleString()}
        {blog.updatedAt !== blog.createdAt && (
          <span> | Updated: {new Date(blog.updatedAt).toLocaleString()}</span>
        )}
      </div>

      <div className="prose dark:prose-invert max-w-none">
        <div dangerouslySetInnerHTML={{ __html: blog.content }} />
      </div>
    </div>
  );
}
