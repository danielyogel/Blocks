import { useSortable } from '@dnd-kit/sortable';
import React from 'react';
import { CSS } from '@dnd-kit/utilities';
import { DragIcon, DropdownMenu, TrashIcon, DuplicateIcon, DotsVerticalIcon, LockIcon } from '../../components';
import { BlocksMenu } from './BlocksMenu';
import classNames from 'classnames';
import { Block, NodeValueType } from '../../interfaces';
import { pipe } from '../../utils';

type Params<N extends NodeValueType> = {
  node: N;
  onDelete: () => void;
  onDuplicate: () => void;
  onChange: (node: N) => void;
  onAdd: (node: N) => void;
  blocks: Record<string, Block<any>>;
  viewMode: boolean;
};

export function NodeView<N extends NodeValueType>({ blocks, node, onAdd, onChange, onDelete, onDuplicate, viewMode }: Params<N>) {
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
          <div className={classNames('grow-0 shrink-0 w-20 mt-1')}>
            <div>
              <div className='pl-2 flex justify-end pr-9'>
                <ShowOnGroupHover isDragging={isDragging}>
                  <div className='h-4 relative text-gray hover:text-gray-darkest transition-colors mr-1' style={{ top: '2px' }} {...listeners}>
                    <DragIcon />
                  </div>
                </ShowOnGroupHover>

                <ShowOnGroupHover isDragging={isDragging}>
                  <DropdownMenu
                    items={[
                      ...(node.disabled ? [] : [{ onClick: onDelete, text: 'Delete', separator: true, Icon: TrashIcon }]),
                      { onClick: onDuplicate, text: 'Duplicate', separator: !node.disabled, Icon: DuplicateIcon },
                      ...(node.disabled
                        ? []
                        : BLOCKS_WITH_KIND.filter(currBlock => currBlock.kind !== node.kind).map(currBlock => {
                            return {
                              text: currBlock.kind,
                              onClick: () => {
                                const transformedValue = pipe(node.content, BlockWithKind._toString, currBlock._fromString);
                                onChange({ ...node, kind: currBlock.kind, content: transformedValue });
                              }
                            };
                          }))
                    ]}
                  >
                    <div className='w-5 text-sm font-medium text-gray-dark hover:text-gray-darkest transition-colors'>
                      <DotsVerticalIcon />
                    </div>
                  </DropdownMenu>
                </ShowOnGroupHover>

                {node.disabled && (
                  <div className='opacity-80 h-4 relative top-0.5 ml-1'>
                    <LockIcon />
                  </div>
                )}
              </div>
            </div>
          </div>

          <div>
            <div>
              <div>
                <div>
                  <BlockWithKind.View
                    content={node.content}
                    onChange={content => onChange({ ...node, content })}
                    viewMode={viewMode || node.disabled}
                  />
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

// Internals...
const ShowOnGroupHover = ({ children, isDragging }: { children: React.ReactNode; isDragging: boolean }) => (
  <div className={classNames('group-hover:opacity-100 duration-500', { 'opacity-0': !isDragging })}>{children}</div>
);
