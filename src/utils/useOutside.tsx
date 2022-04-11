import React from 'react';

export function useOutside(refs: React.RefObject<HTMLDivElement>[], fn: () => void, deps: any) {
  React.useEffect(() => {
    function handleClickOutside(event: any) {
      if (!refs.find(ref => ref.current && ref.current.contains(event.target))) {
        fn();
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [...deps, ...refs]);
}
