"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

import ProjectsExplorer from "./ProjectsExplorer";

interface ProjectsModalProps {
  open: boolean;
  onClose: () => void;
}

export default function ProjectsModal({ open, onClose }: ProjectsModalProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!open) {
      return;
    }
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [open]);

  if (!mounted || !open) {
    return null;
  }

  return createPortal(
    <div
      className="fixed inset-0 z-[1000] flex items-center justify-center"
      role="dialog"
      aria-modal="true"
      aria-label="전체 프로젝트 목록"
    >
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="relative z-10 w-full max-w-6xl max-h-[90vh] overflow-hidden rounded-3xl border border-[color:var(--color-border-light)] bg-[color:var(--color-background)] shadow-2xl">
        <div className="max-h-[90vh] overflow-y-auto">
          <div className="sticky top-0 z-10 flex items-center justify-between border-b border-[color:var(--color-border-light)] bg-[color:var(--color-background)]/90 px-6 py-4 backdrop-blur-md">
            <span className="text-base font-semibold text-[color:var(--color-text-primary)]">
              전체 프로젝트
            </span>
            <button
              type="button"
              onClick={onClose}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[color:var(--color-border-light)] text-[color:var(--color-text-secondary)] transition hover:border-[color:var(--color-primary)] hover:text-[color:var(--color-primary)]"
              aria-label="프로젝트 모달 닫기"
            >
              <svg
                className="h-5 w-5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={1.6}
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>
          <div className="px-2 sm:px-6 pb-6">
            <ProjectsExplorer variant="modal" />
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
}
