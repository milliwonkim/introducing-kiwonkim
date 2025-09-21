import React from "react";
import type { NotionPost } from "../../app/blog/page";
import Layout from "../layout/Layout";
import BlogArchive from "./BlogArchive";

interface BlogListProps {
  posts?: NotionPost[];
  loading?: boolean;
}

const sectionBaseClasses =
  "py-20 min-h-[calc(100vh-var(--header-height)-10rem)] bg-[var(--color-background)]";

const BlogList: React.FC<BlogListProps> = ({ posts, loading }) => {
  return (
    <Layout>
      <section className={sectionBaseClasses}>
        <div className="container mx-auto max-w-6xl px-6 md:px-8">
          <BlogArchive
            posts={posts ?? []}
            loading={Boolean(loading || !posts)}
            containerClassName="w-full"
          />
        </div>
      </section>
    </Layout>
  );
};

export default BlogList;
