"use client";

import { AnimatePresence, motion, Variants } from "motion/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

/**
 * @description Mobile Navigation Drawer Component
 * @param isOpen Drawer open state
 * @param onClose Drawer close function
 * @param navLinks Navigation links array
 */
interface DrawerProps {
  isOpen: boolean;
  onClose: () => void;
  navLinks: Array<{ name: string; path: string }>;
}

// Drawer animation variables
const backdropVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.35,
      ease: [0.165, 0.84, 0.44, 1], // WRTN 스타일 이징 (cubic-bezier)
    },
  },
  exit: {
    opacity: 0,
    transition: {
      duration: 0.25,
      ease: [0.165, 0.84, 0.44, 1],
      delay: 0.05,
    },
  },
};

const drawerVariants: Variants = {
  hidden: {
    x: "100%",
    boxShadow: "0px 0px 0px rgba(0, 0, 0, 0)",
    filter: "blur(2px)",
    opacity: 0.8,
  },
  visible: {
    x: 0,
    boxShadow: "0px 0px 20px var(--color-card-shadow)",
    filter: "blur(0px)",
    opacity: 1,
    transition: {
      duration: 0.4,
      ease: [0.16, 1, 0.3, 1], // Smooth cubic-bezier
    },
  },
  exit: {
    x: "100%",
    boxShadow: "0px 0px 0px rgba(0, 0, 0, 0)",
    filter: "blur(1px)",
    opacity: 0.9,
    transition: {
      duration: 0.3,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

const navItemVariants = {
  hidden: { opacity: 0, x: 20, filter: "blur(2px)" },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    filter: "blur(0px)",
    transition: {
      type: "spring",
      damping: 35,
      stiffness: 330,
      delay: 0.05 * i + 0.15,
      duration: 0.5,
    },
  }),
  exit: (i: number) => ({
    opacity: 0,
    x: 15,
    transition: {
      delay: 0.02 * i,
      duration: 0.2,
      ease: [0.165, 0.84, 0.44, 1],
    },
  }),
};

const Drawer = ({ isOpen, onClose, navLinks }: DrawerProps) => {
  const pathname = usePathname();
  const drawerRef = useRef<HTMLDivElement>(null);

  // ESC key to close Drawer and handle outside clicks
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };

    const handleClickOutside = (e: MouseEvent) => {
      if (
        drawerRef.current &&
        !drawerRef.current.contains(e.target as Node) &&
        isOpen
      ) {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEscape);
    document.addEventListener("mousedown", handleClickOutside);

    // Save and handle scroll position
    if (isOpen) {
      const scrollY = window.scrollY;
      document.body.style.position = "fixed";
      document.body.style.width = "100%";
      document.body.style.top = `-${scrollY}px`;
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.removeEventListener("mousedown", handleClickOutside);

      // Restore scroll position
      if (isOpen) {
        const scrollY = document.body.style.top;
        document.body.style.position = "";
        document.body.style.width = "";
        document.body.style.top = "";
        window.scrollTo(0, parseInt(scrollY || "0") * -1);
      }
    };
  }, [isOpen, onClose]);

  return (
    <AnimatePresence mode="wait">
      {isOpen && (
        <>
          {/* Backdrop overlay */}
          <motion.div
            className="fixed inset-0 bg-[var(--color-overlay)] backdrop-blur-[2.5px] z-50"
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={backdropVariants}
            onClick={onClose}
          />

          {/* Drawer panel */}
          <motion.div
            ref={drawerRef}
            className="fixed top-0 right-0 h-full w-[85%] max-w-md bg-[var(--color-background)] z-50 flex flex-col overflow-hidden shadow-xl border-l border-[var(--color-border-light)]"
            variants={drawerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            {/* Drawer header */}
            <div className="py-6 px-7 flex-shrink-0 relative">
              <motion.div
                className="flex items-center justify-between"
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: 0.1,
                  duration: 0.3,
                  ease: [0.165, 0.84, 0.44, 1],
                }}
              >
                <Link
                  href="/"
                  className="font-semibold text-xl text-primary dark:text-primary-light flex items-center group"
                  onClick={onClose}
                >
                  <span className="text-primary mr-1">K.</span>
                  <span className="group-hover:text-primary transition-colors duration-200 ">
                    Kiwon
                  </span>
                </Link>
                <motion.button
                  onClick={onClose}
                  className="p-1.5 rounded-full text-gray-400 dark:text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 transition-colors"
                  aria-label="Close"
                  whileTap={{ scale: 0.9 }}
                  whileHover={{ scale: 1.05 }}
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
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </motion.button>
              </motion.div>
            </div>

            {/* Navigation links */}
            <nav className="flex-1 overflow-y-auto px-7 py-8">
              <motion.ul
                className="space-y-5"
                initial="hidden"
                animate="visible"
                exit="exit"
                variants={{
                  visible: {
                    transition: {
                      staggerChildren: 0.05,
                      delayChildren: 0.1,
                      when: "beforeChildren",
                    },
                  },
                  exit: {
                    transition: {
                      staggerChildren: 0.03,
                      staggerDirection: -1,
                    },
                  },
                }}
              >
                {navLinks.map((link, index) => {
                  const isActive = pathname === link.path;
                  return (
                    <motion.li
                      key={link.path}
                      variants={navItemVariants}
                      custom={index}
                    >
                      <Link
                        href={link.path}
                        className={`group flex items-center ${
                          isActive
                            ? "text-primary dark:text-primary-light font-medium"
                            : "text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-primary-light transition-colors duration-200"
                        }`}
                        onClick={onClose}
                      >
                        <motion.span
                          className="text-lg"
                          whileHover={{ x: isActive ? 0 : 3 }}
                          transition={{
                            type: "spring",
                            stiffness: 500,
                            damping: 25,
                          }}
                        >
                          {link.name}
                        </motion.span>
                        {isActive && (
                          <motion.div
                            className="ml-2.5 w-1 h-1 bg-primary dark:bg-primary-light rounded-full"
                            layoutId="drawer-nav-indicator"
                            initial={{ scale: 0, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{
                              type: "spring",
                              stiffness: 500,
                              damping: 30,
                              delay: 0.1,
                            }}
                          />
                        )}
                      </Link>
                    </motion.li>
                  );
                })}
              </motion.ul>
            </nav>

            {/* Drawer footer */}
            <motion.div
              className="px-7 py-6 flex-shrink-0"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                type: "spring",
                stiffness: 500,
                damping: 40,
                delay: 0.25,
                duration: 0.4,
              }}
            >
              <div className="flex items-center justify-between">
                {/* Social links */}
                <div className="flex items-center space-x-5">
                  <motion.a
                    href="https://github.com/milliwonkim"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
                    aria-label="Github"
                    whileHover={{ scale: 1.08, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    transition={{
                      type: "spring",
                      stiffness: 400,
                      damping: 17,
                    }}
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
                    className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
                    aria-label="Email"
                    whileHover={{ scale: 1.08, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    transition={{
                      type: "spring",
                      stiffness: 400,
                      damping: 17,
                    }}
                  >
                    <svg
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={1.5}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                  </motion.a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default Drawer;
