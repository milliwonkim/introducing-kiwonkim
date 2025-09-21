import { ExperienceItem } from "@/constants/portfolio";
import SectionContainer from "./SectionContainer";
import SectionHeader from "./SectionHeader";

interface ExperienceSectionProps {
  experiences: ExperienceItem[];
}

const ExperienceSection = ({ experiences }: ExperienceSectionProps) => {
  return (
    <SectionContainer id="experience">
      <SectionHeader
        eyebrow="Experience"
        title="도메인을 넘나들며 증명한 실행력"
        description="운영툴, 커머스, 데이터 솔루션까지 다양한 제품군에서 핵심 문제를 해결하며 팀의 개발 문화를 정비했습니다."
      />
      <div className="mt-10 sm:mt-12 space-y-8 sm:space-y-10">
        {experiences.map((experience) => (
          <article
            key={`${experience.company}-${experience.period}`}
            className="rounded-3xl border border-[color:var(--color-border-light)] bg-[color:var(--color-card-background)]/90 p-6 sm:p-8 shadow-lg shadow-[color:var(--color-card-shadow)]/60"
          >
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.28em] text-[color:var(--color-text-tertiary)]">
                  {experience.company}
                </p>
                <h3 className="mt-2 text-2xl font-semibold text-[color:var(--color-text-primary)]">
                  {experience.role}
                </h3>
              </div>
              <div className="text-sm text-left text-[color:var(--color-text-secondary)] sm:text-right">
                <p className="font-medium text-[color:var(--color-text-primary)]">
                  {experience.period}
                </p>
                <p>{experience.location}</p>
              </div>
            </div>
            <p className="mt-5 sm:mt-6 text-[color:var(--color-text-secondary)] leading-relaxed">
              {experience.summary}
            </p>
            <ul className="mt-5 sm:mt-6 grid gap-3 text-sm text-[color:var(--color-text-secondary)]">
              {experience.achievements.map((achievement) => (
                <li
                  key={achievement}
                  className="rounded-2xl border border-[color:var(--color-border-light)] bg-[color:var(--color-background)]/60 px-4 py-2.5 sm:py-3"
                >
                  {achievement}
                </li>
              ))}
            </ul>
            {experience.impacts && (
              <div className="mt-5 sm:mt-6 flex flex-wrap gap-3">
                {experience.impacts.map((impact) => (
                  <div
                    key={`${experience.company}-${impact.label}`}
                    className="rounded-full border border-[color:var(--color-border-normal)] bg-[color:var(--color-background)]/80 px-4 py-1.5 sm:py-2 text-xs font-semibold uppercase tracking-[0.2em] text-[color:var(--color-text-secondary)]"
                  >
                    <span className="mr-2 text-base font-semibold text-[color:var(--color-text-primary)]">
                      {impact.value}
                    </span>
                    {impact.label}
                  </div>
                ))}
              </div>
            )}
            <div className="mt-5 sm:mt-6 flex flex-wrap gap-2">
              {experience.stack.map((tech) => (
                <span
                  key={`${experience.company}-${tech}`}
                  className="rounded-full border border-[color:var(--color-border-light)] bg-[color:var(--color-background)]/70 px-3 py-1 text-xs font-medium text-[color:var(--color-text-secondary)]"
                >
                  {tech}
                </span>
              ))}
            </div>
          </article>
        ))}
      </div>
    </SectionContainer>
  );
};

export default ExperienceSection;
