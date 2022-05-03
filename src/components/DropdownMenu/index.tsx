import { Fragment, useEffect, useRef, useState } from 'react';
import { Menu, Transition } from '@headlessui/react';
import { DotsVerticalIcon } from '../';

type Params = {
  items: Array<{
    text: string;
    onClick: () => void;
  }>;
};

export function DropdownMenu({ items }: Params) {
  return (
    <div className='absolute top-0 right-0  w-56 text-right'>
      <Menu as='div' className='relative inline-block text-left'>
        <div className='w-5'>
          <Menu.Button className='inline-flex w-full justify-center rounded-md bg-opacity-20 text-gray-dark  text-sm font-medium focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75'>
            <DotsVerticalIcon />
          </Menu.Button>
        </div>

        <Transition
          as={Fragment}
          enter='transition ease-out duration-100'
          enterFrom='transform opacity-0 scale-95'
          enterTo='transform opacity-100 scale-100'
          leave='transition ease-in duration-75'
          leaveFrom='transform opacity-100 scale-100'
          leaveTo='transform opacity-0 scale-95'
        >
          <Menu.Items className='absolute right-0 mt-2 w-28 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none'>
            <div className='px-1 py-1 '>
              {items.map(i => {
                return (
                  <Menu.Item key={i.text}>
                    {({ active }) => (
                      <button
                        onClick={i.onClick}
                        className={`${
                          active ? 'bg-gray text-white' : 'text-gray-darkest'
                        } group flex w-full items-center rounded-md px-2 py-2 text-sm capitalize text-left`}
                      >
                        {i.text.toLowerCase().split('_').join(' ')}
                      </button>
                    )}
                  </Menu.Item>
                );
              })}
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  );
}
