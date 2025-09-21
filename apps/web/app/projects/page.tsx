"use client";

import { useQuery } from "@tanstack/react-query";
import Layout from "../../components/layout/Layout";
import ProjectsContent from "../../components/projects/ProjectsContent";
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

  return (
    <Layout>
      <section className="py-16 bg-[var(--color-background)] min-h-[calc(100vh-var(--header-height))]">
        <div className="container mx-auto px-6 md:px-8 max-w-6xl">
          <ProjectsContent projects={projects} isPending={isPending} error={error} />
        </div>
      </section>
    </Layout>
  );
}
