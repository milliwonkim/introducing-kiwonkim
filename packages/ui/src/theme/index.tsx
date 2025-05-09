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
export type Theme = "light" | "dark" | "system";

/**
 * @description 테마 컨텍스트 타입
 */
interface ThemeContextType {
  theme: Theme;
  resolvedTheme: "light" | "dark";
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

// 시스템 다크 모드 감지 미디어 쿼리
const MEDIA_QUERY = "(prefers-color-scheme: dark)";

/**
 * @description 토스 스타일 테마 Provider 컴포넌트 - 향상된 버전
 */
export function ThemeProvider({
  children,
  defaultTheme = "system",
}: ThemeProviderProps) {
  const [theme, setTheme] = useState<Theme>(defaultTheme);
  const [resolvedTheme, setResolvedTheme] = useState<"light" | "dark">("light");
  const [mounted, setMounted] = useState(false);

  // 시스템 테마 변경 감지 및 적용
  useEffect(() => {
    const mediaQuery = window.matchMedia(MEDIA_QUERY);

    const handleChange = () => {
      if (theme === "system") {
        const systemTheme = mediaQuery.matches ? "dark" : "light";
        setResolvedTheme(systemTheme);
        document.documentElement.setAttribute("data-theme", systemTheme);
      }
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, [theme]);

  // 초기 테마 설정 및 마운트 상태 관리
  useEffect(() => {
    setMounted(true);

    try {
      // 로컬 스토리지에서 테마 불러오기
      const savedTheme = localStorage.getItem("theme") as Theme | null;
      const initialTheme = savedTheme || defaultTheme;

      setTheme(initialTheme);

      // 실제 적용할 테마 결정 (system인 경우 시스템 설정 따르기)
      const mediaMatches = window.matchMedia(MEDIA_QUERY).matches;
      const actualTheme =
        initialTheme === "system"
          ? mediaMatches
            ? "dark"
            : "light"
          : initialTheme;

      setResolvedTheme(actualTheme as "light" | "dark");
      document.documentElement.setAttribute("data-theme", actualTheme);
    } catch (e) {
      console.error("테마 초기화 중 오류 발생:", e);
    }
  }, [defaultTheme]);

  // 테마 변경 시 HTML data-theme 속성 업데이트 및 로컬 스토리지에 저장
  useEffect(() => {
    if (!mounted) return;

    // 실제 적용할 테마 결정
    const actualTheme =
      theme === "system"
        ? window.matchMedia(MEDIA_QUERY).matches
          ? "dark"
          : "light"
        : theme;

    setResolvedTheme(actualTheme as "light" | "dark");
    document.documentElement.setAttribute("data-theme", actualTheme);
    localStorage.setItem("theme", theme);
  }, [theme, mounted]);

  // SSR에서 hydration 불일치 방지
  const value = {
    theme,
    resolvedTheme,
    setTheme,
  };

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
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
  const { theme, resolvedTheme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(resolvedTheme === "light" ? "dark" : "light");
  };

  return { theme, resolvedTheme, toggleTheme };
}

// ThemeToggle 컴포넌트 내보내기
export { ThemeToggle } from "./ThemeToggle";
