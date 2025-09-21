"use client";

import { contactChannels } from "@/constants/portfolio";
import SectionContainer from "./SectionContainer";
import SectionHeader from "./SectionHeader";

interface ContactSectionProps {
  availability: string;
  location: string;
  email: string;
  onDownloadResume: () => Promise<void> | void;
}

const ContactSection = ({
  availability,
  location,
  email,
  onDownloadResume,
}: ContactSectionProps) => {
  return (
    <SectionContainer id="contact">
      <SectionHeader
        eyebrow="Contact"
        title="다음 프로젝트를 함께 만들어가요"
        description="제품 목표와 팀 상황을 알려주시면, 가장 빠르게 임팩트를 낼 수 있는 전략과 실행 계획을 제안드릴게요."
        align="center"
      />
      <div className="mt-14 flex flex-col gap-8 lg:flex-row">
        <div className="flex w-full flex-col rounded-3xl border border-[color:var(--color-border-light)] bg-[color:var(--color-card-background)]/90 p-8 shadow-lg shadow-[color:var(--color-card-shadow)]/50 lg:basis-[60%]">
          <h3 className="text-2xl font-semibold text-[color:var(--color-text-primary)]">
            전략부터 실행까지 함께하는 파트너가 필요하신가요?
          </h3>
          <p className="mt-4 text-sm text-[color:var(--color-text-secondary)] leading-relaxed">
            제품 로드맵 검토, 디자인 시스템 구축, 운영툴 고도화 등 어떤 주제든 편하게 이야기를 나눠요. 팀의 현재 페인포인트를 들으며 가장 임팩트가 큰 첫 번째 실험을 찾아드립니다.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <button
              onClick={onDownloadResume}
              className="inline-flex items-center gap-2 rounded-full bg-[color:var(--color-primary)] px-5 py-3 text-sm font-semibold text-white shadow-md shadow-[color:var(--color-primary)]/35 transition-transform duration-200 hover:scale-[1.02]"
            >
              이력서 PDF 받기
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
            </button>
            <a
              href={`mailto:${email}`}
              className="inline-flex items-center gap-2 rounded-full border border-[color:var(--color-border-normal)] px-5 py-3 text-sm font-semibold text-[color:var(--color-text-primary)] transition-colors hover:border-[color:var(--color-primary)] hover:text-[color:var(--color-primary)]"
            >
              메일 보내기
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M4 4h16v12H5.17L4 17.17z" />
              </svg>
            </a>
          </div>
        </div>
        <div className="flex w-full flex-col rounded-3xl border border-[color:var(--color-border-light)] bg-[color:var(--color-background)]/75 p-8 lg:basis-[40%]">
          <dl className="space-y-5 text-sm text-[color:var(--color-text-secondary)]">
            <div>
              <dt className="text-xs uppercase tracking-[0.3em] text-[color:var(--color-text-tertiary)]">
                Availability
              </dt>
              <dd className="mt-1 text-base font-medium text-[color:var(--color-text-primary)]">
                {availability}
              </dd>
            </div>
            <div>
              <dt className="text-xs uppercase tracking-[0.3em] text-[color:var(--color-text-tertiary)]">
                Base
              </dt>
              <dd className="mt-1 text-base font-medium text-[color:var(--color-text-primary)]">
                {location}
              </dd>
            </div>
          </dl>
          <div className="mt-6 space-y-4">
            {contactChannels.map((channel) => (
              <a
                key={channel.label}
                href={channel.href}
                target={channel.href.startsWith("http") ? "_blank" : undefined}
                rel={channel.href.startsWith("http") ? "noopener noreferrer" : undefined}
                className="flex items-center justify-between rounded-2xl border border-[color:var(--color-border-light)] bg-[color:var(--color-card-background)]/90 px-5 py-4 text-sm font-medium text-[color:var(--color-text-primary)] transition-colors hover:border-[color:var(--color-primary)]"
              >
                <span>{channel.label}</span>
                <span className="text-[color:var(--color-text-secondary)]">{channel.value}</span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </SectionContainer>
  );
};

export default ContactSection;
