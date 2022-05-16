import { useSortable } from '@dnd-kit/sortable';
import React from 'react';
import { CSS } from '@dnd-kit/utilities';
import { DragIcon, DropdownMenu, TrashIcon, DuplicateIcon } from '../../components';
import { BlocksMenu } from './BlocksMenu';
import classNames from 'classnames';
import { Block } from '..';
import { pipe } from '../../utils';

type NodeValue = { id: string; kind: any; content: any };

type Params = {
  node: NodeValue;
  onDelete: () => void;
  onDuplicate: () => void;
  onChange: (node: NodeValue) => void;
  onAdd: (node: NodeValue) => void;
  blocks: Record<string, Block<any>>;
  viewMode: boolean;
};

export function NodeView({ blocks, node, onAdd, onChange, onDelete, onDuplicate, viewMode }: Params) {
  const BLOCKS_WITH_KIND = Object.entries(blocks).map(([kind, node]) => ({ ...node, kind }));

  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: node.id, disabled: false });

  const BlockWithKind = React.useMemo(() => BLOCKS_WITH_KIND.find(b => b.kind === node.kind), [node.kind]);

  if (!BlockWithKind) {
    return null;
  }

  return (
    <div
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
        <div className={classNames('flex group items-start', { 'pointer-events-none': viewMode, 'cursor-auto': viewMode })}>
          <div className={classNames('grow-0 shrink-0 w-20 group-hover:opacity-100 duration-500 mt-1', { 'opacity-0': !isDragging })}>
            <div>
              <div className='pl-2 flex justify-end pr-9'>
                <div className='h-4 relative text-gray hover:text-gray-darkest transition-colors mr-1' style={{ top: '2px' }} {...listeners}>
                  <DragIcon />
                </div>
                <div className='w-5 relative overflow-visible text-gray-dark hover:text-gray-darkest transition-colors'>
                  <DropdownMenu
                    items={[
                      { onClick: onDelete, text: 'Delete', separator: true, Icon: TrashIcon },
                      { onClick: onDuplicate, text: 'Duplicate', separator: true, Icon: DuplicateIcon },
                      ...BLOCKS_WITH_KIND.filter(currBlock => currBlock.kind !== node.kind).map(currBlock => {
                        return {
                          text: currBlock.kind,
                          onClick: () => {
                            const transformedValue = pipe(node.content, BlockWithKind.stringify, currBlock.parse);
                            onChange({ ...node, kind: currBlock.kind, content: transformedValue });
                          }
                        };
                      })
                    ]}
                  />
                </div>
              </div>
            </div>
          </div>
          <div>
            <div>
              <div>
                <div>
                  <BlockWithKind.View content={node.content} onChange={content => onChange({ ...node, content })} viewMode={viewMode} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {viewMode ? (
        <div className='h-10'></div>
      ) : (
        <div>
          <BlocksMenu blocks={blocks} onSelect={onAdd} staticMode={false} />
        </div>
      )}
    </div>
  );
}
