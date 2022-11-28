import { useCallback } from 'react';
import { Except } from 'type-fest';
import { SortableContext } from '@dnd-kit/sortable';
import { closestCenter, DndContext, MouseSensor, TouchSensor, useSensor, useSensors } from '@dnd-kit/core';
import { BlocksMenu } from './internals/BlocksMenu';
import { NodeView } from './internals/NodeView';
import { Block, InferBlockValue, NodeValueType } from '../interfaces';

type InitParams<K extends string, Blocks extends Record<K, Block<any>>> = { blocks: Blocks };

export function Init<K extends string, B extends Record<K, Block<any>>>({ blocks }: InitParams<K, B>) {
  type NodeValue = {
    [key in keyof typeof blocks]: NodeValueType<key, InferBlockValue<typeof blocks[key]>>;
  }[keyof typeof blocks];

  type NodeValueWithLinks = Except<NodeValue, 'links'> & { links: Array<Except<NodeValue, 'links'>[]> };

  type EditorParams = {
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
  };

  return function Editor(params: EditorParams) {
    const { value, onChange, onAdd, onMove, onDuplicate, onDelete, viewMode, singularMode, onBlockFocus, linkRequest } = params;

    const sensors = useSensors(useSensor(MouseSensor), useSensor(TouchSensor));

    const _onAdd = useCallback(
      (node: NodeValueWithLinks, index?: number) => onAdd(node, index === undefined ? value.length : index + 1),
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
                      onAdd={block => _onAdd(block, index)}
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
