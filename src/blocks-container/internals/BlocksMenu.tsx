import React, { useCallback } from 'react';
import { nanoid } from 'nanoid';
import { XIcon } from '../../components/icons';
import classNames from 'classnames';
import { useOutside } from '../../utils/useOutside';
import { motion, AnimatePresence } from 'framer-motion';
import { Block, NodeValueType } from '../../interfaces';
import { map, ObjectEnteries, pipe, stringToColour } from '../../utils';

type Params<K extends string, N extends NodeValueType<K>> = {
  onSelect: (node: N) => void;
  staticMode: boolean;
  blocks: Record<K, Block<N>>;
};

export function BlocksMenu<K extends string, N extends NodeValueType>({ blocks, onSelect, staticMode }: Params<K, N>) {
  const BLOCKS_WITH_KIND = ObjectEnteries(blocks).map(([kind, node]) => ({ ...node, kind }));

  const [isOpen, setIsOpen] = React.useState(false);

  const close = useCallback(() => {
    isOpen && setIsOpen(false);
  }, [isOpen]);

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
      onMouseLeave={close}
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
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ ease: 'easeInOut' }}
            >
              {pipe(
                BLOCKS_WITH_KIND,
                map(b => {
                  return (
                    <div
                      key={b.kind}
                      className='inline-flex cursor-pointer bg-gray w-24 h-24 items-center justify-center mr-2 mb-2 last:mr-0 text-sm flex-wrap text-white'
                      style={{ backgroundColor: stringToColour(b.kind) }}
                      onClick={() => {
                        const newValue: NodeValueType = { kind: b.kind, id: nanoid(), content: b.initialValue, disabled: false, links: [] };
                        onSelect(newValue as any);
                        setIsOpen(!isOpen);
                      }}
                    >
                      <b.Icon />
                    </div>
                  );
                })
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
