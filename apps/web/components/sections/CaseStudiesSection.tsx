import { CaseStudy } from "@/constants/portfolio";
import SectionContainer from "./SectionContainer";
import SectionHeader from "./SectionHeader";

interface CaseStudiesSectionProps {
  studies: CaseStudy[];
}

const CaseStudiesSection = ({ studies }: CaseStudiesSectionProps) => {
  return (
    <SectionContainer id="work" className="bg-[color:var(--color-card-background)]/40">
      <SectionHeader
        eyebrow="Case Studies"
        title="수치로 증명한 프로젝트 임팩트"
        description="단순 기능 개발을 넘어, 실제 운영 지표를 개선하고 팀의 작업 방식을 바꾼 사례들입니다."
        align="center"
      />
      <div className="mt-14 grid gap-8 lg:grid-cols-3">
        {studies.map((study) => (
          <article
            key={study.title}
            className="flex h-full flex-col rounded-3xl border border-[color:var(--color-border-light)] bg-[color:var(--color-background)]/85 p-7 shadow-lg shadow-[color:var(--color-card-shadow)]/60"
          >
            <div className="space-y-3">
              <span className="inline-flex w-fit items-center rounded-full bg-[color:var(--color-primary)]/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-[color:var(--color-primary)]">
                {study.company}
              </span>
              <h3 className="text-2xl font-semibold text-[color:var(--color-text-primary)]">
                {study.title}
              </h3>
              <p className="text-sm text-[color:var(--color-text-secondary)] leading-relaxed">
                {study.summary}
              </p>
            </div>
            <ul className="mt-6 space-y-4 text-sm text-[color:var(--color-text-secondary)]">
              {study.highlights.map((highlight) => (
                <li key={highlight} className="flex items-start gap-3">
                  <span className="mt-1 inline-flex h-2.5 w-2.5 flex-shrink-0 rounded-full bg-[color:var(--color-primary)]" />
                  <span className="leading-relaxed">{highlight}</span>
                </li>
              ))}
            </ul>
            <div className="mt-6 flex flex-wrap gap-3">
              {study.metrics.map((metric) => (
                <div
                  key={`${study.title}-${metric.label}`}
                  className="rounded-2xl border border-[color:var(--color-border-light)] bg-[color:var(--color-background)]/70 px-4 py-3"
                >
                  <p className="text-xl font-semibold text-[color:var(--color-text-primary)]">
                    {metric.value}
                  </p>
                  <p className="text-xs font-medium uppercase tracking-[0.2em] text-[color:var(--color-text-tertiary)]">
                    {metric.label}
                  </p>
                </div>
              ))}
            </div>
            <div className="mt-6 flex flex-wrap gap-2 pt-4">
              {study.stack.map((tech) => (
                <span
                  key={`${study.title}-${tech}`}
                  className="rounded-full border border-[color:var(--color-border-light)] bg-[color:var(--color-background)]/60 px-3 py-1 text-xs font-medium text-[color:var(--color-text-secondary)]"
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

export default CaseStudiesSection;
