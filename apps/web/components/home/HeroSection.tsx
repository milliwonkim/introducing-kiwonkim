"use client";

import { motion } from "motion/react";

/**
 * @description 홈페이지 히어로 섹션 컴포넌트
 */
const HeroSection = () => {
  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden py-24">
      {/* 배경 (감성 있는 그라디언트 + 글래스 라이트) */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_12%_18%,rgba(59,130,246,0.2),transparent_60%)] dark:bg-[radial-gradient(circle_at_15%_18%,rgba(59,130,246,0.35),transparent_65%)] opacity-80" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_85%_12%,rgba(56,189,248,0.18),transparent_62%)] dark:bg-[radial-gradient(circle_at_82%_15%,rgba(14,165,233,0.25),transparent_60%)] opacity-75" />
        <div className="absolute inset-0 bg-gradient-to-b from-white/85 via-white/35 to-transparent dark:from-slate-950/82 dark:via-slate-950/35 dark:to-transparent" />
      </div>

      {/* 텍스트 콘텐츠 (토스 스타일: 간결, 명확) */}
      <div className="container relative z-10 mx-auto px-6 md:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <motion.h1
            className="text-balance text-4xl font-bold leading-tight text-gray-900 dark:text-white md:text-6xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
          >
            안녕하세요, 프론트엔드 개발자
            <br />
            <span className="bg-gradient-to-r from-primary to-blue-400 dark:from-blue-300 dark:to-sky-400 bg-clip-text text-transparent">
              김기원
            </span>
            입니다.
          </motion.h1>

          <motion.p
            className="mx-auto mb-10 max-w-2xl text-lg text-gray-600 dark:text-gray-300 md:text-xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
          >
            사용자 경험을 최우선으로 생각하며, 안정적이고 확장 가능한 웹
            애플리케이션을 만듭니다.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
            className="flex flex-col items-center justify-center gap-4 sm:flex-row"
          >
            <a
              href="#about"
              className="inline-flex items-center justify-center rounded-full bg-primary px-8 py-3 text-base font-semibold text-white shadow-[0_18px_40px_-20px_rgba(37,99,235,0.55)] transition-transform duration-300 hover:-translate-y-0.5 hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
            >
              더 알아보기
            </a>
            <a
              href="/contact"
              className="inline-flex items-center justify-center rounded-full border border-gray-200/70 dark:border-slate-700/60 bg-white/80 dark:bg-slate-950/60 px-8 py-3 text-base font-semibold text-gray-800 dark:text-slate-200 backdrop-blur-md transition-transform duration-300 hover:-translate-y-0.5 hover:bg-white/90 dark:hover:bg-slate-900/60"
            >
              연락하기
            </a>
          </motion.div>
        </div>
      </div>

      {/* 아래로 스크롤 안내 (심플하게) */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-gray-500 dark:text-gray-400/80"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          delay: 1.2,
          duration: 1.5,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "easeInOut",
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </motion.div>
    </section>
  );
};

export default HeroSection;
