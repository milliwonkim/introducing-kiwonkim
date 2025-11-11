"use client";

import { HeroContent } from "@/constants/portfolio";
import { motion } from "motion/react";
import SectionContainer from "./SectionContainer";

interface HeroSectionProps {
  hero: HeroContent;
  onDownloadResume: () => Promise<void> | void;
}

const HeroSection = ({ hero, onDownloadResume }: HeroSectionProps) => {
  return (
    <SectionContainer id="hero" className="pt-20 sm:pt-28 pb-12">
      <div className="flex items-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="space-y-8"
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-[color:var(--color-border-normal)] bg-[color:var(--color-card-background)] px-4 py-1.5 text-sm font-medium text-[color:var(--color-text-secondary)]">
            {hero.badge}
          </span>
          <div className="space-y-6">
            <h1 className="text-4xl sm:text-5xl leading-[1.15] font-semibold text-[color:var(--color-text-primary)]">
              {hero.title}
            </h1>
            <p className="text-lg sm:text-xl text-[color:var(--color-text-secondary)] leading-relaxed">
              {hero.description}
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl border border-[color:var(--color-border-light)] bg-[color:var(--color-card-background)]/80 p-5 shadow-sm">
              <p className="text-xs uppercase tracking-[0.28em] text-[color:var(--color-text-tertiary)]">
                현재 집중하고 있는 일
              </p>
              <p className="mt-3 text-base font-medium text-[color:var(--color-text-primary)] leading-relaxed">
                {hero.currentFocus}
              </p>
            </div>
            <div className="rounded-2xl border border-[color:var(--color-border-light)] bg-[color:var(--color-card-background)]/80 p-5 shadow-sm">
              <p className="text-xs uppercase tracking-[0.28em] text-[color:var(--color-text-tertiary)]">
                Working Style
              </p>
              <dl className="mt-3 space-y-2 text-sm">
                <div>
                  <dt className="text-[color:var(--color-text-tertiary)]">
                    Location
                  </dt>
                  <dd className="text-[color:var(--color-text-primary)] font-medium">
                    {hero.location}
                  </dd>
                </div>
              </dl>
            </div>
          </div>
          <div className="flex flex-wrap gap-4">
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={onDownloadResume}
              className="inline-flex items-center gap-2 rounded-full bg-[color:var(--color-primary)] px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-[color:var(--color-primary)]/35"
            >
              이력서 PDF 다운로드
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
            </motion.button>
            <a
              href={`mailto:${hero.contactEmail}`}
              className="inline-flex items-center gap-2 rounded-full border border-[color:var(--color-border-normal)] bg-transparent px-6 py-3 text-sm font-semibold text-[color:var(--color-text-primary)] transition-colors hover:border-[color:var(--color-primary)] hover:text-[color:var(--color-primary)]"
            >
              프로젝트 이야기 나누기
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
        </motion.div>
      </div>
    </SectionContainer>
  );
};

export default HeroSection;
