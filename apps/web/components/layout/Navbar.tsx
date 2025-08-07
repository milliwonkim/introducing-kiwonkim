"use client";

import { motion } from "motion/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState, memo, useRef, useCallback, useMemo } from "react";
import Drawer from "./Drawer";

/**
 * @description Global navigation bar component - Modern and clean design
 */
const Navbar = memo(() => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [shouldAnimate, setShouldAnimate] = useState(false);
  const [indicatorStyle, setIndicatorStyle] = useState({ left: 0, width: 0 });
  const navRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  const navLinks = useMemo(
    () => [
      { name: "Resume", path: "/" },
      { name: "Skills", path: "/skills" },
      { name: "Projects", path: "/projects" },
      { name: "Blog", path: "/blog" },
      { name: "Contact", path: "/contact" },
    ],
    []
  );

  // Update indicator position based on active link
  const updateIndicator = useCallback(() => {
    if (!navRef.current) return;

    const activeIndex = navLinks.findIndex((link) => link.path === pathname);
    if (activeIndex === -1) return;

    const navItems = navRef.current.querySelectorAll("a[data-nav-link]");
    const activeItem = navItems[activeIndex] as HTMLElement;

    if (activeItem) {
      const navContainer = navRef.current;
      const containerRect = navContainer.getBoundingClientRect();
      const activeRect = activeItem.getBoundingClientRect();

      setIndicatorStyle({
        left: activeRect.left - containerRect.left,
        width: activeRect.width,
      });
    }
  }, [pathname, navLinks]);

  useEffect(() => {
    updateIndicator();

    // Update on window resize
    const handleResize = () => updateIndicator();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, [updateIndicator]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Run animation only once per session
  useEffect(() => {
    const hasAnimated = sessionStorage.getItem("navbar-animated");
    if (!hasAnimated) {
      setShouldAnimate(true);
      sessionStorage.setItem("navbar-animated", "true");
    }
  }, []);

  return (
    <div>
      <motion.header
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ease-out h-[var(--header-height)] ${
          scrolled
            ? "bg-white/95 backdrop-blur-md shadow-lg border-b border-slate-200/50"
            : "bg-transparent"
        }`}
        initial={shouldAnimate ? { opacity: 0, y: -20 } : { opacity: 1, y: 0 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: shouldAnimate ? 0.6 : 0,
          ease: [0.165, 0.84, 0.44, 1],
        }}
      >
        <div className="container mx-auto px-6 md:px-8 h-full">
          <div className="flex items-center justify-between h-full">
            {/* Logo */}
            <motion.div
              className="flex-shrink-0"
              initial={
                shouldAnimate ? { opacity: 0, x: -20 } : { opacity: 1, x: 0 }
              }
              animate={{ opacity: 1, x: 0 }}
              transition={{
                duration: shouldAnimate ? 0.6 : 0,
                delay: shouldAnimate ? 0.1 : 0,
              }}
            >
              <Link href="/" className="group flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-br from-[var(--color-primary)] to-purple-600 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
                  <span className="text-white font-bold text-sm">K</span>
                </div>
                <span className="text-xl font-bold text-[var(--color-text-primary)] group-hover:text-[var(--color-primary)] transition-colors duration-200">
                  KIWON
                </span>
              </Link>
            </motion.div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center">
              <motion.div
                ref={navRef}
                className="relative flex items-center space-x-1 bg-slate-50/80 backdrop-blur-sm rounded-full p-1 border border-slate-200/50"
                initial={
                  shouldAnimate ? { opacity: 0, y: -10 } : { opacity: 1, y: 0 }
                }
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: shouldAnimate ? 0.6 : 0,
                  delay: shouldAnimate ? 0.2 : 0,
                }}
              >
                {/* Moving Background Indicator */}
                <motion.div
                  className="absolute bg-[var(--color-primary)] rounded-full h-[calc(100%-8px)] top-1 -z-10"
                  animate={{
                    left: indicatorStyle.left,
                    width: indicatorStyle.width,
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 30,
                    duration: 0.3,
                  }}
                  style={{
                    left: indicatorStyle.left,
                    width: indicatorStyle.width,
                  }}
                />

                {navLinks.map((link, index) => {
                  const isActive = pathname === link.path;
                  return (
                    <motion.div
                      key={`nav-${link.path}`}
                      initial={
                        shouldAnimate
                          ? { opacity: 0, y: -10 }
                          : { opacity: 1, y: 0 }
                      }
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        delay: shouldAnimate ? 0.3 + index * 0.1 : 0,
                        duration: shouldAnimate ? 0.4 : 0,
                      }}
                    >
                      <Link
                        href={link.path}
                        data-nav-link
                        className={`relative px-4 py-2 text-sm font-medium rounded-full transition-colors duration-200 ${
                          isActive
                            ? "text-white"
                            : "text-[var(--color-text-secondary)] hover:text-[var(--color-primary)]"
                        }`}
                      >
                        {link.name}
                      </Link>
                    </motion.div>
                  );
                })}
              </motion.div>
            </nav>

            {/* Right action buttons */}
            <motion.div
              className="hidden md:flex items-center space-x-3"
              initial={
                shouldAnimate ? { opacity: 0, x: 20 } : { opacity: 1, x: 0 }
              }
              animate={{ opacity: 1, x: 0 }}
              transition={{
                delay: shouldAnimate ? 0.4 : 0,
                duration: shouldAnimate ? 0.6 : 0,
              }}
            >
              {/* GitHub link */}
              <motion.a
                href="https://github.com/milliwonkim"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 text-[var(--color-text-secondary)] hover:text-[var(--color-primary)] hover:bg-[var(--color-primary)]/10 rounded-lg transition-all duration-200"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                aria-label="GitHub"
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

              {/* Contact button */}
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  href="/contact"
                  className="px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-[var(--color-primary)] to-purple-600 rounded-lg shadow-lg hover:shadow-xl transition-all duration-200"
                >
                  Contact
                </Link>
              </motion.div>
            </motion.div>

            {/* Mobile Navigation Toggle */}
            <motion.button
              className="md:hidden p-2 text-[var(--color-text-secondary)] hover:text-[var(--color-primary)] hover:bg-[var(--color-primary)]/10 rounded-lg transition-all duration-200"
              onClick={() => setIsOpen(true)}
              aria-label="Open menu"
              initial={
                shouldAnimate ? { opacity: 0, x: 20 } : { opacity: 1, x: 0 }
              }
              animate={{ opacity: 1, x: 0 }}
              transition={{
                delay: shouldAnimate ? 0.3 : 0,
                duration: shouldAnimate ? 0.4 : 0,
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
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
});

Navbar.displayName = "Navbar";

export default Navbar;
