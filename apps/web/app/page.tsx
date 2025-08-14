"use client";

import { motion } from "motion/react";
import Link from "next/link";
import { generateResumePDF } from "@/utils/generateResumePdf";

// SVG 아이콘 컴포넌트
const DownloadIcon = ({ size = 18 }: { size?: number }) => (
  <svg
    width={size}
    height={size}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
    />
  </svg>
);

const ExternalLinkIcon = ({ size = 18 }: { size?: number }) => (
  <svg
    width={size}
    height={size}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
    />
  </svg>
);

const CalendarIcon = ({ size = 14 }: { size?: number }) => (
  <svg
    width={size}
    height={size}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
    />
  </svg>
);

const MapPinIcon = ({ size = 14 }: { size?: number }) => (
  <svg
    width={size}
    height={size}
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
);

const MailIcon = ({ size = 16 }: { size?: number }) => (
  <svg
    width={size}
    height={size}
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
);

const PhoneIcon = ({ size = 16 }: { size?: number }) => (
  <svg
    width={size}
    height={size}
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
);

const experiences = [
  {
    title: "프론트엔드 개발자",
    company: "넥슨코리아",
    period: "2023.10 - 현재",
    location: "서울, 대한민국",
    description: [
      "메이플스토리 아이템 관리 코드 생성기 플랫폼 개발 (React, TypeScript, Vite)",
      "메이플스토리 운영툴 2.0 CS 처리 시스템 구축 및 종합적인 디자인 시스템 설계",
      "Playwright를 활용한 E2E 테스팅 구현으로 코드 품질 향상 (30% 버그 감소)",
      "Storybook 기반 디자인 시스템 구축 및 컴포넌트 관리 체계 확립",
      "기술스택: React, TypeScript, Vite, @tanstack/react-query, Redux, MUI, Tailwind CSS",
    ],
  },
  {
    title: "프론트엔드 개발자",
    company: "한샘",
    period: "2023.07 - 2023.10",
    location: "서울, 대한민국",
    description: [
      "한샘 리모델링 프론트엔드 서비스 개발 및 유지보수",
      "한샘 어드민 페이지 구축으로 내부 운영 효율성 20% 향상",
      "매장찾기 PC 페이지 리뉴얼을 통한 사용자 경험 개선",
      "기술스택: Next.js, React, TypeScript, AWS",
    ],
  },
  {
    title: "프론트엔드 개발자",
    company: "위메프",
    period: "2022.06 - 2023.05",
    location: "서울, 대한민국",
    description: [
      "위메프 디자인 시스템(WDS) React, Vue2, Vue3 버전 개발 및 배포",
      "WDS Admin(WDSA) 백오피스 시스템 구축 및 종합적인 테스팅 환경 구축",
      "WDS 사용량 통계 수집 Chrome Extension 개발 (전사 컴포넌트 사용률 90% 향상)",
      "Node.js 기반 WDS 사용률 추출 자동화 파이프라인 구축",
      "UI를 통한 수동 크롤링 보완 웹 크롤링 플랫폼 개발",
      "🏆 2022년 4분기 위메프 베스트 프랙티스 어워드 수상 (크롤링 플랫폼 개발)",
      "기술스택: React, Vue2, Vue3, Node.js, TypeScript, Jest, Testing Library, Cypress",
    ],
  },
  {
    title: "프론트엔드 개발자",
    company: "라플레이스 테크놀로지스",
    period: "2021.03 - 2022.06",
    location: "서울, 대한민국",
    description: [
      "데이터 기반 사업 진단 및 맞춤형 전략 추천 솔루션 개발",
      "랜딩페이지, 인증 시스템, 문의 페이지 구축",
      "ECharts, D3.js를 활용한 데이터 시각화 차트 구현",
      "프론트엔드 개발 전반 및 배포 프로세스 담당",
      "기술스택: React, TypeScript, styled-components, Jest, Testing Library, ECharts, D3.js",
    ],
  },
];

const education = [
  {
    degree: "도시계획·부동산학과 학사",
    school: "중앙대학교 (서울캠퍼스)",
    period: "2014.03 - 2021.02",
    location: "서울, 대한민국",
    additional: "창업학 복수전공",
  },
  {
    degree: "프론트엔드 개발 교육과정",
    school: "멋쟁이사자처럼 8기",
    period: "2020.03 - 2020.12",
    location: "서울, 대한민국",
    additional: "Python, Django 백엔드 개발 포함",
  },
];

