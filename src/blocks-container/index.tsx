import React, { CSSProperties } from 'react';
import { nanoid } from 'nanoid';
import { createPortal } from 'react-dom';
import { Except } from 'type-fest';
import { useDebounce, useToggle } from 'ahooks';
import { SortableContext, arrayMove } from '@dnd-kit/sortable';
import { closestCenter, DndContext, MouseSensor, TouchSensor, useSensor, useSensors } from '@dnd-kit/core';
import { AnimatePresence, motion } from 'framer-motion';
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
    onChange: React.Dispatch<React.SetStateAction<NodeValueWithLinks[]>>;
    viewMode: boolean;
    singularMode: boolean;
    renderLink: (link: NodeValue[]) => React.ReactNode;
    newBlockRequest: (kind: NodeValueWithLinks['kind'], next: (n?: NodeValueWithLinks) => void) => void;
    linkRequest: (blockId: string) => Promise<void>;
    linksCSS: CSSProperties;
  };

  return function Editor({ value, onChange, viewMode, singularMode, renderLink, linkRequest, newBlockRequest, linksCSS }: _Params) {
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
                const [isFocused, { setLeft, setRight }] = useToggle(false);
                const isFocusedDebounced = useDebounce(isFocused, { wait: 400 });

                return (
                  <div key={currNode.id} onMouseEnter={setRight} onMouseLeave={setLeft}>
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

                    {createPortal(
                      <AnimatePresence>
                        {isFocusedDebounced && (
                          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
                            <div className='grid grid-cols-1 lg:grid-cols-2 gap-2 lg:gap-3 fixed' style={{ ...linksCSS }}>
                              {currNode.links.map((link, i) => {
                                return <div key={i}>{renderLink(link)}</div>;
                              })}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>,
                      document.body
                    )}
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
