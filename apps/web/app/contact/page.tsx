"use client";

import { motion } from "motion/react";
import Layout from "../../components/layout/Layout";
import Link from "next/link";

/**
 * @description 연락처 페이지 컴포넌트
 */
export default function ContactPage() {
  const socialLinks = [
    {
      name: "Email",
      url: "mailto:kwk627@naver.com",
      icon: (
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
          />
        </svg>
      ),
    },
    {
      name: "LinkedIn",
      url: "https://www.linkedin.com/in/kiwon-kim-29b23b106/",
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
        </svg>
      ),
    },
    {
      name: "GitHub",
      url: "https://github.com/milliwonkim",
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
        </svg>
      ),
    },
    {
      name: "Blog",
      url: "https://velog.io/@milliwonkim/posts",
      icon: (
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"
          />
        </svg>
      ),
    },
  ];

  return (
    <Layout>
      <section className="py-20 bg-gradient-to-b from-[var(--color-gray-50)]/50 via-[var(--color-background)] to-[var(--color-background)] min-h-[calc(100vh-var(--header-height))]">
        <div className="container mx-auto px-6 md:px-8">
          <motion.div
            className="max-w-3xl mx-auto text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <div className="flex flex-col items-center gap-2 mb-6">
              <span className="text-4xl md:text-5xl">💬</span>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-[var(--color-text-primary)]">
                연락하기
              </h1>
            </div>
            <p className="text-lg text-[var(--color-text-secondary)] leading-relaxed">
              새로운 프로젝트나 협업에 대해 이야기하고 싶으시다면
              <br />
              아래의 채널로 언제든지 연락해주세요.
            </p>
          </motion.div>

          <motion.div
            className="max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {socialLinks.map((link, index) => (
                <motion.div
                  key={link.name}
                  className="flex"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.5,
                    delay: 0.3 + index * 0.1,
                    ease: "easeOut",
                  }}
                >
                  <Link
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex flex-col w-full items-start gap-4 p-6 bg-white/60 backdrop-blur-sm rounded-2xl border border-white/60 hover:border-[var(--color-primary)]/30 transition-all duration-300 hover:shadow-lg hover:scale-105"
                  >
                    <div className="text-[var(--color-primary)] group-hover:text-[var(--color-primary-hover)] transition-colors">
                      {link.icon}
                    </div>
                    <div className="flex flex-col">
                      <h3 className="font-semibold text-[var(--color-text-primary)] group-hover:text-[var(--color-primary)] transition-colors text-left">
                        {link.name}
                      </h3>
                      <p className="text-sm text-[var(--color-text-secondary)] text-left break-all">
                        {link.url
                          .replace(/^https?:\/\//, "")
                          .replace(/^mailto:/, "")}
                      </p>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* 추가 정보 섹션 */}
          <motion.div
            className="max-w-2xl mx-auto mt-16 text-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-8 border border-white/60">
              <h2 className="text-xl font-bold text-[var(--color-text-primary)] mb-4">
                함께 만들어가요! 🚀
              </h2>
              <p className="text-[var(--color-text-secondary)] leading-relaxed">
                새로운 아이디어나 프로젝트가 있으시다면 언제든지 연락해주세요.
                <br />
                함께 멋진 것을 만들어나갈 수 있을 거예요!
              </p>
            </div>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
}
