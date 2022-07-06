import React, { Fragment } from 'react';
import { Transition } from '@headlessui/react';
import { DotsVerticalIcon } from '../';
import { useOutside } from '../../utils/useOutside';
import classNames from 'classnames';

type Item = {
  text: string;
  Icon?: React.FC;
  separator?: true;
  onClick: () => void;
};

type Params = {
  items: Array<Item>;
  children: React.ReactNode;
};

export function DropdownMenu({ items, children }: Params) {
  const [isOpen, setIsOpen] = React.useState(false);
  const [wasEntered, setWasEntered] = React.useState(false);

  const ref = React.useRef<HTMLDivElement>(null);

  const toggleOpen = React.useCallback(() => setIsOpen(isOpen => !isOpen), [isOpen]);
  const onMouseLeave = React.useCallback(() => wasEntered && setIsOpen(false), [wasEntered]);
  const onMouseEnteredDropdown = React.useCallback(() => setWasEntered(true), [setWasEntered]);

  React.useEffect(() => setWasEntered(false), [isOpen]);
  useOutside([ref], () => setIsOpen(false), [isOpen]);

  return (
    <div className='relative inline-block overflow-visible' onClick={toggleOpen} onMouseLeave={onMouseLeave} ref={ref}>
      <>{children}</>

      <Transition show={Boolean(isOpen)} as={Fragment}>
        <div className='absolute inset-0 z-30 top-6'>
          {!!isOpen && (
            <div
              className='py-1 w-32 bg-white relative z-30 mt-2 origin-top-right rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none'
              onMouseEnter={onMouseEnteredDropdown}
            >
              {items.map(i => {
                return (
                  <div key={i.text} className={classNames({ 'border-b border-gray-light': i.separator })}>
                    <button
                      onClick={i.onClick}
                      className={`group flex w-full items-center rounded-md px-2 py-2 text-sm capitalize text-left text-black opacity-70 hover:opacity-100`}
                    >
                      <span className='inline-block w-4 mr-1'>{i.Icon && <i.Icon />}</span>
                      <span>{i.text.toLowerCase().split('_').join(' ')}</span>
                    </button>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </Transition>
    </div>
  );
}
