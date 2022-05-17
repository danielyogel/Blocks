import React from 'react';
import { Content, JSONContent } from '@tiptap/react';
import type { Block } from '../blocks-container';
import { RichTextJSON } from '../components/Editors';

export const BODY: Block<JSONContent> = {
  Icon: () => <div>Body</div>,
  initialValue: [{ cite_spans: [], section: '', text: '' }],
  parse: s => [{ cite_spans: [], section: s, text: s }],
  stringify: body => {
    return JSON.stringify(body);
  },
  View: params => {
    return (
      <div>
        <div className='font-bold text-xs mb-1' style={{ fontSize: '10px' }}>
          Paragraph
        </div>
        <div>{RichTextJSON(['Bold', 'Italic', 'Strike', 'Underline', 'redo', 'undo', 'Highlight'])(params)}</div>
      </div>
    );
  }
};
