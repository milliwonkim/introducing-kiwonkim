"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import clsx from "clsx";
import ThemeToggle from "../ThemeToggle";

const NAV_ITEMS = [
  { label: "Intro", id: "hero" },
  { label: "Experience", id: "experience" },
  { label: "Work", id: "work" },
  { label: "Expertise", id: "expertise" },
  { label: "How I Work", id: "culture" },
  { label: "Contact", id: "contact" },
] as const;

const getNavHref = (id: (typeof NAV_ITEMS)[number]["id"]) => `/#${id}`;

const OBSERVER_IDS = [
  "hero",
  "about",
  "experience",
  "work",
  "expertise",
  "culture",
  "contact",
];

const mapSectionToNav = (id: string) => {
  if (id === "about") {
    return "hero";
  }
  return id;
};

const SiteHeader = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeId, setActiveId] = useState<string>("hero");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 12);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(mapSectionToNav(entry.target.id));
          }
        });
      },
      {
        rootMargin: "-45% 0px -45% 0px",
        threshold: [0, 0.25, 0.5, 0.75, 1],
      }
    );

    OBSERVER_IDS.forEach((id) => {
      const element = document.getElementById(id);
      if (element) {
        observer.observe(element);
      }
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    if (!isMenuOpen) return;
    const closeOnResize = () => {
      if (window.innerWidth >= 768) {
        setIsMenuOpen(false);
      }
    };
    window.addEventListener("resize", closeOnResize);
    return () => window.removeEventListener("resize", closeOnResize);
  }, [isMenuOpen]);

  return (
    <header
      className={clsx(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        isScrolled
          ? "backdrop-blur border-b border-[color:var(--color-border-light)] bg-[color:var(--color-background)]/85"
          : "bg-transparent"
      )}
    >
      <div className="mx-auto flex h-[var(--header-height,4.5rem)] max-w-6xl items-center justify-between px-6 sm:px-8">
        <Link
          href={getNavHref("hero")}
          className="text-lg font-semibold text-[color:var(--color-text-primary)] hover:text-[color:var(--color-primary)]"
        >
          김기원 · Frontend
        </Link>

        <nav className="hidden md:flex items-center gap-1 rounded-full border border-[color:var(--color-border-light)] bg-[color:var(--color-card-background)]/80 px-2 py-1.5 backdrop-blur">
          {NAV_ITEMS.map((item) => {
            const isActive = activeId === item.id;
            return (
              <Link
                key={item.id}
                href={getNavHref(item.id)}
                onClick={() => setIsMenuOpen(false)}
                className={clsx(
                  "inline-flex items-center rounded-full px-4 py-2 text-sm font-medium transition-colors",
                  isActive
                    ? "bg-[color:var(--color-primary)]/15 text-[color:var(--color-primary)]"
                    : "text-[color:var(--color-text-secondary)] hover:bg-[color:var(--color-background)]/70 hover:text-[color:var(--color-text-primary)]"
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-3">
          <ThemeToggle />
          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[color:var(--color-border-light)] text-[color:var(--color-text-primary)] md:hidden"
            onClick={() => setIsMenuOpen((prev) => !prev)}
            aria-label={isMenuOpen ? "메뉴 닫기" : "메뉴 열기"}
            aria-expanded={isMenuOpen}
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              {isMenuOpen ? (
                <path d="M18 6 6 18M6 6l12 12" />
              ) : (
                <>
                  <line x1="3" y1="6" x2="21" y2="6" />
                  <line x1="3" y1="12" x2="21" y2="12" />
                  <line x1="3" y1="18" x2="21" y2="18" />
                </>
              )}
            </svg>
          </button>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden border-t border-[color:var(--color-border-light)] bg-[color:var(--color-background)]/95 backdrop-blur">
          <nav className="mx-auto flex max-w-6xl flex-col px-6 py-6 sm:px-8">
            {NAV_ITEMS.map((item) => {
              const isActive = activeId === item.id;
              return (
                <Link
                  key={`mobile-${item.id}`}
                  href={getNavHref(item.id)}
                  onClick={() => setIsMenuOpen(false)}
                  className={clsx(
                    "rounded-2xl px-4 py-3 text-base font-medium transition-colors",
                    isActive
                      ? "bg-[color:var(--color-primary)]/15 text-[color:var(--color-primary)]"
                      : "text-[color:var(--color-text-secondary)] hover:bg-[color:var(--color-background)]/70 hover:text-[color:var(--color-text-primary)]"
                  )}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>
      )}
    </header>
  );
};

export default SiteHeader;
