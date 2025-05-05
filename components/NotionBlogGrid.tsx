'use client';

import { FC } from 'react';
import { NotionBlog } from '@/lib/notion-blogs';
import NotionBlogCard from './NotionBlogCard';

interface NotionBlogGridProps {
  blogs: NotionBlog[];
}

const NotionBlogGrid: FC<NotionBlogGridProps> = ({ blogs }) => {
  if (!blogs.length) {
    return (
      <div className="text-center py-12">
        <h3 className="text-xl font-medium text-gray-500">No blogs found</h3>
        <p className="mt-2 text-gray-400">Add some Notion blogs to get started</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {blogs.map((blog) => (
        <NotionBlogCard key={blog.id} blog={blog} />
      ))}
    </div>
  );
};

export default NotionBlogGrid;
