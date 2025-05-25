import React from "react";
import type { NotionPost } from "../../app/blog/page";
import { motion } from "motion/react";
import BlogCard from "./BlogCard";
import Layout from "../layout/Layout";

interface BlogListProps {
  posts?: NotionPost[];
  loading?: boolean;
}

function BlogListSkeleton() {
  return (
    <Layout>
      <section className="py-20 min-h-[calc(100vh-var(--header-height))] bg-[var(--color-background)]">
        <div className="container mx-auto px-6 md:px-8">
          <motion.div
            className="max-w-3xl mx-auto text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <div className="flex flex-col items-center gap-2 mb-6">
              <span className="text-4xl md:text-5xl">📝</span>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-[var(--color-text-primary)]">
                블로그
              </h1>
            </div>
            <p className="text-lg text-[var(--color-text-secondary)] leading-relaxed">
              개발 경험과 학습 내용을 공유합니다.
              <br />
              새로운 기술과 인사이트를 함께 나누어요.
            </p>
          </motion.div>

          <div className="text-center text-lg text-[var(--color-text-secondary)] py-12">
            <div className="w-8 h-8 border-2 border-[var(--color-primary)] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            블로그 글을 불러오는 중...
          </div>
        </div>
      </section>
    </Layout>
  );
}

const BlogList: React.FC<BlogListProps> = ({ posts, loading }) => {
  if (loading || !posts) return <BlogListSkeleton />;

  if (!posts.length) {
    return (
      <Layout>
        <section className="py-20 min-h-[calc(100vh-var(--header-height))] bg-[var(--color-background)]">
          <div className="container mx-auto px-6 md:px-8">
            <motion.div
              className="max-w-3xl mx-auto text-center mb-16"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            >
              <div className="flex flex-col items-center gap-2 mb-6">
                <span className="text-4xl md:text-5xl">📝</span>
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-[var(--color-text-primary)]">
                  블로그
                </h1>
              </div>
              <p className="text-lg text-[var(--color-text-secondary)] leading-relaxed">
                개발 경험과 학습 내용을 공유합니다.
                <br />
                새로운 기술과 인사이트를 함께 나누어요.
              </p>
            </motion.div>

            <div className="text-center py-12">
              <div className="text-6xl mb-4">📭</div>
              <h2 className="text-2xl font-bold text-[var(--color-text-primary)] mb-2">
                아직 작성된 글이 없습니다
              </h2>
              <p className="text-[var(--color-text-secondary)]">
                곧 흥미로운 글들로 채워질 예정입니다!
              </p>
            </div>
          </div>
        </section>
      </Layout>
    );
  }

  return (
    <Layout>
      <section className="py-20 min-h-[calc(100vh-var(--header-height))] bg-[var(--color-background)]">
        <div className="container mx-auto px-6 md:px-8">
          <motion.div
            className="max-w-3xl mx-auto text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <div className="flex flex-col items-center gap-2 mb-6">
              <span className="text-4xl md:text-5xl">📝</span>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-[var(--color-text-primary)]">
                블로그
              </h1>
            </div>
            <p className="text-lg text-[var(--color-text-secondary)] leading-relaxed">
              개발 경험과 학습 내용을 공유합니다.
              <br />
              새로운 기술과 인사이트를 함께 나누어요.
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 auto-rows-fr"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {posts.map((post, idx) => (
              <BlogCard key={post.id} post={post} index={idx} />
            ))}
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default BlogList;
