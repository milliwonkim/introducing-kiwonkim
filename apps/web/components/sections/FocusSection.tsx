import { FocusArea } from "@/constants/portfolio";
import SectionContainer from "./SectionContainer";
import SectionHeader from "./SectionHeader";

interface FocusSectionProps {
  areas: FocusArea[];
}

const FocusSection = ({ areas }: FocusSectionProps) => {
  return (
    <SectionContainer
      id="about"
      className="bg-[color:var(--color-card-background)]/40 backdrop-blur-sm"
    >
      <SectionHeader
        title="사용자 가치와 비즈니스 임팩트를 동시에 추구합니다"
        description="다양한 도메인에서 반복적으로 검증된 방법론과 실행력을 바탕으로, 팀이 원하는 속도로 실험하고 성장할 수 있는 환경을 만듭니다."
      />
      <div className="mt-12 grid gap-6 md:grid-cols-3">
        {areas.map((area) => (
          <article
            key={area.title}
            className="h-full rounded-3xl border border-[color:var(--color-border-light)] bg-[color:var(--color-background)]/80 p-6 shadow-sm transition-transform duration-300 hover:-translate-y-1"
          >
            <h3 className="text-xl font-semibold text-[color:var(--color-text-primary)]">
              {area.title}
            </h3>
            <p className="mt-3 text-sm text-[color:var(--color-text-secondary)] leading-relaxed">
              {area.description}
            </p>
            <ul className="mt-5 space-y-3 text-sm text-[color:var(--color-text-secondary)]">
              {area.bullets.map((bullet) => (
                <li key={bullet} className="flex items-start gap-3">
                  <span className="mt-1 inline-flex h-2.5 w-2.5 flex-shrink-0 rounded-full bg-[color:var(--color-primary)]/70" />
                  <span className="leading-relaxed">{bullet}</span>
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </SectionContainer>
  );
};

export default FocusSection;
