import React from 'react';
import { unsafeUpdateAt, unsafeDeleteAt, unsafeInsertAt } from '../utils';
import { BlocksMenu } from './internals/BlocksMenu';
import { SortableContext, arrayMove } from '@dnd-kit/sortable';
import { closestCenter, DndContext, MouseSensor, TouchSensor, useSensor, useSensors } from '@dnd-kit/core';
import { NodeView } from './internals/NodeView';
import { StyledDropzone } from '../components';
import { nanoid } from 'nanoid';
import classNames from 'classnames';

export type Block<V> = {
  initialValue: V;
  Icon: React.FC;
  View: React.FC<{ content: V; onChange: (content: V) => void; viewMode: boolean }>;
  stringify: (value: V) => string;
  parse: (text: string) => V;
};

export type InferBlockValue<F> = F extends Block<infer V> ? V : never;

type Params<K extends string, Blocks extends Record<K, Block<any>>> = {
  blocks: Blocks;
};

export function InitEditor<K extends string, B extends Record<K, Block<any>>>({ blocks }: Params<K, B>) {
  type BlocksType = typeof blocks;

  type NodeValue = { [key in keyof BlocksType]: { kind: key; content: InferBlockValue<BlocksType[key]>; id: string } }[keyof BlocksType];

  type _Params = {
    value: Array<NodeValue>;
    onChange: React.Dispatch<React.SetStateAction<NodeValue[]>>;
    viewMode: boolean;
  };

  return function Editor({ value, onChange, viewMode }: _Params) {
    const sensors = useSensors(useSensor(MouseSensor), useSensor(TouchSensor));

    return (
      <div>
        <div className={classNames('ml-20 mb-20', { invisible: viewMode })}>
          <StyledDropzone
            accept={{ 'application/pdf': [] }}
            text={
              <span>
                Drop a PDF file, or <span className='cursor-pointer font-bold '>browse</span>
              </span>
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
        {/* <div>
          <button
            onClick={() => {
              console.log(parsedApiPDf);
            }}
          >
            Get Parsed PDF
          </button>
        </div> */}
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
                    onDuplicate={() => onChange(value => unsafeInsertAt(index + 1, { ...currNode, id: nanoid() }, value))}
                    onDelete={() => onChange(value => unsafeDeleteAt(index, value))}
                    onAdd={node => onChange(value => unsafeInsertAt(index + 1, node, value))}
                    blocks={blocks}
                    viewMode={viewMode}
                  />
                );
              })}
            </SortableContext>
          </DndContext>
        </div>

        <div>{!value.length && <BlocksMenu blocks={blocks} onSelect={node => onChange(value => [...value, node])} staticMode />}</div>
      </div>
    );
  };
}