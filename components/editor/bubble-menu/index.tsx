'use client';

import { useState } from 'react';
import { EditorBubble } from 'novel';
import { NodeSelector } from './node-selector';
import { LinkSelector } from './link-selector';
import { TextButtons } from './text-buttons';
import { ColorSelector } from './color-selector';

export function BubbleMenu() {
  const [isNodeSelectorOpen, setIsNodeSelectorOpen] = useState(false);
  const [isLinkSelectorOpen, setIsLinkSelectorOpen] = useState(false);
  const [isColorSelectorOpen, setIsColorSelectorOpen] = useState(false);

  return (
    <EditorBubble
      className="flex w-fit max-w-[90vw] overflow-hidden rounded border border-muted bg-background shadow-xl"
      tippyOptions={{
        placement: 'top',
      }}
    >
      <NodeSelector
        open={isNodeSelectorOpen}
        onOpenChange={setIsNodeSelectorOpen}
      />
      <LinkSelector
        open={isLinkSelectorOpen}
        onOpenChange={setIsLinkSelectorOpen}
      />
      <TextButtons />
      <ColorSelector
        open={isColorSelectorOpen}
        onOpenChange={setIsColorSelectorOpen}
      />
    </EditorBubble>
  );
}
