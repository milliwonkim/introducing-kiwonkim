"use client";

import { motion } from "motion/react";
import Layout from "../../components/layout/Layout";
import SkillsSection from "../../components/home/SkillsSection";

/**
 * @description 기술 스택 페이지 컴포넌트
 */
export default function SkillsPage() {
  return (
    <Layout>
      <section className="pt-24 pb-12 lg:pt-32 lg:pb-16 bg-gray-50 dark:bg-dark">
        <div className="container mx-auto px-6 md:px-8">
          <motion.div
            className="max-w-3xl mx-auto text-center mb-10 lg:mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-gray-900 dark:text-white">
              기술 스택
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              주요 기술 스택과 개발 역량, 경험을 소개합니다.
            </p>
          </motion.div>
        </div>
      </section>

      <SkillsSection />

      <section className="py-24 lg:py-32 bg-white dark:bg-gray-800">
        <div className="container mx-auto px-6 md:px-8">
          <div className="max-w-4xl mx-auto">
            <motion.h2
              className="text-2xl md:text-3xl font-bold mb-12 lg:mb-16 text-center text-gray-900 dark:text-white"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
            >
              개발 방법론 및 소프트 스킬
            </motion.h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
              <motion.div
                className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6 md:p-8 shadow-sm border border-gray-100 dark:border-gray-600"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
              >
                <h3 className="text-xl font-semibold mb-5 text-gray-900 dark:text-white">
                  개발 방법론
                </h3>
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <svg
                      className="h-5 w-5 text-primary flex-shrink-0 mr-3 mt-0.5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={3}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <div>
                      <h4 className="font-medium text-gray-800 dark:text-gray-100">
                        애자일 & 스크럼
                      </h4>
                      <p className="text-gray-600 dark:text-gray-300 text-sm">
                        반복적 개발, 빠른 피드백 반영, 효율적 협업
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <svg
                      className="h-5 w-5 text-primary flex-shrink-0 mr-3 mt-0.5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={3}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <div>
                      <h4 className="font-medium text-gray-800 dark:text-gray-100">
                        TDD (테스트 주도 개발)
                      </h4>
                      <p className="text-gray-600 dark:text-gray-300 text-sm">
                        견고하고 유지보수 용이한 코드 작성
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <svg
                      className="h-5 w-5 text-primary flex-shrink-0 mr-3 mt-0.5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={3}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <div>
                      <h4 className="font-medium text-gray-800 dark:text-gray-100">
                        CI/CD
                      </h4>
                      <p className="text-gray-600 dark:text-gray-300 text-sm">
                        자동화된 빌드, 테스트, 배포 파이프라인 구축
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <svg
                      className="h-5 w-5 text-primary flex-shrink-0 mr-3 mt-0.5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={3}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <div>
                      <h4 className="font-medium text-gray-800 dark:text-gray-100">
                        코드 리뷰
                      </h4>
                      <p className="text-gray-600 dark:text-gray-300 text-sm">
                        팀 코드 품질 향상 및 지식 공유
                      </p>
                    </div>
                  </li>
                </ul>
              </motion.div>

              <motion.div
                className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6 md:p-8 shadow-sm border border-gray-100 dark:border-gray-600"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.3, ease: "easeOut" }}
              >
                <h3 className="text-xl font-semibold mb-5 text-gray-900 dark:text-white">
                  소프트 스킬
                </h3>
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <svg
                      className="h-5 w-5 text-secondary flex-shrink-0 mr-3 mt-0.5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={3}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <div>
                      <h4 className="font-medium text-gray-800 dark:text-gray-100">
                        커뮤니케이션
                      </h4>
                      <p className="text-gray-600 dark:text-gray-300 text-sm">
                        명확하고 효과적인 기술 및 비기술적 소통
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <svg
                      className="h-5 w-5 text-secondary flex-shrink-0 mr-3 mt-0.5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={3}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <div>
                      <h4 className="font-medium text-gray-800 dark:text-gray-100">
                        문제 해결
                      </h4>
                      <p className="text-gray-600 dark:text-gray-300 text-sm">
                        논리적 분석 및 창의적 해결책 제시
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <svg
                      className="h-5 w-5 text-secondary flex-shrink-0 mr-3 mt-0.5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={3}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <div>
                      <h4 className="font-medium text-gray-800 dark:text-gray-100">
                        빠른 학습 및 적응력
                      </h4>
                      <p className="text-gray-600 dark:text-gray-300 text-sm">
                        새로운 기술 및 도메인 지식 습득
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <svg
                      className="h-5 w-5 text-secondary flex-shrink-0 mr-3 mt-0.5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={3}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <div>
                      <h4 className="font-medium text-gray-800 dark:text-gray-100">
                        팀워크 및 협업
                      </h4>
                      <p className="text-gray-600 dark:text-gray-300 text-sm">
                        긍정적 태도와 적극적인 자세로 팀 기여
                      </p>
                    </div>
                  </li>
                </ul>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
