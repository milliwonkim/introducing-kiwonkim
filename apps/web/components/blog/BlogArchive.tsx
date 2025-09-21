"use client";

import { useMemo, useState } from "react";
import clsx from "clsx";
import { motion } from "motion/react";

import type { NotionPost } from "@/app/blog/page";
import { getCategoryColor } from "@/utils/categoryColors";
import BlogCard from "./BlogCard";

interface BlogArchiveProps {
  posts: NotionPost[];
  loading?: boolean;
  errorMessage?: string;
  containerClassName?: string;
  showIntro?: boolean;
}

export default function BlogArchive({
  posts,
  loading = false,
  errorMessage,
  containerClassName,
  showIntro = true,
}: BlogArchiveProps) {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const categoryList = useMemo(
    () => Array.from(new Set(posts.map((post) => post.category))).filter(Boolean),
    [posts],
  );

  const filteredPosts = useMemo(
    () =>
      selectedCategory
        ? posts.filter((post) => post.category === selectedCategory)
        : posts,
    [posts, selectedCategory],
  );

  const renderIntro = () => (
    <motion.div
      className="mx-auto mb-16 max-w-3xl text-center"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <div className="mb-6 flex flex-col items-center gap-2">
        <span className="text-4xl md:text-5xl">📝</span>
        <h1 className="text-3xl font-bold text-[var(--color-text-primary)] md:text-4xl lg:text-5xl">
          Blog
        </h1>
      </div>
      <p className="leading-relaxed text-lg text-[var(--color-text-secondary)]">
        Sharing development experiences and learnings.
        <br />
        Let&apos;s explore new technologies and insights together.
      </p>
    </motion.div>
  );

  if (loading) {
    return (
      <div className={clsx("w-full", containerClassName)}>
        {showIntro && renderIntro()}
        <div className="py-12 text-center text-lg text-[var(--color-text-secondary)]">
          <div className="mx-auto mb-4 h-8 w-8 animate-spin rounded-full border-2 border-t-transparent border-[var(--color-primary)]" />
          Loading blog posts...
        </div>
      </div>
    );
  }

  if (errorMessage) {
    return (
      <div className={clsx("w-full", containerClassName)}>
        {showIntro && renderIntro()}
        <div className="py-12 text-center text-red-500">{errorMessage}</div>
      </div>
    );
  }

  if (!posts.length) {
    return (
      <div className={clsx("w-full", containerClassName)}>
        {showIntro && renderIntro()}
        <div className="py-12 text-center">
          <div className="mb-4 text-6xl">📭</div>
          <h2 className="mb-2 text-2xl font-bold text-[var(--color-text-primary)]">
            No posts yet
          </h2>
          <p className="text-[var(--color-text-secondary)]">
            Coming soon with interesting content!
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className={clsx("w-full", containerClassName)}>
      {showIntro && renderIntro()}

      <div className="mb-12 flex flex-wrap justify-center gap-3">
        <button
          className={`rounded-lg px-4 py-2 font-medium transition-colors ${
            !selectedCategory
              ? "bg-[var(--color-primary)] text-white"
              : "border border-[var(--color-card-border)] bg-[var(--color-card-background)] text-[var(--color-text-primary)] hover:border-[var(--color-primary)]"
          }`}
          onClick={() => setSelectedCategory(null)}
          type="button"
        >
          All
        </button>
        {categoryList.map((category) => {
          const color = getCategoryColor(category);
          const isSelected = selectedCategory === category;
          return (
            <button
              key={category}
              className={clsx(
                "rounded-lg border px-4 py-2 font-medium transition-colors",
                color.border,
                isSelected
                  ? clsx(color.bg, color.text)
                  : "bg-[var(--color-card-background)] text-[var(--color-text-primary)]",
              )}
              onClick={() => setSelectedCategory(category)}
              type="button"
            >
              {category}
            </button>
          );
        })}
      </div>

      <motion.div
        className="grid auto-rows-fr grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        {filteredPosts.map((post, index) => (
          <BlogCard key={post.id} post={post} index={index} />
        ))}
      </motion.div>
    </div>
  );
}
