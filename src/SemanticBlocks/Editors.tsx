import React from 'react';
import { RichTextEditor } from '../components';

export const RichText = (params: { content: string; onChange: (content: string) => void }) => (
  <RichTextEditor height='h-auto' value={params.content} onChange={params.onChange} uploader={() => Promise.resolve('sd')} />
);
