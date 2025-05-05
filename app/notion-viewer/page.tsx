'use client';

import { useState, useEffect } from 'react';
import { ExtendedRecordMap } from 'notion-types';
import NotionPage from '@/components/NotionPage';

// Default Notion page ID - your published Notion page
const DEFAULT_NOTION_PAGE_ID = '1ea0ee8a1a7080cfb3edd9872298609c';

export default function NotionViewerPage() {
  const [recordMap, setRecordMap] = useState<ExtendedRecordMap | null>(null);
  const [pageId, setPageId] = useState<string>(DEFAULT_NOTION_PAGE_ID);
  const [inputPageId, setInputPageId] = useState<string>(DEFAULT_NOTION_PAGE_ID);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchNotionPage = async () => {
      setIsLoading(true);
      setError(null);

      try {
        // Call the API route instead of using the Notion client directly
        const response = await fetch('/api/notion', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ pageId }),
        });

        if (!response.ok) {
          throw new Error('Failed to fetch Notion page');
        }

        const data = await response.json();
        setRecordMap(data.recordMap);
      } catch (err) {
        console.error('Error fetching Notion page:', err);
        setError('Failed to load Notion page. Please check the page ID and try again.');
        setRecordMap(null);
      } finally {
        setIsLoading(false);
      }
    };

    fetchNotionPage();
  }, [pageId]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputPageId.trim()) {
      setPageId(inputPageId.trim());
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto pt-8 pb-16">
        <h1 className="text-3xl font-bold text-center mb-8">Notion Blog Viewer</h1>

        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
            <div>
              <label htmlFor="pageId" className="block text-sm font-medium text-gray-700 mb-1">
                Notion Page ID
              </label>
              <div className="flex">
                <input
                  type="text"
                  id="pageId"
                  value={inputPageId}
                  onChange={(e) => setInputPageId(e.target.value)}
                  placeholder="Enter Notion page ID"
                  className="flex-1 min-w-0 block w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
                <button
                  type="submit"
                  disabled={isLoading}
                  className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
                >
                  {isLoading ? 'Loading...' : 'Load Page'}
                </button>
              </div>
              <p className="mt-1 text-sm text-gray-500">
                Example: 1ea0ee8a1a7080cfb3edd9872298609c (Tools to sing with your MacBook)
              </p>
            </div>
          </form>
        </div>

        {error && (
          <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-8">
            <div className="flex">
              <div className="ml-3">
                <p className="text-sm text-red-700">{error}</p>
              </div>
            </div>
          </div>
        )}

        {isLoading ? (
          <div className="flex justify-center items-center py-16">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
          </div>
        ) : recordMap ? (
          <div className="bg-white rounded-lg shadow-md">
            <NotionPage recordMap={recordMap} />
          </div>
        ) : null}
      </div>
    </div>
  );
}
