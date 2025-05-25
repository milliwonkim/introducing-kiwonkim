import { motion } from "motion/react";

export interface Project {
  id: number;
  title: string;
  company: string;
  date: string;
  description?: string;
  url?: string;
}

interface ProjectCardProps {
  project: Project;
  index?: number;
}

export default function ProjectCard({ project, index = 0 }: ProjectCardProps) {
  const handleCardClick = () => {
    if (project.url) {
      window.open(project.url, "_blank", "noopener,noreferrer");
    }
  };

  return (
    <motion.div
      key={project.id}
      className={`group relative bg-[var(--color-card-background)] border border-[var(--color-card-border)] rounded-2xl shadow-[0_2px_8px_0_rgba(59,130,246,0.06)] hover:shadow-[0_4px_16px_0_rgba(59,130,246,0.13)] transition-all duration-300 p-7 flex flex-col gap-3 items-start hover:-translate-y-1 hover:scale-[1.02] overflow-hidden ${
        project.url ? "cursor-pointer" : "cursor-default"
      }`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.5,
        delay: index * 0.1,
        ease: "easeOut",
      }}
      style={{ minHeight: 210 }}
      onClick={handleCardClick}
      role={project.url ? "button" : undefined}
      tabIndex={project.url ? 0 : undefined}
      onKeyDown={(e) => {
        if (project.url && (e.key === "Enter" || e.key === " ")) {
          e.preventDefault();
          handleCardClick();
        }
      }}
      aria-label={
        project.url ? `${project.title} 프로젝트 상세보기` : undefined
      }
    >
      {/* 회사명 chip/badge - 대표색상 */}
      <span className="inline-block px-3 py-1 rounded-[8px] bg-[var(--color-primary-light)] text-[var(--color-primary)] text-xs font-bold tracking-wide shadow-sm mb-1 border border-[var(--color-primary)]/20">
        {project.company}
      </span>

      {/* 제목 강조 - 완전 검정 */}
      <h2
        className={`font-extrabold text-lg md:text-xl transition-colors mb-0.5 truncate w-full ${
          project.url
            ? "text-[var(--color-text-primary)] group-hover:text-[var(--color-primary)]"
            : "text-[var(--color-text-primary)]"
        }`}
      >
        {project.title}
      </h2>

      {/* 날짜 - 제목 바로 아래, 세련된 gray */}
      <span className="block text-xs text-[var(--color-text-tertiary)] mb-1">
        {project.date}
      </span>

      {/* 설명 */}
      {project.description && (
        <p className="text-sm text-[var(--color-text-secondary)] mb-2 line-clamp-3 w-full">
          {project.description}
        </p>
      )}

      {/* 하단 액션 영역 */}
      <div className="mt-auto w-full flex justify-between items-center">
        {project.url ? (
          <div className="flex items-center text-sm text-[var(--color-primary)] group-hover:text-[var(--color-primary-hover)] transition-colors">
            <span className="font-semibold">자세히 보기</span>
            <svg
              className="w-4 h-4 ml-2 transform translate-x-0 group-hover:translate-x-1 transition-transform duration-200"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
              />
            </svg>
          </div>
        ) : (
          <span className="text-sm text-gray-400 font-medium">링크 준비중</span>
        )}

        {/* 새창 아이콘 표시 */}
        {project.url && (
          <div className="opacity-60 group-hover:opacity-100 transition-opacity">
            <svg
              className="w-4 h-4 text-[var(--color-text-tertiary)]"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
              />
            </svg>
          </div>
        )}
      </div>
    </motion.div>
  );
}
