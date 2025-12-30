"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";

import type {
  NotionOverviewBlock,
  NotionOverviewProperty,
  NotionOverviewResponse,
  NotionOverviewTag,
} from "@/app/api/overview/route";
import SectionContainer from "./SectionContainer";
import SectionHeader from "./SectionHeader";

const skeletonParagraphs = Array.from({ length: 4 });
const propertySkeletons = Array.from({ length: 6 });

type ListBlockType = "bulleted_list_item" | "numbered_list_item";

const descriptionPropertyKeywords = [
  "description",
  "summary",
  "content",
  "소개",
  "설명",
  "요약",
  "한줄소개",
];

const categoryPropertyKeywords = ["category", "type", "분류", "카테고리"];

const hiddenPropertyKeywords = [
  "order",
  "순서",
  "index",
  "정렬",
  "position",
  "priority",
  "weight",
];

const notionTagColorMap: Record<
  NonNullable<NotionOverviewTag["color"]>,
  { background: string; color: string }
> = {
  default: {
    background: "rgba(148, 163, 184, 0.18)",
    color: "var(--color-text-secondary)",
  },
  gray: {
    background: "rgba(148, 163, 184, 0.18)",
    color: "rgb(71, 85, 105)",
  },
  brown: {
    background: "rgba(120, 53, 15, 0.18)",
    color: "rgb(88, 28, 13)",
  },
  orange: {
    background: "rgba(234, 88, 12, 0.18)",
    color: "rgb(154, 52, 18)",
  },
  yellow: {
    background: "rgba(202, 138, 4, 0.18)",
    color: "rgb(133, 77, 14)",
  },
  green: {
    background: "rgba(22, 163, 74, 0.2)",
    color: "rgb(22, 101, 52)",
  },
  blue: {
    background: "rgba(37, 99, 235, 0.18)",
    color: "rgb(37, 99, 235)",
  },
  purple: {
    background: "rgba(168, 85, 247, 0.18)",
    color: "rgb(126, 34, 206)",
  },
  pink: {
    background: "rgba(236, 72, 153, 0.18)",
    color: "rgb(190, 24, 93)",
  },
  red: {
    background: "rgba(239, 68, 68, 0.18)",
    color: "rgb(185, 28, 28)",
  },
};

const CAREER_START_DATE = {
  year: 2021,
  month: 3,
  day: 2,
} as const;

function getCareerDuration(startDate: typeof CAREER_START_DATE) {
  const now = new Date();
  const utcTime = now.getTime() + now.getTimezoneOffset() * 60000;
  const kstNow = new Date(utcTime + 9 * 60 * 60000);

  let years = kstNow.getUTCFullYear() - startDate.year;
  let months = kstNow.getUTCMonth() + 1 - startDate.month;

  if (kstNow.getUTCDate() < startDate.day) {
    months -= 1;
  }

  if (months < 0) {
    years -= 1;
    months += 12;
  }

  return {
    years: Math.max(years, 0),
    months: Math.max(months, 0),
  };
}

function matchesKeyword(name: string, keywords: string[]) {
  const normalized = name.trim().toLowerCase();
  return keywords.some((keyword) => normalized.includes(keyword));
}

