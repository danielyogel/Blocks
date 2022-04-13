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
    <div className='flex items-center z-20 overflow-visible relative' ref={ref}>
      <div className='grow-0 shrink-0 w-20'>
        <div className='w-10'>
          <XIcon
            mode={isOpen ? 'X' : 'PLUS'}
            isDisabled={false}
            color='black'
            onClick={() => {
              setIsOpen(!isOpen);
            }}
          />
        </div>
      </div>
      <div className='grow relative z-20 h-50'>
        {!isOpen && (
          <div className={classNames('bg-white absolute top-1/2 left-0 w-200')}>
            <div className={classNames('border-b')} />
          </div>
        )}

        {isOpen && (
          <div className={classNames('absolute top-0 z-10 bg-white shadow h-50')}>
            {Blocks.map(b => {
              return (
                <div
                  key={b.kind}
                  className='inline-flex cursor-pointer bg-gray w-24 h-24 items-center justify-center mr-2 last:mr-0 mt-2 text-sm'
                  onClick={() => {
                    const newValue = { kind: b.kind, id: nanoid(), content: b.initialValue };
                    onSelect(newValue);
                    setIsOpen(!isOpen);
                  }}
                >
                  <b.Icon />
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
