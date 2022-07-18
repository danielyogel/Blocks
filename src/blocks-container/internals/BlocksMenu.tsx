import React from 'react';
import { nanoid } from 'nanoid';
import { XIcon } from '../../components/icons';
import classNames from 'classnames';
import { useOutside } from '../../utils/useOutside';
import { motion, AnimatePresence } from 'framer-motion';
import { Block } from '../../interfaces/Block';

type NodeValue = { id: string; kind: any; content: any; disabled: boolean };

type Params = {
  onSelect: (node: NodeValue) => void;
  staticMode: boolean;
  blocks: Record<string, Block<any>>;
};

export function BlocksMenu({ blocks, onSelect, staticMode }: Params) {
  const BLOCKS_WITH_KIND = Object.entries(blocks).map(([kind, node]) => ({ ...node, kind }));

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
      className={classNames('z-20 hover:opacity-100 relative transition-opacity duration-200 py-5', { 'opacity-0': !staticMode })}
      style={{ minHeight: '40px' }}
      ref={ref}
    >
      <AnimatePresence>{!isOpen && <div className='border-b-2 border-gray ml-20' />}</AnimatePresence>
      <div className={classNames('w-10 absolute top-0 left-2 transition-transform duration-200 ease-cubic', { 'translate-y-12': isOpen })}>
        <XIcon
          mode={isOpen ? 'X' : 'PLUS'}
          isDisabled={false}
          color='black'
          onClick={() => {
            setIsOpen(!isOpen);
          }}
        />
      </div>
      <div className='grow relative z-20 ml-20'>
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 100, opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ ease: 'easeInOut' }}
            >
              {BLOCKS_WITH_KIND.map(b => {
                return (
                  <div
                    key={b.kind}
                    className='inline-flex cursor-pointer bg-gray w-24 h-24 items-center justify-center mr-2 mb-2 last:mr-0 text-sm flex-wrap'
                    onClick={() => {
                      const newValue = { kind: b.kind, id: nanoid(), content: b.initialValue, disabled: false };
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
}
