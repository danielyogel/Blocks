import React from 'react';
import { DropdownMenu } from './';
import '../../index.css';

export const Demo = () => {
  return (
    <div className='p-20'>
      <DropdownMenu
        items={[
          { text: 'Body', onClick: () => console.log('body clicked') },
          { text: 'Header', onClick: () => console.log('header clicked') }
        ]}
      />
    </div>
  );
};
