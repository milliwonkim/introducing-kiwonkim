"use client";

import React, {
  createContext,
  useContext,
  ReactNode,
  useState,
  useEffect,
} from "react";

/**
 * @description 토스 스타일 디자인 시스템 테마 타입
 */
export type Theme = "light" | "dark";

/**
 * @description 테마 컨텍스트 타입
 */
interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

/**
 * @description 테마 Provider Props
 */
interface ThemeProviderProps {
  children: ReactNode;
  defaultTheme?: Theme;
}

// 테마 컨텍스트 생성
const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

/**
 * @description 토스 스타일 테마 Provider 컴포넌트
 */
export function ThemeProvider({
  children,
  defaultTheme = "light",
}: ThemeProviderProps) {
  const [theme, setTheme] = useState<Theme>(defaultTheme);
  const [mounted, setMounted] = useState(false);

  // 초기 테마 설정 및 마운트 상태 관리
  useEffect(() => {
    setMounted(true);

    try {
      // 로컬 스토리지에서 테마 불러오기 또는 시스템 설정 확인
      const savedTheme = localStorage.getItem("theme");
      const prefersDark = window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches;

      // 저장된 테마가 있으면 사용, 없으면 시스템 설정 따르기
      const initialTheme =
        (savedTheme as Theme) || (prefersDark ? "dark" : "light");
      setTheme(initialTheme);
      document.documentElement.setAttribute("data-theme", initialTheme);
    } catch (e) {
      console.error("테마 초기화 중 오류 발생:", e);
    }
  }, []);

  // 테마 변경 시 HTML data-theme 속성 업데이트 및 로컬 스토리지에 저장
  useEffect(() => {
    if (!mounted) return;

    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme, mounted]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

/**
 * @description 테마 사용을 위한 hook
 */
export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}

/**
 * @description 테마 토글 hook
 */
export function useThemeToggle() {
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return { theme, toggleTheme };
}

// ThemeToggle 컴포넌트 내보내기
export { ThemeToggle } from "./ThemeToggle";
