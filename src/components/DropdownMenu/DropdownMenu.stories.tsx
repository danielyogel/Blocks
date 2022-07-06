import React from 'react';
import { DropdownMenu } from './';
import '../../index.css';
import { DotsVerticalIcon } from '../icons';

export const Demo = () => {
  return (
    <div className='p-20'>
      <DropdownMenu
        items={[
          { text: 'Body', onClick: () => console.log('body clicked') },
          { text: 'Header', onClick: () => console.log('header clicked') }
        ]}
      >
        <div className='w-4 bg-opacity-20 text-sm font-medium focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75'>
          <DotsVerticalIcon />
        </div>
      </DropdownMenu>
    </div>
  );
};
