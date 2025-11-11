import React, { ReactNode, useState } from "react";
import type { NotionPost } from "../../app/blog/page";
import { motion } from "motion/react";
import BlogCard from "./BlogCard";
import Layout from "../layout/Layout";
import { getCategoryColor } from "../../utils/categoryColors";

interface BlogListProps {
  posts?: NotionPost[];
  loading?: boolean;
  variant?: BlogListVariant;
}

type BlogListVariant = "page" | "modal";

const sectionBaseClasses =
  "py-20 min-h-[calc(100vh-var(--header-height)-10rem)] bg-[var(--color-background)]";

function BlogSectionWrapper({
  variant,
  children,
}: {
  variant: BlogListVariant;
  children: ReactNode;
}) {
  const sectionClasses =
    variant === "modal"
      ? "py-10 bg-[var(--color-background)]"
      : sectionBaseClasses;
  const content = (
    <section className={sectionClasses}>
      <div className="container mx-auto px-6 md:px-8">{children}</div>
    </section>
  );

  if (variant === "modal") {
    return content;
  }

  return <Layout>{content}</Layout>;
}

const BlogIntro = () => (
  <motion.div
    className="max-w-3xl mx-auto text-center mb-16"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, ease: "easeOut" }}
  >
    <div className="flex flex-col items-center gap-2 mb-6">
      <span className="text-4xl md:text-5xl">📝</span>
      <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-[var(--color-text-primary)]">
        Blog
      </h1>
    </div>
    <p className="text-lg text-[var(--color-text-secondary)] leading-relaxed">
      Sharing development experiences and learnings.
      <br />
      Let&apos;s explore new technologies and insights together.
    </p>
  </motion.div>
);

const LoadingState = ({ variant }: { variant: BlogListVariant }) => (
  <BlogSectionWrapper variant={variant}>
    <BlogIntro />
    <div className="text-center text-lg text-[var(--color-text-secondary)] py-12">
      <div className="w-8 h-8 border-2 border-[var(--color-primary)] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
      Loading blog posts...
    </div>
  </BlogSectionWrapper>
);

const EmptyState = ({ variant }: { variant: BlogListVariant }) => (
  <BlogSectionWrapper variant={variant}>
    <BlogIntro />
    <div className="text-center py-12">
      <div className="text-6xl mb-4">📭</div>
      <h2 className="text-2xl font-bold text-[var(--color-text-primary)] mb-2">
        No posts yet
      </h2>
      <p className="text-[var(--color-text-secondary)]">
        Coming soon with interesting content!
      </p>
    </div>
  </BlogSectionWrapper>
);

const BlogList: React.FC<BlogListProps> = ({
  posts,
  loading,
  variant = "page",
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  if (loading || !posts) {
    return <LoadingState variant={variant} />;
  }

  if (!posts.length) {
    return <EmptyState variant={variant} />;
  }

  const categoryList = Array.from(
    new Set(posts.map((p) => p.category))
  ).filter(Boolean);
  const filteredPosts = selectedCategory
    ? posts.filter((p) => p.category === selectedCategory)
    : posts;

  return (
    <BlogSectionWrapper variant={variant}>
      <BlogIntro />

      <div className="flex flex-wrap gap-3 justify-center mb-12">
        <button
          className={`px-4 py-2 rounded-lg font-medium transition-colors ${
            !selectedCategory
              ? "bg-[var(--color-primary)] text-white"
              : "bg-[var(--color-card-background)] text-[var(--color-text-primary)] border border-[var(--color-card-border)] hover:border-[var(--color-primary)]"
          }`}
          onClick={() => setSelectedCategory(null)}
        >
          All
        </button>
        {categoryList.map((category) => {
          const color = getCategoryColor(category);
          const isSelected = selectedCategory === category;
          return (
            <button
              key={category}
              className={`px-4 py-2 rounded-lg font-medium transition-colors border ${color.border} ${
                isSelected
                  ? `${color.bg} ${color.text}`
                  : "bg-[var(--color-card-background)] text-[var(--color-text-primary)]"
              }`}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </button>
          );
        })}
      </div>

      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 auto-rows-fr"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        {filteredPosts.map((post, idx) => (
          <BlogCard key={post.id} post={post} index={idx} />
        ))}
      </motion.div>
    </BlogSectionWrapper>
  );
};

export default BlogList;
