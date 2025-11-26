import { useState, useCallback, useRef } from 'react';

export function usePopover() {
  const [open, setOpen] = useState(false);
  const anchorEl = useRef<HTMLElement | null>(null);

  const onOpen = useCallback((event?: React.MouseEvent<HTMLElement>) => {
    if (event?.currentTarget) {
      anchorEl.current = event.currentTarget;
    }
    setOpen(true);
  }, []);

  const onClose = useCallback(() => {
    setOpen(false);
    anchorEl.current = null;
  }, []);

  return {
    open,
    anchorEl: anchorEl.current,
    onOpen,
    onClose,
  };
}

