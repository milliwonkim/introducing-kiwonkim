"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";

import type { NotionProject } from "@/app/api/projects/route";
import ProjectCard from "../projects/ProjectCard";
import SectionContainer from "./SectionContainer";
import SectionHeader from "./SectionHeader";
import Modal from "../ui/Modal";

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

  const projects = data?.projects ?? [];
  const previewProjects = projects.slice(0, 3);
  const hasError = Boolean(error);

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
        <button
          type="button"
          onClick={() => setIsModalOpen(true)}
          className="inline-flex w-full items-center justify-center rounded-full border border-[color:var(--color-border-light)] bg-[color:var(--color-background)] px-5 py-2 text-sm font-semibold text-[color:var(--color-text-primary)] shadow-sm transition-colors hover:border-[color:var(--color-primary)] hover:text-[color:var(--color-primary)] sm:w-auto"
        >
          전체 프로젝트 보기
          <svg
            className="ml-2 h-4 w-4"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M11.25 3.75H16.25V8.75"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M8.75 11.25L16.25 3.75"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M8.75 3.75H5.75C4.64543 3.75 3.75 4.64543 3.75 5.75V14.25C3.75 15.3546 4.64543 16.25 5.75 16.25H14.25C15.3546 16.25 16.25 15.3546 16.25 14.25V11.5"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>

      <div className="mt-12 flex flex-wrap gap-6">
        {isPending &&
          skeletonCards.map((_, index) => (
            <div key={`projects-skeleton-${index}`} className="flex flex-1 min-w-[18rem]">
              <div className="h-full w-full rounded-2xl border border-[color:var(--color-border-light)] bg-[color:var(--color-background)]/70 p-7 shadow-sm">
                <div className="mb-4 h-6 w-24 rounded-full bg-[color:var(--color-border-normal)]/40" />
                <div className="mb-2 h-6 w-3/4 rounded bg-[color:var(--color-border-normal)]/30" />
                <div className="mb-4 h-4 w-1/2 rounded bg-[color:var(--color-border-normal)]/25" />
                <div className="mb-3 h-4 w-full rounded bg-[color:var(--color-border-normal)]/20" />
                <div className="mb-3 h-4 w-5/6 rounded bg-[color:var(--color-border-normal)]/20" />
                <div className="h-10 w-32 rounded-full bg-[color:var(--color-border-normal)]/20" />
              </div>
            </div>
          ))}

        {hasError && !isPending && (
          <div className="w-full rounded-2xl border border-red-300/40 bg-red-50/60 p-6 text-sm text-red-600">
            프로젝트 정보를 불러오지 못했습니다. 잠시 후 다시 시도해주세요.
          </div>
        )}

        {!isPending && !hasError && projects.length === 0 && (
          <div className="w-full rounded-2xl border border-[color:var(--color-border-light)] bg-[color:var(--color-background)]/70 p-8 text-center text-[color:var(--color-text-secondary)]">
            표시할 프로젝트가 없습니다. Notion에서 프로젝트를 등록하면 자동으로 이곳에 나타납니다.
          </div>
        )}

        {!isPending && !hasError &&
          previewProjects.map((project, index) => (
            <div key={project.id} className="flex flex-1 min-w-[18rem]">
              <ProjectCard
                project={{
                  id: index + 1,
                  title: project.title,
                  company: project.company,
                  date: project.date,
                  url: project.url,
                }}
                index={index}
              />
            </div>
          ))}
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="전체 프로젝트 기록"
        description="Notion에 정리한 프로젝트 히스토리를 한 번에 살펴보고, 궁금한 작업을 선택해 자세히 확인해보세요."
      >
        {isPending ? (
          <div className="flex flex-wrap gap-6">
            {skeletonCards.map((_, index) => (
              <div key={`project-modal-skeleton-${index}`} className="flex flex-1 min-w-[18rem]">
                <div className="h-full w-full rounded-2xl border border-[color:var(--color-border-light)] bg-[color:var(--color-background)]/70 p-7 shadow-sm">
                  <div className="mb-4 h-6 w-24 rounded-full bg-[color:var(--color-border-normal)]/40" />
                  <div className="mb-2 h-6 w-3/4 rounded bg-[color:var(--color-border-normal)]/30" />
                  <div className="mb-4 h-4 w-1/2 rounded bg-[color:var(--color-border-normal)]/25" />
                  <div className="mb-3 h-4 w-full rounded bg-[color:var(--color-border-normal)]/20" />
                  <div className="mb-3 h-4 w-5/6 rounded bg-[color:var(--color-border-normal)]/20" />
                  <div className="h-10 w-32 rounded-full bg-[color:var(--color-border-normal)]/20" />
                </div>
              </div>
            ))}
          </div>
        ) : hasError ? (
          <div className="w-full rounded-2xl border border-red-300/40 bg-red-50/60 p-6 text-sm text-red-600">
            프로젝트 정보를 불러오지 못했습니다. 잠시 후 다시 시도해주세요.
          </div>
        ) : projects.length === 0 ? (
          <div className="w-full rounded-2xl border border-[color:var(--color-border-light)] bg-[color:var(--color-background)]/70 p-8 text-center text-[color:var(--color-text-secondary)]">
            표시할 프로젝트가 없습니다. Notion에서 프로젝트를 등록하면 자동으로 이곳에 나타납니다.
          </div>
        ) : (
          <div className="flex flex-wrap gap-6">
            {projects.map((project, index) => (
              <div key={project.id} className="flex flex-1 min-w-[18rem]">
                <ProjectCard
                  project={{
                    id: index + 1,
                    title: project.title,
                    company: project.company,
                    date: project.date,
                    url: project.url,
                  }}
                  index={index}
                />
              </div>
            ))}
          </div>
        )}
      </Modal>
    </SectionContainer>
  );
}
