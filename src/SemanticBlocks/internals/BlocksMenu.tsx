import React from 'react';
import { nanoid } from 'nanoid';
import { NodeValue } from '../..';
import { Blocks } from '../Blocks';
import { XIcon } from '../../components/icons';
import classNames from 'classnames';
import { useOutside } from '../../utils/useOutside';
import { motion, AnimatePresence } from 'framer-motion';

type Params = {
  onSelect: (node: NodeValue) => void;
  staticMode: boolean;
};

export const BlocksMenu = ({ onSelect, staticMode }: Params) => {
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
    <div
      className={classNames('flex items-center z-20 hover:opacity-100 relative transition-opacity duration-200', { 'opacity-0': !staticMode })}
      style={{ minHeight: '20px' }}
      ref={ref}
      // onMouseLeave={() => setIsOpen(false)}
    >
      <div className='grow-0 shrink-0 w-20'>
        <div className='w-10 absolute top-1/2 -translate-y-1/2'>
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
      <div className='grow relative z-20'>
        {!isOpen && (
          <div className={classNames('bg-white top-1/2 left-0 w-200')}>
            <div className='border-b' />
          </div>
        )}

        <AnimatePresence>
          {isOpen && (
            <motion.div initial={{ height: 0 }} animate={{ height: 100 }} exit={{ height: 0 }} className='top-0 z-10 bg-white my-8 overflow-hidden'>
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
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
