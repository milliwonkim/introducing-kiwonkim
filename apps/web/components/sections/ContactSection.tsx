"use client";

import { contactChannels } from "@/constants/portfolio";
import SectionContainer from "./SectionContainer";
import SectionHeader from "./SectionHeader";

interface ContactSectionProps {
  location: string;
  email: string;
  onDownloadResume: () => Promise<void> | void;
}

const ContactSection = ({
  location,
  email,
  onDownloadResume,
}: ContactSectionProps) => {
  return (
    <SectionContainer id="contact">
      <SectionHeader
        eyebrow="Contact"
        title="다음 팀에서 함께 성장할 기회를 찾고 있어요"
        description="사용자 경험에 집중하는 프론트엔드 개발자로서 풀타임 포지션을 찾고 있습니다. 팀의 목표를 알려주시면 제 경험이 어떻게 기여할 수 있을지 이야기 나눠요."
        align="center"
      />
      <div className="mt-14 grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="rounded-3xl border border-[color:var(--color-border-light)] bg-[color:var(--color-card-background)]/90 p-8 shadow-lg shadow-[color:var(--color-card-shadow)]/50">
          <h3 className="text-2xl font-semibold text-[color:var(--color-text-primary)]">
            팀에 합류할 프론트엔드 개발자가 필요하신가요?
          </h3>
          <p className="mt-4 text-sm text-[color:var(--color-text-secondary)] leading-relaxed">
            제품 로드맵을 실행하고 디자인 시스템을 다듬으며, 운영툴을 고도화했던
            경험을 새로운 팀에서 이어가고 싶습니다. 팀의 페인포인트를 들려주시면
            제가 만들었던 해결 방식과 기여 포인트를 공유드릴게요.
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
        <div className="rounded-3xl border border-[color:var(--color-border-light)] bg-[color:var(--color-background)]/75 p-8">
          <dl className="space-y-5 text-sm text-[color:var(--color-text-secondary)]">
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
                rel={
                  channel.href.startsWith("http")
                    ? "noopener noreferrer"
                    : undefined
                }
                className="flex items-center justify-between rounded-2xl border border-[color:var(--color-border-light)] bg-[color:var(--color-card-background)]/90 px-5 py-4 text-sm font-medium text-[color:var(--color-text-primary)] transition-colors hover:border-[color:var(--color-primary)]"
              >
                <span>{channel.label}</span>
                <span className="text-[color:var(--color-text-secondary)]">
                  {channel.value}
                </span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </SectionContainer>
  );
};

export default ContactSection;
