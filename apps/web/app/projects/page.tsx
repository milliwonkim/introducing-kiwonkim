"use client";

import { useQuery } from "@tanstack/react-query";
import { motion } from "motion/react";
import { useState } from "react";
import Layout from "../../components/layout/Layout";
import ProjectCard from "../../components/projects/ProjectCard";
import type { NotionProject } from "../api/projects/route";

/**
 * @description 프로젝트 페이지 컴포넌트
 */
export default function ProjectsPage() {
  const { data, error, isPending } = useQuery<{ projects: NotionProject[] }>({
    queryKey: ["notion-projects"],
    queryFn: () => fetch("/api/projects").then((res) => res.json()),
  });
  const projects = data?.projects ?? [];

  // 회사명 리스트 추출 (중복 제거)
  const companyList = Array.from(
    new Set(projects.map((p) => p.company))
  ).filter(Boolean);
  const [selectedCompany, setSelectedCompany] = useState<string | null>(null);

  // 필터링된 프로젝트
  const filteredProjects = selectedCompany
    ? projects.filter((p) => p.company === selectedCompany)
    : projects;

  // 회사별로 그룹화
  const grouped = companyList.map((company) => ({
    company,
    projects: projects.filter((p) => p.company === company),
  }));

  return (
    <Layout>
      <section className="py-20 bg-gradient-to-b from-[var(--color-background)] via-[var(--color-gray-50)]/50 to-[var(--color-gray-100)]/30 min-h-[calc(100vh-var(--header-height))]">
        <div className="container mx-auto px-6 md:px-8">
          <motion.div
            className="max-w-3xl mx-auto text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <div className="flex flex-col items-center gap-2 mb-6">
              <span className="text-4xl md:text-5xl">🗂️</span>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-[var(--color-text-primary)]">
                프로젝트
              </h1>
            </div>
            <p className="text-lg text-[var(--color-text-secondary)] leading-relaxed">
              다양한 회사에서 진행한 주요 프로젝트들을 한눈에 볼 수 있습니다.
              <br />
              <span className="text-[var(--color-primary)] font-semibold">
                필터
              </span>
              를 사용해 원하는 프로젝트만 빠르게 찾아보세요!
            </p>
          </motion.div>

          {/* 회사별 필터 버튼 */}
          <motion.div
            className="flex flex-wrap gap-3 sm:gap-4 justify-center mb-16 sm:mb-20 px-4 sm:px-0"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <button
              className={`px-5 py-3 sm:px-6 sm:py-3 md:px-8 md:py-3 rounded-full border-2 font-semibold shadow-sm transition-all text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:ring-offset-2 min-w-[80px] sm:min-w-[90px] ${
                !selectedCompany
                  ? "bg-gradient-to-r from-[var(--color-primary)] to-purple-500 text-white border-transparent scale-105 shadow-lg hover:shadow-xl"
                  : "bg-white text-[var(--color-primary)] border-[var(--color-primary)] hover:bg-[var(--color-primary)]/10 hover:scale-105"
              }`}
              onClick={() => setSelectedCompany(null)}
              aria-label="전체 보기"
            >
              전체
            </button>
            {companyList.map((company) => (
              <button
                key={company}
                className={`px-5 py-3 sm:px-6 sm:py-3 md:px-8 md:py-3 rounded-full border-2 font-semibold shadow-sm transition-all text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:ring-offset-2 min-w-[80px] sm:min-w-[90px] ${
                  selectedCompany === company
                    ? "bg-gradient-to-r from-[var(--color-primary)] to-purple-500 text-white border-transparent scale-105 shadow-lg hover:shadow-xl"
                    : "bg-white text-[var(--color-primary)] border-[var(--color-primary)] hover:bg-[var(--color-primary)]/10 hover:scale-105"
                }`}
                onClick={() => setSelectedCompany(company)}
                aria-label={`${company} 프로젝트만 보기`}
              >
                {company}
              </button>
            ))}
          </motion.div>

          {/* 로딩 및 에러 상태 */}
          {isPending && (
            <div className="text-center text-lg text-[var(--color-text-secondary)] py-12">
              <div className="w-8 h-8 border-2 border-[var(--color-primary)] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
              프로젝트 불러오는 중...
            </div>
          )}
          {error && (
            <div className="text-center text-red-500 py-12">
              프로젝트를 불러오지 못했습니다.
            </div>
          )}

          {/* 회사별 그룹화 렌더링 (필터 없을 때만) */}
          {!selectedCompany ? (
            <div className="space-y-20">
              {grouped.map(({ company, projects }, groupIndex) => (
                <motion.section
                  key={company}
                  className="w-full"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 + groupIndex * 0.1 }}
                >
                  <h2 className="text-2xl font-bold text-[var(--color-primary)] mb-8 flex items-center gap-3">
                    <span className="text-2xl">🏢</span>
                    <span>{company}</span>
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                    {projects.map((project, index) => (
                      <ProjectCard
                        key={project.id}
                        project={{
                          id: index + 1,
                          title: project.title,
                          company: project.company,
                          date: project.date,
                          url: project.url,
                        }}
                        index={index}
                      />
                    ))}
                  </div>
                </motion.section>
              ))}
            </div>
          ) : (
            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              {filteredProjects.map((project, index) => (
                <ProjectCard
                  key={project.id}
                  project={{
                    id: index + 1,
                    title: project.title,
                    company: project.company,
                    date: project.date,
                    url: project.url,
                  }}
                  index={index}
                />
              ))}
            </motion.div>
          )}
        </div>
      </section>
    </Layout>
  );
}
