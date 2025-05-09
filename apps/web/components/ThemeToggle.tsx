"use client";

import { useEffect, useState } from "react";
import { motion } from "motion/react";

/**
 * @description 토스 스타일의 라이트/다크 테마 토글 컴포넌트
 * @returns 테마 전환 토글 버튼 UI
 */
export default function ThemeToggle() {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [mounted, setMounted] = useState(false);

  // 초기 테마 설정 및 마운트 상태 관리
  useEffect(() => {
    setMounted(true);

    // 로컬 스토리지에서 테마 불러오기 또는 시스템 설정 확인
    const savedTheme = localStorage.getItem("theme");
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;

    // 저장된 테마가 있으면 사용, 없으면 시스템 설정 따르기
    const initialTheme = savedTheme || (prefersDark ? "dark" : "light");
    document.documentElement.setAttribute("data-theme", initialTheme);
    setTheme(initialTheme as "light" | "dark");
  }, []);

  /**
   * 테마 전환 함수
   */
  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme);
  };

  // 서버 렌더링 시 불일치 방지
  if (!mounted) {
    return (
      <div className="w-[3.25rem] h-[1.75rem] rounded-full bg-gray-200 opacity-80" />
    );
  }

  return (
    <motion.button
      className="theme-toggle"
      onClick={toggleTheme}
      aria-label={`테마 전환: 현재 ${theme === "light" ? "라이트" : "다크"} 모드`}
      whileTap={{ scale: 0.95 }}
    >
      <span className="sun-icon">
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="12" cy="12" r="5" />
          <line x1="12" y1="1" x2="12" y2="3" />
          <line x1="12" y1="21" x2="12" y2="23" />
          <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
          <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
          <line x1="1" y1="12" x2="3" y2="12" />
          <line x1="21" y1="12" x2="23" y2="12" />
          <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
          <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
        </svg>
      </span>
      <span className="moon-icon">
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M21 12.79C20.8427 14.4922 20.2037 16.1144 19.1582 17.4668C18.1126 18.8192 16.7035 19.8458 15.0957 20.4265C13.4879 21.0073 11.7499 21.1181 10.0797 20.7461C8.40948 20.3741 6.8833 19.5345 5.67423 18.3255C4.46516 17.1165 3.62571 15.5904 3.25373 13.9203C2.88174 12.2501 2.99262 10.5121 3.57336 8.9043C4.1541 7.29651 5.18073 5.88737 6.53311 4.84182C7.88548 3.79627 9.50767 3.15731 11.21 3C10.2134 4.34827 9.73385 6.00945 9.85853 7.68141C9.98322 9.35338 10.7039 10.9251 11.8894 12.1106C13.0749 13.2961 14.6466 14.0168 16.3186 14.1415C17.9906 14.2662 19.6517 13.7866 21 12.79Z" />
        </svg>
      </span>
      <motion.span
        className="absolute top-1/2 -translate-y-1/2 bg-white h-[1.5rem] w-[1.5rem] rounded-full"
        initial={{ left: theme === "light" ? 2 : "calc(100% - 1.5rem - 2px)" }}
        animate={{
          left: theme === "light" ? 2 : "calc(100% - 1.5rem - 2px)",
          transition: { duration: 0.3, ease: [0.18, 0.68, 0.43, 0.99] },
        }}
        style={{ boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)" }}
      />
    </motion.button>
  );
}
