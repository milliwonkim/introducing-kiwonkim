"use client";

import {
  cloneElement,
  createContext,
  forwardRef,
  isValidElement,
  useCallback,
  useContext,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
  type ComponentPropsWithoutRef,
  type ElementRef,
  type MutableRefObject,
  type ReactElement,
  type ReactNode,
  type Ref,
  type SyntheticEvent,
} from "react";
import { createPortal } from "react-dom";

interface DialogContextValue {
  open: boolean;
  setOpen: (open: boolean) => void;
  contentRef: React.RefObject<HTMLDivElement>;
  titleId?: string;
  setTitleId: (id: string | undefined) => void;
  descriptionId?: string;
  setDescriptionId: (id: string | undefined) => void;
}

const DialogContext = createContext<DialogContextValue | null>(null);

function useDialogContext(componentName: string): DialogContextValue {
  const context = useContext(DialogContext);
  if (!context) {
    throw new Error(`${componentName} must be used within a <Dialog.Root>`);
  }
  return context;
}

function composeEventHandlers<E extends SyntheticEvent>(
  theirHandler: ((event: E) => void) | undefined,
  ourHandler: (event: E) => void
) {
  return (event: E) => {
    theirHandler?.(event);
    if (!event.defaultPrevented) {
      ourHandler(event);
    }
  };
}

function setRefs<T>(node: T, refs: Array<Ref<T> | undefined>) {
  for (const ref of refs) {
    if (!ref) continue;
    if (typeof ref === "function") {
      ref(node);
    } else {
      try {
        (ref as MutableRefObject<T>).current = node;
      } catch {
        // ignore assignment errors for read-only refs
      }
    }
  }
}

function useComposedRefs<T>(
  ...refs: Array<Ref<T> | undefined>
): (node: T) => void {
  const refsRef = useRef(refs);
  refsRef.current = refs;

  return useCallback((node: T) => {
    setRefs(node, refsRef.current);
  }, []);
}

