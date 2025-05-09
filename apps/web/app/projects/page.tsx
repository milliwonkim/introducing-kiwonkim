"use client";

import { motion } from "motion/react";
import Layout from "../../components/layout/Layout";
import ProjectCard, { Project } from "../../components/projects/ProjectCard";

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
      link: "#",
      category: "fullstack",
    },
    {
      id: 4,
      title: "소셜 미디어 앱",
      description:
        "React Native를 이용한 모바일 소셜 미디어 앱으로, 실시간 채팅, 게시물 공유 등의 기능을 포함합니다.",
      technologies: ["React Native", "Firebase", "Redux", "Expo"],
      link: "https://social-app-demo.com",
      github: "https://github.com/username/social-app",
      category: "mobile",
    },
  ];

  return (
    <Layout>
      <section className="py-24 lg:py-32 bg-gradient-to-b from-white via-zinc-50/50 to-zinc-100/30 dark:from-zinc-900 dark:via-zinc-900/50 dark:to-zinc-800/30 min-h-[calc(100vh-var(--header-height))]">
        <div className="container mx-auto px-6 md:px-8">
          <motion.div
            className="max-w-3xl mx-auto text-center mb-12 lg:mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-zinc-900 dark:text-white">
              프로젝트
            </h1>
            <p className="text-lg text-zinc-600 dark:text-zinc-400">
              다양한 기술 스택을 활용하여 진행했던 주요 프로젝트들입니다.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {projects.map((project, index) => (
              <ProjectCard key={project.id} project={project} index={index} />
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}
