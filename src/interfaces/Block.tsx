import React from 'react';

export type Block<V> = {
  initialValue: V;
  Icon: React.FC;
  View: React.FC<{ content: V; onChange: (content: V) => void; viewMode: boolean }>;
  stringify: (value: V) => string;
  parse: (text: string) => V;
};
