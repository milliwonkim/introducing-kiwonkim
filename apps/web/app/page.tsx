"use client";

import { motion } from "motion/react";
import Layout from "../components/layout/Layout";
import Link from "next/link";
import { useState, useEffect } from "react";

/**
 * @description 메인 홈 페이지 - 기술스택, 블로그, 프로젝트로 이동하는 네비게이션 중심 화면
 */
export default function Home() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // 메인 네비게이션 카드들
  const navigationCards = [
    {
      title: "기술 스택",
      description: "사용하는 기술들과 전문성을 확인해보세요",
      href: "/skills",
      icon: "⚡",
      gradient: "from-blue-500 to-purple-600",
      bgColor: "bg-blue-50/50",
      delay: 0.1,
    },
    {
      title: "프로젝트",
      description: "완성한 프로젝트들과 개발 경험을 살펴보세요",
      href: "/projects",
      icon: "🚀",
      gradient: "from-purple-500 to-pink-600",
      bgColor: "bg-purple-50/50",
      delay: 0.2,
    },
    {
      title: "블로그",
      description: "개발 경험과 학습 내용을 공유합니다",
      href: "/blog",
      icon: "📝",
      gradient: "from-green-500 to-teal-600",
      bgColor: "bg-green-50/50",
      delay: 0.3,
    },
  ];

  if (!isMounted) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="w-8 h-8 border-2 border-[var(--color-primary)] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <h1 className="text-2xl font-bold text-[var(--color-text-primary)] mb-2">
              김기원 포트폴리오
            </h1>
            <p className="text-[var(--color-text-secondary)]">로딩 중...</p>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      {/* 히어로 섹션 */}
      <section className="relative py-20 overflow-hidden">
        <div className="container mx-auto px-6 md:px-8 max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-20"
          >
            <motion.span
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="inline-block text-[var(--color-primary)] font-semibold text-sm md:text-base mb-6 px-4 py-2 bg-[var(--color-primary)]/10 rounded-full tracking-wide border border-[var(--color-primary)]/20"
            >
              ✨ 프론트엔드 개발자
            </motion.span>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="text-4xl md:text-6xl lg:text-7xl font-black text-[var(--color-text-primary)] leading-tight mb-6"
            >
              <span className="block">안녕하세요,</span>
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[var(--color-primary)] to-purple-600">
                김기원
              </span>
              <span className="block">입니다</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="text-lg md:text-xl text-[var(--color-text-secondary)] mb-12 max-w-2xl mx-auto leading-relaxed"
            >
              React, Next.js, TypeScript로 사용자 중심의 웹 경험을 만듭니다.
              <br className="hidden md:block" />
              아래에서 저의 작업과 경험을 확인해보세요.
            </motion.p>
          </motion.div>

          {/* 네비게이션 카드들 */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-20"
          >
            {navigationCards.map((card, index) => (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: card.delay + 0.8, duration: 0.6 }}
                whileHover={{ y: -8, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Link href={card.href} className="group block h-full">
                  <div
                    className={`relative h-full p-6 rounded-2xl ${card.bgColor} backdrop-blur-sm border border-white/60 shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden`}
                  >
                    {/* 배경 그라데이션 효과 */}
                    <div
                      className={`absolute inset-0 bg-gradient-to-br ${card.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}
                    />

                    {/* 아이콘 */}
                    <div className="relative z-10 mb-4">
                      <div
                        className={`inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br ${card.gradient} text-white text-xl shadow-lg group-hover:scale-110 transition-transform duration-300`}
                      >
                        {card.icon}
                      </div>
                    </div>

                    {/* 콘텐츠 */}
                    <div className="relative z-10">
                      <h3 className="text-xl font-bold text-[var(--color-text-primary)] mb-3 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-[var(--color-primary)] group-hover:to-purple-600 transition-all duration-300">
                        {card.title}
                      </h3>
                      <p className="text-[var(--color-text-secondary)] leading-relaxed mb-4 text-sm">
                        {card.description}
                      </p>
                      <div className="flex items-center text-[var(--color-primary)] font-medium text-sm group-hover:translate-x-2 transition-transform duration-300">
                        자세히 보기
                        <svg
                          className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform duration-300"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M17 8l4 4m0 0l-4 4m4-4H3"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>

          {/* 간단한 소개 섹션 */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.8 }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-8 border border-white/60">
              <h2 className="text-2xl font-bold text-[var(--color-text-primary)] mb-4">
                함께 만들어가는 웹의 미래
              </h2>
              <p className="text-[var(--color-text-secondary)] leading-relaxed mb-6">
                사용자 경험을 최우선으로 생각하며, 최신 기술을 활용해 직관적이고
                아름다운 웹 애플리케이션을 개발합니다. 새로운 도전과 학습을 통해
                지속적으로 성장하고 있습니다.
              </p>
              <div className="flex flex-wrap justify-center gap-3">
                <span className="px-3 py-1 text-xs font-medium text-[var(--color-primary)] bg-[var(--color-primary)]/10 rounded-full border border-[var(--color-primary)]/20">
                  React
                </span>
                <span className="px-3 py-1 text-xs font-medium text-[var(--color-primary)] bg-[var(--color-primary)]/10 rounded-full border border-[var(--color-primary)]/20">
                  Next.js
                </span>
                <span className="px-3 py-1 text-xs font-medium text-[var(--color-primary)] bg-[var(--color-primary)]/10 rounded-full border border-[var(--color-primary)]/20">
                  TypeScript
                </span>
                <span className="px-3 py-1 text-xs font-medium text-[var(--color-primary)] bg-[var(--color-primary)]/10 rounded-full border border-[var(--color-primary)]/20">
                  TailwindCSS
                </span>
              </div>
            </div>
          </motion.div>

          {/* 연락하기 섹션 */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.4, duration: 0.8 }}
            className="text-center"
          >
            <p className="text-lg text-[var(--color-text-secondary)] mb-8">
              함께 세상에 더 나은 것을 만들어 나가고 싶다면
            </p>
            <Link
              href="/contact"
              className="group inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-white bg-gradient-to-r from-[var(--color-primary)] to-purple-600 rounded-xl shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
            >
              💬 연락하기
              <svg
                className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-300"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </Link>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
}
