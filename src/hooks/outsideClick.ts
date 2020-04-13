import * as React from 'react';

export function useOutsideClickHandler(callback: () => void, deps?: any[]) {
  const containerRef = React.useRef(null);

  React.useEffect(() => {
    if (containerRef.current) {
      window.addEventListener('mousedown', (event: MouseEvent) => {
        if (!containerRef.current.contains(event.target)) {
          callback();
        }
      });
      window.addEventListener('keydown', (event: KeyboardEvent) => {
        if (event.key === 'Escape') {
          callback();
        }
      });
    }
    return () => {
      if (containerRef.current) {
        window.removeEventListener('mousedown', (event: MouseEvent) => {
          if (!containerRef.current.contains(event.target)) {
            callback();
          }
        });
      }
      window.removeEventListener('keydown', (event: KeyboardEvent) => {
        if (event.key === 'Escape') {
          callback();
        }
      });
    };
  }, [deps]);
  return containerRef;
}
