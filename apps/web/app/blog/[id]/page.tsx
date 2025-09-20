"use client";

import type { ReactNode } from "react";
import { useEffect, useMemo, useState } from "react";
import { useParams } from "next/navigation";
import dynamic from "next/dynamic";
import { useTheme } from "@repo/ui";
import { getCategoryColor } from "../../../utils/categoryColors";

interface NotionBlock {
  id: string;
  type: string;
  text?: string;
  language?: string;
  url?: string;
  caption?: string;
  has_children?: boolean;
  cells?: string[];
}

interface NotionPostDetail {
  id: string;
  title: string;
  description: string;
  category: string;
  url: string;
  createdAt: string;
  blocks: NotionBlock[];
}

const MonacoEditor = dynamic(() => import("@monaco-editor/react"), {
  ssr: false,
});

function renderBlock(
  block: NotionBlock,
  idx: number,
  allBlocks: NotionBlock[],
  monacoTheme: "vs-dark" | "vs-light"
) {
  switch (block.type) {
    case "heading_1":
      return (
        <h1
          key={block.id}
          className="mt-8 mb-3 text-2xl font-bold text-[color:var(--color-text-primary)]"
        >
          {block.text}
        </h1>
      );
    case "heading_2":
      return (
        <h2
          key={block.id}
          className="mt-6 mb-2 text-xl font-semibold text-[color:var(--color-text-primary)]"
        >
          {block.text}
        </h2>
      );
    case "heading_3":
      return (
        <h3
          key={block.id}
          className="mt-4 mb-2 text-lg font-medium text-[color:var(--color-text-primary)]"
        >
          {block.text}
        </h3>
      );
    case "bulleted_list_item":
      return (
        <li
          key={block.id}
          className="mb-1 ml-6 list-disc text-[color:var(--color-text-primary)]"
        >
          {block.text}
        </li>
      );
    case "numbered_list_item":
      return (
        <li
          key={block.id}
          className="mb-1 ml-6 list-decimal text-[color:var(--color-text-primary)]"
        >
          {block.text}
        </li>
      );
    case "paragraph":
      return (
        <p
          key={block.id}
          className="mb-3 leading-relaxed text-[color:var(--color-text-primary)]"
        >
          {block.text}
        </p>
      );
    case "code":
      return (
        <div
          key={block.id}
          className="my-4 overflow-hidden rounded-2xl border border-[color:var(--color-card-border)] bg-[color:var(--color-card-background)]/70 shadow-[0_18px_42px_var(--color-card-shadow)]"
        >
          <MonacoEditor
            height="600px"
            defaultLanguage={block.language || "plaintext"}
            value={block.text || ""}
            theme={monacoTheme}
            options={{
              readOnly: true,
              minimap: { enabled: false },
              fontSize: 14,
              scrollBeyondLastLine: false,
            }}
          />
          <div className="mt-1 px-3 pb-3 text-right text-xs text-[color:var(--color-text-tertiary)]">
            {block.language}
          </div>
        </div>
      );
    case "image":
      return (
        <figure
          key={block.id}
          className="my-6 flex flex-col items-center gap-3 rounded-2xl border border-[color:var(--color-card-border)] bg-[color:var(--color-card-background)]/70 p-4 shadow-[0_18px_42px_var(--color-card-shadow)]"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={block.url}
            alt={block.caption || "이미지"}
            className="h-auto w-full max-w-3xl rounded-xl border border-[color:var(--color-card-border)] object-cover"
          />
          {block.caption && (
            <figcaption className="text-center text-xs text-[color:var(--color-text-tertiary)]">
              {block.caption}
            </figcaption>
          )}
        </figure>
      );
    case "divider":
      return (
        <hr
          key={block.id}
          className="my-8 border-t border-[color:var(--color-border-normal)]"
        />
      );
    case "table": {
      // table의 row만 추출
      const rows: NotionBlock[] = [];
      let i = idx + 1;
      const curBlock = allBlocks[i];
      while (
        i < allBlocks.length &&
        curBlock &&
        curBlock.type === "table_row"
      ) {
        rows.push(curBlock);
        i++;
      }
      return (
        <table
          key={block.id}
          className="my-8 w-full overflow-hidden rounded-xl border border-[color:var(--color-border-normal)] text-sm"
        >
          <tbody>
            {rows.map((row) => (
              <tr key={row.id}>
                {row.cells?.map((cell, ci) => (
                  <td
                    key={ci}
                    className="border border-[color:var(--color-border-light)] bg-[color:var(--color-card-background)]/60 px-3 py-2 text-[color:var(--color-text-primary)]"
                  >
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      );
    }
    default:
      return null;
  }
}

function BlogDetailSkeleton() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="animate-pulse">
        <div className="mb-4 h-10 w-2/3 rounded bg-[color:var(--color-border-normal)]/40" />
        <div className="mb-6 h-4 w-24 rounded bg-[color:var(--color-border-normal)]/30" />
        <div className="mb-8 space-y-3">
          <div className="h-4 w-full rounded bg-[color:var(--color-border-normal)]/35" />
          <div className="h-4 w-5/6 rounded bg-[color:var(--color-border-normal)]/35" />
          <div className="h-4 w-4/6 rounded bg-[color:var(--color-border-normal)]/30" />
          <div className="h-4 w-3/6 rounded bg-[color:var(--color-border-normal)]/25" />
        </div>
        <div className="h-10 w-32 rounded bg-[color:var(--color-border-normal)]/30" />
      </div>
    </div>
  );
}

export default function BlogDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [post, setPost] = useState<NotionPostDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { resolvedTheme } = useTheme();

  const monacoTheme = useMemo<"vs-dark" | "vs-light">(
    () => (resolvedTheme === "dark" ? "vs-dark" : "vs-light"),
    [resolvedTheme]
  );

  useEffect(() => {
    if (!id) return;
    fetch(`/api/blog?id=${id}`)
      .then((res) => {
        if (!res.ok) throw new Error("데이터를 불러올 수 없습니다.");
        return res.json();
      })
      .then((data) => setPost(data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <BlogDetailSkeleton />;
  if (error)
    return <div className="py-10 text-center text-red-500">{error}</div>;
  if (!post)
    return <div className="py-10 text-center">글을 찾을 수 없습니다.</div>;

  // 리스트 블록 그룹핑
  const blocks = post.blocks;
  const content: ReactNode[] = [];
  let listBuffer: NotionBlock[] = [];
  let lastListType: string | null = null;
  const categoryColor = post.category ? getCategoryColor(post.category) : null;
  blocks.forEach((block, idx) => {
    if (
      block.type === "bulleted_list_item" ||
      block.type === "numbered_list_item"
    ) {
      if (!lastListType) lastListType = block.type;
      if (block.type === lastListType) {
        listBuffer.push(block);
      } else {
        // 타입이 바뀌면 이전 리스트 렌더
        content.push(
          <ul
            key={listBuffer[0]?.id + "-ul"}
            className="mb-3 space-y-1 text-[color:var(--color-text-primary)]"
          >
            {listBuffer.map((b) => renderBlock(b, idx, blocks, monacoTheme))}
          </ul>
        );
        listBuffer = [block];
        lastListType = block.type;
      }
    } else {
      if (listBuffer.length > 0) {
        content.push(
          <ul
            key={listBuffer[0]?.id + "-ul"}
            className="mb-3 space-y-1 text-[color:var(--color-text-primary)]"
          >
            {listBuffer.map((b) => renderBlock(b, idx, blocks, monacoTheme))}
          </ul>
        );
        listBuffer = [];
        lastListType = null;
      }
      content.push(renderBlock(block, idx, blocks, monacoTheme));
    }
  });
  if (listBuffer.length > 0) {
    content.push(
      <ul
        key={listBuffer[0]?.id + "-ul"}
        className="mb-3 space-y-1 text-[color:var(--color-text-primary)]"
      >
        {listBuffer
          .filter(Boolean)
          .map((b) => renderBlock(b, blocks.length, blocks, monacoTheme))}
      </ul>
    );
  }

  return (
    <div className="mx-auto max-w-2xl px-4 py-10 sm:px-6 lg:px-8">
      <h1 className="mb-4 text-3xl font-bold text-[color:var(--color-text-primary)]">
        {post.title}
      </h1>
      <div className="mb-6 flex items-center gap-2 text-xs text-[color:var(--color-text-secondary)]">
        {post.category && categoryColor && (
          <span
            className={`px-2 py-1 rounded-full font-medium ${categoryColor.bg} ${categoryColor.text}`}
          >
            {post.category}
          </span>
        )}
        <span>
          {new Date(post.createdAt).toLocaleDateString("ko-KR", {
            year: "numeric",
            month: "short",
            day: "numeric",
          })}
        </span>
      </div>
      <div className="mb-8 space-y-4 text-[color:var(--color-text-primary)]">
        <p className="text-[color:var(--color-text-secondary)]">
          {post.description}
        </p>
        {content}
      </div>
      <a
        href={post.url}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 rounded-full bg-[color:var(--color-primary)] px-5 py-2 text-sm font-semibold text-white transition-colors hover:bg-[color:var(--color-primary-hover)]"
      >
        노션에서 원문 보기
        <svg
          className="h-4 w-4"
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
      </a>
    </div>
  );
}
