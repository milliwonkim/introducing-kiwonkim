import Link from "next/link";
import { motion } from "motion/react";
import type { NotionPost } from "../../app/blog/page";
import { getCategoryColor } from "../../utils/categoryColors";

interface BlogCardProps {
  post: NotionPost;
  index?: number;
}

export default function BlogCard({ post, index = 0 }: BlogCardProps) {
  const categoryColor = post.category
    ? getCategoryColor(post.category)
    : null;

  return (
    <Link
      href={`/blog/${post.id}`}
      className="group block h-full"
      aria-label={`${post.title} 블로그 글 상세 보기`}
    >
      <motion.div
        key={post.id}
        className="relative flex h-full flex-col overflow-hidden rounded-2xl border border-[color:var(--color-card-border)] bg-[color:var(--color-card-background)]/90 backdrop-blur-sm shadow-[0_18px_42px_var(--color-card-shadow)] transition-all duration-300 hover:-translate-y-1 hover:scale-[1.02] hover:border-[color:var(--color-primary)]/35 hover:shadow-[0_26px_56px_var(--color-card-shadow-hover)]"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: index * 0.1, ease: "easeOut" }}
      >
        <div className="flex h-full flex-col p-6">
          {/* 헤더 섹션 */}
          <div className="mb-4 flex flex-col">
            {post.category && categoryColor && (
              <span
                className={`inline-flex w-fit px-3 py-1 text-xs font-medium ${categoryColor.bg} ${categoryColor.text} ${categoryColor.border} rounded-full border mb-2 shadow-sm`}
              >
                {post.category}
              </span>
            )}
            <div className="mb-3 flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
              <h2 className="text-lg font-bold leading-tight text-[color:var(--color-text-primary)] transition-colors group-hover:text-[color:var(--color-primary)] sm:flex-1 sm:min-w-0">
                {post.title}
              </h2>
              <span className="inline-flex w-fit rounded-full bg-[color:var(--color-primary)]/12 px-3 py-1 text-xs font-medium text-[color:var(--color-primary)] sm:ml-2 sm:self-start sm:whitespace-nowrap">
                {new Date(post.createdAt).toLocaleDateString("ko-KR", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}
              </span>
            </div>
          </div>

          {/* 설명 섹션 - flex-1로 남은 공간 차지 */}
          <div className="flex flex-1 flex-col">
            <p className="mb-6 flex-1 text-sm leading-relaxed text-[color:var(--color-text-secondary)] line-clamp-3">
              {post.description || "블로그 글의 미리보기 내용입니다."}
            </p>
          </div>

          {/* 하단 액션 섹션 - 항상 하단에 고정 */}
          <div className="mt-auto flex items-center justify-between">
            <span className="inline-flex items-center text-sm font-semibold text-[color:var(--color-primary)] transition-colors group-hover:text-[color:var(--color-primary-hover)]">
              자세히 보기
              <svg
                className="ml-2 h-4 w-4 translate-x-0 transition-transform duration-200 ease-in-out group-hover:translate-x-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </span>
            <span
              className="inline-flex items-center gap-1 text-xs font-medium text-[color:var(--color-text-tertiary)]"
              title="노션 데이터로 작성된 글"
            >
              Notion 기반
              <svg
                className="h-3.5 w-3.5"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M11.25 3.75H16.25V8.75"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M8.75 11.25L16.25 3.75"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M8.75 3.75H5.75C4.64543 3.75 3.75 4.64543 3.75 5.75V14.25C3.75 15.3546 4.64543 16.25 5.75 16.25H14.25C15.3546 16.25 16.25 15.3546 16.25 14.25V11.5"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
          </div>
        </div>
      </motion.div>
    </Link>
  );
}
