import { Skill } from "../../constants/skills";

interface SkillCardProps {
  skill: Skill;
  index: number;
}

export default function SkillCard({ skill }: SkillCardProps) {
  return (
    <div className="group relative bg-[var(--color-card-background)] rounded-lg border border-[var(--color-card-border)] hover:border-[var(--color-border-normal)] transition-all duration-200 p-4">
      <div className="flex flex-col items-center text-center">
        <div className="mb-3 group-hover:scale-105 transition-transform duration-200">
          {skill.icon}
        </div>
        <h3 className="text-sm font-medium text-[var(--color-text-primary)]">
          {skill.name}
        </h3>
      </div>
    </div>
  );
}
