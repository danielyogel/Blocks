import { JSONContent } from '@tiptap/react';
import React from 'react';
import { RichTextEditor } from '.';
import { Extention } from './RichTextEditor';
import { RichTextEditorJSON } from './RichTextEditorJSON';

export function RichText(allowedExtentions: Array<Extention>) {
  return function (params: { content: string; onChange: (content: string) => void; viewMode: boolean }) {
    return (
      <RichTextEditor
        height='h-auto'
        value={params.content}
        onChange={params.onChange}
        uploader={() => Promise.resolve('sd')}
        allowedExtentions={allowedExtentions}
        readOnly={params.viewMode}
      />
    );
  };
}

export function RichTextJSON(allowedExtentions: Array<Extention>) {
  return function (params: { content: JSONContent; onChange: (content: JSONContent) => void; viewMode: boolean }) {
    return (
      <RichTextEditorJSON
        height='h-auto'
        value={params.content}
        onChange={params.onChange}
        uploader={() => Promise.resolve('sd')}
        allowedExtentions={allowedExtentions}
        readOnly={params.viewMode}
      />
    );
  };
}
