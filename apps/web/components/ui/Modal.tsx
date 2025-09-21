"use client";

import { ReactNode } from "react";
import * as Dialog from "@radix-ui/react-dialog";

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
  return (
    <Dialog.Root
      open={isOpen}
      onOpenChange={(open) => {
        if (!open) {
          onClose();
        }
      }}
    >
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-[70] bg-[color:var(--color-overlay)]/80 backdrop-blur-sm" />
        <Dialog.Content
          className={`fixed left-1/2 top-1/2 z-[80] w-[calc(100vw-2rem)] sm:w-auto ${sizeClassMap[size]} max-h-[85vh] overflow-hidden rounded-3xl border border-[color:var(--color-border-light)] bg-[color:var(--color-background)]/95 p-6 shadow-[0_28px_68px_var(--color-card-shadow)] focus:outline-none`}
        >
          <div className="flex items-start justify-between gap-4">
            <div className="space-y-2">
              <Dialog.Title className="text-2xl font-semibold text-[color:var(--color-text-primary)]">
                {title}
              </Dialog.Title>
              {description ? (
                <Dialog.Description className="text-sm leading-relaxed text-[color:var(--color-text-secondary)]">
                  {description}
                </Dialog.Description>
              ) : null}
            </div>
            <Dialog.Close asChild>
              <button
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
              </button>
            </Dialog.Close>
          </div>
          <div className="mt-6 max-h-[calc(85vh-4rem)] overflow-y-auto pr-1 sm:pr-2">
            {children}
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default Modal;