function formatDateLabel(value?: string) {
  if (!value) return "";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";
  return date.toLocaleDateString("ko-KR", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

function getTagStyles(tag: NotionOverviewTag) {
  const fallback = {
    background: "rgba(148, 163, 184, 0.16)",
    color: "var(--color-text-secondary)",
  };
  if (!tag.color) return fallback;
  return notionTagColorMap[tag.color] ?? fallback;
}

function renderPropertyValue(property: NotionOverviewProperty): ReactNode {
  if (property.tags && property.tags.length > 0) {
    return (
      <div className="flex flex-wrap gap-2">
        {property.tags.map((tag) => {
          const style = getTagStyles(tag);
          return (
            <span
              key={`${property.id}-${tag.id}`}
              className="rounded-full border border-transparent px-3 py-1 text-xs font-medium"
              style={{
                background: style.background,
                color: style.color,
              }}
            >
              {tag.name}
            </span>
          );
        })}
      </div>
    );
  }

  if (property.people && property.people.length > 0) {
    return (
      <div className="flex flex-wrap gap-2 text-sm text-[color:var(--color-text-secondary)]">
        {property.people.map((person) => (
          <span key={`${property.id}-${person.id}`}>{person.name}</span>
        ))}
      </div>
    );
  }

  if (property.files && property.files.length > 0) {
    return (
      <ul className="space-y-2 text-sm">
        {property.files.map((file) => (
          <li key={`${property.id}-${file.url}`}>
            <a
              href={file.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[color:var(--color-primary)] underline-offset-4 hover:underline"
            >
              {file.name}
            </a>
          </li>
        ))}
      </ul>
    );
  }

  if (property.type === "url" && property.value) {
    return (
      <a
        href={property.value}
        target="_blank"
        rel="noopener noreferrer"
        className="text-[color:var(--color-primary)] underline-offset-4 hover:underline"
      >
        {property.value}
      </a>
    );
  }

  if (property.value) {
    return (
      <span className="text-sm text-[color:var(--color-text-secondary)]">
        {property.value}
      </span>
    );
  }

  if (property.isEmpty) {
    return (
      <span className="text-sm italic text-[color:var(--color-text-tertiary)]">
        비어 있음
      </span>
    );
  }

  return null;
}

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
              <div className="space-y-3">{renderBlocks(block.children)}</div>
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
            <div className="mt-2 space-y-2">{renderBlocks(block.children)}</div>
          )}
        </li>
      );
    }
    case "child_database": {
      if (!block.database) return null;

      return (
        <div key={block.id} className="space-y-5">
          {(block.database.title || block.text) && (
            <h3 className="text-xl font-semibold text-[color:var(--color-text-primary)]">
              {block.database.title || block.text}
            </h3>
          )}
          {block.database.entries.length === 0 ? (
            <div className="rounded-2xl border border-[color:var(--color-border-light)] bg-[color:var(--color-card-background)]/70 px-5 py-6 text-sm text-[color:var(--color-text-secondary)]">
              연결된 데이터베이스 항목이 없습니다. 노션에서 항목을 추가하면
              자동으로 반영됩니다.
            </div>
          ) : (
            <div className="space-y-5">
              {block.database.entries.map((entry) => {
                const entryUpdatedLabel = formatDateLabel(
                  entry.lastEditedTime ?? entry.createdTime
                );
                const entryProperties = entry.properties;
                const descriptionProperty = entryProperties.find((property) =>
                  matchesKeyword(property.name, descriptionPropertyKeywords)
                );
                const categoryProperty = entryProperties.find(
                  (property) =>
                    property !== descriptionProperty &&
                    matchesKeyword(property.name, categoryPropertyKeywords)
                );
                const additionalProperties = entryProperties.filter(
                  (property) =>
                    property !== descriptionProperty &&
                    property !== categoryProperty &&
                    !matchesKeyword(property.name, hiddenPropertyKeywords)
                );
                const descriptionContent =
                  descriptionProperty && !descriptionProperty.isEmpty
                    ? renderPropertyValue(descriptionProperty)
                    : null;
                const hasDescription = Boolean(descriptionContent);
                const categoryLabel = categoryProperty?.value?.trim();
                const entryContent =
                  entry.content && entry.content.length > 0
                    ? renderBlocks(entry.content)
                    : null;

                return (
                  <article
                    key={entry.id}
                    className="rounded-2xl border border-[color:var(--color-border-light)] bg-[color:var(--color-background)]/75 px-5 py-5"
                  >
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                      <div>
                        <h4 className="text-lg font-semibold text-[color:var(--color-text-primary)]">
                          {entry.title || "제목 없음"}
                        </h4>
                        {categoryLabel && (
                          <span className="mt-1 inline-flex items-center rounded-full border border-[color:var(--color-border-light)] bg-[color:var(--color-background)] px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-[color:var(--color-text-tertiary)]">
                            {categoryLabel}
                          </span>
                        )}
                        {entryUpdatedLabel && (
                          <span className="text-xs text-[color:var(--color-text-tertiary)]">
                            업데이트: {entryUpdatedLabel}
                          </span>
                        )}
                      </div>
                      {entry.url && (
                        <a
                          href={entry.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 rounded-full border border-[color:var(--color-border-light)] bg-[color:var(--color-background)] px-3 py-1.5 text-xs font-semibold text-[color:var(--color-text-primary)] transition-colors hover:border-[color:var(--color-primary)] hover:text-[color:var(--color-primary)]"
                        >
                          노션에서 보기
                          <svg
                            className="h-3.5 w-3.5"
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
                      )}
                    </div>

                    {hasDescription && (
                      <div className="mt-4 text-sm leading-relaxed text-[color:var(--color-text-secondary)]">
                        {descriptionContent}
                      </div>
                    )}

                    {additionalProperties.length > 0 ? (
                      <dl className="mt-4 grid gap-3 sm:grid-cols-2">
                        {additionalProperties.map((property) => (
                          <div
                            key={`${entry.id}-${property.id}`}
                            className="rounded-xl border border-[color:var(--color-border-light)] bg-[color:var(--color-card-background)]/80 px-4 py-3"
                          >
                            <dt className="text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-[color:var(--color-text-tertiary)]">
                              {property.name}
                            </dt>
                            <dd className="mt-2 text-sm text-[color:var(--color-text-secondary)]">
                              {renderPropertyValue(property)}
                            </dd>
                          </div>
                        ))}
                      </dl>
                    ) : (
                      !hasDescription && (
                        <p className="mt-4 text-sm text-[color:var(--color-text-tertiary)]">
                          표시할 속성이 없습니다.
                        </p>
                      )
                    )}

                    {entryContent && (
                      <div className="mt-6 space-y-4 border-t border-[color:var(--color-border-light)] pt-4">
                        <h5 className="text-xs font-semibold uppercase tracking-[0.2em] text-[color:var(--color-text-tertiary)]">
                          페이지 내용
                        </h5>
                        <div className="space-y-4">{entryContent}</div>
                      </div>
                    )}
                  </article>
                );
              })}
            </div>
          )}
        </div>
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
        const message =
          body?.error || "경력 브리핑 정보를 불러오지 못했습니다.";
        throw new Error(message);
      }
      return response.json();
    },
  });

  const { years: careerYears, months: careerMonths } =
    getCareerDuration(CAREER_START_DATE);
  const careerIntroduction = `${careerYears}년 ${careerMonths}개월차 프론트엔드 개발자 김기원입니다.`;

  const renderedBlocks = useMemo(
    () => (data ? renderBlocks(data.blocks) : []),
    [data]
  );

  const renderedProperties = useMemo(() => {
    if (!data?.properties?.length) {
      return [];
    }

    return data.properties.map((property) => (
      <div
        key={property.id}
        className="rounded-2xl border border-[color:var(--color-border-light)] bg-[color:var(--color-background)]/70 px-4 py-3"
      >
        <dt className="text-xs font-medium uppercase tracking-[0.2em] text-[color:var(--color-text-tertiary)]">
          {property.name}
        </dt>
        <dd className="mt-2 text-[color:var(--color-text-primary)]">
          {renderPropertyValue(property)}
        </dd>
      </div>
    ));
  }, [data]);

  const lastUpdatedLabel = useMemo(() => {
    return formatDateLabel(data?.lastEditedTime);
  }, [data?.lastEditedTime]);

  return (
    <SectionContainer
      id="overview"
      className="bg-[color:var(--color-card-background)]/30 backdrop-blur-sm pt-12 pb-16 sm:pt-14 sm:pb-20 lg:pt-16 lg:pb-24"
    >
      <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
        <SectionHeader
          eyebrow="Career Briefing"
          title={data?.title || "경력 브리핑"}
          description="Notion 페이지와 연동된 최신 경력 브리핑을 확인할 수 있습니다."
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

      <div className="mt-10 space-y-6">
        <div className="rounded-3xl border border-[color:var(--color-border-light)] bg-[color:var(--color-background)]/90 p-6 shadow-md shadow-[color:var(--color-card-shadow)]/10">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[color:var(--color-text-tertiary)]">
            경력 브리핑
          </p>
          <p className="mt-3 text-2xl font-semibold leading-snug text-[color:var(--color-text-primary)]">
            {careerIntroduction}
          </p>
          <div className="mt-4 space-y-4 text-sm text-[color:var(--color-text-secondary)]">
            <p>
              약 4년 9개월 차 프론트엔드 개발자로서 데이터 기반 웹 시스템
              개발·운영에 강점이 있습니다. D3, ECharts, Chart.js를 활용한 시각화
              경험을 바탕으로 10만 건 이상의 대용량 테이블과 복잡한 품질·지표
              데이터를 안정적으로 렌더링하고 인터랙션을 최적화해 왔습니다.
            </p>
            <p>
              모노레포 기반 React·Vue 디자인 시스템 환경을 경험하며 공통
              컴포넌트와 UI 가이드를 활용해 일관된 사용자 경험을 제공했습니다.
              여러 서비스와 팀에서 재사용되는 컴포넌트를 설계·개선하며
              유지보수성과 확장성을 꾸준히 고민해 왔습니다.
            </p>
            <p>
              백엔드 개발자와는 Swagger(OpenAPI) 스키마 기반의 API 설계 협의를
              주도하며 데이터 모델과 응답 구조를 사전에 정의해 커뮤니케이션
              비용과 개발 리스크를 줄였습니다. 이를 통해 프론트엔드와 백엔드의
              역할 분담과 책임 경계를 명확히 하는 개발 문화를 중요하게 생각하게
              되었습니다.
            </p>
            <p>
              또한 디자이너·기획자와 Figma를 기반으로 효율적인 협업을
              수행해왔으며, 다양한 국가·조직에서 사용하는 글로벌 품질 관리
              시스템에서는 안정성, 표준화, 빠른 요구사항 대응이 핵심이라고
              믿습니다.
            </p>
            <p>
              데이터 정확성과 UI 신뢰도를 동시에 만족시키는 프론트엔드
              개발자로서 차세대 품질 시스템과 공통 패키지 개발에 기여하고
              싶습니다. 앞으로도 최신 기술과 도구를 적극적으로 학습·활용하며
              품질 업무의 효율과 사용자 경험을 함께 개선하겠습니다.
            </p>
          </div>
        </div>

        <div className="rounded-3xl border border-[color:var(--color-border-light)] bg-[color:var(--color-background)]/85 p-8 shadow-md shadow-[color:var(--color-card-shadow)]/20">
          {isPending && (
            <div className="space-y-10">
              <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                {propertySkeletons.map((_, index) => (
                  <div
                    key={`overview-property-skeleton-${index}`}
                    className="h-24 rounded-2xl border border-[color:var(--color-border-light)] bg-[color:var(--color-border-normal)]/10 px-4 py-3"
                  >
                    <div className="h-3 w-24 rounded bg-[color:var(--color-border-normal)]/40" />
                    <div className="mt-3 h-4 w-32 rounded bg-[color:var(--color-border-normal)]/30" />
                  </div>
                ))}
              </div>

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
            </div>
          )}

          {error && !isPending && (
            <div className="rounded-2xl border border-red-300/40 bg-red-50/70 p-6 text-sm text-red-600">
              {error.message}
            </div>
          )}

          {!isPending &&
            !error &&
            data &&
            renderedProperties.length === 0 &&
            renderedBlocks.length === 0 && (
              <div className="rounded-2xl border border-[color:var(--color-border-light)] bg-[color:var(--color-card-background)]/80 p-6 text-sm text-[color:var(--color-text-secondary)]">
                표시할 경력 브리핑 블록이 없습니다. 노션 페이지에 내용을
                추가하면 자동으로 반영됩니다.
              </div>
            )}

          {!isPending &&
            !error &&
            (renderedProperties.length > 0 || renderedBlocks.length > 0) && (
              <div className="space-y-8">
                {renderedProperties.length > 0 && (
                  <dl className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                    {renderedProperties}
                  </dl>
                )}
                {renderedBlocks.length > 0 && (
                  <div className="space-y-6">{renderedBlocks}</div>
                )}
              </div>
            )}
        </div>
      </div>
    </SectionContainer>
  );
}