interface DialogRootProps {
  children: ReactNode;
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export function Root({
  children,
  open: openProp,
  defaultOpen = false,
  onOpenChange,
}: DialogRootProps) {
  const [uncontrolledOpen, setUncontrolledOpen] = useState(defaultOpen);
  const isControlled = openProp !== undefined;
  const open = isControlled ? Boolean(openProp) : uncontrolledOpen;

  const setOpen = useCallback(
    (nextOpen: boolean) => {
      if (!isControlled) {
        setUncontrolledOpen(nextOpen);
      }
      onOpenChange?.(nextOpen);
    },
    [isControlled, onOpenChange]
  );

  const contentRef = useRef<HTMLDivElement>(null);
  const [titleId, setTitleId] = useState<string | undefined>();
  const [descriptionId, setDescriptionId] = useState<string | undefined>();

  const value = useMemo<DialogContextValue>(
    () => ({
      open,
      setOpen,
      contentRef,
      titleId,
      setTitleId,
      descriptionId,
      setDescriptionId,
    }),
    [open, setOpen, titleId, descriptionId]
  );

  return (
    <DialogContext.Provider value={value}>{children}</DialogContext.Provider>
  );
}

interface DialogPortalProps {
  children: ReactNode;
}

export function Portal({ children }: DialogPortalProps) {
  const { open } = useDialogContext("Dialog.Portal");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  if (!mounted || !open) {
    return null;
  }

  if (typeof document === "undefined") {
    return null;
  }

  return createPortal(children, document.body);
}

type DialogOverlayProps = ComponentPropsWithoutRef<"div">;

export const Overlay = forwardRef<HTMLDivElement, DialogOverlayProps>(
  ({ ...props }, forwardedRef) => {
    const { open, setOpen } = useDialogContext("Dialog.Overlay");

    if (!open) {
      return null;
    }

    const handleClick = composeEventHandlers(props.onClick, () => setOpen(false));

    return (
      <div
        {...props}
        ref={forwardedRef}
        data-state={open ? "open" : "closed"}
        onClick={handleClick}
      />
    );
  }
);
Overlay.displayName = "DialogOverlay";

type DialogContentProps = ComponentPropsWithoutRef<"div">;

export const Content = forwardRef<HTMLDivElement, DialogContentProps>(
  ({ children, ...props }, forwardedRef) => {
    const {
      open,
      setOpen,
      contentRef,
      titleId,
      descriptionId,
    } = useDialogContext("Dialog.Content");
    const localRef = useRef<HTMLDivElement>(null);
    const composedRef = useComposedRefs(localRef, contentRef, forwardedRef);

    useEffect(() => {
      if (!open) {
        return;
      }

      if (typeof document === "undefined") {
        return;
      }

      const node = localRef.current;
      if (!node) {
        return;
      }

      const previouslyFocusedElement =
        document.activeElement instanceof HTMLElement
          ? document.activeElement
          : null;

      const focusableElements = getFocusableElements(node);
      if (focusableElements.length > 0) {
        focusableElements[0]!.focus();
      } else {
        node.tabIndex = -1;
        node.focus();
      }

      const handleKeyDown = (event: KeyboardEvent) => {
        if (event.key === "Escape") {
          event.stopPropagation();
          setOpen(false);
        } else if (event.key === "Tab") {
          const focusable = getFocusableElements(node);
          if (focusable.length === 0) {
            event.preventDefault();
            return;
          }
          const first = focusable[0]!;
          const last = focusable[focusable.length - 1]!;
          const active = document.activeElement;
          if (event.shiftKey) {
            if (active === first || !node.contains(active)) {
              event.preventDefault();
              last.focus();
            }
          } else {
            if (active === last) {
              event.preventDefault();
              first.focus();
            }
          }
        }
      };

      document.addEventListener("keydown", handleKeyDown);

      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";

      return () => {
        document.removeEventListener("keydown", handleKeyDown);
        document.body.style.overflow = originalOverflow;
        previouslyFocusedElement?.focus?.();
      };
    }, [open, setOpen]);

    if (!open) {
      return null;
    }

    return (
      <div
        {...props}
        ref={composedRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        aria-describedby={descriptionId}
        data-state={open ? "open" : "closed"}
      >
        {children}
      </div>
    );
  }
);
Content.displayName = "DialogContent";

function getFocusableElements(container: HTMLElement): HTMLElement[] {
  const focusableSelectors =
    'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])';
  const focusable = Array.from(
    container.querySelectorAll<HTMLElement>(focusableSelectors)
  );
  return focusable.filter((element) =>
    element.offsetWidth > 0 || element.offsetHeight > 0
  );
}

type DialogTitleProps = ComponentPropsWithoutRef<"h2">;

export const Title = forwardRef<ElementRef<"h2">, DialogTitleProps>(
  ({ id, ...props }, forwardedRef) => {
    const { setTitleId } = useDialogContext("Dialog.Title");
    const generatedId = useId();
    const titleId = id ?? generatedId;

    useEffect(() => {
      setTitleId(titleId);
      return () => setTitleId(undefined);
    }, [setTitleId, titleId]);

    return <h2 {...props} id={titleId} ref={forwardedRef} />;
  }
);
Title.displayName = "DialogTitle";

type DialogDescriptionProps = ComponentPropsWithoutRef<"p">;

export const Description = forwardRef<
  ElementRef<"p">,
  DialogDescriptionProps
>(({ id, ...props }, forwardedRef) => {
  const { setDescriptionId } = useDialogContext("Dialog.Description");
  const generatedId = useId();
  const descriptionId = id ?? generatedId;

  useEffect(() => {
    setDescriptionId(descriptionId);
    return () => setDescriptionId(undefined);
  }, [setDescriptionId, descriptionId]);

  return <p {...props} id={descriptionId} ref={forwardedRef} />;
});
Description.displayName = "DialogDescription";

type DialogCloseProps = ComponentPropsWithoutRef<"button"> & {
  asChild?: boolean;
};

export const Close = forwardRef<HTMLButtonElement, DialogCloseProps>(
  ({ asChild, children, onClick, ...props }, forwardedRef) => {
    const { setOpen } = useDialogContext("Dialog.Close");

    const handleClick = composeEventHandlers(onClick, () => setOpen(false));

    if (asChild && isValidElement(children)) {
      return cloneElement(children as ReactElement, {
        ref: composeRefs(children.props.ref, forwardedRef),
        onClick: composeEventHandlers(children.props.onClick, handleClick),
      });
    }

    return (
      <button
        type="button"
        {...props}
        onClick={handleClick}
        ref={forwardedRef}
      >
        {children}
      </button>
    );
  }
);
Close.displayName = "DialogClose";

type DialogTriggerProps = ComponentPropsWithoutRef<"button"> & {
  asChild?: boolean;
};

export const Trigger = forwardRef<HTMLButtonElement, DialogTriggerProps>(
  ({ asChild, children, onClick, ...props }, forwardedRef) => {
    const { open, setOpen } = useDialogContext("Dialog.Trigger");

    const handleClick = composeEventHandlers(onClick, () => setOpen(!open));

    if (asChild && isValidElement(children)) {
      return cloneElement(children as ReactElement, {
        ref: composeRefs(children.props.ref, forwardedRef),
        onClick: composeEventHandlers(children.props.onClick, handleClick),
      });
    }

    return (
      <button
        type="button"
        {...props}
        onClick={handleClick}
        ref={forwardedRef}
      >
        {children}
      </button>
    );
  }
);
Trigger.displayName = "DialogTrigger";

function composeRefs<T>(
  ...refs: Array<Ref<T> | undefined>
): (node: T) => void {
  return (node: T) => {
    setRefs(node, refs);
  };
}

export const Dialog = {
  Root,
  Trigger,
  Portal,
  Overlay,
  Content,
  Title,
  Description,
  Close,
};

export default Dialog;
