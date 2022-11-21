import React from 'react';
import { nanoid } from 'nanoid';
import { Except } from 'type-fest';
import { SortableContext, arrayMove } from '@dnd-kit/sortable';
import { closestCenter, DndContext, MouseSensor, TouchSensor, useSensor, useSensors } from '@dnd-kit/core';
import { unsafeUpdateAt, unsafeDeleteAt, unsafeInsertAt } from '../utils';
import { BlocksMenu } from './internals/BlocksMenu';
import { NodeView } from './internals/NodeView';
import { Block, InferBlockValue, NodeValueType } from '../interfaces';

type Params<K extends string, Blocks extends Record<K, Block<any>>> = { blocks: Blocks };

export function InitEditor<K extends string, B extends Record<K, Block<any>>>({ blocks }: Params<K, B>) {
  type NodeValue = {
    [key in keyof typeof blocks]: NodeValueType<key, InferBlockValue<typeof blocks[key]>>;
  }[keyof typeof blocks];

  type NodeValueWithLinks = Except<NodeValue, 'links'> & { links: Array<Except<NodeValue, 'links'>[]> };

  type _Params = {
    value: Array<NodeValueWithLinks>;
    onChange: (node: NodeValueWithLinks, index: number) => void;
    onAdd: (node: NodeValueWithLinks, index: number) => void;
    onMove: (oldIndex: number, newIndex: number) => void;
    onDuplicate: (index: number) => void;
    onDelete: (index: number) => void;
    viewMode: boolean;
    singularMode: boolean;
    onBlockFocus: (quest: NodeValueWithLinks | null) => void;
    linkRequest: (blockId: string) => Promise<void>;
    newBlockRequest: (kind: NodeValueWithLinks['kind'], next: (n?: NodeValueWithLinks) => void) => void;
  };

  return function Editor(params: _Params) {
    const { value, onChange, onAdd, onMove, onDuplicate, onDelete, viewMode, singularMode, onBlockFocus, linkRequest, newBlockRequest } = params;

    const sensors = useSensors(useSensor(MouseSensor), useSensor(TouchSensor));

    const _onAdd = React.useCallback(
      (node: NodeValueWithLinks, index?: number) => {
        newBlockRequest(node.kind, selectedNode => {
          const indexToUse = index === undefined ? value.length : index + 1;
          const nodeToAdd = selectedNode || node;
          onAdd(nodeToAdd, indexToUse);
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
                onMove(oldIndex, newIndex);
              }
            }}
          >
            <SortableContext items={value}>
              {value.map((currNode, index) => {
                return (
                  <div key={currNode.id} onMouseEnter={() => onBlockFocus(currNode)} onMouseLeave={() => onBlockFocus(null)}>
                    <NodeView
                      node={currNode}
                      onChange={node => onChange(node, index)}
                      onDuplicate={() => onDuplicate(index)}
                      onDelete={() => onDelete(index)}
                      onAdd={n => _onAdd(n, index)}
                      blocks={blocks}
                      onLink={linkRequest}
                      viewMode={viewMode}
                      singularMode={singularMode}
                    />
                  </div>
                );
              })}
            </SortableContext>
          </DndContext>
        </div>

        {!singularMode && !value.length && (
          <div>
            <BlocksMenu blocks={blocks} staticMode onSelect={_onAdd} />
          </div>
        )}
      </div>
    );
  };
}
