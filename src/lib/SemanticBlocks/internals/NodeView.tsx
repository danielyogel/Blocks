import React from 'react';
import { XIcon } from '../../components/icons';
import { NodeValue } from '../index';
import { Blocks } from '../index';

export const NodeView = ({ node, onDelete, onChange }: { node: NodeValue; onDelete: () => void; onChange: (node: NodeValue) => void }) => {
  const View = React.useMemo(() => Blocks.find(b => b.kind === node.kind), [node.kind])?.View;

  if (!View) {
    return null;
  }

  return (
    <div className='flex items-center group'>
      <div className='grow-0 shrink-0 w-20 opacity-0 group-hover:opacity-100 duration-500'>
        <div>
          <div className='cursor-pointer' onClick={onDelete}>
            <XIcon onClick={() => {}} mode='X' isDisabled={false} color='black' />
          </div>
        </div>
      </div>
      <div className='grow'>
        <div className='capitalize font-bold text-sm'>{node.kind.toLowerCase().split('_')}</div>
        <div>
          <View content={node.content} onChange={content => onChange({ ...node, content })} />
        </div>
      </div>
    </div>
  );
};
