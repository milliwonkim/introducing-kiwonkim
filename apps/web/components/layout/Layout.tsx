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
    <div className="min-h-screen bg-gradient-to-br from-[var(--color-background)] via-[var(--color-background)] to-slate-50/50">
      {/* 배경 장식 요소들 */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400/10 to-purple-400/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-green-400/10 to-blue-400/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-purple-400/5 to-pink-400/5 rounded-full blur-3xl" />
      </div>

      {/* 네비게이션 */}
      <Navbar />

      {/* 메인 콘텐츠 */}
      <main className="relative z-10 pt-[var(--header-height)]">
        <div className="min-h-[calc(100vh-var(--header-height))]">
          {children}
        </div>
      </main>

      {/* 푸터 */}
      <footer className="relative z-10 bg-slate-50/80 backdrop-blur-sm border-t border-slate-200/50">
        <div className="container mx-auto px-6 md:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* 브랜드 섹션 */}
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-[var(--color-text-primary)]">
                김기원 포트폴리오
              </h3>
              <p className="text-[var(--color-text-secondary)] leading-relaxed">
                React, Next.js, TypeScript로 사용자 중심의 웹 경험을 만드는
                프론트엔드 개발자입니다.
              </p>
            </div>

            {/* 빠른 링크 */}
            <div className="space-y-4">
              <h4 className="font-semibold text-[var(--color-text-primary)]">
                빠른 링크
              </h4>
              <nav className="flex flex-col space-y-2">
                <a
                  href="/skills"
                  className="text-[var(--color-text-secondary)] hover:text-[var(--color-primary)] transition-colors"
                >
                  기술 스택
                </a>
                <a
                  href="/projects"
                  className="text-[var(--color-text-secondary)] hover:text-[var(--color-primary)] transition-colors"
                >
                  프로젝트
                </a>
                <a
                  href="/blog"
                  className="text-[var(--color-text-secondary)] hover:text-[var(--color-primary)] transition-colors"
                >
                  블로그
                </a>
                <a
                  href="/contact"
                  className="text-[var(--color-text-secondary)] hover:text-[var(--color-primary)] transition-colors"
                >
                  연락하기
                </a>
              </nav>
            </div>

            {/* 소셜 링크 */}
            <div className="space-y-4">
              <h4 className="font-semibold text-[var(--color-text-primary)]">
                연결하기
              </h4>
              <div className="flex space-x-4">
                <a
                  href="https://github.com/kiwonkim"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 text-[var(--color-text-secondary)] hover:text-[var(--color-primary)] hover:bg-[var(--color-primary)]/10 rounded-lg transition-all duration-200"
                  aria-label="GitHub"
                >
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
                  </svg>
                </a>
                <a
                  href="mailto:contact@example.com"
                  className="p-2 text-[var(--color-text-secondary)] hover:text-[var(--color-primary)] hover:bg-[var(--color-primary)]/10 rounded-lg transition-all duration-200"
                  aria-label="이메일"
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                </a>
              </div>
            </div>
          </div>

          {/* 하단 저작권 */}
          <div className="mt-8 pt-8 border-t border-slate-200/50 text-center">
            <p className="text-[var(--color-text-secondary)] text-sm">
              © 2024 김기원. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
