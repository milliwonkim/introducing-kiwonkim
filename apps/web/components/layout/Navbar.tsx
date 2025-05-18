"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Drawer from "./Drawer";

/**
 * @description 전역 네비게이션 바 컴포넌트 - WRTN 스타일 적용
 */
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  const navLinks = [
    { name: "홈", path: "/" },
    { name: "프로젝트", path: "/projects" },
    { name: "기술 스택", path: "/skills" },
    { name: "연락처", path: "/contact" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div>
      <motion.header
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ease-out h-[var(--header-height)] ${
          scrolled
            ? "bg-[var(--color-background)]/90 backdrop-blur-md shadow-sm"
            : "bg-transparent"
        }`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3, ease: [0.165, 0.84, 0.44, 1] }}
      >
        <div className="container mx-auto px-5 md:px-8 h-full">
          <div className="flex items-center justify-between h-full">
            <motion.div
              className="flex-shrink-0"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, ease: [0.165, 0.84, 0.44, 1] }}
            >
              <Link
                href="/"
                className="text-[var(--color-text-primary)] font-semibold text-xl md:text-2xl flex items-center group"
              >
                <span className="group-hover:text-[var(--color-primary)] transition-colors duration-200">
                  KIWON
                </span>
              </Link>
            </motion.div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              <motion.div
                className="flex items-center space-x-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{
                  duration: 0.4,
                  ease: [0.165, 0.84, 0.44, 1],
                  delay: 0.1,
                }}
              >
                {navLinks.map((link, index) => {
                  const isActive = pathname === link.path;
                  return (
                    <motion.div
                      key={link.path}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{
                        delay: 0.1 + index * 0.05,
                        duration: 0.3,
                      }}
                    >
                      <Link
                        href={link.path}
                        className={`relative text-base py-2 transition-colors duration-200 ${
                          isActive
                            ? "text-[var(--color-primary)] font-medium"
                            : "text-[var(--color-text-secondary)] hover:text-[var(--color-primary)]"
                        }`}
                      >
                        <span className="relative">
                          {link.name}
                          {isActive && (
                            <motion.div
                              className="absolute bottom-0 left-0 right-0 h-[2px] bg-[var(--color-primary)] rounded-full"
                              layoutId="navbar-active-link"
                            />
                          )}
                        </span>
                      </Link>
                    </motion.div>
                  );
                })}
              </motion.div>

              {/* 오른쪽 아이콘 및 버튼 */}
              <motion.div
                className="flex items-center space-x-5"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.4 }}
              >
                <motion.a
                  href="https://github.com/kiwonkim"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors"
                  whileHover={{ scale: 1.08 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <svg
                    className="h-5 w-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
                  </svg>
                </motion.a>
              </motion.div>
            </nav>

            {/* Mobile Navigation Toggle */}
            <motion.button
              className="md:hidden p-2 cursor-pointer text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors"
              onClick={() => setIsOpen(true)}
              aria-label="메뉴 열기"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.3 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </motion.button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Navigation Drawer */}
      <Drawer
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        navLinks={navLinks}
      />
    </div>
  );
};

export default Navbar;
