"use client";

import { useState } from "react";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";

import type { NotionPost } from "@/app/blog/page";
import BlogCard from "../blog/BlogCard";
import BlogModal from "../blog/BlogModal";
import SectionContainer from "./SectionContainer";
import SectionHeader from "./SectionHeader";

const skeletonCards = Array.from({ length: 3 });

export default function NotionBlogSection() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { data, isPending, error } = useQuery<NotionPost[]>({
    queryKey: ["homepage-notion-posts"],
    queryFn: async () => {
      const response = await fetch("/api/blog");
      if (!response.ok) {
        throw new Error("블로그 데이터를 불러오지 못했습니다.");
      }
      return response.json();
    },
  });

  const posts = data?.slice(0, 3) ?? [];

  return (
    <SectionContainer id="blog" className="bg-[color:var(--color-background)]">
      <div className="flex flex-col items-start gap-8 sm:flex-row sm:items-center sm:justify-between">
        <SectionHeader
          eyebrow="Tech Blog"
          title="기술 블로그"
          description="Notion에 기록한 글을 불러와 최신 인사이트를 소개합니다."
        />
        <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:items-center">
          <button
            type="button"
            onClick={() => setIsModalOpen(true)}
            className="inline-flex items-center justify-center rounded-full border border-[color:var(--color-border-light)] bg-[color:var(--color-background)] px-5 py-2 text-sm font-semibold text-[color:var(--color-text-primary)] shadow-sm transition-colors hover:border-[color:var(--color-primary)] hover:text-[color:var(--color-primary)]"
            aria-haspopup="dialog"
            aria-expanded={isModalOpen}
          >
            블로그 전체 보기
            <svg
              className="ml-2 h-4 w-4"
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
          </button>
        </div>
      </div>

      <div className="mt-14 grid gap-6 md:grid-cols-3">
        {isPending &&
          skeletonCards.map((_, index) => (
            <div
              key={`blog-skeleton-${index}`}
              className="h-full rounded-2xl border border-[color:var(--color-border-light)] bg-[color:var(--color-card-background)]/80 p-6 shadow-sm"
            >
              <div className="mb-4 h-6 w-20 rounded-full bg-[color:var(--color-border-normal)]/40" />
              <div className="mb-3 h-6 w-5/6 rounded bg-[color:var(--color-border-normal)]/30" />
              <div className="mb-2 h-4 w-2/3 rounded bg-[color:var(--color-border-normal)]/25" />
              <div className="mb-2 h-4 w-full rounded bg-[color:var(--color-border-normal)]/20" />
              <div className="mb-2 h-4 w-4/5 rounded bg-[color:var(--color-border-normal)]/20" />
              <div className="h-10 w-28 rounded-full bg-[color:var(--color-border-normal)]/20" />
            </div>
          ))}

        {error && !isPending && (
          <div className="col-span-full rounded-2xl border border-red-300/40 bg-red-50/60 p-6 text-sm text-red-600">
            블로그 정보를 불러오지 못했습니다. 잠시 후 다시 시도해주세요.
          </div>
        )}

        {!isPending && !error && posts.length === 0 && (
          <div className="col-span-full rounded-2xl border border-[color:var(--color-border-light)] bg-[color:var(--color-card-background)]/80 p-8 text-center text-[color:var(--color-text-secondary)]">
            게시된 글이 없습니다. Notion에 글을 작성하면 여기에서 확인할 수
            있습니다.
          </div>
        )}

        {!isPending &&
          !error &&
          posts.map((post, index) => (
            <BlogCard key={post.id} post={post} index={index} />
          ))}
      </div>
      <BlogModal open={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </SectionContainer>
  );
}
