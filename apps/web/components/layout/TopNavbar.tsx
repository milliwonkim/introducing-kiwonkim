"use client";

import { motion, AnimatePresence } from "motion/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import {
  HomeIcon,
  CpuChipIcon,
  FolderIcon,
  DocumentTextIcon,
  EnvelopeIcon,
  Bars3Icon,
  XMarkIcon,
  ArrowTopRightOnSquareIcon,
} from "@heroicons/react/24/outline";
import clsx from "clsx";
import ThemeToggle from "../ThemeToggle";

const TopNavbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const navigation = [
    { name: "홈", href: "/", icon: HomeIcon },
    { name: "기술스택", href: "/skills", icon: CpuChipIcon },
    { name: "프로젝트", href: "/projects", icon: FolderIcon },
    { name: "블로그", href: "/blog", icon: DocumentTextIcon },
    { name: "연락처", href: "/contact", icon: EnvelopeIcon },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={clsx(
          "sticky top-0 left-0 right-0 z-50 w-full transition-all duration-500",
          "nav-surface",
          { "nav-surface--scrolled": isScrolled }
        )}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* 로고 */}
            <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}>
              <Link href="/" className="flex items-center gap-3 md:gap-3.5">
                <div className="relative">
                  <motion.div
                    className="w-11 h-11 rounded-2xl bg-gradient-to-br from-blue-500 via-indigo-500 to-purple-500 flex items-center justify-center shadow-lg shadow-blue-500/30"
                    whileHover={{ rotate: 6 }}
                    transition={{ type: "spring", stiffness: 280 }}
                  >
                    <span className="text-white font-bold text-lg">K</span>
                  </motion.div>
                  {/* 글로우 효과 */}
                  <motion.div
                    className="absolute inset-0 rounded-2xl bg-blue-400/25 dark:bg-blue-500/25 blur-xl"
                    animate={{
                      scale: [1, 1.2, 1],
                      opacity: [0.2, 0.4, 0.2],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  />
                </div>
                <div className="hidden sm:block">
                  <h1 className="text-base sm:text-lg font-semibold text-[color:var(--color-text-primary)]">
                    김기원
                  </h1>
                  <p className="text-xs text-[color:var(--color-text-secondary)] -mt-1 tracking-wide">
                    Frontend Developer
                  </p>
                </div>
              </Link>
            </motion.div>

            {/* 데스크톱 네비게이션 */}
            <div className="hidden md:flex items-center">
              <motion.div
                className="nav-tray"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, duration: 0.4 }}
              >
                {navigation.map((item, index) => {
                  const isActive = pathname === item.href;
                  const Icon = item.icon;

                  return (
                    <motion.div
                      key={item.href}
                      className="inline-flex"
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 + index * 0.05, duration: 0.3 }}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.96 }}
                    >
                      <Link
                        href={item.href}
                        className={clsx("nav-pill", { "nav-pill--active": isActive })}
                      >
                        <motion.span
                          className="nav-pill__icon"
                          whileHover={{ rotate: isActive ? 0 : 5 }}
                          transition={{ type: "spring", stiffness: 320, damping: 20 }}
                        >
                          <Icon className="w-full h-full" />
                        </motion.span>
                        <span>{item.name}</span>
                        <span className="nav-pill__indicator" aria-hidden />
                      </Link>
                    </motion.div>
                  );
                })}
              </motion.div>
            </div>

            {/* 우측 버튼들 */}
            <div className="flex items-center gap-3">
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="flex-shrink-0"
              >
                <ThemeToggle />
              </motion.div>

              {/* GitHub 링크 */}
              <motion.a
                href="https://github.com/milliwonkim"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="hidden sm:inline-flex nav-icon-button"
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.92 }}
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
                </svg>
              </motion.a>

              {/* 연락하기 버튼 */}
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  href="/contact"
                  className="hidden sm:inline-flex nav-primary-button"
                >
                  <EnvelopeIcon className="w-4 h-4" />
                  연락하기
                </Link>
              </motion.div>

              {/* 모바일 메뉴 버튼 */}
              <motion.button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className={clsx("md:hidden nav-icon-button", {
                  "text-[color:var(--color-primary)]": isMobileMenuOpen,
                })}
                whileTap={{ scale: 0.9 }}
              >
                <motion.div
                  animate={{ rotate: isMobileMenuOpen ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  {isMobileMenuOpen ? (
                    <XMarkIcon className="w-6 h-6" />
                  ) : (
                    <Bars3Icon className="w-6 h-6" />
                  )}
                </motion.div>
              </motion.button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* 모바일 메뉴 */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed top-20 left-0 right-0 z-40 md:hidden nav-mobile-panel"
          >
            <div className="max-w-md mx-auto p-6 space-y-4">
              {navigation.map((item, index) => {
                const isActive = pathname === item.href;
                const Icon = item.icon;

                return (
                  <motion.div
                    key={item.href}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Link
                      href={item.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={clsx("nav-mobile-link", {
                        "nav-mobile-link--active": isActive,
                      })}
                    >
                      <motion.span
                        className="nav-mobile-link__icon"
                        whileHover={{ rotate: isActive ? 0 : 5 }}
                        transition={{ type: "spring", stiffness: 280, damping: 20 }}
                      >
                        <Icon className="w-full h-full" />
                      </motion.span>
                      <span className="font-medium">{item.name}</span>
                    </Link>
                  </motion.div>
                );
              })}

              {/* 모바일 액션 버튼들 */}
              <div className="pt-4 border-t border-gray-200/70 dark:border-slate-800/60 space-y-3">
                <motion.a
                  href="https://github.com/milliwonkim"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="nav-mobile-link"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  <svg
                    className="nav-mobile-link__icon"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
                  </svg>
                  <span className="font-medium">GitHub</span>
                  <ArrowTopRightOnSquareIcon className="w-4 h-4 ml-auto" />
                </motion.a>

                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 }}
                >
                  <Link
                    href="/contact"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="nav-primary-button nav-primary-button--block"
                  >
                    <EnvelopeIcon className="w-5 h-5" />
                    연락하기
                  </Link>
                </motion.div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 모바일 메뉴 배경 오버레이 */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-30 md:hidden nav-overlay"
            onClick={() => setIsMobileMenuOpen(false)}
          />
        )}
      </AnimatePresence>
    </>
  );
};

export default TopNavbar;
