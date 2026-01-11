"use client";

import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

import type { NotionProject } from "@/app/api/projects/route";
import ProjectCard from "../projects/ProjectCard";
import ProjectsModal from "../projects/ProjectsModal";
import SectionContainer from "./SectionContainer";
import SectionHeader from "./SectionHeader";

interface ProjectsResponse {
  projects: NotionProject[];
}

const skeletonCards = Array.from({ length: 3 });

export default function NotionProjectsSection() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { data, isPending, error } = useQuery<ProjectsResponse>({
    queryKey: ["homepage-notion-projects"],
    queryFn: async () => {
      const response = await fetch("/api/projects");
      if (!response.ok) {
        throw new Error("프로젝트 데이터를 불러오지 못했습니다.");
      }
      return response.json();
    },
  });

  const projects = data?.projects.slice(0, 3) ?? [];

  return (
    <SectionContainer
      id="projects"
      className="bg-[color:var(--color-card-background)]/35 backdrop-blur-md"
    >
      <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
        <SectionHeader
          eyebrow="Notion Projects"
          title="최근 프로젝트 기록"
          description="Notion 데이터베이스와 연동된 실제 프로젝트 히스토리를 확인해보세요."
        />
        <div className="flex w-full flex-col gap-3 sm:w-auto sm:min-w-[240px]">
          <button
            type="button"
            onClick={() => setIsModalOpen(true)}
            className="inline-flex w-full items-center justify-center gap-2 rounded-2xl border border-transparent bg-[color:var(--color-primary)] px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-[color:var(--color-primary)]/25 transition hover:-translate-y-0.5 hover:shadow-[color:var(--color-primary)]/35 focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-[color:var(--color-primary)] sm:w-auto"
            aria-haspopup="dialog"
            aria-expanded={isModalOpen}
          >
            전체 프로젝트 보기
            <svg
              className="h-4 w-4"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path
                d="M4.16602 10H15.8327"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
              <path
                d="M10.832 5L15.832 10L10.832 15"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      </div>

      <div className="mt-12 grid gap-6 sm:grid-cols-2 md:grid-cols-3">
        {isPending &&
          skeletonCards.map((_, index) => (
            <div
              key={`projects-skeleton-${index}`}
              className="h-full rounded-2xl border border-[color:var(--color-border-light)] bg-[color:var(--color-background)]/70 p-7 shadow-sm"
            >
              <div className="mb-4 h-6 w-24 rounded-full bg-[color:var(--color-border-normal)]/40" />
              <div className="mb-2 h-6 w-3/4 rounded bg-[color:var(--color-border-normal)]/30" />
              <div className="mb-4 h-4 w-1/2 rounded bg-[color:var(--color-border-normal)]/25" />
              <div className="mb-3 h-4 w-full rounded bg-[color:var(--color-border-normal)]/20" />
              <div className="mb-3 h-4 w-5/6 rounded bg-[color:var(--color-border-normal)]/20" />
              <div className="h-10 w-32 rounded-full bg-[color:var(--color-border-normal)]/20" />
            </div>
          ))}

        {error && !isPending && (
          <div className="col-span-full rounded-2xl border border-red-300/40 bg-red-50/60 p-6 text-sm text-red-600">
            프로젝트 정보를 불러오지 못했습니다. 잠시 후 다시 시도해주세요.
          </div>
        )}

        {!isPending && !error && projects.length === 0 && (
          <div className="col-span-full rounded-2xl border border-[color:var(--color-border-light)] bg-[color:var(--color-background)]/70 p-8 text-center text-[color:var(--color-text-secondary)]">
            표시할 프로젝트가 없습니다. Notion에서 프로젝트를 등록하면 자동으로
            이곳에 나타납니다.
          </div>
        )}

        {!isPending &&
          !error &&
          projects.map((project, index) => (
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
      <ProjectsModal open={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </SectionContainer>
  );
}
