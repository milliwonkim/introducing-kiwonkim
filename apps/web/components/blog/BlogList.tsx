import React from "react";
import type { NotionPost } from "../../app/blog/page";
import Link from "next/link";
import { motion } from "motion/react";
import BlogCard from "./BlogCard";

interface BlogListProps {
  posts?: NotionPost[];
  loading?: boolean;
}

function BlogListSkeleton() {
  // 4개 스켈레톤 카드
  return (
    <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-10 grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10">
      {[1, 2, 3, 4].map((i) => (
        <div
          key={i}
          className="animate-pulse bg-gray-300 rounded-2xl overflow-hidden border border-gray-400  shadow-md mx-1 md:mx-0"
        >
          <div className="p-5 sm:p-6 md:p-7 lg:p-8">
            <div className="flex items-center justify-between mb-2">
              <div className="h-6 w-2/3 bg-gray-400  rounded mb-2" />
              <div className="h-4 w-16 bg-gray-400  rounded-full" />
            </div>
            <div className="h-4 w-full bg-gray-400  rounded mb-2" />
            <div className="h-4 w-5/6 bg-gray-400  rounded mb-4" />
            <div className="flex gap-3">
              <div className="h-6 w-24 bg-gray-400 rounded" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

const BlogList: React.FC<BlogListProps> = ({ posts, loading }) => {
  if (loading || !posts) return <BlogListSkeleton />;
  if (!posts.length) return <div>글이 없습니다.</div>;
  return (
    <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-10 grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10">
      {posts.map((post, idx) => (
        <BlogCard key={post.id} post={post} index={idx} />
      ))}
    </div>
  );
};

export default BlogList;
