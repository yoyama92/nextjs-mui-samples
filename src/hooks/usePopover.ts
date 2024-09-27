import { type MutableRefObject, useCallback, useRef, useState } from "react";

type PopoverController<T> = {
  anchorRef: MutableRefObject<T | null>;
  handleOpen: () => void;
  handleClose: () => void;
  open: boolean;
};

export const usePopover = <
  T extends HTMLElement = HTMLElement,
>(): PopoverController<T> => {
  const anchorRef = useRef<T>(null);
  const [open, setOpen] = useState<boolean>(false);

  const handleOpen = useCallback(() => {
    setOpen(true);
  }, []);

  const handleClose = useCallback(() => {
    setOpen(false);
  }, []);

  return { anchorRef, handleClose, handleOpen, open };
};
