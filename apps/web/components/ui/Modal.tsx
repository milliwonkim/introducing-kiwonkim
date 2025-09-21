"use client";

import { ReactNode, useCallback } from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  children: ReactNode;
  size?: "md" | "lg";
}

const sizeClassMap: Record<NonNullable<ModalProps["size"]>, string> = {
  md: "max-w-3xl",
  lg: "max-w-5xl",
};

const Modal = ({ isOpen, onClose, title, description, children, size = "lg" }: ModalProps) => {
  const handleOpenChange = useCallback(
    (nextOpen: boolean) => {
      if (!nextOpen) {
        onClose();
      }
    },
    [onClose],
  );

  const sizeClass = sizeClassMap[size];

  return (
    <DialogPrimitive.Root open={isOpen} onOpenChange={handleOpenChange}>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay className="fixed inset-0 z-50 bg-[color:var(--color-overlay)] backdrop-blur-sm" />
        <DialogPrimitive.Content
          className={`fixed left-1/2 top-1/2 z-50 w-[calc(100vw-2rem)] ${sizeClass} max-h-[85vh] -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-3xl border border-[color:var(--color-border-light)] bg-[color:var(--color-background)]/95 p-6 shadow-[0_28px_68px_var(--color-card-shadow)] backdrop-blur focus:outline-none`}
        >
          <div className="flex items-start justify-between gap-4">
            <div>
              <DialogPrimitive.Title className="text-2xl font-semibold text-[color:var(--color-text-primary)]">
                {title}
              </DialogPrimitive.Title>
              {description ? (
                <DialogPrimitive.Description className="mt-2 text-sm leading-relaxed text-[color:var(--color-text-secondary)]">
                  {description}
                </DialogPrimitive.Description>
              ) : null}
            </div>
            <DialogPrimitive.Close
              type="button"
              className="inline-flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full border border-[color:var(--color-border-normal)] text-[color:var(--color-text-secondary)] transition-colors hover:border-[color:var(--color-primary)] hover:text-[color:var(--color-primary)]"
              aria-label="모달 닫기"
            >
              <svg
                viewBox="0 0 24 24"
                width="16"
                height="16"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </DialogPrimitive.Close>
          </div>
          <div className="mt-6 max-h-[70vh] overflow-y-auto pr-2">
            {children}
          </div>
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
};

export default Modal;
