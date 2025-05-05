
"use client";

import {
  EditorCommand,
  EditorCommandEmpty,
  EditorCommandItem,
  EditorCommandList,
  EditorContent,
  type EditorInstance,
  EditorRoot,
  ImageResizer,
  handleCommandNavigation,
  handleImageDrop,
  handleImagePaste,
} from "novel";
import { useEffect, useState } from "react";
import { useDebouncedCallback } from "use-debounce";
import { defaultExtensions } from "./extensions";
import { uploadFn } from "./image-upload";
import { slashCommand, suggestionItems } from "./slash-command";

// Removed highlight.js import as it's not being used

const extensions = [...defaultExtensions, slashCommand];

interface NovelEditorWrapperProps {
  content: string;
  onChange: (content: string) => void;
  // Placeholder is handled by the Placeholder extension in defaultExtensions
  placeholder?: string;
}

export default function NovelEditorWrapper({
  content,
  onChange
}: NovelEditorWrapperProps) {
  const [isMounted, setIsMounted] = useState(false);
  const [saveStatus, setSaveStatus] = useState("Saved");

  // We're not using code highlighting in this implementation
  // but keeping the import for future use

  const debouncedUpdates = useDebouncedCallback(async (editor: EditorInstance) => {
    const html = editor.getHTML();
    onChange(html);
    setSaveStatus("Saved");
  }, 500);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return <div className="min-h-[300px] border rounded-md p-4">Loading editor...</div>;
  }

  return (
    <div className="relative w-full">
      <div className="absolute right-5 top-5 z-10">
        <div className="rounded-lg bg-accent px-2 py-1 text-sm text-muted-foreground">{saveStatus}</div>
      </div>
      <EditorRoot>
        <EditorContent
          extensions={extensions}
          className="prose dark:prose-invert prose-lg focus:outline-none max-w-full min-h-[300px] border rounded-md p-4"
          editorProps={{
            handleDOMEvents: {
              keydown: (_view, event) => handleCommandNavigation(event),
            },
            handlePaste: (view, event) => handleImagePaste(view, event, uploadFn),
            handleDrop: (view, event, _slice, moved) => handleImageDrop(view, event, moved, uploadFn),
            attributes: {
              class: 'prose prose-lg dark:prose-invert prose-headings:font-bold focus:outline-none max-w-full min-h-[300px]',
            },
          }}
          onUpdate={({ editor }) => {
            onChange(editor.getHTML());
            setSaveStatus("Unsaved");
            debouncedUpdates(editor);
          }}
          onCreate={({ editor }) => {
            // Set initial content when editor is created
            editor.commands.setContent(content || '<p></p>');
          }}
          slotAfter={<ImageResizer />}
        >
          <EditorCommand className="z-50 h-auto max-h-[330px] w-72 overflow-y-auto rounded-md border border-muted bg-background px-1 py-2 shadow-md transition-all">
            <EditorCommandEmpty className="px-2 text-muted-foreground">No results</EditorCommandEmpty>
            <EditorCommandList>
              {suggestionItems.map((item) => (
                <EditorCommandItem
                  value={item.title}
                  onCommand={(val) => item.command && item.command(val)}
                  className="flex w-full items-center space-x-2 rounded-md px-2 py-1 text-left text-sm hover:bg-accent aria-selected:bg-accent"
                  key={item.title}
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-md border border-muted bg-background">
                    {item.icon}
                  </div>
                  <div>
                    <p className="font-medium">{item.title}</p>
                    <p className="text-xs text-muted-foreground">{item.description}</p>
                  </div>
                </EditorCommandItem>
              ))}
            </EditorCommandList>
          </EditorCommand>
        </EditorContent>
      </EditorRoot>
    </div>
  );
}