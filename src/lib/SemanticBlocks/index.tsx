import React from 'react';
import { unsafeUpdateAt, unsafeDeleteAt, unsafeInsertAt } from '../../utils';
import { BlocksMenu } from './internals/BlocksMenu';
import { SortableContext, arrayMove } from '@dnd-kit/sortable';
import { closestCenter, DndContext, MouseSensor, TouchSensor, useSensor, useSensors } from '@dnd-kit/core';
import { SortableItem } from './SortableItem';
import { NodeView } from './internals/NodeView';

export const Blocks = [
  { kind: 'TITLE', Icon: () => <div>Title</div> },
  { kind: 'SUBTITLE', Icon: () => <div>Subtitle</div> },
  { kind: 'IMAGE', Icon: () => <div>Image</div> },
  { kind: 'VIDEO', Icon: () => <div>Video</div> },
  { kind: 'GALLERY', Icon: () => <div>Gallery</div> },
  { kind: 'EMBED_CODE', Icon: () => <div>Embed Code</div> },
  { kind: 'ABSTRACT', Icon: () => <div>Abstract</div> },
  { kind: 'DATA', Icon: () => <div>Data</div> },
  { kind: 'AUTHORS', Icon: () => <div>Authors</div> }
] as const;

export type NodeValue = {
  id: string;
  kind: typeof Blocks[number]['kind'];
  content: string;
};

type Nodes = Array<NodeValue>;

type Params = {
  value: Nodes;
  onChange: (nodes: Nodes) => void;
};

export function SemanticBlocks({ value, onChange }: Params) {
  const sensors = useSensors(useSensor(MouseSensor), useSensor(TouchSensor));

  return (
    <div>
      <div>
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={event => {
            const { active, over } = event;
            if (over && active.id !== over.id) {
              const oldIndex = value.findIndex(i => i.id === active.id);
              const newIndex = value.findIndex(i => i.id === over.id);
              onChange(arrayMove(value, oldIndex, newIndex));
            }
          }}
        >
          <SortableContext items={value.map(m => m)}>
            {value.map((currNode, index) => {
              return (
                <SortableItem id={currNode.id} key={currNode.id} disabled={false}>
                  <div className='group mb-3' key={currNode.id}>
                    <div>
                      <NodeView
                        node={currNode}
                        onChange={node => onChange(unsafeUpdateAt(index, node, value))}
                        onDelete={() => onChange(unsafeDeleteAt(index, value))}
                      />
                    </div>
                    <div className='group-hover:opacity-100 opacity-0 duration-300'>
                      <BlocksMenu onSelect={node => onChange(unsafeInsertAt(index + 1, node, value))} />
                    </div>
                  </div>
                </SortableItem>
              );
            })}
          </SortableContext>
        </DndContext>
      </div>

      <div>{!value.length && <BlocksMenu onSelect={node => onChange([...value, node])} />}</div>
    </div>
  );
}
