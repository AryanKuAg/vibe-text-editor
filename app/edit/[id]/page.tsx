'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import NovelEditorWrapper from '@/components/NovelEditorWrapper';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import StorageLimitDialog from '@/components/StorageLimitDialog';

export default function EditBlogPage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isStorageLimitDialogOpen, setIsStorageLimitDialogOpen] = useState(false);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        // Resolve the params Promise
        const resolvedParams = await params;
        const blogId = resolvedParams.id;

        const response = await fetch(`/api/blogs/${blogId}`);

        if (!response.ok) {
          throw new Error('Failed to fetch blog');
        }

        const blog = await response.json();
        setTitle(blog.title);
        setContent(blog.content);
      } catch (error) {
        console.error('Error fetching blog:', error);
        toast.error('Failed to load blog');
        router.push('/');
      } finally {
        setIsLoading(false);
      }
    };

    fetchBlog();
  }, [params, router]);

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
      // Resolve the params Promise
      const resolvedParams = await params;
      const blogId = resolvedParams.id;

      const response = await fetch(`/api/blogs/${blogId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, content }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to update blog');
      }

      toast.success('Blog updated successfully');
      router.push(`/view/${blogId}`);
      router.refresh();
    } catch (error) {
      console.error('Error updating blog:', error);

      // Check if it's a storage limit error
      if (error instanceof Error && error.message.includes('Database storage limit reached')) {
        setIsStorageLimitDialogOpen(true);
      } else {
        toast.error(error instanceof Error ? error.message : 'Failed to update blog');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async () => {
    setIsSubmitting(true);

    try {
      // Resolve the params Promise
      const resolvedParams = await params;
      const blogId = resolvedParams.id;

      const response = await fetch(`/api/blogs/${blogId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to delete blog');
      }

      toast.success('Blog deleted successfully');
      router.push('/');
      router.refresh();
    } catch (error) {
      console.error('Error deleting blog:', error);
      toast.error(error instanceof Error ? error.message : 'Failed to delete blog');
    } finally {
      setIsSubmitting(false);
      setIsDeleteDialogOpen(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
          <p className="mt-2">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Edit Blog</h1>
        <Button
          variant="destructive"
          onClick={() => setIsDeleteDialogOpen(true)}
          disabled={isSubmitting}
        >
          Delete Blog
        </Button>
      </div>

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
            placeholder="Edit your blog post here..."
          />
        </div>

        <div className="flex justify-end gap-4">
          <Button
            type="button"
            variant="outline"
            onClick={() => router.back()}
            disabled={isSubmitting}
          >
            Cancel
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Saving...' : 'Save Changes'}
          </Button>
        </div>
      </form>

      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Are you sure you want to delete this blog?</DialogTitle>
            <DialogDescription>
              This action cannot be undone. This will permanently delete your blog.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsDeleteDialogOpen(false)}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={handleDelete}
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Deleting...' : 'Delete Blog'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <StorageLimitDialog
        open={isStorageLimitDialogOpen}
        onOpenChange={setIsStorageLimitDialogOpen}
      />
    </div>
  );
}
