import React from 'react';
import { unsafeUpdateAt, unsafeDeleteAt, unsafeInsertAt } from '../utils';
import { BlocksMenu } from './internals/BlocksMenu';
import { SortableContext, arrayMove } from '@dnd-kit/sortable';
import { closestCenter, DndContext, MouseSensor, TouchSensor, useSensor, useSensors } from '@dnd-kit/core';
import { NodeView } from './internals/NodeView';
import { Blocks } from './Blocks';
import { HTMLIcon } from '../components';
import { blocksToHTML } from '../convertors';
import { jsPDF } from 'jspdf';

export type NodeValue = {
  id: string;
  kind: typeof Blocks[number]['kind'];
  content: string;
};

type Params = {
  value: Array<NodeValue>;
  onChange: React.Dispatch<React.SetStateAction<NodeValue[]>>;
};

export function SemanticBlocks({ value, onChange }: Params) {
  const sensors = useSensors(useSensor(MouseSensor), useSensor(TouchSensor));

  return (
    <div>
      {/* <div className='mb-6 ml-2 flex justify-start items-center'> */}
      <input
        type='file'
        id=''
        onChange={async e => {
          const file = e.target.files?.[0];
          if (file) {
            console.log(file);
            // const result = await fetch('http://api.convertio.co/convert', {
            //   method: 'POST',
            //   body: JSON.stringify({
            //     file: 'https://bitcoin.org/bitcoin.pdf',
            //     input: 'url',
            //     apikey: '8bbfdad646f37adfb3b9f996312b87e9',
            //     outputformat: 'HTML'
            //   })
            // });
            // const r = await result.json();
            // const ID = r?.data.id;
            // console.log({ id: ID, r });

            const resultA = await fetch(`https://api.convertio.co/convert/${'253e1463920b08391853186a1841b20c'}/status`, { method: 'GET' });
            console.log({ resultA: await resultA.json() });

            const resultB = await fetch(`http://api.convertio.co/convert/${'253e1463920b08391853186a1841b20c'}/dl`, { method: 'GET' });
            const rrr = await resultB.json();
            console.log({ resultB: rrr });

            const htmlfile = atob(rrr.data.content);
            onChange([{ id: 'sdsdsddg', kind: 'BODY', content: htmlfile }]);
          }
        }}
        accept='.pdf'
      />
      {/* </div> */}
      <div>
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
}
