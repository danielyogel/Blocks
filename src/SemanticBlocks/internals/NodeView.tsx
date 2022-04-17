import { useSortable } from '@dnd-kit/sortable';
import React from 'react';
import { CSS } from '@dnd-kit/utilities';
import { XIcon, XIconClear, DragIcon } from '../../components/icons';
import { NodeValue } from '../index';
import { Blocks } from '../index';
import { BlocksMenu } from './BlocksMenu';
import { unsafeInsertAt } from '../../utils';

export const NodeView = ({
  node,
  onDelete,
  onChange,
  onAdd
}: {
  node: NodeValue;
  onDelete: () => void;
  onChange: (node: NodeValue) => void;
  onAdd: (node: NodeValue) => void;
}) => {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: node.id, disabled: false });

  const View = React.useMemo(() => Blocks.find(b => b.kind === node.kind), [node.kind])?.View;

  if (!View) {
    return null;
  }

  return (
    <div
      className='group'
      ref={setNodeRef}
      {...attributes}
      style={{
        ...(transition && { transition }),
        ...(isDragging && { zIndex: 1 }),
        transform: CSS.Transform.toString(transform ? { ...transform, scaleX: 1, scaleY: 1 } : null),

        pointerEvents: transform?.x || transform?.y ? 'none' : 'auto' // IMPORTANT: when dragging disable all inner node's events !
      }}
    >
      <div>
        <div className='flex group items-center'>
          <div className='grow-0 shrink-0 w-20 opacity-0 group-hover:opacity-100 duration-500'>
            <div>
              <div className='pl-2'>
                <div className='w-5 mb-1'>
                  <XIconClear onClick={onDelete} mode='X' isDisabled={false} color='black' />
                </div>
                <div className='w-5' {...listeners}>
                  <DragIcon />
                </div>
              </div>
            </div>
          </div>
          <div>
            <div>
              <div>
                <div className='capitalize font-bold text-sm'>{node.kind.toLowerCase().split('_')}</div>
                <div>
                  <View content={node.content} onChange={content => onChange({ ...node, content })} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='group-hover:opacity-100 opacity-0 duration-300'>
        <BlocksMenu onSelect={onAdd} />
      </div>
    </div>
  );
};
