"use client";

import { motion } from "motion/react";
import SkillCard from "../skills/SkillCard";
import { SKILLS } from "../../constants/skills";

export default function SkillsSection() {
  return (
    <section className="py-24 lg:py-32 bg-gradient-to-b from-zinc-50/50 via-white to-white dark:from-zinc-900/50 dark:via-zinc-900 dark:to-zinc-900">
      <div className="container mx-auto px-6 md:px-8">
        <motion.div
          className="max-w-3xl mx-auto text-center mb-12 lg:mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-zinc-900 dark:text-white">
            기술 스택
          </h2>
          <p className="text-lg text-zinc-600 dark:text-zinc-400">
            제가 주로 사용하는 기술 스택들을 소개합니다.
          </p>
        </motion.div>

        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {SKILLS.map((skill, index) => (
              <SkillCard key={skill.name} skill={skill} index={index} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
