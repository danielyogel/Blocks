import React from 'react';
import { unsafeUpdateAt, unsafeDeleteAt, unsafeInsertAt } from '../../utils';
import { BlocksMenu } from './internals/BlocksMenu';
import { SortableContext, arrayMove } from '@dnd-kit/sortable';
import { closestCenter, DndContext, MouseSensor, TouchSensor, useSensor, useSensors } from '@dnd-kit/core';
import { NodeView } from './internals/NodeView';
import { RichTextEditor, BaseModal, ImageIcon } from '../components';

const InitiatedRichText = (params: { content: string; onChange: (content: string) => void }) => (
  <RichTextEditor height='h-auto' value={params.content} onChange={params.onChange} uploader={() => Promise.resolve('sd')} />
);
export const Blocks = [
  {
    kind: 'TITLE',
    Icon: () => <div>Title</div>,
    initialValue: 'This is your title',
    View: InitiatedRichText
  },
  {
    kind: 'SUBTITLE',
    Icon: () => <div>Subtitle</div>,
    initialValue: 'This is your subtitle',
    View: InitiatedRichText
  },
  {
    kind: 'IMAGE',
    Icon: () => <div>Image</div>,
    initialValue: '',
    View: (params: { content: string; onChange: (content: string) => void }) => {
      const [isOpen, setIsOpen] = React.useState(false);
      return (
        <div>
          <div onClick={() => setIsOpen(true)} className='h-40 w-40'>
            {params.content ? (
              <img
                src={params.content || 'https://storage.googleapis.com/pp-local-dev-bucket/backoffice/Te_8E0P37IZoTZftguNqI_mono.jpeg'}
                alt={params.content}
                className='w-full object-contain'
              />
            ) : (
              <div>
                <ImageIcon onClick={() => {}} isDisabled={false} />
              </div>
            )}
          </div>
          <div>
            <BaseModal
              desktopMaxWidth='lg'
              isOpen={isOpen}
              onClose={() => setIsOpen(false)}
              renderContent={onClose => {
                if (window.top) {
                  window.top.onmessage = (e: MessageEvent<any>) => {
                    if (e.data.file) {
                      params.onChange(e.data.file.url);
                      onClose();
                    }
                  };
                } else {
                  window.onmessage = (e: MessageEvent<any>) => {
                    if (e.data.file) {
                      params.onChange(e.data.file.url);
                      onClose();
                    }
                  };
                }
                return (
                  <iframe
                    src='https://tebra-media-center-3the2xxjta-uc.a.run.app/'
                    frameBorder='0'
                    className='h-full w-full bg-black absolute top-0 left-0 right-0 bottom-0'
                  ></iframe>
                );
              }}
            />
          </div>
        </div>
      );
    }
  },
  {
    kind: 'VIDEO',
    Icon: () => <div>Video</div>,
    initialValue: '',
    View: InitiatedRichText
  },
  {
    kind: 'GALLERY',
    Icon: () => <div>Gallery</div>,
    initialValue: '',
    View: InitiatedRichText
  },
  {
    kind: 'EMBED_CODE',
    Icon: () => <div>Embed Code</div>,
    initialValue: '',
    View: InitiatedRichText
  },
  {
    kind: 'ABSTRACT',
    Icon: () => <div>Abstract</div>,
    initialValue: '',
    View: InitiatedRichText
  },
  {
    kind: 'DATA',
    Icon: () => <div>Data</div>,
    initialValue: '',
    View: InitiatedRichText
  },
  {
    kind: 'AUTHORS',
    Icon: () => <div>Authors</div>,
    initialValue: '',
    View: InitiatedRichText
  }
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
                <NodeView
                  key={currNode.id}
                  node={currNode}
                  onChange={node => onChange(unsafeUpdateAt(index, node, value))}
                  onDelete={() => onChange(unsafeDeleteAt(index, value))}
                  onAdd={node => onChange(unsafeInsertAt(index + 1, node, value))}
                />
              );
            })}
          </SortableContext>
        </DndContext>
      </div>

      <div>{!value.length && <BlocksMenu onSelect={node => onChange([...value, node])} />}</div>
    </div>
  );
}
