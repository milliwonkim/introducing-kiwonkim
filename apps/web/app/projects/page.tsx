"use client";

import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import Layout from "../../components/layout/Layout";
import ProjectCard from "../../components/projects/ProjectCard";
import type { NotionProject } from "../api/projects/route";

/**
 * @description Projects Page Component
 */
export default function ProjectsPage() {
  const { data, error, isPending } = useQuery<{ projects: NotionProject[] }>({
    queryKey: ["notion-projects"],
    queryFn: () => fetch("/api/projects").then((res) => res.json()),
  });
  const projects = data?.projects ?? [];

  // Extract company list (remove duplicates)
  const companyList = Array.from(
    new Set(projects.map((p) => p.company))
  ).filter(Boolean);
  const [selectedCompany, setSelectedCompany] = useState<string | null>(null);

  // Filtered projects
  const filteredProjects = selectedCompany
    ? projects.filter((p) => p.company === selectedCompany)
    : projects;

  return (
    <Layout>
      <section className="py-16 bg-[var(--color-background)] min-h-[calc(100vh-var(--header-height))]">
        <div className="container mx-auto px-6 md:px-8 max-w-6xl">
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-bold mb-4 text-[var(--color-text-primary)]">
              Projects
            </h1>
            <p className="text-lg text-[var(--color-text-secondary)]">
              Things I&apos;ve built at various companies
            </p>
          </div>

          {/* Company filter buttons */}
          <div className="flex flex-wrap gap-3 justify-center mb-12">
            <button
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                !selectedCompany
                  ? "bg-[var(--color-primary)] text-white"
                  : "bg-[var(--color-card-background)] text-[var(--color-text-primary)] border border-[var(--color-card-border)] hover:border-[var(--color-primary)]"
              }`}
              onClick={() => setSelectedCompany(null)}
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
              >
                {company}
              </button>
            ))}
          </div>

          {/* Loading and error states */}
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

          {/* Projects grid */}
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
    </Layout>
  );
}
