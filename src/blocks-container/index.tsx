import React from 'react';
import { Except, Simplify } from 'type-fest';
import { unsafeUpdateAt, unsafeDeleteAt, unsafeInsertAt } from '../utils';
import { BlocksMenu } from './internals/BlocksMenu';
import { SortableContext, arrayMove } from '@dnd-kit/sortable';
import { closestCenter, DndContext, MouseSensor, TouchSensor, useSensor, useSensors } from '@dnd-kit/core';
import { NodeView } from './internals/NodeView';
import { nanoid } from 'nanoid';
import { Block, InferBlockValue, NodeValueType } from '../interfaces';

type Params<K extends string, Blocks extends Record<K, Block<any>>> = { blocks: Blocks };

export function InitEditor<K extends string, B extends Record<K, Block<any>>>({ blocks }: Params<K, B>) {
  type NodeValue = {
    [key in keyof typeof blocks]: NodeValueType<key, InferBlockValue<typeof blocks[key]>>;
  }[keyof typeof blocks];

  type NodeValueWithLinks = Except<NodeValue, 'links'> & { links: Array<Except<NodeValue, 'links'>[]> };

  type _Params = {
    value: Array<NodeValueWithLinks>;
    onChange: React.Dispatch<React.SetStateAction<NodeValueWithLinks[]>>;
    viewMode: boolean;
    singularMode: boolean;
    renderLink: (link: NodeValue[]) => React.ReactNode;
    newBlockRequest: (kind: NodeValueWithLinks['kind'], next: (n?: NodeValueWithLinks) => void) => void;
    linkRequest: (blockId: string) => Promise<void>;
  };

  return function Editor({ value, onChange, viewMode, singularMode, renderLink, linkRequest, newBlockRequest }: _Params) {
    const sensors = useSensors(useSensor(MouseSensor), useSensor(TouchSensor));

    const onAdd = React.useCallback(
      (node: NodeValueWithLinks, index?: number) => {
        newBlockRequest(node.kind, selectedNode => {
          const indexToUse = index === undefined ? value.length : index + 1;
          const nodeToAdd = selectedNode || node;
          onChange(value => unsafeInsertAt(indexToUse, nodeToAdd, value));
        });
      },
      [value, onChange]
    );

    return (
      <div>
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
                  <div className='group relative flex' key={currNode.id}>
                    <div className='opacity-0 group-hover:opacity-100 shrink-0 grow-0 ml-10 grid grid-cols-2 gap-3 mr-2' style={{ width: '400px' }}>
                      {currNode.links.map((link, i) => {
                        return <div key={i}>{renderLink(link)}</div>;
                      })}
                    </div>

                    <div className='grow shrink-0'>
                      <NodeView
                        node={currNode}
                        onChange={node => onChange(value => [...unsafeUpdateAt(index, node, value)])}
                        onDuplicate={() => onChange(value => unsafeInsertAt(index + 1, { ...currNode, id: nanoid() }, value))}
                        onDelete={() => onChange(value => unsafeDeleteAt(index, value))}
                        onAdd={n => onAdd(n, index)}
                        blocks={blocks}
                        onLink={linkRequest}
                        viewMode={viewMode}
                        singularMode={singularMode}
                      />
                    </div>
                  </div>
                );
              })}
            </SortableContext>
          </DndContext>
        </div>

        {!singularMode && !value.length && (
          <div>
            <BlocksMenu blocks={blocks} staticMode onSelect={onAdd} />
          </div>
        )}
      </div>
    );
  };
}
