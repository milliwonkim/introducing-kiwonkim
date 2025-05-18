import { motion } from "motion/react";
import { Skill } from "../../constants/skills";

interface SkillCardProps {
  skill: Skill;
  index: number;
}

export default function SkillCard({ skill, index }: SkillCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.5,
        delay: index * 0.1,
        ease: "easeOut",
      }}
      className="group relative bg-[var(--color-card-background)]/[.8] backdrop-blur-sm rounded-2xl border border-[var(--color-card-border)]/[.5] hover:border-[var(--color-border-normal)]/[.5] transition-all duration-300 hover:shadow-lg p-6"
    >
      <div className="flex flex-col items-center text-center">
        <div className="mb-4 group-hover:scale-110 transition-transform duration-300">
          {skill.icon}
        </div>
        <h3 className="text-lg font-medium text-[var(--color-text-primary)] mb-2">
          {skill.name}
        </h3>
        {skill.description && (
          <p className="text-sm text-[var(--color-text-secondary)]">
            {skill.description}
          </p>
        )}
      </div>
    </motion.div>
  );
}
