"use client";

import { ReactNode } from "react";
import Navbar from "./Navbar";

/**
 * @description 모든 페이지에서 사용되는 기본 레이아웃 컴포넌트
 * @param children 레이아웃 내부에 렌더링될 콘텐츠
 */
interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="flex flex-col min-h-screen bg-background text-text-primary">
      <Navbar />
      <main className="flex-grow pt-[var(--header-height)] fade-in">
        {children}
      </main>
    </div>
  );
};

export default Layout;
