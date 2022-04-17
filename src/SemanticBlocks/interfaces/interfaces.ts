import { string } from 'fp-ts';

function InitEditor<K extends string, Content, Extention extends { kind: K; content: Content }>({ extentions: exts }: { extentions: Extention[] }) {
  return function ({ blocks }: { blocks: Array<Extention> }) {
    console.log(blocks);
  };
}

//
//  A
//

const editor = InitEditor({
  extentions: [
    { kind: 'one', content: 'd' },
    { kind: 'two', content: 3 }
  ]
});

editor({
  blocks: [
    { kind: 'one', content: 's' },
    { kind: 'one', content: 's' },
    { kind: 'one', content: 's' },
    { kind: 'one', content: 'sdsd' },
    { kind: 'two', content: 3 }
  ]
});

//
// B
//

// function InitEditorRecord<K extends string, V extends any, E extends { key: K; content: V }>({ extentions }: { extentions: Extention[] }) {
//   type Block = { View: E['key'] };
//   return function ({ blocks }: { blocks: Array<{ id: string; kind: Block['kind']; content: Block['content'] }> }) {
//     console.log(blocks);
//   };
// }

// const editorR = InitEditorRecord({
//   extentions: [
//     { kind: 'one', content: 'd' },
//     { kind: 'two', content: 5 }
//   ]
// });

// editorR({
//   blocks: [
//     { kind: 'one', content: 's', id: 'd', View: v => null },
//     { kind: 'two', content: 3, id: 's', View: v => null }
//   ]
// });
