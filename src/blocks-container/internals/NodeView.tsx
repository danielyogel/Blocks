import { useSortable } from '@dnd-kit/sortable';
import React from 'react';
import { CSS } from '@dnd-kit/utilities';
import { DragIcon, DropdownMenu, TrashIcon, DuplicateIcon, DotsVerticalIcon, LockIcon, LinkIcon, LinkedIcon } from '../../components';
import { BlocksMenu } from './BlocksMenu';
import classNames from 'classnames';
import { Block, NodeValueType } from '../../interfaces';
import { pipe } from '../../utils';

type Params<N extends NodeValueType> = {
  node: N;
  onDelete: () => void;
  onDuplicate: () => void;
  onLink: (id: string) => Promise<void>;
  onChange: (node: N) => void;
  onAdd: (node: N) => void;
  blocks: Record<string, Block<any>>;
  viewMode: boolean;
  singularMode: boolean;
};

export function NodeView<N extends NodeValueType>({
  blocks,
  node,
  onAdd,
  onChange,
  onDelete,
  onDuplicate,
  onLink,
  viewMode,
  singularMode
}: Params<N>) {
  const BLOCKS_WITH_KIND = Object.entries(blocks).map(([kind, node]) => ({ ...node, kind }));

  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: node.id, disabled: false });

  const BlockWithKind = React.useMemo(() => BLOCKS_WITH_KIND.find(b => b.kind === node.kind), [node.kind]);

  const _onLink = React.useCallback(() => {
    onLink(node.id);
  }, [onLink]);

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
          <div className='grow-0 shrink-0 w-auto mt-1 pl-2 pr-9 flex justify-end' style={{ width: '96px' }}>
            {!singularMode && (
              <ShowOnGroupHover isDragging={isDragging}>
                <div className='h-4 relative text-gray hover:text-gray-darkest transition-colors mr-1' style={{ top: '2px' }} {...listeners}>
                  <DragIcon />
                </div>
              </ShowOnGroupHover>
            )}

            <ShowOnGroupHover isDragging={isDragging}>
              <DropdownMenu
                items={[
                  ...(node.disabled || singularMode ? [] : [{ onClick: onDelete, text: 'Delete', separator: true, Icon: TrashIcon }]),
                  { onClick: onDuplicate, text: 'Duplicate', separator: !node.disabled, Icon: DuplicateIcon },
                  ...(node.disabled ? [] : [{ onClick: _onLink, text: 'Value Link', separator: !node.disabled && !singularMode, Icon: LinkIcon }]),
                  ...(node.disabled || singularMode
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

            {!node.links?.length ? null : (
              <div className='opacity-80 h-4 relative top-0.5 ml-1'>
                <LinkedIcon />
              </div>
            )}

            {node.disabled && (
              <div className='opacity-80 h-4 relative top-0.5 ml-1'>
                <LockIcon />
              </div>
            )}
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

      {viewMode || singularMode ? (
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
