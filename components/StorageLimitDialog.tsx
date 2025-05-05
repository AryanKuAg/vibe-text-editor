'use client';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

interface StorageLimitDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function StorageLimitDialog({ open, onOpenChange }: StorageLimitDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Database Storage Limit Reached</DialogTitle>
          <DialogDescription>
            The MongoDB database has reached its storage limit. This is a free tier database with limited storage capacity.
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col space-y-4 py-4">
          <p className="text-sm text-muted-foreground">
            To resolve this issue, you can:
          </p>
          <ul className="list-disc pl-5 text-sm text-muted-foreground space-y-2">
            <li>Delete some existing blog posts to free up space</li>
            <li>Contact the administrator to upgrade the database plan</li>
            <li>Use a different MongoDB database with more storage</li>
          </ul>
        </div>
        <DialogFooter>
          <Button onClick={() => onOpenChange(false)}>Close</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