const skills = {
  프론트엔드: [
    "React",
    "Next.js",
    "TypeScript",
    "JavaScript",
    "Vue2",
    "Vue3",
    "HTML/CSS",
  ],
  스타일링: ["Tailwind CSS", "styled-components", "MUI", "SCSS"],
  상태관리: [
    "Redux",
    "@tanstack/react-query",
    "@tanstack/react-table",
    "Zustand",
  ],
  테스팅: ["Jest", "Testing Library", "Cypress", "Playwright"],
  빌드도구: ["Vite", "Webpack", "Storybook"],
  "백엔드 & 데이터베이스": [
    "Node.js",
    "Express",
    "Python",
    "Django",
    "PostgreSQL",
    "MongoDB",
  ],
  "클라우드 & DevOps": ["AWS", "Jenkins", "CodeBuild", "S3", "Vercel"],
  "데이터 시각화": ["D3.js", "ECharts", "Chart.js"],
  "도구 & 기타": [
    "Git",
    "GitHub",
    "Docker",
    "Figma",
    "VS Code",
    "Chrome Extension 개발",
  ],
};

const certifications = [
  {
    name: "정보처리산업기사",
    issuer: "한국산업인력공단",
    date: "2021.06",
  },
  {
    name: "컴활 1급",
    issuer: "대한상공회의소",
    date: "2020.12",
  },
];

const mail1 = "kwk627@naver.com";
const mail2 = "rldnjs9347@gmail.com";

/**
 * @description 김기원 프론트엔드 개발자 이력서 - 전문적이고 결과 중심의 포트폴리오
 */
