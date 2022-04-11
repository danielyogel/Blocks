import { XIcon as Icon } from '@heroicons/react/solid';
import classNames from 'classnames';

type Params = {
  onClick: () => void;
  isDisabled: boolean;
  mode: 'PLUS' | 'X';
};

export function XIcon({ onClick, isDisabled, mode }: Params) {
  return (
    <div
      className={classNames('rounded-full bg-gray-light w-10 p-2 cursor-pointer opacity-80 hover:opacity-100 duration-300', {
        'pointer-events-none': Boolean(isDisabled)
      })}
      onClick={onClick}
    >
      <Icon
        strokeWidth={0.1}
        className={classNames(`cursor-pointer stroke-current text-gray-darkest transition-transform duration-300`, {
          'rotate-45': mode === 'PLUS',
          'rotate-180': mode === 'X'
        })}
        stroke='current'
      />
    </div>
  );
}
