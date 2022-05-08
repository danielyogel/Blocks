import React from 'react';

export type Block<V> = {
  initialValue: V;
  Icon: React.FC;
  convertString: null | ((value: V) => string);
  View: React.FC<{ content: V; onChange: (content: V) => void }>;
};

export type InferBlockValue<F> = F extends Block<infer V> ? V : never;
