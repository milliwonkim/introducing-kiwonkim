"use client";

import { motion, AnimatePresence } from "motion/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState, memo, useMemo } from "react";
import { Disclosure } from "@headlessui/react";
import {
  Bars3Icon,
  XMarkIcon,
  HomeIcon,
  CpuChipIcon,
  FolderIcon,
  DocumentTextIcon,
  EnvelopeIcon,
} from "@heroicons/react/24/outline";
import clsx from "clsx";

/**
 * @description Modern navigation bar with improved UX
 */
const Navbar = memo(() => {
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  const navLinks = useMemo(
    () => [
      {
        name: "이력서",
        path: "/",
        icon: HomeIcon,
        description: "프로필 및 경력",
      },
      {
        name: "기술스택",
        path: "/skills",
        icon: CpuChipIcon,
        description: "보유 기술",
      },
      {
        name: "프로젝트",
        path: "/projects",
        icon: FolderIcon,
        description: "포트폴리오",
      },
      {
        name: "블로그",
        path: "/blog",
        icon: DocumentTextIcon,
        description: "기술 블로그",
      },
      {
        name: "연락처",
        path: "/contact",
        icon: EnvelopeIcon,
        description: "연락 정보",
      },
    ],
    []
  );

  // 스크롤 감지
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const NavLink = ({
    link,
    mobile = false,
    onClick,
  }: {
    link: (typeof navLinks)[0];
    mobile?: boolean;
    onClick?: () => void;
  }) => {
    const isActive = pathname === link.path;
    const Icon = link.icon;

    if (mobile) {
      return (
        <motion.div
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          transition={{ type: "spring", stiffness: 400, damping: 25 }}
        >
          <Link
            href={link.path}
            onClick={onClick}
            className={clsx(
              "group relative flex items-center gap-3 px-4 py-3 rounded-2xl transition-all duration-300 overflow-hidden w-full",
              isActive
                ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg shadow-blue-500/25"
                : "text-gray-600 hover:text-blue-600 hover:bg-blue-50/80 hover:shadow-md"
            )}
          >
            {/* 배경 글로우 효과 */}
            {isActive && (
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 opacity-20 blur-xl"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 0.2 }}
                transition={{ duration: 0.3 }}
              />
            )}

            {/* 아이콘 */}
            <motion.div
              className={clsx(
                "relative z-10",
                isActive
                  ? "text-white"
                  : "text-gray-500 group-hover:text-blue-600"
              )}
              whileHover={{ rotate: isActive ? 0 : 5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Icon className="h-6 w-6" />
            </motion.div>

            {/* 텍스트 */}
            <div className="relative z-10 flex flex-col">
              <span
                className={clsx(
                  "font-medium transition-colors duration-200 text-base",
                  isActive
                    ? "text-white"
                    : "text-gray-700 group-hover:text-blue-600"
                )}
              >
                {link.name}
              </span>
              <span
                className={clsx(
                  "text-xs transition-colors duration-200",
                  isActive ? "text-blue-100" : "text-gray-500"
                )}
              >
                {link.description}
              </span>
            </div>

            {/* 호버 시 오른쪽 화살표 (모바일) */}
            <motion.div
              className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity duration-200"
              initial={{ x: -10 }}
              whileHover={{ x: 0 }}
            >
              <svg
                className="h-4 w-4 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </motion.div>
          </Link>
        </motion.div>
      );
    }

    // 데스크톱 알약 타입 NavLink
    return (
      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        transition={{ type: "spring", stiffness: 400, damping: 25 }}
      >
        <Link
          href={link.path}
          className={clsx(
            "group relative flex items-center gap-2 px-4 py-2.5 rounded-full transition-all duration-300",
            isActive
              ? "bg-white text-blue-600 shadow-md shadow-blue-500/20"
              : "text-gray-600 hover:text-blue-600 hover:bg-white/50"
          )}
        >
          {/* 아이콘 */}
          <motion.div
            className="relative z-10"
            whileHover={{ rotate: isActive ? 0 : 5 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <Icon className="h-4 w-4" />
          </motion.div>

          {/* 텍스트 */}
          <span className="relative z-10 text-sm font-medium">{link.name}</span>

          {/* 활성 상태 점 표시 */}
          {isActive && (
            <motion.div
              className="w-1.5 h-1.5 bg-blue-600 rounded-full ml-1"
              layoutId="navbar-pill-indicator"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
            />
          )}
        </Link>
      </motion.div>
    );
  };

  return (
    <Disclosure as="nav" className="sticky top-0 w-full z-50">
      {({ open }) => (
        <>
          <motion.div
            className={clsx(
              "transition-all duration-300",
              scrolled
                ? "bg-white/95 backdrop-blur-md shadow-lg border-b border-gray-200"
                : "bg-white/80 backdrop-blur-sm"
            )}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex items-center justify-between h-16">
                {/* 로고 */}
                <motion.div
                  className="flex-shrink-0"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link href="/" className="flex items-center space-x-3 group">
                    <motion.div
                      className="relative w-12 h-12 bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-500/25"
                      whileHover={{
                        rotate: 5,
                        boxShadow:
                          "0 20px 25px -5px rgba(59, 130, 246, 0.4), 0 10px 10px -5px rgba(59, 130, 246, 0.2)",
                      }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      {/* 글로우 효과 */}
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-br from-blue-400 to-purple-500 rounded-2xl opacity-50 blur-lg"
                        animate={{
                          scale: [1, 1.2, 1],
                          opacity: [0.5, 0.8, 0.5],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          ease: "easeInOut",
                        }}
                      />
                      <span className="relative z-10 text-white font-bold text-xl">
                        K
                      </span>
                    </motion.div>
                    <div className="hidden sm:block">
                      <motion.h1
                        className="text-xl font-bold text-gray-800 group-hover:text-blue-600 transition-colors duration-200"
                        whileHover={{ x: 2 }}
                      >
                        김기원
                      </motion.h1>
                      <p className="text-xs text-gray-500 -mt-1 group-hover:text-gray-600 transition-colors duration-200">
                        Frontend Developer
                      </p>
                    </div>
                  </Link>
                </motion.div>

                {/* 데스크톱 네비게이션 - 알약 타입 */}
                <div className="hidden md:block">
                  <motion.div
                    className="flex items-center space-x-1 bg-gray-100/80 backdrop-blur-md rounded-full px-3 py-2 border border-gray-200/50 shadow-lg"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1, duration: 0.4 }}
                  >
                    {navLinks.map((link, index) => (
                      <motion.div
                        key={link.path}
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 + index * 0.05 }}
                      >
                        <NavLink link={link} />
                      </motion.div>
                    ))}
                  </motion.div>
                </div>

                {/* 우측 액션 버튼들 - 알약 타입 */}
                <div className="hidden md:flex items-center space-x-3">
                  <motion.a
                    href="https://github.com/milliwonkim"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2.5 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-full transition-all duration-200 group"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    whileTap={{ scale: 0.95 }}
                    aria-label="GitHub"
                  >
                    <motion.svg
                      className="h-5 w-5 group-hover:scale-110 transition-transform duration-200"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.6 }}
                    >
                      <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
                    </motion.svg>
                  </motion.a>

                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    <Link
                      href="/contact"
                      className="inline-flex items-center px-5 py-2.5 text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-purple-600 rounded-full shadow-lg shadow-blue-500/25 hover:shadow-xl hover:shadow-blue-500/30 transition-all duration-200 group"
                    >
                      <EnvelopeIcon className="h-4 w-4 mr-2 group-hover:scale-110 transition-transform duration-200" />
                      <span>연락하기</span>
                    </Link>
                  </motion.div>
                </div>

                {/* 모바일 메뉴 버튼 - 알약 타입 */}
                <div className="md:hidden">
                  <Disclosure.Button className="inline-flex items-center justify-center p-3 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-full transition-all duration-200 group">
                    <span className="sr-only">메뉴 열기</span>
                    <motion.div
                      animate={{ rotate: open ? 180 : 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      {open ? (
                        <XMarkIcon
                          className="block h-6 w-6 group-hover:scale-110 transition-transform duration-200"
                          aria-hidden="true"
                        />
                      ) : (
                        <Bars3Icon
                          className="block h-6 w-6 group-hover:scale-110 transition-transform duration-200"
                          aria-hidden="true"
                        />
                      )}
                    </motion.div>
                  </Disclosure.Button>
                </div>
              </div>
            </div>
          </motion.div>

          {/* 모바일 메뉴 */}
          <AnimatePresence>
            {open && (
              <Disclosure.Panel static as={motion.div}>
                <motion.div
                  className="md:hidden bg-white/95 backdrop-blur-md border-b border-gray-200 shadow-xl"
                  initial={{ opacity: 0, height: 0, y: -20 }}
                  animate={{ opacity: 1, height: "auto", y: 0 }}
                  exit={{ opacity: 0, height: 0, y: -20 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                >
                  <div className="px-6 py-6 space-y-3">
                    {navLinks.map((link, index) => (
                      <motion.div
                        key={link.path}
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -30 }}
                        transition={{
                          delay: index * 0.1,
                          duration: 0.3,
                          ease: "easeOut",
                        }}
                      >
                        <NavLink
                          link={link}
                          mobile
                          onClick={() => {
                            // 메뉴 클릭 시 닫히도록
                            setTimeout(() => {
                              const button = document.querySelector(
                                '[aria-expanded="true"]'
                              ) as HTMLButtonElement;
                              button?.click();
                            }, 100);
                          }}
                        />
                      </motion.div>
                    ))}

                    {/* 모바일 소셜 링크 & 연락 버튼 */}
                    <motion.div
                      className="pt-6 border-t border-gray-200 mt-6"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 20 }}
                      transition={{ delay: 0.4, duration: 0.3 }}
                    >
                      {/* 연락하기 버튼 - 알약 타입 */}
                      <motion.div className="mb-4">
                        <Link
                          href="/contact"
                          className="w-full inline-flex items-center justify-center px-6 py-3.5 text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-purple-600 rounded-full shadow-lg shadow-blue-500/25 transition-all duration-200"
                          onClick={() => {
                            setTimeout(() => {
                              const button = document.querySelector(
                                '[aria-expanded="true"]'
                              ) as HTMLButtonElement;
                              button?.click();
                            }, 100);
                          }}
                        >
                          <EnvelopeIcon className="h-4 w-4 mr-2" />
                          연락하기
                        </Link>
                      </motion.div>

                      {/* 소셜 링크 */}
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-500 font-medium">
                          소셜 링크
                        </span>
                        <div className="flex space-x-4">
                          <motion.a
                            href="https://github.com/milliwonkim"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-full transition-colors"
                            whileHover={{ scale: 1.1, rotate: 5 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            <svg
                              className="h-5 w-5"
                              fill="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
                            </svg>
                          </motion.a>
                          <motion.a
                            href="mailto:kwk627@naver.com"
                            className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-full transition-colors"
                            whileHover={{ scale: 1.1, rotate: -5 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            <EnvelopeIcon className="h-5 w-5" />
                          </motion.a>
                        </div>
                      </div>
                    </motion.div>
                  </div>
                </motion.div>
              </Disclosure.Panel>
            )}
          </AnimatePresence>
        </>
      )}
    </Disclosure>
  );
});

Navbar.displayName = "Navbar";

export default Navbar;
