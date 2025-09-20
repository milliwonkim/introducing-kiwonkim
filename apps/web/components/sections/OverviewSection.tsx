"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";

import type {
  NotionOverviewBlock,
  NotionOverviewResponse,
} from "@/app/api/overview/route";
import SectionContainer from "./SectionContainer";
import SectionHeader from "./SectionHeader";

const skeletonParagraphs = Array.from({ length: 4 });

type ListBlockType = "bulleted_list_item" | "numbered_list_item";

function renderBlock(block: NotionOverviewBlock): ReactNode {
  switch (block.type) {
    case "heading_1":
      return (
        <h2
          key={block.id}
          className="text-2xl font-semibold text-[color:var(--color-text-primary)]"
        >
          {block.text}
        </h2>
      );
    case "heading_2":
      return (
        <h3
          key={block.id}
          className="text-xl font-semibold text-[color:var(--color-text-primary)]"
        >
          {block.text}
        </h3>
      );
    case "heading_3":
      return (
        <h4
          key={block.id}
          className="text-lg font-semibold text-[color:var(--color-text-primary)]"
        >
          {block.text}
        </h4>
      );
    case "paragraph":
      if (!block.text) return null;
      return (
        <p
          key={block.id}
          className="text-base leading-relaxed text-[color:var(--color-text-secondary)]"
        >
          {block.text}
        </p>
      );
    case "quote":
      return (
        <blockquote
          key={block.id}
          className="border-l-4 border-[color:var(--color-primary)]/60 bg-[color:var(--color-card-background)]/70 px-5 py-3 italic text-[color:var(--color-text-secondary)]"
        >
          {block.text}
        </blockquote>
      );
    case "callout":
      return (
        <div
          key={block.id}
          className="flex gap-3 rounded-2xl border border-[color:var(--color-border-light)] bg-[color:var(--color-card-background)]/80 px-4 py-3 text-[color:var(--color-text-secondary)]"
        >
          {block.icon && <span className="text-xl">{block.icon}</span>}
          <div className="space-y-3 text-sm sm:text-base">
            {block.text}
            {block.children && block.children.length > 0 && (
              <div className="space-y-3">
                {renderBlocks(block.children)}
              </div>
            )}
          </div>
        </div>
      );
    case "to_do":
      return (
        <div
          key={block.id}
          className="flex items-start gap-3 text-[color:var(--color-text-secondary)]"
        >
          <span
            className={`mt-1 inline-flex h-4 w-4 items-center justify-center rounded-sm border border-[color:var(--color-border-normal)] ${
              block.checked ? "bg-[color:var(--color-primary)]/20" : ""
            }`}
            aria-hidden
          >
            {block.checked ? (
              <svg
                className="h-3 w-3 text-[color:var(--color-primary)]"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M4 8.5L6.5 11L12 5.5"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            ) : null}
          </span>
          <span className="leading-relaxed">{block.text}</span>
        </div>
      );
    case "toggle":
      return (
        <details
          key={block.id}
          className="rounded-xl border border-[color:var(--color-border-light)] bg-[color:var(--color-card-background)]/70 px-4 py-3"
        >
          <summary className="cursor-pointer text-sm font-medium text-[color:var(--color-text-primary)]">
            {block.text}
          </summary>
          {block.children && block.children.length > 0 && (
            <div className="mt-3 space-y-3 text-sm text-[color:var(--color-text-secondary)]">
              {renderBlocks(block.children)}
            </div>
          )}
        </details>
      );
    case "divider":
      return (
        <hr
          key={block.id}
          className="my-6 border-t border-[color:var(--color-border-normal)]/70"
        />
      );
    case "bulleted_list_item":
    case "numbered_list_item": {
      return (
        <li
          key={block.id}
          className="leading-relaxed text-[color:var(--color-text-secondary)]"
        >
          <span className="text-[color:var(--color-text-primary)]">
            {block.text}
          </span>
          {block.children && block.children.length > 0 && (
            <div className="mt-2 space-y-2">
              {renderBlocks(block.children)}
            </div>
          )}
        </li>
      );
    }
    default:
      return block.text ? (
        <p
          key={block.id}
          className="text-base leading-relaxed text-[color:var(--color-text-secondary)]"
        >
          {block.text}
        </p>
      ) : null;
  }
}

function renderBlocks(blocks: NotionOverviewBlock[]): ReactNode[] {
  const elements: ReactNode[] = [];
  let listBuffer: NotionOverviewBlock[] = [];
  let currentListType: ListBlockType | null = null;

  const flushList = () => {
    if (listBuffer.length === 0 || !currentListType) return;
    const isOrdered = currentListType === "numbered_list_item";
    const ListTag = isOrdered ? "ol" : "ul";
    elements.push(
      <ListTag
        key={`${listBuffer[0]?.id}-${currentListType}`}
        className={`ml-5 space-y-2 text-sm sm:text-base ${
          isOrdered ? "list-decimal" : "list-disc"
        }`}
      >
        {listBuffer.map((item) => renderBlock(item))}
      </ListTag>
    );
    listBuffer = [];
    currentListType = null;
  };

  blocks.forEach((block) => {
    if (
      block.type === "bulleted_list_item" ||
      block.type === "numbered_list_item"
    ) {
      if (!currentListType || currentListType === block.type) {
        listBuffer.push(block);
        currentListType = block.type;
      } else {
        flushList();
        listBuffer.push(block);
        currentListType = block.type;
      }
    } else {
      flushList();
      const rendered = renderBlock(block);
      if (rendered) {
        elements.push(rendered);
      }
    }
  });

  flushList();
  return elements;
}

export default function OverviewSection() {
  const { data, isPending, error } = useQuery<NotionOverviewResponse>({
    queryKey: ["notion-overview"],
    queryFn: async () => {
      const response = await fetch("/api/overview");
      if (!response.ok) {
        const body = await response.json().catch(() => ({}));
        const message = body?.error || "자기소개 정보를 불러오지 못했습니다.";
        throw new Error(message);
      }
      return response.json();
    },
  });

  const renderedBlocks = useMemo(
    () => (data ? renderBlocks(data.blocks) : []),
    [data]
  );

  const lastUpdatedLabel = useMemo(() => {
    if (!data?.lastEditedTime) return "";
    const date = new Date(data.lastEditedTime);
    if (Number.isNaN(date.getTime())) return "";
    return date.toLocaleDateString("ko-KR", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  }, [data?.lastEditedTime]);

  return (
    <SectionContainer
      id="overview"
      className="bg-[color:var(--color-card-background)]/30 backdrop-blur-sm"
    >
      <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
        <SectionHeader
          eyebrow="Resume Overview"
          title={data?.title || "자기소개 Overview"}
          description="Notion 페이지와 연동된 최신 자기소개 이력을 확인할 수 있습니다."
        />
        <div className="flex flex-col items-start gap-3 text-xs text-[color:var(--color-text-tertiary)] sm:items-end">
          {lastUpdatedLabel && <span>업데이트: {lastUpdatedLabel}</span>}
          {data?.url && (
            <Link
              href={data.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-[color:var(--color-border-light)] bg-[color:var(--color-background)] px-4 py-2 text-sm font-semibold text-[color:var(--color-text-primary)] shadow-sm transition-colors hover:border-[color:var(--color-primary)] hover:text-[color:var(--color-primary)]"
            >
              노션 페이지에서 보기
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
            </Link>
          )}
        </div>
      </div>

      <div className="mt-10 rounded-3xl border border-[color:var(--color-border-light)] bg-[color:var(--color-background)]/85 p-8 shadow-lg shadow-[color:var(--color-card-shadow)]/40">
        {isPending && (
          <div className="space-y-6">
            <div className="h-5 w-40 rounded bg-[color:var(--color-border-normal)]/30" />
            {skeletonParagraphs.map((_, index) => (
              <div key={`overview-skeleton-${index}`} className="space-y-2">
                <div className="h-4 w-full rounded bg-[color:var(--color-border-normal)]/20" />
                <div className="h-4 w-5/6 rounded bg-[color:var(--color-border-normal)]/20" />
                <div className="h-4 w-4/6 rounded bg-[color:var(--color-border-normal)]/15" />
              </div>
            ))}
          </div>
        )}

        {error && !isPending && (
          <div className="rounded-2xl border border-red-300/40 bg-red-50/70 p-6 text-sm text-red-600">
            {error.message}
          </div>
        )}

        {!isPending && !error && data && renderedBlocks.length === 0 && (
          <div className="rounded-2xl border border-[color:var(--color-border-light)] bg-[color:var(--color-card-background)]/80 p-6 text-sm text-[color:var(--color-text-secondary)]">
            표시할 자기소개 블록이 없습니다. 노션 페이지에 내용을 추가하면 자동으로 반영됩니다.
          </div>
        )}

        {!isPending && !error && renderedBlocks.length > 0 && (
          <div className="space-y-6">
            {renderedBlocks}
          </div>
        )}
      </div>
    </SectionContainer>
  );
}
