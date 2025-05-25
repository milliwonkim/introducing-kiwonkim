"use client";

import { motion } from "motion/react";
import Layout from "../../components/layout/Layout";
import SkillCard from "../../components/skills/SkillCard";
import { SKILLS } from "../../constants/skills";

/**
 * @description 기술 스택 페이지 컴포넌트
 */
export default function SkillsPage() {
  return (
    <Layout>
      <section className="py-20 min-h-[calc(100vh-var(--header-height))] bg-[var(--color-background)]">
        <div className="container mx-auto px-6 md:px-8">
          <motion.div
            className="max-w-3xl mx-auto text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <div className="flex flex-col items-center gap-2 mb-6">
              <span className="text-4xl md:text-5xl">⚡</span>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-[var(--color-text-primary)]">
                기술 스택
              </h1>
            </div>
            <p className="text-lg text-[var(--color-text-secondary)] leading-relaxed">
              제가 주로 사용하는 기술 스택들을 소개합니다.
              <br />각 기술에 대한 경험과 숙련도를 확인해보세요.
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {SKILLS.map((skill, index) => (
              <SkillCard key={skill.name} skill={skill} index={index} />
            ))}
          </motion.div>
        </div>
      </section>
    </Layout>
  );
}
