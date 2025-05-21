import { motion } from "motion/react";
import Link from "next/link";
import type { NotionPost } from "../../app/blog/page";

interface BlogCardProps {
  post: NotionPost;
  index?: number;
}

export default function BlogCard({ post, index = 0 }: BlogCardProps) {
  return (
    <motion.div
      key={post.id}
      className="group relative bg-[var(--color-card-background)]/[.85] backdrop-blur-md rounded-2xl overflow-hidden border border-[var(--color-card-border)]/[.5] hover:border-[var(--color-primary)]/[.5] transition-all duration-300 shadow-md hover:shadow-2xl mx-1 md:mx-0"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1, ease: "easeOut" }}
    >
      <div className="p-5 sm:p-6 md:p-7 lg:p-8">
        <div className="flex items-center justify-between mb-2">
          <h2 className="font-semibold text-lg sm:text-xl md:text-2xl text-[var(--color-text-primary)] group-hover:text-[var(--color-primary)] transition-colors">
            {post.title}
          </h2>
          <span className="text-xs font-medium px-2.5 py-1 bg-[var(--color-gray-100)]/[.5] text-[var(--color-text-secondary)] rounded-full">
            {post.createdAt}
          </span>
        </div>
        <p className="text-[var(--color-text-secondary)] text-sm md:text-base mb-4 line-clamp-2">
          {post.description}
        </p>
        <div className="flex gap-3">
          <Link
            href={post.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center text-sm font-medium text-[var(--color-primary)] hover:text-[var(--color-primary-hover)] transition-colors"
          >
            자세히 보기
            <svg
              className="w-4 h-4 ml-1 transform translate-x-0 group-hover:translate-x-1 transition-transform duration-200 ease-in-out"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
