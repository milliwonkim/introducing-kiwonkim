"use client";

import { motion } from "motion/react";
import {
  HeroContent,
  ImpactMetric,
} from "@/constants/portfolio";
import SectionContainer from "./SectionContainer";

interface HeroSectionProps {
  hero: HeroContent;
  metrics: ImpactMetric[];
  onDownloadResume: () => Promise<void> | void;
}

const HeroSection = ({ hero, metrics, onDownloadResume }: HeroSectionProps) => {
  return (
    <SectionContainer id="hero" className="pt-20 sm:pt-28 pb-12">
      <div className="flex flex-col items-stretch gap-10 lg:flex-row lg:items-center lg:gap-16">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="flex-1 space-y-8"
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
          <div className="flex flex-wrap gap-4">
            <div className="flex min-w-[16rem] flex-1 rounded-2xl border border-[color:var(--color-border-light)] bg-[color:var(--color-card-background)]/80 p-5 shadow-sm">
              <div>
                <p className="text-xs uppercase tracking-[0.28em] text-[color:var(--color-text-tertiary)]">
                  현재 집중하고 있는 일
                </p>
                <p className="mt-3 text-base font-medium text-[color:var(--color-text-primary)] leading-relaxed">
                  {hero.currentFocus}
                </p>
              </div>
            </div>
            <div className="flex min-w-[16rem] flex-1 rounded-2xl border border-[color:var(--color-border-light)] bg-[color:var(--color-card-background)]/80 p-5 shadow-sm">
              <div>
                <p className="text-xs uppercase tracking-[0.28em] text-[color:var(--color-text-tertiary)]">
                  Working Style
                </p>
                <dl className="mt-3 space-y-2 text-sm">
                  <div>
                    <dt className="text-[color:var(--color-text-tertiary)]">Availability</dt>
                    <dd className="text-[color:var(--color-text-primary)] font-medium">
                      {hero.availability}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-[color:var(--color-text-tertiary)]">Location</dt>
                    <dd className="text-[color:var(--color-text-primary)] font-medium">
                      {hero.location}
                    </dd>
                  </div>
                </dl>
              </div>
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

        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.6, ease: "easeOut" }}
          className="flex-1 rounded-3xl border border-[color:var(--color-border-light)] bg-[color:var(--color-card-background)]/90 p-8 shadow-xl shadow-[color:var(--color-card-shadow)]/70 backdrop-blur"
        >
          <h2 className="text-sm font-semibold uppercase tracking-[0.32em] text-[color:var(--color-text-tertiary)]">
            Impact Metrics
          </h2>
          <div className="mt-6 flex flex-wrap gap-6">
            {metrics.map((metric) => (
              <div key={metric.label} className="flex min-w-[16rem] flex-1">
                <div className="w-full rounded-2xl border border-[color:var(--color-border-light)] bg-[color:var(--color-background)]/60 px-4 py-5">
                  <p className="text-2xl font-semibold text-[color:var(--color-text-primary)]">
                    {metric.value}
                  </p>
                  <p className="mt-1 text-sm font-medium text-[color:var(--color-text-secondary)]">
                    {metric.label}
                  </p>
                  <p className="mt-2 text-xs text-[color:var(--color-text-tertiary)] leading-relaxed">
                    {metric.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </SectionContainer>
  );
};

export default HeroSection;
