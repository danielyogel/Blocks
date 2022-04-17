import { PhotographIcon as Icon } from '@heroicons/react/solid';
import classNames from 'classnames';

type Params = {
  onClick: () => void;
  isDisabled: boolean;
};

export function ImageIcon({ onClick, isDisabled }: Params) {
  return (
    <div
      className={classNames('rounded-full p-2 cursor-pointer opacity-80 hover:opacity-100 duration-300', {
        'pointer-events-none': Boolean(isDisabled)
      })}
      onClick={onClick}
    >
      <Icon strokeWidth={0.1} className={`cursor-pointer stroke-current`} stroke='current' />
    </div>
  );
}
