"use client";

import { motion } from "motion/react";

/**
 * @description 홈페이지 히어로 섹션 컴포넌트
 */
const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-white dark:bg-dark">
      {/* 배경 (단색 또는 심플한 그라디언트) */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 opacity-50" />

      {/* 텍스트 콘텐츠 (토스 스타일: 간결, 명확) */}
      <div className="container mx-auto px-6 md:px-8 z-10">
        <div className="max-w-3xl mx-auto text-center">
          <motion.h1
            className="text-4xl md:text-6xl font-bold mb-5 leading-tight text-gray-900 dark:text-white"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
          >
            안녕하세요, 프론트엔드 개발자
            <br />
            <span className="text-primary">김기원</span>입니다.
          </motion.h1>

          <motion.p
            className="text-lg md:text-xl mb-10 text-gray-600 dark:text-gray-300 max-w-xl mx-auto"
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
            className="flex flex-col sm:flex-row justify-center gap-4"
          >
            <a
              href="#about"
              className="inline-block bg-primary hover:bg-primary/90 text-white font-semibold px-8 py-3 rounded-lg transition-colors text-base"
            >
              더 알아보기
            </a>
            <a
              href="/contact"
              className="inline-block bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-800 dark:text-white font-semibold px-8 py-3 rounded-lg transition-colors text-base"
            >
              연락하기
            </a>
          </motion.div>
        </div>
      </div>

      {/* 아래로 스크롤 안내 (심플하게) */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-gray-500 dark:text-gray-400"
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
