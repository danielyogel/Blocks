import { Content, JSONContent } from '@tiptap/react';
import React from 'react';
import type { Block } from '../bbb';
import { RichText, RichTextJSON } from '../components/Editors';
import { groupBy } from '../utils';

export const BODY: Block<JSONContent> = {
  Icon: () => <div>Body</div>,
  initialValue: [],
  parse: string => [{ cite_spans: [], section: string, text: string }],
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
