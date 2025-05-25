import { motion } from "motion/react";
import Link from "next/link";
import type { NotionPost } from "../../app/blog/page";

interface BlogCardProps {
  post: NotionPost;
  index?: number;
}

export default function BlogCard({ post, index = 0 }: BlogCardProps) {
  return (
    <Link href={`/blog/${post.id}`} className="block h-full">
      <motion.div
        key={post.id}
        className="group relative h-full bg-white/60 backdrop-blur-sm rounded-2xl overflow-hidden border border-white/60 hover:border-[var(--color-primary)]/30 transition-all duration-300 shadow-lg hover:shadow-2xl cursor-pointer hover:scale-105"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: index * 0.1, ease: "easeOut" }}
      >
        <div className="p-6 h-full flex flex-col">
          {/* 헤더 섹션 */}
          <div className="flex flex-col mb-4">
            <div className="flex items-start justify-between mb-3">
              <h2 className="font-bold text-lg text-[var(--color-text-primary)] group-hover:text-[var(--color-primary)] transition-colors leading-tight line-clamp-2 flex-1 mr-2">
                {post.title}
              </h2>
              <span className="text-xs font-medium px-3 py-1 bg-[var(--color-primary)]/10 text-[var(--color-primary)] rounded-full whitespace-nowrap">
                {new Date(post.createdAt).toLocaleDateString("ko-KR", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}
              </span>
            </div>
          </div>

          {/* 설명 섹션 - flex-1로 남은 공간 차지 */}
          <div className="flex-1 flex flex-col">
            <p className="text-[var(--color-text-secondary)] text-sm leading-relaxed line-clamp-3 mb-6 flex-1">
              {post.description || "블로그 글의 미리보기 내용입니다."}
            </p>
          </div>

          {/* 하단 액션 섹션 - 항상 하단에 고정 */}
          <div className="mt-auto">
            <div className="flex items-center justify-between">
              <span className="inline-flex items-center text-sm font-semibold text-[var(--color-primary)] group-hover:text-[var(--color-primary-hover)] transition-colors">
                자세히 보기
                <svg
                  className="w-4 h-4 ml-2 transform translate-x-0 group-hover:translate-x-1 transition-transform duration-200 ease-in-out"
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
            </div>
          </div>
        </div>
      </motion.div>
    </Link>
  );
}
