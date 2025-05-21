"use client";

import { useEffect, useState } from "react";
import BlogList from "@/components/blog/BlogList";

export interface NotionPost {
  id: string;
  title: string;
  description: string;
  url: string;
  createdAt: string;
}

export default function BlogPage() {
  const [posts, setPosts] = useState<NotionPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/blog")
      .then((res) => res.json())
      .then((data) => setPosts(data))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div>로딩 중...</div>;

  return <BlogList posts={posts} />;
}
