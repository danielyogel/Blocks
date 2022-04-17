import { Fragment, useRef } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { XIcon } from './icons';

export type Params = {
  isOpen: boolean;
  onClose: () => void;
  renderContent: (onClose: () => void) => React.ReactNode;
  desktopMaxWidth?: 'lg' | '2xl' | '4xl' | '5xl';
};

export function BaseModal({ isOpen, onClose, renderContent, desktopMaxWidth = 'lg' }: Params) {
  const cancelButtonRef = useRef(null);

  const desktopMaxWidthClasses = DESKTOP_MAX_WIDTH[desktopMaxWidth];

  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog as='div' className='fixed z-50 inset-0' initialFocus={cancelButtonRef} onClose={onClose}>
        <div className='p-0 min-h-screen text-center'>
          <Transition.Child
            as={Fragment}
            enter='ease-out duration-300'
            enterFrom='opacity-0'
            enterTo='opacity-100'
            leave='ease-in duration-200'
            leaveFrom='opacity-100'
            leaveTo='opacity-0'
          >
            <Dialog.Overlay className='fixed inset-0 bg-gray-dark bg-opacity-75 transition-opacity' />
          </Transition.Child>

          {/* This element is to trick the browser into centering the modal contents. */}
          <span className='hidden sm:inline-block sm:align-middle sm:h-screen' aria-hidden='true'>
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter='ease-out duration-300'
            enterFrom='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
            enterTo='opacity-100 translate-y-0 sm:scale-100'
            leave='ease-in duration-200'
            leaveFrom='opacity-100 translate-y-0 sm:scale-100'
            leaveTo='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
          >
            <div
              className={`inline-block align-bottom bg-black text-left overflow-hidden shadow-xl transform transition-all sm:my-8 ${desktopMaxWidthClasses} sm:align-middle sm:w-11/12 w-full relative h-screen sm:h-240 max-h-full sm:max-h-90vh`}
            >
              <div className='max-h-full overflow-y-auto'>{renderContent(onClose)}</div>

              <div className='text-gray-dark absolute top-2 right-2 z-50 w-10'>
                <XIcon onClick={onClose} mode='X' isDisabled={false} color='white' />
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
}

//
// CONSTANTS
//

const DESKTOP_MAX_WIDTH = {
  lg: 'sm:max-w-lg',
  '2xl': 'sm:max-w-2xl',
  '4xl': 'sm:max-w-4xl',
  '5xl': 'sm:max-w-5xl'
};
