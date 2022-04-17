import { expectType } from 'tsd';

// type FunctionReturnType<T> = T extends (...args: any) => infer R ? R : T;

// function init<Ext extends [string, any]>(extentions: Record<Kind, Extention>) {
//   type AppPermissions = {
//     [kind in keyof typeof extentions]: { kind: kind; value: Parameters<typeof extentions[kind]['Redner']>[0] };
//   };

//   return function (v: Array<AppPermissions[Kind]>) {};
// }

// init({ header: { Redner: (v: string) => null }, matrix: { Redner: (v: number) => null } })([
//   { kind: 'header', value: '' },
//   { kind: 'header', value: '' },
//   { kind: 'matrix', value: 3 }
// ]);

function InitEditor<K extends string, Content, Extention extends { kind: K; content: Content }>({ extentions }: { extentions: Extention[] }) {
  type Values = {
    [key in keyof typeof extentions]: { value: typeof extentions[key] };
  };

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
