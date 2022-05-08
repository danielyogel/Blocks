import React from 'react';

export const FOOTER: {
  initialValue: string;
  Icon: () => JSX.Element;
  convertString: (v: any) => any;
  View: ({ content }: { content: any; onChange: (content: any) => void }) => JSX.Element;
} = { initialValue: 'a', Icon: () => <div>footer</div>, convertString: v => v, View: ({ content }) => <div>{content}</div> };
