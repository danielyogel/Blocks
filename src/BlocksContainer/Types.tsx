import React from 'react';

export type Block<V> = {
  initialValue: V;
  Icon: React.FC;
  View: React.FC<{ content: V; onChange: (content: V) => void }>;
  stringify: (value: V) => string;
  parse: (text: string) => V;
};

export type InferBlockValue<F> = F extends Block<infer V> ? V : never;
