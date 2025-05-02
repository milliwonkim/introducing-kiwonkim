"use client";

import { motion } from "motion/react";
import Layout from "../../components/layout/Layout";
import Image from "next/image";

/**
 * @description 프로젝트 데이터 타입
 */
interface Project {
  id: number;
  title: string;
  description: string;
  technologies: string[];
  image?: string;
  link: string;
  github?: string;
  category: "frontend" | "fullstack" | "mobile";
}

/**
 * @description 프로젝트 페이지 컴포넌트
 */
export default function ProjectsPage() {
  const projects: Project[] = [
    {
      id: 1,
      title: "포트폴리오 웹사이트 (v2)",
      description:
        "Next.js, TypeScript, TailwindCSS, Motion One을 활용한 개인 포트폴리오 사이트입니다. 반응형 디자인과 깔끔한 애니메이션에 중점을 두었습니다.",
      technologies: [
        "Next.js",
        "TypeScript",
        "TailwindCSS",
        "Motion One",
        "Three.js",
      ],
      image: "/images/portfolio-v2.png",
      link: "/",
      github: "https://github.com/your-username/portfolio-v2",
      category: "frontend",
    },
    {
      id: 2,
      title: "인터랙티브 데이터 시각화",
      description:
        "D3.js와 React를 사용하여 복잡한 데이터를 사용자와 상호작용하는 시각화로 구현했습니다. 데이터 필터링 및 동적 업데이트 기능을 제공합니다.",
      technologies: ["React", "D3.js", "TypeScript", "Styled Components"],
      image: "/images/data-visualization.png",
      link: "#",
      github: "https://github.com/your-username/data-viz",
      category: "frontend",
    },
    {
      id: 3,
      title: "커뮤니티 플랫폼",
      description:
        "Next.js 기반의 풀스택 커뮤니티 플랫폼입니다. 게시글 작성, 댓글, 사용자 인증 및 프로필 기능을 포함하며, Prisma와 PostgreSQL을 사용했습니다.",
      technologies: [
        "Next.js",
        "TypeScript",
        "React Query",
        "Prisma",
        "PostgreSQL",
        "TailwindCSS",
      ],
      image: "/images/community-platform.png",
      link: "#",
      category: "fullstack",
    },
    {
      id: 4,
      title: "소셜 미디어 앱",
      description:
        "React Native를 이용한 모바일 소셜 미디어 앱으로, 실시간 채팅, 게시물 공유 등의 기능을 포함합니다.",
      technologies: ["React Native", "Firebase", "Redux", "Expo"],
      image: "/images/social.jpg",
      link: "https://social-app-demo.com",
      github: "https://github.com/username/social-app",
      category: "mobile",
    },
  ];

  return (
    <Layout>
      <section className="py-24 lg:py-32 bg-gray-50 dark:bg-dark min-h-[calc(100vh-var(--header-height))]">
        <div className="container mx-auto px-6 md:px-8">
          <motion.div
            className="max-w-3xl mx-auto text-center mb-12 lg:mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-gray-900 dark:text-white">
              프로젝트
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              다양한 기술 스택을 활용하여 진행했던 주요 프로젝트들입니다.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {projects.map((project, index) => (
              <motion.div
                key={project.id}
                className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden border border-gray-100 dark:border-gray-700 flex flex-col"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.1,
                  ease: "easeOut",
                }}
              >
                {project.image && (
                  <div className="relative w-full h-48">
                    <Image
                      src={project.image}
                      alt={`${project.title} thumbnail`}
                      layout="fill"
                      objectFit="cover"
                      className="bg-gray-200 dark:bg-gray-700"
                    />
                  </div>
                )}
                {!project.image && (
                  <div className="h-48 bg-gray-100 dark:bg-gray-700 flex items-center justify-center">
                    <svg
                      /* Placeholder Icon */ className="w-12 h-12 text-gray-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1}
                        d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                )}

                <div className="p-6 flex-grow flex flex-col">
                  <div className="flex items-center justify-between mb-3">
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                      {project.title}
                    </h2>
                    <span className="text-xs font-medium px-2.5 py-1 bg-primary/10 text-primary rounded-full capitalize">
                      {project.category}
                    </span>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 mb-4 text-sm leading-relaxed flex-grow">
                    {project.description}
                  </p>
                  <div className="mb-5">
                    <h3 className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-2">
                      사용 기술
                    </h3>
                    <div className="flex flex-wrap gap-1.5">
                      {project.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="text-xs px-2.5 py-1 bg-gray-100 dark:bg-gray-700 rounded-full text-gray-700 dark:text-gray-200"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="flex space-x-3 mt-auto pt-4 border-t border-gray-100 dark:border-gray-700">
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center px-4 py-2 bg-primary hover:bg-primary/90 text-white text-sm font-medium rounded-md transition-colors"
                    >
                      사이트 보기
                      <svg
                        className="w-4 h-4 ml-1.5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                        />
                      </svg>
                    </a>
                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center px-4 py-2 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-800 dark:text-white text-sm font-medium rounded-md transition-colors"
                      >
                        GitHub
                        <svg
                          className="w-4 h-4 ml-1.5"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
                        </svg>
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}
