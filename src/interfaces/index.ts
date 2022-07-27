import React from 'react';

export type Block<V> = {
  initialValue: V;
  Icon: React.FC;
  View: React.FC<{ content: V; onChange: (content: V) => void; viewMode: boolean }>;
  _toString: (value: V) => string;
  _fromString: (text: string) => V;
};

export type InferBlockValue<F> = F extends Block<infer V> ? V : never;

export type NodeValueType<K = any, C = any, N = any> = { id: string; kind: K; content: C; disabled: boolean; links: Array<N[]> };
