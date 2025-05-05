import { ReactNode } from 'react';
import { Editor } from '@tiptap/core';

export interface SuggestionItem {
  title: string;
  description: string;
  searchTerms?: string[];
  icon: ReactNode;
  command: (props: { editor: Editor; range: { from: number; to: number } }) => void;
}
