import { Color } from '@tiptap/extension-color';
import Highlight from '@tiptap/extension-highlight';
import Link from '@tiptap/extension-link';
import Placeholder from '@tiptap/extension-placeholder';
import TaskItem from '@tiptap/extension-task-item';
import TaskList from '@tiptap/extension-task-list';
import TextStyle from '@tiptap/extension-text-style';
import Underline from '@tiptap/extension-underline';
import StarterKit from '@tiptap/starter-kit';
import { handleCommandNavigation } from 'novel';

export const defaultExtensions = [
  StarterKit.configure({
    bulletList: {
      HTMLAttributes: {
        class: 'list-disc pl-6',
      },
    },
    orderedList: {
      HTMLAttributes: {
        class: 'list-decimal pl-6',
      },
    },
    listItem: {
      HTMLAttributes: {
        class: 'pl-2',
      },
    },
    blockquote: {
      HTMLAttributes: {
        class: 'border-l-4 border-stone-700 pl-4',
      },
    },
    codeBlock: {
      HTMLAttributes: {
        class: 'rounded-md bg-stone-100 p-5 font-mono font-medium text-stone-800',
      },
    },
    code: {
      HTMLAttributes: {
        class: 'rounded-md bg-stone-100 px-1.5 py-1 font-mono font-medium text-stone-800',
      },
    },
    horizontalRule: false,
    dropcursor: {
      color: '#DBEAFE',
      width: 4,
    },
    gapcursor: false,
  }),
  Placeholder.configure({
    placeholder: 'Start writing...',
  }),
  TaskList.configure({
    HTMLAttributes: {
      class: 'not-prose pl-2',
    },
  }),
  TaskItem.configure({
    HTMLAttributes: {
      class: 'flex items-start my-4',
    },
    nested: true,
  }),
  Underline,
  Link.configure({
    HTMLAttributes: {
      class: 'text-stone-400 underline underline-offset-[3px] hover:text-stone-600 transition-colors cursor-pointer',
    },
  }),
  TextStyle,
  Color,
  Highlight.configure({
    multicolor: true,
  }),
];

export { handleCommandNavigation };
