import { Block } from './Block';

export type InferBlockValue<F> = F extends Block<infer V> ? V : never;
