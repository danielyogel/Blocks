import { TrashIcon as Icon } from '@heroicons/react/outline';
import classNames from 'classnames';

type Params = {
  onClick?: () => void;
  isDisabled?: boolean;
};

export function TrashIcon({ onClick, isDisabled }: Params) {
  return (
    <div
      className={classNames('cursor-pointer opacity-80 hover:opacity-100 duration-300', {
        'pointer-events-none': Boolean(isDisabled)
      })}
      onClick={onClick}
    >
      <Icon className={`cursor-pointer stroke-current`} stroke='current' />
    </div>
  );
}
