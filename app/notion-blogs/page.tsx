'use client';

import { useState } from 'react';
import { getAllBlogs } from '@/lib/notion-blogs';
import NotionBlogGrid from '@/components/NotionBlogGrid';

export default function NotionBlogsPage() {
  const [blogs] = useState(getAllBlogs());

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">Notion Blogs</h1>
          <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500 sm:mt-4">
            Browse our collection of Notion-powered blog posts
          </p>
        </div>

        <NotionBlogGrid blogs={blogs} />
      </div>
    </div>
  );
}
