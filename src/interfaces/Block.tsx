import React from 'react';

export type Block<V> = {
  initialValue: V;
  Icon: React.FC;
  View: React.FC<{ content: V; onChange: (content: V) => void; viewMode: boolean }>;
  _toString: (value: V) => string;
  _fromString: (text: string) => V;
};
