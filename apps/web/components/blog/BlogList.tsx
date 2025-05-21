import React from "react";
import type { NotionPost } from "../../app/blog/page";
import Link from "next/link";
import { motion } from "motion/react";
import BlogCard from "./BlogCard";

interface BlogListProps {
  posts: NotionPost[];
}

const BlogList: React.FC<BlogListProps> = ({ posts }) => {
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
