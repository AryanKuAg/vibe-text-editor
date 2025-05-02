import Link from "next/link";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

async function getBlogs() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/api/blogs`, {
      cache: 'no-store',
    });

    if (!res.ok) {
      throw new Error('Failed to fetch blogs');
    }

    return res.json();
  } catch (error) {
    console.error('Error loading blogs:', error);
    return [];
  }
}

export default async function Home() {
  const blogs = await getBlogs();

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">All Blogs</h1>
        <Link href="/create" passHref>
          <Button>Create New Blog</Button>
        </Link>
      </div>

      {blogs.length === 0 ? (
        <div className="text-center py-12">
          <h2 className="text-xl font-medium mb-4">No blogs found</h2>
          <p className="text-muted-foreground mb-6">Create your first blog post to get started.</p>
          <Link href="/create" passHref>
            <Button>Create New Blog</Button>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogs.map((blog: any) => (
            <Card key={blog._id}>
              <CardHeader>
                <CardTitle className="line-clamp-2">{blog.title}</CardTitle>
                <CardDescription>
                  {new Date(blog.createdAt).toLocaleDateString()}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div
                  className="line-clamp-3 prose-sm"
                  dangerouslySetInnerHTML={{
                    __html: blog.content.substring(0, 150) + (blog.content.length > 150 ? '...' : '')
                  }}
                />
              </CardContent>
              <CardFooter className="flex justify-between">
                <Link href={`/edit/${blog._id}`} passHref>
                  <Button variant="outline">Edit</Button>
                </Link>
                <Link href={`/view/${blog._id}`} passHref>
                  <Button>View</Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
