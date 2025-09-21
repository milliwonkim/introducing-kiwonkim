"use client";

import { ReactNode, useEffect, useId } from "react";

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
  const generatedId = useId();
  const titleId = `modal-title-${generatedId}`;
  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-[color:var(--color-overlay)] backdrop-blur-sm"
        onClick={onClose}
        aria-hidden
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className={`relative z-10 w-full ${sizeClassMap[size]} rounded-3xl border border-[color:var(--color-border-light)] bg-[color:var(--color-background)]/95 p-6 shadow-[0_28px_68px_var(--color-card-shadow)] backdrop-blur`}
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 id={titleId} className="text-2xl font-semibold text-[color:var(--color-text-primary)]">
              {title}
            </h2>
            {description ? (
              <p className="mt-2 text-sm text-[color:var(--color-text-secondary)] leading-relaxed">
                {description}
              </p>
            ) : null}
          </div>
          <button
            type="button"
            onClick={onClose}
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
        </div>
        <div className="mt-6 max-h-[70vh] overflow-y-auto pr-2">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;
