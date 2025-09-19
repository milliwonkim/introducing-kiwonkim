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
        className={`sticky top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled ? "nav-surface nav-surface--scrolled" : "nav-surface"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* 로고 */}
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link href="/" className="flex items-center gap-3">
                <div className="relative">
                  <motion.div
                    className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-700 dark:from-blue-500 dark:to-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/25 dark:shadow-blue-500/35"
                    whileHover={{ rotate: 10 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <span className="text-white font-bold text-lg">K</span>
                  </motion.div>
                  {/* 글로우 효과 */}
                  <motion.div
                    className="absolute inset-0 rounded-xl bg-blue-400/35 dark:bg-blue-500/35 blur-xl"
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
                  <h1 className="font-bold text-gray-900 dark:text-slate-100 text-lg">김기원</h1>
                  <p className="text-xs text-gray-500 dark:text-slate-400 -mt-1">
                    Frontend Developer
                  </p>
                </div>
              </Link>
            </motion.div>

            {/* 데스크톱 네비게이션 */}
            <div className="hidden md:flex items-center">
              <div className="flex items-center space-x-2 rounded-full px-3 py-2.5 border border-gray-200/60 dark:border-slate-700/50 bg-white/75 dark:bg-slate-950/60 backdrop-blur-lg shadow-[0_18px_40px_-24px_rgba(15,23,42,0.35)] dark:shadow-[0_28px_55px_-24px_rgba(2,6,23,0.78)] transition-colors duration-300">
                {navigation.map((item, index) => {
                  const isActive = pathname === item.href;
                  const Icon = item.icon;

                  return (
                    <motion.div
                      key={item.href}
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Link
                        href={item.href}
                        className={`relative flex items-center gap-3 px-5 py-3 rounded-full text-base font-medium transition-all duration-300 ${
                          isActive
                            ? "text-white bg-blue-600 dark:bg-blue-500/90 shadow-[0_16px_40px_-20px_rgba(59,130,246,0.6)]"
                            : "text-gray-700 dark:text-slate-200 hover:text-blue-600 dark:hover:text-blue-300 hover:bg-white/70 dark:hover:bg-slate-900/50"
                        }`}
                      >
                        <Icon className="w-5 h-5" />
                        <span>{item.name}</span>
                        {isActive && (
                          <motion.div
                            layoutId="activeTab"
                            className="absolute inset-0 bg-blue-600 dark:bg-blue-500 rounded-full -z-10"
                            transition={{
                              type: "spring",
                              bounce: 0.2,
                              duration: 0.6,
                            }}
                          />
                        )}
                      </Link>
                    </motion.div>
                  );
                })}
              </div>
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
                className="hidden sm:flex items-center justify-center w-10 h-10 rounded-full text-gray-600 dark:text-slate-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-slate-800/70 transition-colors border border-gray-200/60 dark:border-slate-700/60 bg-white/70 dark:bg-slate-950/60 backdrop-blur-lg shadow-[0_16px_32px_-18px_rgba(15,23,42,0.35)] dark:shadow-[0_26px_44px_-18px_rgba(2,6,23,0.75)]"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
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
                  className="hidden sm:flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-full text-sm font-medium hover:bg-blue-700 transition-colors shadow-lg shadow-blue-600/25 dark:shadow-blue-500/35"
                >
                  <EnvelopeIcon className="w-4 h-4" />
                  연락하기
                </Link>
              </motion.div>

              {/* 모바일 메뉴 버튼 */}
              <motion.button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden flex items-center justify-center w-10 h-10 text-gray-600 dark:text-slate-300 hover:text-gray-900 dark:hover:text-white rounded-full hover:bg-gray-100 dark:hover:bg-slate-800/70 transition-colors border border-gray-200/60 dark:border-slate-700/60 bg-white/70 dark:bg-slate-950/60 backdrop-blur-lg"
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
            className="fixed top-20 left-0 right-0 z-40 bg-white/95 dark:bg-slate-950/85 backdrop-blur-xl border-b border-gray-200/70 dark:border-slate-800/60 shadow-xl shadow-[0_24px_50px_-24px_rgba(15,23,42,0.35)] dark:shadow-[0_32px_65px_-28px_rgba(2,6,23,0.85)] md:hidden"
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
                      className={`flex items-center gap-3 p-3 rounded-xl transition-all duration-200 ${
                        isActive
                          ? "bg-blue-600 dark:bg-blue-500/85 text-white shadow-lg"
                          : "text-gray-700 dark:text-slate-200 hover:bg-gray-50 dark:hover:bg-slate-900/60"
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                      <span className="font-medium">{item.name}</span>
                      {isActive && (
                        <motion.div
                          className="ml-auto w-2 h-2 bg-white dark:bg-slate-200 rounded-full"
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ delay: 0.2 }}
                        />
                      )}
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
                  className="flex items-center gap-3 p-3 text-gray-700 dark:text-slate-200 hover:bg-gray-50 dark:hover:bg-slate-900/60 rounded-xl transition-colors"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  <svg
                    className="w-5 h-5"
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
                    className="flex items-center justify-center gap-2 p-3 bg-blue-600 dark:bg-blue-500/85 text-white rounded-xl font-medium hover:bg-blue-700 dark:hover:bg-blue-500 transition-colors shadow-[0_16px_34px_-20px_rgba(37,99,235,0.55)] dark:shadow-[0_22px_40px_-18px_rgba(37,99,235,0.7)]"
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
            className="fixed inset-0 bg-black/20 dark:bg-black/40 backdrop-blur-sm z-30 md:hidden"
            onClick={() => setIsMobileMenuOpen(false)}
          />
        )}
      </AnimatePresence>
    </>
  );
};

export default TopNavbar;