export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* 헤더 섹션 */}
      <section className="pt-28 pb-16 px-6">
        <div className="container mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              김기원 (Kiwon Kim)
            </h1>
            <p className="text-xl text-gray-600 mb-2">프론트엔드 개발자</p>
            <p className="text-lg text-gray-500 mb-6">Frontend Developer</p>
            <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-500 mb-8">
              <div className="flex items-start gap-1">
                <MapPinIcon size={16} />
                <span>서울, 대한민국</span>
              </div>
              <div className="flex flex-col gap-[8px] items-start">
                <div className="flex items-center gap-1">
                  <MailIcon size={16} />
                  <a href={`mailto:${mail1}`}>{mail1}</a>
                </div>
                <div className="flex items-center gap-1">
                  <MailIcon size={16} />
                  <a href={`mailto:${mail2}`}>{mail2}</a>
                </div>
              </div>
            </div>

            {/* 액션 버튼 */}
            <div className="flex flex-wrap justify-center gap-4">
              <motion.button
                onClick={generateResumePDF}
                className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <DownloadIcon size={18} />
                이력서 다운로드
              </motion.button>
              <motion.a
                href="https://github.com/milliwonkim"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-gray-800 text-white rounded-lg font-medium hover:bg-gray-900 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <ExternalLinkIcon size={18} />
                GitHub 보기
              </motion.a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 메인 콘텐츠 */}
      <section className="pb-20 px-6">
        <div className="container mx-auto max-w-4xl">
          <div className="grid gap-12">
            {/* 전문 요약 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="bg-white rounded-2xl shadow-lg p-8"
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                전문 요약
              </h2>
              <p className="text-gray-600 leading-relaxed">
                <strong>3년+ 프론트엔드 개발 경력</strong>을 보유한 개발자로,
                게임(넥슨), 이커머스(위메프), 인테리어(한샘) 등 다양한
                도메인에서 확장 가능한 웹 애플리케이션을 구축했습니다.
                <strong>React 생태계 전문가</strong>로 디자인 시스템, 테스팅
                프레임워크, 성능 최적화에 특화되어 있으며,
                <strong>베스트 프랙티스 어워드 수상</strong> 경력을 통해 입증된
                혁신적 솔루션 개발 능력을 보유하고 있습니다. 대규모 서비스
                개발과 운영 경험을 바탕으로{" "}
                <strong>즉시 투입 가능한 실력</strong>을 갖추고 있습니다.
              </p>
            </motion.div>

            {/* 주요 성과 및 하이라이트 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.12 }}
              className="bg-gradient-to-br from-blue-50 to-indigo-100 rounded-2xl shadow-lg p-8 border border-blue-200"
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <div className="w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm font-bold">★</span>
                </div>
                주요 성과 및 하이라이트
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="bg-white rounded-lg p-4 shadow-sm">
                    <h3 className="font-semibold text-blue-700 mb-2">
                      🏆 수상 경력
                    </h3>
                    <p className="text-sm text-gray-600">
                      2022년 4분기 위메프 베스트 프랙티스 어워드
                    </p>
                    <p className="text-xs text-gray-500">
                      크롤링 플랫폼 개발 프로젝트
                    </p>
                  </div>
                  <div className="bg-white rounded-lg p-4 shadow-sm">
                    <h3 className="font-semibold text-green-700 mb-2">
                      📈 성능 개선
                    </h3>
                    <p className="text-sm text-gray-600">
                      E2E 테스팅 도입으로 버그 30% 감소
                    </p>
                    <p className="text-xs text-gray-500">
                      Playwright 기반 자동화 테스팅
                    </p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="bg-white rounded-lg p-4 shadow-sm">
                    <h3 className="font-semibold text-purple-700 mb-2">
                      🎯 효율성 향상
                    </h3>
                    <p className="text-sm text-gray-600">
                      컴포넌트 사용률 90% 향상
                    </p>
                    <p className="text-xs text-gray-500">
                      디자인 시스템 구축 및 배포
                    </p>
                  </div>
                  <div className="bg-white rounded-lg p-4 shadow-sm">
                    <h3 className="font-semibold text-orange-700 mb-2">
                      ⚡ 업무 효율
                    </h3>
                    <p className="text-sm text-gray-600">
                      한샘 내부 운영 효율성 20% 향상
                    </p>
                    <p className="text-xs text-gray-500">어드민 페이지 구축</p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* 핵심 역량 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="bg-white rounded-2xl shadow-lg p-8"
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                핵심 역량
              </h2>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="space-y-4">
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-3">
                      <span className="text-white font-bold">🎨</span>
                    </div>
                    <h3 className="font-semibold text-gray-800 mb-2">
                      디자인 시스템
                    </h3>
                    <p className="text-sm text-gray-600">
                      React, Vue 멀티 프레임워크 디자인 시스템 개발 및 전사 배포
                    </p>
                  </div>
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-3">
                      <span className="text-white font-bold">🧪</span>
                    </div>
                    <h3 className="font-semibold text-gray-800 mb-2">
                      테스팅 자동화
                    </h3>
                    <p className="text-sm text-gray-600">
                      Jest, Cypress, Playwright 기반 종합 테스팅 환경 구축
                    </p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="text-center p-4 bg-purple-50 rounded-lg">
                    <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-3">
                      <span className="text-white font-bold">⚡</span>
                    </div>
                    <h3 className="font-semibold text-gray-800 mb-2">
                      성능 최적화
                    </h3>
                    <p className="text-sm text-gray-600">
                      번들 최적화, 코드 스플리팅, 렌더링 성능 개선
                    </p>
                  </div>
                  <div className="text-center p-4 bg-orange-50 rounded-lg">
                    <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-3">
                      <span className="text-white font-bold">📊</span>
                    </div>
                    <h3 className="font-semibold text-gray-800 mb-2">
                      데이터 시각화
                    </h3>
                    <p className="text-sm text-gray-600">
                      D3.js, ECharts 활용 인터랙티브 차트 개발
                    </p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="text-center p-4 bg-red-50 rounded-lg">
                    <div className="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center mx-auto mb-3">
                      <span className="text-white font-bold">🛠️</span>
                    </div>
                    <h3 className="font-semibold text-gray-800 mb-2">
                      도구 개발
                    </h3>
                    <p className="text-sm text-gray-600">
                      Chrome Extension, 자동화 파이프라인, 크롤링 플랫폼
                    </p>
                  </div>
                  <div className="text-center p-4 bg-teal-50 rounded-lg">
                    <div className="w-12 h-12 bg-teal-500 rounded-full flex items-center justify-center mx-auto mb-3">
                      <span className="text-white font-bold">🤝</span>
                    </div>
                    <h3 className="font-semibold text-gray-800 mb-2">
                      팀 협업
                    </h3>
                    <p className="text-sm text-gray-600">
                      크로스 펑셔널 팀과의 원활한 협업 및 코드 리뷰
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* 경력 사항 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-white rounded-2xl shadow-lg p-8"
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-8">
                경력 사항
              </h2>
              <div className="space-y-8">
                {experiences.map((exp, index) => (
                  <div
                    key={index}
                    className="border-l-4 border-blue-500 pl-6 relative"
                  >
                    {/* 회사 로고 영역 (선택사항) */}
                    <div className="absolute -left-3 top-0 w-6 h-6 bg-blue-500 rounded-full border-4 border-white"></div>

                    <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between mb-4 gap-2">
                      <div className="flex-1">
                        <h3 className="text-xl font-semibold text-gray-900 mb-1">
                          {exp.title}
                        </h3>
                        <p className="text-lg text-blue-600 font-medium mb-1">
                          {exp.company}
                        </p>
                        <div className="flex items-center gap-4 text-sm text-gray-500">
                          <div className="flex items-center gap-1">
                            <CalendarIcon size={14} />
                            <span>{exp.period}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <MapPinIcon size={14} />
                            <span>{exp.location}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="bg-gray-50 rounded-lg p-4 mb-4">
                      <h4 className="font-semibold text-gray-800 mb-2">
                        주요 성과
                      </h4>
                      <ul className="space-y-2">
                        {exp.description.map((item, idx) => (
                          <li
                            key={idx}
                            className={`flex items-start gap-3 ${
                              item.includes("🏆")
                                ? "text-amber-700 font-medium bg-amber-50 p-3 rounded-lg border border-amber-200"
                                : "text-gray-600"
                            }`}
                          >
                            <span
                              className={`w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0 ${
                                item.includes("🏆")
                                  ? "bg-amber-500"
                                  : "bg-blue-400"
                              }`}
                            ></span>
                            <span className="leading-relaxed">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* 학력 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="bg-white rounded-2xl shadow-lg p-8"
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-8">학력</h2>
              <div className="space-y-6">
                {education.map((edu, index) => (
                  <div key={index} className="border-l-4 border-green-500 pl-6">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2">
                      <h3 className="text-xl font-semibold text-gray-900">
                        {edu.degree}
                      </h3>
                      <div className="flex items-center gap-1 text-sm text-gray-500">
                        <CalendarIcon size={14} />
                        <span>{edu.period}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 mb-2">
                      <p className="text-lg text-green-600 font-medium">
                        {edu.school}
                      </p>
                      <div className="flex items-center gap-1 text-sm text-gray-500">
                        <MapPinIcon size={14} />
                        <span>{edu.location}</span>
                      </div>
                    </div>
                    {edu.additional && (
                      <p className="text-sm text-gray-500 italic">
                        {edu.additional}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </motion.div>

            {/* 자격증 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.35 }}
              className="bg-white rounded-2xl shadow-lg p-8"
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-8">자격증</h2>
              <div className="grid md:grid-cols-2 gap-4">
                {certifications.map((cert, index) => (
                  <div key={index} className="bg-gray-50 rounded-lg p-4">
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">
                      {cert.name}
                    </h3>
                    <p className="text-sm text-gray-600 mb-1">{cert.issuer}</p>
                    <p className="text-xs text-gray-500">{cert.date}</p>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* 기술 스택 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="bg-white rounded-2xl shadow-lg p-8"
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-8">
                기술 스택
              </h2>
              <div className="grid gap-6">
                {Object.entries(skills).map(([category, skillList]) => (
                  <div key={category}>
                    <h3 className="text-lg font-semibold text-gray-800 mb-3">
                      {category}
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {skillList.map((skill) => (
                        <span
                          key={skill}
                          className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* 프로젝트 링크 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl shadow-lg p-8 text-center"
            >
              <h2 className="text-2xl font-bold text-white mb-4">
                저의 작업에 관심이 있으신가요?
              </h2>
              <p className="text-blue-100 mb-6">
                포트폴리오, 블로그, GitHub에서 제가 진행한 프로젝트와 기술적
                전문성의 상세한 예시를 확인해보세요.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link
                  href="/projects"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-white text-blue-600 rounded-lg font-medium hover:bg-gray-50 transition-colors"
                >
                  <ExternalLinkIcon size={18} />
                  프로젝트 보기
                </Link>
                <Link
                  href="/blog"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 text-white border border-white/20 rounded-lg font-medium hover:bg-white/20 transition-colors"
                >
                  <ExternalLinkIcon size={18} />
                  블로그 읽기
                </Link>
                <motion.a
                  href="https://velog.io/@milliwonkim/posts"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 text-white border border-white/20 rounded-lg font-medium hover:bg-white/20 transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <ExternalLinkIcon size={18} />
                  Velog 블로그
                </motion.a>
              </div>
            </motion.div>

            {/* 연락처 & 소셜 링크 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="bg-white rounded-2xl shadow-lg p-8"
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
                연락해요!
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-800">
                    연락처 정보
                  </h3>
                  <div className="space-y-2">
                    <div className="flex items-center gap-3">
                      <MailIcon size={18} />
                      <span className="text-gray-600">kwk627@naver.com</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <MailIcon size={18} />
                      <span className="text-gray-600">
                        rldnjs9347@gmail.com
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <PhoneIcon size={18} />
                      <span className="text-gray-600">+82 10-3355-9347</span>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-800">
                    소셜 링크
                  </h3>
                  <div className="flex flex-wrap gap-3">
                    <motion.a
                      href="https://github.com/milliwonkim"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 bg-gray-800 text-white rounded-lg font-medium hover:bg-gray-900 transition-colors"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <ExternalLinkIcon size={16} />
                      GitHub
                    </motion.a>
                    <motion.a
                      href="http://linkedin.com/in/kiwon-kim-29b23b106"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <ExternalLinkIcon size={16} />
                      LinkedIn
                    </motion.a>
                    <motion.a
                      href="https://www.rocketpunch.com/@kiwonkimd500c026c39344d3"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 bg-orange-500 text-white rounded-lg font-medium hover:bg-orange-600 transition-colors"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <ExternalLinkIcon size={16} />
                      로켓펀치
                    </motion.a>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
