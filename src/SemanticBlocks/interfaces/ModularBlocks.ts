// TEST

type InferMy<F> = F extends (args: infer V) => any ? V : never;

export function init<K extends string, O extends Record<K, (v: any) => void>>(options: O) {
  type OptionsType = typeof options;
  type UnionedOptions = { [key in keyof OptionsType]: { kind: key; val: InferMy<OptionsType[key]> } }[keyof OptionsType];

  return function (value: UnionedOptions[]) {
    return true;
  };
}

const editor = init({
  abstract: (val: string) => {},
  footer: (val: number) => {}
});

editor([
  { kind: 'footer', val: 3 },
  { kind: 'abstract', val: 'sd' }
]);
