"use client";

import { useMemo, useState } from "react";
import clsx from "clsx";

import type { NotionProject } from "@/app/api/projects/route";
import ProjectCard from "./ProjectCard";

interface ProjectsContentProps {
  projects: NotionProject[];
  isPending?: boolean;
  error?: unknown;
  containerClassName?: string;
  showHeading?: boolean;
}

export default function ProjectsContent({
  projects,
  isPending = false,
  error,
  containerClassName,
  showHeading = true,
}: ProjectsContentProps) {
  const [selectedCompany, setSelectedCompany] = useState<string | null>(null);

  const companyList = useMemo(
    () => Array.from(new Set(projects.map((project) => project.company))).filter(Boolean),
    [projects],
  );

  const filteredProjects = useMemo(
    () =>
      selectedCompany
        ? projects.filter((project) => project.company === selectedCompany)
        : projects,
    [projects, selectedCompany],
  );

  const hasError = Boolean(error);

  return (
    <div className={clsx("w-full", containerClassName)}>
      {showHeading && (
        <div className="mb-12 text-center">
          <h1 className="mb-4 text-3xl font-bold text-[var(--color-text-primary)] md:text-4xl">
            Projects
          </h1>
          <p className="text-lg text-[var(--color-text-secondary)]">
            Things I&apos;ve built at various companies
          </p>
        </div>
      )}

      <div className="mb-12 flex flex-wrap justify-center gap-3">
        <button
          className={`rounded-lg px-4 py-2 font-medium transition-colors ${
            !selectedCompany
              ? "bg-[var(--color-primary)] text-white"
              : "border border-[var(--color-card-border)] bg-[var(--color-card-background)] text-[var(--color-text-primary)] hover:border-[var(--color-primary)]"
          }`}
          onClick={() => setSelectedCompany(null)}
          type="button"
        >
          All
        </button>
        {companyList.map((company) => (
          <button
            key={company}
            className={`rounded-lg px-4 py-2 font-medium transition-colors ${
              selectedCompany === company
                ? "bg-[var(--color-primary)] text-white"
                : "border border-[var(--color-card-border)] bg-[var(--color-card-background)] text-[var(--color-text-primary)] hover:border-[var(--color-primary)]"
            }`}
            onClick={() => setSelectedCompany(company)}
            type="button"
          >
            {company}
          </button>
        ))}
      </div>

      {isPending ? (
        <div className="py-12 text-center text-lg text-[var(--color-text-secondary)]">
          <div className="mx-auto mb-4 h-8 w-8 animate-spin rounded-full border-2 border-t-transparent border-[var(--color-primary)]" />
          Loading projects...
        </div>
      ) : hasError ? (
        <div className="py-12 text-center text-red-500">Failed to load projects.</div>
      ) : filteredProjects.length === 0 ? (
        <div className="py-12 text-center">
          <div className="mb-4 text-6xl">📭</div>
          <h2 className="mb-2 text-2xl font-bold text-[var(--color-text-primary)]">No projects found</h2>
          <p className="text-[var(--color-text-secondary)]">Try selecting another company.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
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
        </div>
      )}
    </div>
  );
}
