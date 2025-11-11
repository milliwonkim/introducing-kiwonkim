"use client";

import { useQuery } from "@tanstack/react-query";
import { useMemo, useState } from "react";

import type { NotionProject } from "@/app/api/projects/route";
import ProjectCard from "./ProjectCard";

interface ProjectsExplorerProps {
  variant?: "page" | "modal";
}

export default function ProjectsExplorer({
  variant = "page",
}: ProjectsExplorerProps) {
  const { data, error, isPending } = useQuery<{ projects: NotionProject[] }>({
    queryKey: ["notion-projects"],
    queryFn: () => fetch("/api/projects").then((res) => res.json()),
  });
  const projects = data?.projects ?? [];

  const [selectedCompany, setSelectedCompany] = useState<string | null>(null);

  const companyList = useMemo(
    () => Array.from(new Set(projects.map((p) => p.company))).filter(Boolean),
    [projects]
  );

  const filteredProjects = selectedCompany
    ? projects.filter((p) => p.company === selectedCompany)
    : projects;

  const sectionClasses =
    variant === "modal"
      ? "py-10"
      : "py-16 min-h-[calc(100vh-var(--header-height))]";

  return (
    <section
      className={`${sectionClasses} bg-[var(--color-background)]`}
      aria-labelledby="projects-explorer-heading"
    >
      <div className="container mx-auto px-6 md:px-8 max-w-6xl">
        <div className="text-center mb-12">
          <h1
            id="projects-explorer-heading"
            className="text-3xl md:text-4xl font-bold mb-4 text-[var(--color-text-primary)]"
          >
            Projects
          </h1>
          <p className="text-lg text-[var(--color-text-secondary)]">
            Things I&apos;ve built at various companies
          </p>
        </div>

        <div className="flex flex-wrap gap-3 justify-center mb-12">
          <button
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              !selectedCompany
                ? "bg-[var(--color-primary)] text-white"
                : "bg-[var(--color-card-background)] text-[var(--color-text-primary)] border border-[var(--color-card-border)] hover:border-[var(--color-primary)]"
            }`}
            onClick={() => setSelectedCompany(null)}
            type="button"
          >
            All
          </button>
          {companyList.map((company) => (
            <button
              key={company}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                selectedCompany === company
                  ? "bg-[var(--color-primary)] text-white"
                  : "bg-[var(--color-card-background)] text-[var(--color-text-primary)] border border-[var(--color-card-border)] hover:border-[var(--color-primary)]"
              }`}
              onClick={() => setSelectedCompany(company)}
              type="button"
            >
              {company}
            </button>
          ))}
        </div>

        {isPending && (
          <div className="text-center text-lg text-[var(--color-text-secondary)] py-12">
            <div className="w-8 h-8 border-2 border-[var(--color-primary)] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            Loading projects...
          </div>
        )}
        {error && (
          <div className="text-center text-red-500 py-12">
            Failed to load projects.
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
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
      </div>
    </section>
  );
}
