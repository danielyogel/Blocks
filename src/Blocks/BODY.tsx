import React from 'react';
import type { Block } from '../blocksContainer';
import { groupBy } from '../utils';

export const BODY: Block<{ section: string; text: string; cite_spans: { end: number; ref_id: string | null; start: number; text: string }[] }[]> = {
  Icon: () => <div>Body</div>,
  initialValue: [],
  parse: string => [{ cite_spans: [], section: string, text: string }],
  stringify: body => {
    return JSON.stringify(body);
  },
  View: ({ content, onChange }) => {
    const grouped = groupBy(content, i => i.section);

    return (
      <div>
        <div className='font-bold text-xs mb-1' style={{ fontSize: '10px' }}>
          Paragraph
        </div>

        <div>
          {Object.values(grouped).map((currGroup, i) => {
            return (
              <div key={i}>
                <h1>{currGroup[0].section}</h1>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
};
