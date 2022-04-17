import { XIcon as Icon } from '@heroicons/react/solid';
import classNames from 'classnames';

type Params = {
  onClick: () => void;
  isDisabled: boolean;
  mode: 'PLUS' | 'X';
  color: 'white' | 'black';
};

export function XIcon({ onClick, isDisabled, mode, color }: Params) {
  return (
    <div
      className={classNames('rounded-full  p-2 cursor-pointer opacity-80 hover:opacity-100 duration-300', {
        'pointer-events-none': Boolean(isDisabled),
        'bg-gray-light': color === 'black',
        'text-gray-dark': color === 'white',
        'text-gray-darkest': color === 'black'
      })}
      onClick={onClick}
    >
      <Icon
        strokeWidth={0.1}
        className={classNames(`cursor-pointer stroke-current transition-transform duration-300`, {
          'rotate-45': mode === 'PLUS',
          'rotate-180': mode === 'X'
        })}
        stroke='current'
      />
    </div>
  );
}

export function XIconClear({ onClick, isDisabled, mode, color }: Params) {
  return (
    <div
      className={classNames('cursor-pointer opacity-80 hover:opacity-100 duration-300', {
        'pointer-events-none': Boolean(isDisabled),
        'text-gray-dark': color === 'white',
        'text-gray-darkest': color === 'black'
      })}
      onClick={onClick}
    >
      <Icon
        strokeWidth={0.1}
        className={classNames(`cursor-pointer stroke-current transition-transform duration-300`, {
          'rotate-45': mode === 'PLUS',
          'rotate-180': mode === 'X'
        })}
        stroke='current'
      />
    </div>
  );
}
