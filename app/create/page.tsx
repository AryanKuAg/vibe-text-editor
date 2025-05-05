'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import NovelEditorWrapper from '@/components/NovelEditorWrapper';
import StorageLimitDialog from '@/components/StorageLimitDialog';

export default function CreateBlogPage() {
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isStorageLimitDialogOpen, setIsStorageLimitDialogOpen] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim()) {
      toast.error('Please enter a title');
      return;
    }

    if (!content.trim()) {
      toast.error('Please enter some content');
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch('/api/blogs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, content }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to create blog');
      }

      toast.success('Blog created successfully');
      router.push('/');
      router.refresh();
    } catch (error) {
      console.error('Error creating blog:', error);

      // Check if it's a storage limit error
      if (error instanceof Error && error.message.includes('Database storage limit reached')) {
        setIsStorageLimitDialogOpen(true);
      } else {
        toast.error(error instanceof Error ? error.message : 'Failed to create blog');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Create New Blog</h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="title">Title</Label>
          <Input
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter blog title"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="content">Content</Label>
          <NovelEditorWrapper
            content={content}
            onChange={setContent}
            placeholder="Write your blog post here..."
          />
        </div>

        <div className="flex justify-end gap-4">
          <Button
            type="button"
            variant="outline"
            onClick={() => router.push('/')}
            disabled={isSubmitting}
          >
            Cancel
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Creating...' : 'Create Blog'}
          </Button>
        </div>
      </form>

      <StorageLimitDialog
        open={isStorageLimitDialogOpen}
        onOpenChange={setIsStorageLimitDialogOpen}
      />
    </div>
  );
}
