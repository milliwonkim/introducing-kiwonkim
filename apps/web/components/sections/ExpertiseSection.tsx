import { ExpertisePillar } from "@/constants/portfolio";
import SectionContainer from "./SectionContainer";
import SectionHeader from "./SectionHeader";

interface ExpertiseSectionProps {
  pillars: ExpertisePillar[];
}

const ExpertiseSection = ({ pillars }: ExpertiseSectionProps) => {
  return (
    <SectionContainer id="expertise">
      <SectionHeader
        eyebrow="Expertise"
        title="스케일업을 위한 프론트엔드 역량"
        description="프론트엔드 아키텍처부터 데이터 기반 실험, 협업 체계 구축까지 제품 팀이 필요로 하는 전 과정을 지원합니다."
      />
      <div className="mt-12 grid gap-6 md:grid-cols-2">
        {pillars.map((pillar) => (
          <article
            key={pillar.title}
            className="h-full rounded-3xl border border-[color:var(--color-border-light)] bg-[color:var(--color-card-background)]/85 p-6 shadow-md"
          >
            <h3 className="text-xl font-semibold text-[color:var(--color-text-primary)]">
              {pillar.title}
            </h3>
            <p className="mt-3 text-sm text-[color:var(--color-text-secondary)] leading-relaxed">
              {pillar.description}
            </p>
            <ul className="mt-5 space-y-3 text-sm text-[color:var(--color-text-secondary)]">
              {pillar.points.map((point) => (
                <li key={point} className="flex items-start gap-3">
                  <span className="mt-1 inline-flex h-2.5 w-2.5 flex-shrink-0 rounded-full bg-[color:var(--color-primary)]/70" />
                  <span className="leading-relaxed">{point}</span>
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </SectionContainer>
  );
};

export default ExpertiseSection;
