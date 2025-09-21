import { CultureSignal } from "@/constants/portfolio";
import SectionContainer from "./SectionContainer";
import SectionHeader from "./SectionHeader";

interface CultureSectionProps {
  signals: CultureSignal[];
}

const CultureSection = ({ signals }: CultureSectionProps) => {
  return (
    <SectionContainer id="culture" className="bg-[color:var(--color-card-background)]/50">
      <SectionHeader
        eyebrow="How I Work"
        title="함께 일하면 경험할 수 있는 것들"
        description="제품팀이 신뢰할 수 있는 파트너가 되기 위해 중요하게 생각하는 일하는 방식입니다."
      />
      <div className="mt-10 grid gap-5 md:grid-cols-2">
        {signals.map((signal) => (
          <article
            key={signal.title}
            className="rounded-3xl border border-[color:var(--color-border-light)] bg-[color:var(--color-background)]/85 p-5 sm:p-6 shadow-sm"
          >
            <h3 className="text-lg font-semibold text-[color:var(--color-text-primary)]">
              {signal.title}
            </h3>
            <p className="mt-3 text-sm text-[color:var(--color-text-secondary)] leading-relaxed">
              {signal.description}
            </p>
          </article>
        ))}
      </div>
    </SectionContainer>
  );
};

export default CultureSection;
