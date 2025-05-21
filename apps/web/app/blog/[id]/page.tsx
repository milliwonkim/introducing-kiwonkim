"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import dynamic from "next/dynamic";

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
  allBlocks: NotionBlock[]
) {
  switch (block.type) {
    case "heading_1":
      return (
        <h1 key={block.id} className="text-2xl font-bold mt-8 mb-3">
          {block.text}
        </h1>
      );
    case "heading_2":
      return (
        <h2 key={block.id} className="text-xl font-semibold mt-6 mb-2">
          {block.text}
        </h2>
      );
    case "heading_3":
      return (
        <h3 key={block.id} className="text-lg font-medium mt-4 mb-2">
          {block.text}
        </h3>
      );
    case "bulleted_list_item":
      return (
        <li key={block.id} className="list-disc ml-6 mb-1">
          {block.text}
        </li>
      );
    case "numbered_list_item":
      return (
        <li key={block.id} className="list-decimal ml-6 mb-1">
          {block.text}
        </li>
      );
    case "paragraph":
      return (
        <p key={block.id} className="mb-3 leading-relaxed">
          {block.text}
        </p>
      );
    case "code":
      return (
        <div key={block.id} className="my-4">
          <MonacoEditor
            height="600px"
            defaultLanguage={block.language || "plaintext"}
            value={block.text || ""}
            theme="vs-dark"
            options={{
              readOnly: true,
              minimap: { enabled: false },
              fontSize: 14,
              scrollBeyondLastLine: false,
            }}
          />
          <div className="text-xs text-gray-400 mt-1 text-right">
            {block.language}
          </div>
        </div>
      );
    case "image":
      return (
        <figure key={block.id} className="my-6 flex flex-col items-center">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={block.url}
            alt={block.caption || "이미지"}
            className="rounded max-w-full h-auto shadow"
          />
          {block.caption && (
            <figcaption className="text-xs text-gray-500 mt-2 text-center">
              {block.caption}
            </figcaption>
          )}
        </figure>
      );
    case "divider":
      return (
        <hr
          key={block.id}
          className="my-8 border-t border-gray-300 dark:border-gray-600"
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
          className="my-8 border border-gray-300 dark:border-gray-600 w-full text-sm"
        >
          <tbody>
            {rows.map((row) => (
              <tr key={row.id}>
                {row.cells?.map((cell, ci) => (
                  <td key={ci} className="border px-3 py-2">
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
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="animate-pulse">
        <div className="h-10 w-2/3 bg-gray-400  rounded mb-4" />
        <div className="h-4 w-24 bg-gray-300  rounded mb-6" />
        <div className="space-y-3 mb-8">
          <div className="h-4 w-full bg-gray-400 rounded" />
          <div className="h-4 w-5/6 bg-gray-400  rounded" />
          <div className="h-4 w-4/6 bg-gray-400  rounded" />
          <div className="h-4 w-3/6 bg-gray-300  rounded" />
        </div>
        <div className="h-10 w-32 bg-gray-300  rounded" />
      </div>
    </div>
  );
}

export default function BlogDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [post, setPost] = useState<NotionPostDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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

  console.log(post);

  if (loading) return <BlogDetailSkeleton />;
  if (error)
    return <div className="py-10 text-center text-red-500">{error}</div>;
  if (!post)
    return <div className="py-10 text-center">글을 찾을 수 없습니다.</div>;

  // 리스트 블록 그룹핑
  const blocks = post.blocks;
  const content: React.ReactNode[] = [];
  let listBuffer: NotionBlock[] = [];
  let lastListType: string | null = null;
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
          <ul key={listBuffer[0]?.id + "-ul"} className="mb-3">
            {listBuffer.map((b) => renderBlock(b, idx, blocks))}
          </ul>
        );
        listBuffer = [block];
        lastListType = block.type;
      }
    } else {
      if (listBuffer.length > 0) {
        content.push(
          <ul key={listBuffer[0]?.id + "-ul"} className="mb-3">
            {listBuffer.map((b) => renderBlock(b, idx, blocks))}
          </ul>
        );
        listBuffer = [];
        lastListType = null;
      }
      content.push(renderBlock(block, idx, blocks));
    }
  });
  if (listBuffer.length > 0) {
    content.push(
      <ul key={listBuffer[0]?.id + "-ul"} className="mb-3">
        {listBuffer
          .filter(Boolean)
          .map((b) => renderBlock(b, blocks.length, blocks))}
      </ul>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <h1 className="text-3xl font-bold mb-4 text-[var(--color-text-primary)]">
        {post.title}
      </h1>
      <div className="text-xs text-[var(--color-text-secondary)] mb-6">
        {post.createdAt}
      </div>
      <div className="prose prose-neutral dark:prose-invert mb-8">
        <p>{post.description}</p>
        {content}
      </div>
      <a
        href={post.url}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block px-4 py-2 bg-[var(--color-primary)] text-white rounded hover:bg-[var(--color-primary-hover)] transition-colors"
      >
        노션에서 원문 보기
      </a>
    </div>
  );
}
