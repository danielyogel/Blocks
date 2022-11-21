import { observable } from 'mobx';
import { Observer } from 'mobx-react-lite';
import { InitEditor } from './index';
import './index.css';
import { TITLE, ABSTRACT, IMAGE, EMBED_CODE, BODY_SIMPLE } from './blocks';
import { nanoid } from 'nanoid';
import { unsafeDeleteAt, unsafeInsertAt } from './utils';
import { arrayMove } from '@dnd-kit/sortable';

const Editor = InitEditor({
  blocks: { TITLE, ABSTRACT, BODY: BODY_SIMPLE, IMAGE, EMBED_CODE }
});

export const DemoMobx = () => {
  type State = Parameters<typeof Editor>['0']['value'];

  const state = observable.box<State>([]);

  return (
    <div className='p-4 max-w-2xl mx-auto'>
      <Observer>
        {() => {
          return (
            <Editor
              value={state.get()}
              onChange={node => {
                state.set(state.get().map(n => (n.id === node.id ? node : n)));
              }}
              onAdd={(node, index) => {
                state.set(unsafeInsertAt(index, node, state.get()));
              }}
              onDelete={index => {
                state.set(unsafeDeleteAt(index, state.get()));
              }}
              onDuplicate={index => {
                state.set(unsafeInsertAt(index + 1, { ...state.get()[index], id: nanoid() }, state.get()));
              }}
              onMove={(oldIndex, newIndex) => {
                state.set(arrayMove(state.get(), oldIndex, newIndex));
              }}
              viewMode={false}
              singularMode={false}
              linkRequest={async id => {}}
              onBlockFocus={() => {}}
              newBlockRequest={(kind, next) => {
                if (kind === 'ABSTRACT') {
                  setTimeout(() => {
                    const n = { kind: 'ABSTRACT' as const, content: 'from outside', id: nanoid(), disabled: false, links: [] };
                    next(n);
                  }, 1000);
                } else {
                  next();
                }
              }}
            />
          );
        }}
      </Observer>
    </div>
  );
};
