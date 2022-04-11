import React from 'react';
import RichTextEditor from '../../RichTextEditor';
import { XIcon } from '../../icons';
import { NodeValue } from '../index';

export const NodeView = ({ node, onDelete, onChange }: { node: NodeValue; onDelete: () => void; onChange: (node: NodeValue) => void }) => {
  return (
    <div className='flex items-center group'>
      <div className='grow-0 shrink-0 w-20 opacity-0 group-hover:opacity-100 duration-500'>
        <div>
          <div className='cursor-pointer' onClick={onDelete}>
            <XIcon onClick={() => {}} mode='X' isDisabled={false} />
          </div>
        </div>
      </div>
      <div className='grow'>
        <div className='capitalize font-bold text-sm'>{node.kind.toLowerCase().split('_')}</div>
        <div>
          <RichTextEditor
            height='h-32'
            value={node.content}
            onChange={content => onChange({ ...node, content })}
            uploader={() => Promise.resolve('sd')}
          />
        </div>
      </div>
    </div>
  );
};
