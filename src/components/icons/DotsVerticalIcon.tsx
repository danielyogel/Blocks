import { DotsVerticalIcon as Icon } from '@heroicons/react/solid';
import classNames from 'classnames';

type Params = {
  onClick?: () => void;
  isDisabled?: boolean;
};

export function DotsVerticalIcon({ onClick, isDisabled }: Params) {
  return (
    <div className={classNames('cursor-pointer w-full', { 'pointer-events-none': Boolean(isDisabled) })} onClick={onClick}>
      <Icon className='fill-current' />
    </div>
  );
}
