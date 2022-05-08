import React from 'react';
import { unsafeUpdateAt, unsafeDeleteAt, unsafeInsertAt } from '../utils';
import { initBlocksMenu } from './internals/BlocksMenu';
import { SortableContext, arrayMove } from '@dnd-kit/sortable';
import { closestCenter, DndContext, MouseSensor, TouchSensor, useSensor, useSensors } from '@dnd-kit/core';
import { initNodeView } from './internals/NodeView';
import { StyledDropzone } from '../components';

export type Block<Value> = {
  initialValue: any;
  Icon: React.FC;
  convertString: null | ((value: Value) => string);
  View: React.FC<{ content: Value; onChange: (content: Value) => void }>;
};

export function InitEditor<Key extends string, Blocks extends Record<Key, Block<any>>>({ blocks }: { blocks: Blocks }) {
  type OptionsType = typeof blocks;
  type InferBlock<F> = F extends Block<infer V> ? V : never;

  type NodeValue = { [key in keyof OptionsType]: { kind: key; content: InferBlock<OptionsType[key]>; id: string } }[keyof OptionsType];

  const NodeView = initNodeView(blocks);
  const BlocksMenu = initBlocksMenu(blocks);

  type Params = {
    value: Array<NodeValue>;
    onChange: React.Dispatch<React.SetStateAction<NodeValue[]>>;
  };

  return function Editor({ value, onChange }: Params) {
    const sensors = useSensors(useSensor(MouseSensor), useSensor(TouchSensor));

    return (
      <div>
        <div className='w-3/6 ml-20 mb-20'>
          <StyledDropzone
            accept={{ 'application/pdf': [] }}
            text={
              <div>
                Drop a PDF file, or <span className='cursor-pointer font-bold '>browse</span>
              </div>
            }
            onDrop={async files => {
              const file = files?.[0];
              if (file) {
                const formData = new FormData();
                formData.append('file', file);
                const res = await (
                  await fetch(new Request('https://blocks-api-1-3the2xxjta-uc.a.run.app/pdfToBlocks'), { method: 'POST', body: formData })
                ).json();

                onChange(res);
              }
            }}
          />
        </div>
        <div className='mt-12'>
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={event => {
              const { active, over } = event;
              if (over && active.id !== over.id) {
                const oldIndex = value.findIndex(i => i.id === active.id);
                const newIndex = value.findIndex(i => i.id === over.id);
                onChange(v => arrayMove(v, oldIndex, newIndex));
              }
            }}
          >
            <SortableContext items={value.map(m => m)}>
              {value.map((currNode, index) => {
                return (
                  <NodeView
                    key={currNode.id}
                    node={currNode}
                    onChange={node => onChange(value => [...unsafeUpdateAt(index, node, value)])}
                    onDelete={() => onChange(value => unsafeDeleteAt(index, value))}
                    onAdd={node => onChange(value => unsafeInsertAt(index + 1, node, value))}
                  />
                );
              })}
            </SortableContext>
          </DndContext>
        </div>

        <div>{!value.length && <BlocksMenu onSelect={node => onChange(value => [...value, node])} staticMode />}</div>
      </div>
    );
  };
}
