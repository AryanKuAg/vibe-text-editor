'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { ExtendedRecordMap } from 'notion-types';
import { getBlogById } from '@/lib/notion-blogs';
import NotionPage from '@/components/NotionPage';
import Link from 'next/link';

export default function NotionBlogPage() {
  const params = useParams();
  const router = useRouter();
  const blogId = params.blogId as string;

  const [recordMap, setRecordMap] = useState<ExtendedRecordMap | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Get blog metadata
  const blog = getBlogById(blogId);

  useEffect(() => {
    // If blog doesn't exist in our list, redirect to blogs page
    if (!blog) {
      router.push('/notion-blogs');
      return;
    }

    const fetchNotionPage = async () => {
      setIsLoading(true);
      setError(null);

      try {
        // Call the API route to fetch the Notion page
        const response = await fetch('/api/notion', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ pageId: blogId }),
        });

        if (!response.ok) {
          throw new Error('Failed to fetch Notion page');
        }

        const data = await response.json();
        setRecordMap(data.recordMap);
      } catch (err) {
        console.error('Error fetching Notion page:', err);
        setError('Failed to load blog. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchNotionPage();
  }, [blogId, blog, router]);

  if (!blog) {
    return null; // Will redirect in useEffect
  }

  return (
    <>
      {isLoading ? (
        <div className="notion-loading">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
        </div>
      ) : error ? (
        <div className="notion-error">
          <p>{error}</p>
        </div>
      ) : recordMap ? (
        <>
          <div className="notion-back-button">
            <Link href="/notion-blogs">← Back to all blogs</Link>
          </div>
          <NotionPage recordMap={recordMap} />
        </>
      ) : null}
    </>
  );
}
