'use client';

import { FC } from 'react';
import Link from 'next/link';
import { NotionBlog } from '@/lib/notion-blogs';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';

interface NotionBlogCardProps {
  blog: NotionBlog;
}

const NotionBlogCard: FC<NotionBlogCardProps> = ({ blog }) => {
  return (
    <Link href={`/notion-blogs/${blog.id}`} className="block transition-transform hover:scale-[1.02]">
      <Card className="h-full flex flex-col overflow-hidden pt-0 card-no-top-padding">
        <div className="aspect-video w-full overflow-hidden mt-0 pt-0 card-image-container">
          <div
            className="w-full h-full bg-cover bg-center"
            style={{
              backgroundImage: blog.coverImage ? `url(${blog.coverImage})` : 'none',
              backgroundColor: !blog.coverImage ? '#f3f4f6' : 'transparent'
            }}
          />
        </div>

        <CardHeader className="pb-2">
          <h3 className="text-xl font-bold line-clamp-2">{blog.title}</h3>
        </CardHeader>

        <CardContent className="flex-grow">
          <p className="text-muted-foreground line-clamp-3">{blog.description}</p>
        </CardContent>

        <CardFooter className="flex justify-between text-sm text-muted-foreground pt-0">
          {blog.date && <span>{blog.date}</span>}
          {blog.author && <span>{blog.author}</span>}
        </CardFooter>
      </Card>
    </Link>
  );
};

export default NotionBlogCard;
