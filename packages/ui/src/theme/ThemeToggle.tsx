"use client";

import { useEffect, useState } from "react";
import { useThemeToggle } from "./index";
import { motion } from "framer-motion";

/**
 * @description 라이트/다크 테마 토글 컴포넌트 - WRTN 스타일
 * @returns 테마 전환 토글 버튼 UI
 */
export function ThemeToggle() {
  const { theme, resolvedTheme, toggleTheme } = useThemeToggle();
  const [mounted, setMounted] = useState(false);

  // 마운트 상태 관리
  useEffect(() => {
    setMounted(true);
  }, []);

  // 서버 렌더링 시 불일치 방지
  if (!mounted) {
    return <div className="w-8 h-8 opacity-0" />;
  }

  const isDark = resolvedTheme === "dark";

  return (
    <motion.button
      className="theme-toggle-button"
      onClick={toggleTheme}
      whileTap={{ scale: 0.92 }}
      whileHover={{ scale: 1.05 }}
      aria-label={`테마 전환: 현재 ${isDark ? "다크" : "라이트"} 모드`}
    >
      {isDark ? (
        <motion.svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          initial={{ scale: 0.7, rotate: -30, opacity: 0 }}
          animate={{ scale: 1, rotate: 0, opacity: 1 }}
          exit={{ scale: 0.7, rotate: 30, opacity: 0 }}
          transition={{ duration: 0.2, ease: [0.165, 0.84, 0.44, 1] }}
          className="text-gray-300"
        >
          <path
            d="M12 3a1 1 0 0 1 1 1v1a1 1 0 1 1-2 0V4a1 1 0 0 1 1-1ZM19.071 4.929a1 1 0 0 1 0 1.414l-.707.707a1 1 0 1 1-1.414-1.414l.707-.707a1 1 0 0 1 1.414 0ZM16 12a4 4 0 1 1-8 0 4 4 0 0 1 8 0ZM4 12a1 1 0 0 1 1-1h1a1 1 0 1 1 0 2H5a1 1 0 0 1-1-1ZM12 19a1 1 0 0 1 1 1v1a1 1 0 1 1-2 0v-1a1 1 0 0 1 1-1ZM19.071 19.071a1 1 0 0 1-1.414 0l-.707-.707a1 1 0 0 1 1.414-1.414l.707.707a1 1 0 0 1 0 1.414ZM4.929 19.071a1 1 0 0 1 0-1.414l.707-.707a1 1 0 0 1 1.414 1.414l-.707.707a1 1 0 0 1-1.414 0ZM4.929 4.929a1 1 0 0 1 1.414 0l.707.707A1 1 0 1 1 5.636 7.05l-.707-.707a1 1 0 0 1 0-1.414ZM18 12a1 1 0 0 1 1-1h1a1 1 0 1 1 0 2h-1a1 1 0 0 1-1-1Z"
            fill="currentColor"
          />
        </motion.svg>
      ) : (
        <motion.svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          initial={{ scale: 0.7, rotate: 30, opacity: 0 }}
          animate={{ scale: 1, rotate: 0, opacity: 1 }}
          exit={{ scale: 0.7, rotate: -30, opacity: 0 }}
          transition={{ duration: 0.2, ease: [0.165, 0.84, 0.44, 1] }}
          className="text-gray-700"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M9.528 1.718a.75.75 0 01.162.819A8.97 8.97 0 009 6a9 9 0 009 9 8.97 8.97 0 003.463-.69.75.75 0 01.981.98 10.503 10.503 0 01-9.694 6.46c-5.799 0-10.5-4.701-10.5-10.5 0-4.368 2.667-8.112 6.46-9.694a.75.75 0 01.818.162z"
            fill="currentColor"
          />
        </motion.svg>
      )}
    </motion.button>
  );
}
