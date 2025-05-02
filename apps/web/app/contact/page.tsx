"use client";

import { motion } from "motion/react";
import Layout from "../../components/layout/Layout";

/**
 * @description 토스 스타일의 애니메이션이 적용된 연락처 페이지 컴포넌트
 */
export default function ContactPage() {
  return (
    <Layout>
      <section className="py-20 min-h-[calc(100vh-var(--header-height))]">
        <div className="container mx-auto px-6 md:px-8">
          <div className="max-w-5xl mx-auto">
            <motion.div
              className="text-center mb-16"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
            >
              <span className="text-primary font-medium text-sm md:text-base mb-4 block tracking-wide">
                CONTACT
              </span>
              <h1 className="text-3xl md:text-5xl font-bold mb-6 text-gray-900 dark:text-white">
                함께 이야기해요
              </h1>
              <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                새로운 프로젝트, 협업 제안, 또는 질문이 있으신가요? 언제든지
                편하게 연락주세요.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-16">
              <motion.div
                className="rounded-3xl p-8 bg-white dark:bg-gray-800 shadow-sm border border-gray-100 dark:border-gray-700"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.6,
                  delay: 0.1,
                  ease: [0.23, 1, 0.32, 1],
                }}
              >
                <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
                  메시지 보내기
                </h2>
                <form className="space-y-6">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300"
                    >
                      이름
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      placeholder="홍길동"
                      className="w-full px-4 py-3 rounded-2xl border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-primary/50 dark:bg-gray-700 text-gray-900 dark:text-white transition-shadow"
                      required
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300"
                    >
                      이메일
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      placeholder="example@email.com"
                      className="w-full px-4 py-3 rounded-2xl border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-primary/50 dark:bg-gray-700 text-gray-900 dark:text-white transition-shadow"
                      required
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="subject"
                      className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300"
                    >
                      제목
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      placeholder="문의 제목을 입력해주세요"
                      className="w-full px-4 py-3 rounded-2xl border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-primary/50 dark:bg-gray-700 text-gray-900 dark:text-white transition-shadow"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="message"
                      className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300"
                    >
                      메시지
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={5}
                      placeholder="내용을 입력해주세요"
                      className="w-full px-4 py-3 rounded-2xl border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-primary/50 dark:bg-gray-700 resize-none text-gray-900 dark:text-white transition-shadow"
                      required
                    ></textarea>
                  </div>

                  <motion.button
                    type="submit"
                    className="w-full bg-primary hover:bg-primary/90 text-white font-medium py-3.5 px-6 rounded-2xl transition-colors text-base"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    보내기
                  </motion.button>
                </form>
              </motion.div>

              <motion.div
                className="rounded-3xl overflow-hidden"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.6,
                  delay: 0.2,
                  ease: [0.23, 1, 0.32, 1],
                }}
              >
                <div className="rounded-3xl overflow-hidden bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-700 p-8 h-full">
                  <h2 className="text-2xl font-bold mb-8 text-gray-900 dark:text-white">
                    연락처
                  </h2>
                  <div className="space-y-8">
                    <motion.div
                      className="flex items-start"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, delay: 0.3 }}
                    >
                      <div className="flex-shrink-0 bg-white dark:bg-gray-900 w-10 h-10 rounded-lg flex items-center justify-center text-primary shadow-sm">
                        <svg
                          className="h-5 w-5"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={2}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                          />
                        </svg>
                      </div>
                      <div className="ml-4">
                        <h3 className="text-base font-medium text-gray-900 dark:text-white">
                          이메일
                        </h3>
                        <a
                          href="mailto:kiwon@example.com"
                          className="text-gray-600 dark:text-gray-300 hover:text-primary transition-colors"
                        >
                          kiwon@example.com
                        </a>
                      </div>
                    </motion.div>

                    <motion.div
                      className="flex items-start"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, delay: 0.4 }}
                    >
                      <div className="flex-shrink-0 bg-white dark:bg-gray-900 w-10 h-10 rounded-lg flex items-center justify-center text-primary shadow-sm">
                        <svg
                          className="h-5 w-5"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={2}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                          />
                        </svg>
                      </div>
                      <div className="ml-4">
                        <h3 className="text-base font-medium text-gray-900 dark:text-white">
                          전화번호
                        </h3>
                        <p className="text-gray-600 dark:text-gray-300">
                          010-1234-5678
                        </p>
                      </div>
                    </motion.div>

                    <motion.div
                      className="flex items-start"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, delay: 0.5 }}
                    >
                      <div className="flex-shrink-0 bg-white dark:bg-gray-900 w-10 h-10 rounded-lg flex items-center justify-center text-primary shadow-sm">
                        <svg
                          className="h-5 w-5"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={2}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                        </svg>
                      </div>
                      <div className="ml-4">
                        <h3 className="text-base font-medium text-gray-900 dark:text-white">
                          주소
                        </h3>
                        <p className="text-gray-600 dark:text-gray-300">
                          서울특별시 강남구
                        </p>
                      </div>
                    </motion.div>

                    <div className="pt-10 mt-8 border-t border-gray-200 dark:border-gray-600">
                      <h3 className="text-base font-medium mb-6 text-gray-900 dark:text-white">
                        소셜 미디어
                      </h3>
                      <div className="flex space-x-5">
                        <motion.a
                          href="https://github.com/"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="bg-white dark:bg-gray-900 p-3 rounded-lg shadow-sm text-gray-700 hover:text-primary dark:text-gray-300 dark:hover:text-primary transition-colors"
                          aria-label="GitHub"
                          whileHover={{ scale: 1.05, y: -2 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <svg
                            className="h-5 w-5"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
                          </svg>
                        </motion.a>
                        <motion.a
                          href="https://linkedin.com/"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="bg-white dark:bg-gray-900 p-3 rounded-lg shadow-sm text-gray-700 hover:text-primary dark:text-gray-300 dark:hover:text-primary transition-colors"
                          aria-label="LinkedIn"
                          whileHover={{ scale: 1.05, y: -2 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <svg
                            className="h-5 w-5"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                          </svg>
                        </motion.a>
                        <motion.a
                          href="https://twitter.com/"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="bg-white dark:bg-gray-900 p-3 rounded-lg shadow-sm text-gray-700 hover:text-primary dark:text-gray-300 dark:hover:text-primary transition-colors"
                          aria-label="Twitter"
                          whileHover={{ scale: 1.05, y: -2 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <svg
                            className="h-5 w-5"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                          </svg>
                        </motion.a>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
