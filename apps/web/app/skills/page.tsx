"use client";

import Layout from "../../components/layout/Layout";
import SkillCard from "../../components/skills/SkillCard";
import { SKILLS } from "../../constants/skills";

/**
 * @description Tech Stack Page Component
 */
export default function SkillsPage() {
  return (
    <Layout>
      <section className="py-16 min-h-[calc(100vh-var(--header-height))] bg-[var(--color-background)]">
        <div className="container mx-auto px-6 md:px-8 max-w-4xl">
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-bold mb-4 text-[var(--color-text-primary)]">
              Tech Stack
            </h1>
            <p className="text-lg text-[var(--color-text-secondary)]">
              Technologies I work with
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {SKILLS.map((skill, index) => (
              <SkillCard key={skill.name} skill={skill} index={index} />
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}
