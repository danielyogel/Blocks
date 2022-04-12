import React from 'react';
import { nanoid } from 'nanoid';
import { NodeValue, Blocks } from '../index';
import { XIcon } from '../../components/icons';
import classNames from 'classnames';
import { useOutside } from '../../../utils/useOutside';

export const BlocksMenu = ({ onSelect }: { onSelect: (node: NodeValue) => void }) => {
  const [isOpen, setIsOpen] = React.useState(false);

  const ref = React.useRef<HTMLDivElement>(null);

  useOutside(
    [ref],
    () => {
      setIsOpen(false);
    },
    [isOpen, setIsOpen]
  );

  return (
    <div className='flex items-center' ref={ref}>
      <div className='grow-0 shrink-0 w-20'>
        <XIcon
          mode={isOpen ? 'X' : 'PLUS'}
          isDisabled={false}
          color='black'
          onClick={() => {
            setIsOpen(isopen => !isOpen);
          }}
        />
      </div>
      <div className={classNames('grow relative')}>
        <div className={classNames('duration-300 delay-200 ease-cubic transition-opacity', { 'opacity-0': isOpen, 'opacity-100': !isOpen })}>
          <div className={classNames('absolute top-1/2 left-0 w-200 opacity-50', { 'border-b': !isOpen, hidden: isOpen })} />
        </div>
        <div className={classNames('duration-300 delay-200 ease-cubic transition-opacity', { 'opacity-0': !isOpen, 'opacity-100': isOpen })}>
          <>
            {Blocks.map(b => {
              return (
                <div
                  key={b.kind}
                  className='inline-flex cursor-pointer bg-gray w-24 h-24 items-center justify-center mr-2 mt-2 text-sm hover:opacity-100 opacity-80 duration-200 delay-150 transition-opacity'
                  onClick={() => {
                    const newValue = { kind: b.kind, id: nanoid(), content: b.initialValue };
                    onSelect(newValue);
                    setIsOpen(isopen => !isOpen);
                  }}
                >
                  <b.Icon />
                </div>
              );
            })}
          </>
        </div>
      </div>
    </div>
  );
};
