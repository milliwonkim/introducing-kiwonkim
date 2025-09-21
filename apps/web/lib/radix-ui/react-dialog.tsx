import {
  ComponentPropsWithoutRef,
  ElementRef,
  ForwardedRef,
  ReactNode,
  createContext,
  forwardRef,
  useCallback,
  useContext,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
} from "react";
import { createPortal } from "react-dom";

interface DialogContextValue {
  open: boolean;
  setOpen: (nextOpen: boolean) => void;
  titleId?: string;
  descriptionId?: string;
  setTitleId: (id?: string) => void;
  setDescriptionId: (id?: string) => void;
}

const DialogContext = createContext<DialogContextValue | null>(null);

function useDialogContext(component: string): DialogContextValue {
  const context = useContext(DialogContext);
  if (!context) {
    throw new Error(`${component} must be used within <Dialog.Root />`);
  }
  return context;
}

function setForwardedRef<T>(ref: ForwardedRef<T>, value: T) {
  if (typeof ref === "function") {
    ref(value);
  } else if (ref) {
    ref.current = value;
  }
}

export interface DialogRootProps {
  children?: ReactNode;
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
}

const DialogRoot = ({ children, open, defaultOpen = false, onOpenChange }: DialogRootProps) => {
  const [uncontrolledOpen, setUncontrolledOpen] = useState(defaultOpen);
  const [titleId, setTitleId] = useState<string | undefined>();
  const [descriptionId, setDescriptionId] = useState<string | undefined>();

  const isControlled = open !== undefined;
  const currentOpen = isControlled ? open : uncontrolledOpen;

  const setOpen = useCallback(
    (nextOpen: boolean) => {
      if (!isControlled) {
        setUncontrolledOpen(nextOpen);
      }
      onOpenChange?.(nextOpen);
    },
    [isControlled, onOpenChange],
  );

  const value = useMemo(
    () => ({
      open: currentOpen,
      setOpen,
      titleId,
      descriptionId,
      setTitleId,
      setDescriptionId,
    }),
    [currentOpen, setOpen, titleId, descriptionId],
  );

  return <DialogContext.Provider value={value}>{children}</DialogContext.Provider>;
};

interface DialogPortalProps {
  children?: ReactNode;
}

const DialogPortal = ({ children }: DialogPortalProps) => {
  const { open } = useDialogContext("Dialog.Portal");

  if (!open) {
    return null;
  }

  if (typeof document === "undefined") {
    return <>{children}</>;
  }

  return createPortal(children, document.body);
};

export type DialogOverlayProps = ComponentPropsWithoutRef<"div">;

const DialogOverlay = forwardRef<ElementRef<"div">, DialogOverlayProps>(
  ({ onClick, ...props }, ref) => {
    const { open, setOpen } = useDialogContext("Dialog.Overlay");

    if (!open) {
      return null;
    }

    return (
      <div
        {...props}
        ref={ref}
        data-state={open ? "open" : "closed"}
        onClick={(event) => {
          onClick?.(event);
          if (!event.defaultPrevented) {
            setOpen(false);
          }
        }}
      />
    );
  },
);

DialogOverlay.displayName = "DialogOverlay";

export type DialogContentProps = ComponentPropsWithoutRef<"div">;

const DialogContent = forwardRef<ElementRef<"div">, DialogContentProps>(
  ({ children, tabIndex, onKeyDown, ...props }, ref) => {
    const { open, setOpen, titleId, descriptionId } = useDialogContext("Dialog.Content");
    const contentRef = useRef<ElementRef<"div"> | null>(null);

    useEffect(() => {
      if (!open) {
        return;
      }

      const node = contentRef.current;
      const previouslyFocused = document.activeElement as HTMLElement | null;

      if (node && typeof node.focus === "function") {
        node.focus({ preventScroll: true });
      }

      const handleKeyDown = (event: KeyboardEvent) => {
        if (event.key === "Escape") {
          event.stopPropagation();
          setOpen(false);
        }
      };

      const previousOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      document.addEventListener("keydown", handleKeyDown);

      return () => {
        document.body.style.overflow = previousOverflow;
        document.removeEventListener("keydown", handleKeyDown);
        previouslyFocused?.focus?.({ preventScroll: true });
      };
    }, [open, setOpen]);

    if (!open) {
      return null;
    }

    return (
      <div
        {...props}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        aria-describedby={descriptionId}
        tabIndex={tabIndex ?? -1}
        data-state={open ? "open" : "closed"}
        ref={(node) => {
          contentRef.current = node;
          setForwardedRef(ref, node);
        }}
        onKeyDown={(event) => {
          if (event.key === "Escape") {
            event.stopPropagation();
            setOpen(false);
          }
          onKeyDown?.(event);
        }}
      >
        {children}
      </div>
    );
  },
);

DialogContent.displayName = "DialogContent";

export type DialogTitleProps = ComponentPropsWithoutRef<"h2">;

const DialogTitle = forwardRef<ElementRef<"h2">, DialogTitleProps>(({ id, ...props }, ref) => {
  const { setTitleId } = useDialogContext("Dialog.Title");
  const autoId = useId();
  const titleId = id ?? autoId;

  useEffect(() => {
    setTitleId(titleId);
    return () => {
      setTitleId(undefined);
    };
  }, [setTitleId, titleId]);

  return <h2 {...props} id={titleId} ref={ref} />;
});

DialogTitle.displayName = "DialogTitle";

export type DialogDescriptionProps = ComponentPropsWithoutRef<"p">;

const DialogDescription = forwardRef<ElementRef<"p">, DialogDescriptionProps>(
  ({ id, ...props }, ref) => {
    const { setDescriptionId } = useDialogContext("Dialog.Description");
    const autoId = useId();
    const descriptionId = id ?? autoId;

    useEffect(() => {
      setDescriptionId(descriptionId);
      return () => {
        setDescriptionId(undefined);
      };
    }, [setDescriptionId, descriptionId]);

    return <p {...props} id={descriptionId} ref={ref} />;
  },
);

DialogDescription.displayName = "DialogDescription";

export type DialogCloseProps = ComponentPropsWithoutRef<"button">;

const DialogClose = forwardRef<ElementRef<"button">, DialogCloseProps>(
  ({ onClick, type = "button", ...props }, ref) => {
    const { setOpen } = useDialogContext("Dialog.Close");

    return (
      <button
        {...props}
        ref={ref}
        type={type}
        onClick={(event) => {
          onClick?.(event);
          if (!event.defaultPrevented) {
            setOpen(false);
          }
        }}
      />
    );
  },
);

DialogClose.displayName = "DialogClose";

export type DialogTriggerProps = ComponentPropsWithoutRef<"button">;

const DialogTrigger = forwardRef<ElementRef<"button">, DialogTriggerProps>(
  ({ onClick, type = "button", ...props }, ref) => {
    const { setOpen } = useDialogContext("Dialog.Trigger");

    return (
      <button
        {...props}
        ref={ref}
        type={type}
        onClick={(event) => {
          onClick?.(event);
          if (!event.defaultPrevented) {
            setOpen(true);
          }
        }}
      />
    );
  },
);

DialogTrigger.displayName = "DialogTrigger";

export {
  DialogRoot as Root,
  DialogPortal as Portal,
  DialogOverlay as Overlay,
  DialogContent as Content,
  DialogTitle as Title,
  DialogDescription as Description,
  DialogClose as Close,
  DialogTrigger as Trigger,
};
