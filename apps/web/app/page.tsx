"use client";

import { motion } from "motion/react";
import Layout from "../components/layout/Layout";
import Link from "next/link";
import IconNextJS from "../icon/IconNextJS";
import IconReactJS from "../icon/IconReactJS";
import IconTailwindcss from "../icon/IconTailwindcss";
import IconTypeScript from "../icon/IconTypeScript";
import IconTanstack from "../icon/IconTanstack";
import IconThreeJS from "../icon/IconThreeJS";
import SectionHeader from "../components/layout/SectionHeader";
import SectionContainer from "../components/layout/SectionContainer";
import SkillCard from "../components/home/SkillCard";
import ProjectCard from "../components/home/ProjectCard";
import CTA from "../components/layout/CTA";

/**
 * @description 메인 포트폴리오 페이지 컴포넌트
 */
export default function Home() {
  const skills = [
    {
      name: "React",
      icon: <IconReactJS width={32} height={32} className="text-cyan-500" />,
    },
    {
      name: "Next.js",
      icon: (
        <IconNextJS
          width={60}
          height={32}
          className="text-black dark:text-white"
        />
      ),
    },
    {
      name: "TypeScript",
      icon: (
        <IconTypeScript
          width={32}
          height={32}
          className="text-blue-600 dark:text-blue-400"
        />
      ),
    },
    {
      name: "TailwindCSS",
      icon: (
        <IconTailwindcss
          width={90}
          height={32}
          className="text-black dark:text-white"
        />
      ),
    },
    {
      name: "React Query",
      icon: <IconTanstack width={40} height={40} />,
    },
    {
      name: "Three.js",
      icon: <IconThreeJS width={40} height={40} className="" />,
    },
  ];

  const projects = [
    {
      title: "프로젝트 1",
      description:
        "이 프로젝트는 React와 TypeScript를 활용하여 개발된 웹 애플리케이션입니다. 사용자 친화적인 인터페이스와 최적화된 성능을 제공합니다.",
      technologies: ["React", "TypeScript", "Next.js"],
      projectUrl: "/projects#project-1",
    },
    {
      title: "프로젝트 2",
      description:
        "이 프로젝트는 React와 TypeScript를 활용하여 개발된 웹 애플리케이션입니다. 사용자 친화적인 인터페이스와 최적화된 성능을 제공합니다.",
      technologies: ["React", "TypeScript", "Next.js"],
      projectUrl: "/projects#project-2",
    },
    {
      title: "프로젝트 3",
      description:
        "이 프로젝트는 React와 TypeScript를 활용하여 개발된 웹 애플리케이션입니다. 사용자 친화적인 인터페이스와 최적화된 성능을 제공합니다.",
      technologies: ["React", "TypeScript", "Next.js"],
      projectUrl: "/projects#project-3",
    },
  ];

  return (
    <Layout>
      {/* 히어로 섹션 */}
      <section className="pt-16 pb-24 md:pt-20 md:pb-32 lg:pt-24 lg:pb-40">
        <div className="container mx-auto px-6 md:px-8">
          <div className="max-w-5xl mx-auto">
            <motion.div
              className="flex flex-col items-center md:items-start text-center md:text-left mb-12 md:mb-16"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeInOut" }}
            >
              <span className="text-primary font-medium text-sm md:text-base mb-3 block tracking-wide">
                프론트엔드 개발자 김기원
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-text-primary leading-tight mb-6">
                사용자 경험에 <br className="md:hidden" />
                <span className="text-primary">생동감을 불어넣는</span> <br />
                인터페이스를 만듭니다
              </h1>
              <p className="text-lg md:text-xl text-text-secondary mb-8 max-w-xl">
                React, Next.js, TypeScript를 활용하여 직관적이고 아름다운 웹
                경험을 디자인합니다. 사용자와 비즈니스 모두를 위한 최적의
                솔루션을 제공합니다.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <Link href="/projects" className="btn btn-primary">
                  프로젝트 보기
                </Link>
                <Link href="/contact" className="btn btn-secondary">
                  연락하기
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 기술 섹션 */}
      <SectionContainer>
        <SectionHeader
          label="SKILLS"
          title="사용하는 기술 스택"
          subtitle="최신 기술 트렌드를 따라가며, 효율적이고 안정적인 웹 개발을 추구합니다."
        />
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6">
          {skills.map((skill, index) => (
            <SkillCard
              key={skill.name}
              name={skill.name}
              icon={skill.icon}
              index={index}
            />
          ))}
        </div>
      </SectionContainer>

      {/* 소개 섹션 */}
      <section className="py-24 md:py-32">
        <div className="container mx-auto px-6 md:px-8">
          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center">
              <motion.div
                className="w-full max-w-sm mx-auto md:max-w-none"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
              >
                <div className="bg-gray-100 rounded-2xl overflow-hidden aspect-square w-full">
                  <div className="w-full h-full flex items-center justify-center text-text-tertiary">
                    {/* 실제 프로필 이미지로 대체 */}
                    <svg
                      className="w-1/3 h-1/3 text-gray-300 dark:text-gray-600"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                    </svg>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{
                  duration: 0.6,
                  delay: 0.1,
                  ease: "easeOut",
                }}
              >
                <SectionHeader
                  label="ABOUT ME"
                  title={
                    <>
                      안녕하세요, <br />
                      김기원입니다
                    </>
                  }
                  className="text-left"
                />
                <p className="text-text-secondary mb-4 text-lg">
                  프론트엔드 개발에 열정을 가진 개발자로, 사용자 중심의
                  인터페이스를 구현하는 데 전문성을 가지고 있습니다. React,
                  Next.js, TypeScript를 활용한 개발을 주로 하며, 최신 기술
                  트렌드를 적극적으로 학습합니다.
                </p>
                <p className="text-text-secondary mb-6 text-lg">
                  다양한 규모의 웹 애플리케이션을 개발하고 배포한 경험을
                  바탕으로, 항상 사용자와 비즈니스 요구사항을 고려한 최적의
                  솔루션을 제공합니다.
                </p>
                <Link
                  href="/skills"
                  className="text-primary font-medium inline-flex items-center group text-base hover:text-primary-hover transition-colors"
                >
                  더 알아보기
                  <motion.svg
                    className="w-5 h-5 ml-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                    initial={{ x: 0 }}
                    animate={{ x: [0, 3, 0] }}
                    transition={{
                      repeat: Infinity,
                      duration: 1.5,
                      ease: "easeInOut",
                    }}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 7l5 5m0 0l-5 5m5-5H6"
                    />
                  </motion.svg>
                </Link>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* 프로젝트 미리보기 섹션 */}
      <SectionContainer>
        <SectionHeader
          label="PROJECTS"
          title="주요 프로젝트"
          subtitle="최근에 작업한 주요 프로젝트들을 소개합니다."
        />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {projects.map((project, index) => (
            <ProjectCard key={project.title} {...project} index={index} />
          ))}
        </div>
        <div className="text-center mt-12 md:mt-16">
          <Link href="/projects" className="btn btn-secondary px-6 py-3">
            모든 프로젝트 보기
          </Link>
        </div>
      </SectionContainer>

      {/* CTA 섹션 */}
      <CTA
        title="함께 일하고 싶으신가요?"
        description="새로운 프로젝트에 대해 이야기하고 싶거나 질문이 있으시면 언제든지 연락해주세요. 빠른 시일 내에 답변드리겠습니다."
        buttonText="연락하기"
        buttonUrl="/contact"
      />
    </Layout>
  );
}
