import { NextResponse } from "next/server";
import { Client } from "@notionhq/client";

/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable turbo/no-undeclared-env-vars */

export interface NotionOverviewDatabaseEntry {
  id: string;
  title: string;
  url: string;
  createdTime?: string;
  lastEditedTime?: string;
  properties: NotionOverviewProperty[];
  content: NotionOverviewBlock[];
}

export interface NotionOverviewDatabaseBlock {
  title: string;
  entries: NotionOverviewDatabaseEntry[];
}

export interface NotionOverviewBlock {
  id: string;
  type: string;
  text?: string;
  checked?: boolean;
  icon?: string;
  children?: NotionOverviewBlock[];
  database?: NotionOverviewDatabaseBlock;
}

export interface NotionOverviewTag {
  id: string;
  name: string;
  color?: string;
}

export interface NotionOverviewPerson {
  id: string;
  name: string;
  avatarUrl?: string;
}

export interface NotionOverviewFile {
  name: string;
  url: string;
}

export interface NotionOverviewProperty {
  id: string;
  name: string;
  type: string;
  value: string;
  isEmpty: boolean;
  tags?: NotionOverviewTag[];
  people?: NotionOverviewPerson[];
  files?: NotionOverviewFile[];
}

export interface NotionOverviewResponse {
  title: string;
  lastEditedTime: string;
  url: string;
  properties: NotionOverviewProperty[];
  blocks: NotionOverviewBlock[];
}

const notion = new Client({ auth: process.env.NOTION_API_KEY });

const FALLBACK_OVERVIEW_PAGE_ID = "2749a5729102805380c6d33c4ec97e52";

const ORDER_PROPERTY_KEYWORDS = [
  "order",
  "순서",
  "우선순위",
  "priority",
  "index",
  "정렬",
  "position",
  "weight",
];

interface TransformContext {
  visitedPageIds: Set<string>;
  visitedDatabaseIds: Set<string>;
}

function createTransformContext(): TransformContext {
  return {
    visitedPageIds: new Set<string>(),
    visitedDatabaseIds: new Set<string>(),
  };
}

function normalizeNotionId(rawId: string): string {
  const trimmed = rawId.trim();
  if (!trimmed) return "";

  const matches = trimmed
    .replace(/-/g, "")
    .match(/[0-9a-f]{32}/i);

  if (!matches) {
    return "";
  }

  const id = matches[0].toLowerCase();

  return `${id.slice(0, 8)}-${id.slice(8, 12)}-${id.slice(12, 16)}-${id.slice(16, 20)}-${id.slice(20)}`;
}

function getErrorMessage(error: unknown): string {
  if (!error || typeof error !== "object") {
    return "";
  }

  const message = (error as { message?: string }).message;
  if (typeof message === "string" && message.trim()) {
    return message;
  }

  const bodyMessage = (error as { body?: { message?: string } }).body?.message;
  if (typeof bodyMessage === "string" && bodyMessage.trim()) {
    return bodyMessage;
  }

  return "";
}

function isObjectNotFoundError(error: unknown): boolean {
  if (!error || typeof error !== "object") {
    return false;
  }

  const code = (error as { code?: string }).code;
  const status = (error as { status?: number }).status;

  return code === "object_not_found" || status === 404;
}

function isDatabaseInsteadOfPageError(error: unknown): boolean {
  const message = getErrorMessage(error).toLowerCase();

  return (
    message.includes("is a database") && message.includes("not a page")
  );
}

function extractPlainText(property: any): string {
  if (!property) return "";
  const richText = property.rich_text ?? property.title;
  if (!Array.isArray(richText)) return "";
  return richText.map((text: any) => text.plain_text).join("").trim();
}

function formatDate(value?: string | null): string {
  if (!value) return "";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return value;
  }
  return date.toLocaleDateString("ko-KR", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
}

function formatDateRange(date: any): string {
  if (!date) return "";
  const start = formatDate(date.start);
  const end = formatDate(date.end);
  if (start && end) {
    return `${start} ~ ${end}`;
  }
  return start || end;
}

function transformProperty(
  name: string,
  property: any
): NotionOverviewProperty | null {
  if (!property || !property.type || property.type === "title") {
    return null;
  }

  const base: NotionOverviewProperty = {
    id: property.id,
    name,
    type: property.type,
    value: "",
    isEmpty: true,
  };

  switch (property.type) {
    case "rich_text":
      base.value = extractPlainText(property);
      break;
    case "select":
      base.value = property.select?.name?.trim() ?? "";
      if (property.select) {
        base.tags = [
          {
            id: property.select.id,
            name: property.select.name,
            color: property.select.color,
          },
        ];
      }
      break;
    case "multi_select":
      base.tags = (property.multi_select ?? []).map((option: any) => ({
        id: option.id,
        name: option.name,
        color: option.color,
      }));
      base.value = (base.tags ?? []).map((tag) => tag.name).join(", ");
      break;
    case "status":
      base.value = property.status?.name?.trim() ?? "";
      if (property.status) {
        base.tags = [
          {
            id: property.status.id,
            name: property.status.name,
            color: property.status.color,
          },
        ];
      }
      break;
    case "date":
      base.value = formatDateRange(property.date);
      break;
    case "checkbox":
      base.value = property.checkbox ? "예" : "아니오";
      break;
    case "number":
      base.value =
        typeof property.number === "number" ? String(property.number) : "";
      break;
    case "url":
      base.value = property.url?.trim() ?? "";
      break;
    case "email":
      base.value = property.email?.trim() ?? "";
      break;
    case "phone_number":
      base.value = property.phone_number?.trim() ?? "";
      break;
    case "people":
      base.people = (property.people ?? []).map((person: any) => ({
        id: person.id,
        name: person.name ?? person?.person?.email ?? "이름 없음",
        avatarUrl: person.avatar_url ?? undefined,
      }));
      base.value = (base.people ?? []).map((person) => person.name).join(", ");
      break;
    case "files":
      base.files = (property.files ?? []).map((file: any) => {
        const url =
          file.file?.url ?? file.external?.url ?? file.name ?? "";
        return {
          name: file.name ?? url,
          url,
        };
      });
      base.value = (base.files ?? []).map((file) => file.name).join(", ");
      break;
    case "relation":
      base.value = (property.relation ?? [])
        .map((relation: any) => relation.id)
        .join(", ");
      break;
    case "formula":
      switch (property.formula?.type) {
        case "string":
          base.value = property.formula.string ?? "";
          break;
        case "number":
          base.value =
            typeof property.formula.number === "number"
              ? String(property.formula.number)
              : "";
          break;
        case "boolean":
          base.value = property.formula.boolean ? "예" : "아니오";
          break;
        case "date":
          base.value = formatDateRange(property.formula.date);
          break;
        default:
          base.value = "";
      }
      break;
    case "rollup":
      if (property.rollup?.type === "array") {
        const arrayValues = property.rollup.array
          .map((item: any) => {
            if (item.type === "title") {
              return extractPlainText(item);
            }
            if (item.type === "rich_text") {
              return extractPlainText(item);
            }
            if (item.type === "people") {
              return (item.people ?? [])
                .map((person: any) => person.name ?? "")
                .filter(Boolean)
                .join(", ");
            }
            if (item[item.type]) {
              return String(item[item.type]);
            }
            return "";
          })
          .filter((value: string) => value.trim().length > 0);
        base.value = arrayValues.join(", ");
      } else if (property.rollup?.type === "number") {
        base.value =
          typeof property.rollup.number === "number"
            ? String(property.rollup.number)
            : "";
      } else if (property.rollup?.type === "date") {
        base.value = formatDateRange(property.rollup.date);
      } else if (property.rollup?.type === "incomplete") {
        base.value = "";
      }
      break;
    default:
      if (property[property.type]) {
        base.value = String(property[property.type]);
      }
      break;
  }

  base.isEmpty =
    !base.value.trim() &&
    (!base.tags || base.tags.length === 0) &&
    (!base.people || base.people.length === 0) &&
    (!base.files || base.files.length === 0);

  return base;
}

function extractProperties(
  properties: Record<string, any> | undefined
): NotionOverviewProperty[] {
  if (!properties) return [];

  const entries = Object.entries(properties)
    .map(([name, property]) => transformProperty(name, property))
    .filter((property): property is NotionOverviewProperty => Boolean(property));

  return entries;
}

function isOrderPropertyName(name: string): boolean {
  const normalized = name.trim().toLowerCase();
  return ORDER_PROPERTY_KEYWORDS.some((keyword) =>
    normalized.includes(keyword)
  );
}

function extractOrderValueFromProperties(
  properties: Record<string, any> | undefined
): number | null {
  if (!properties) return null;

  for (const [name, property] of Object.entries(properties)) {
    if (!isOrderPropertyName(name)) continue;
    if (!property) continue;
    if (property.type === "number" && typeof property.number === "number") {
      return property.number;
    }
  }

  return null;
}

async function fetchBlockChildren(blockId: string): Promise<any[]> {
  const results: any[] = [];
  let cursor: string | undefined;

  do {
    const response = await notion.blocks.children.list({
      block_id: blockId,
      page_size: 50,
      start_cursor: cursor,
    });

    results.push(...response.results);
    cursor = response.has_more ? response.next_cursor ?? undefined : undefined;
  } while (cursor);

  return results;
}

async function fetchDatabaseEntries(databaseId: string): Promise<any[]> {
  const results: any[] = [];
  let cursor: string | undefined;

  do {
    const response = await notion.databases.query({
      database_id: databaseId,
      page_size: 50,
      start_cursor: cursor,
    });

    results.push(...response.results);
    cursor = response.has_more ? response.next_cursor ?? undefined : undefined;
  } while (cursor);

  return results;
}

interface BuildDatabaseEntryOptions {
  filterProperties?: (property: NotionOverviewProperty) => boolean;
}

async function buildDatabaseEntry(
  entry: any,
  context: TransformContext,
  options: BuildDatabaseEntryOptions = {}
): Promise<NotionOverviewDatabaseEntry> {
  const entryTitle = extractTitle(entry.properties ?? {}) || "제목 없음";
  const entryUrl = entry.public_url || entry.url || "";
  const rawProperties = entry.properties ?? {};
  let properties = extractProperties(rawProperties);

  if (options.filterProperties) {
    properties = properties.filter(options.filterProperties);
  }

  const entryId: string = entry.id;
  const hasVisited = context.visitedPageIds.has(entryId);
  let content: NotionOverviewBlock[] = [];

  if (hasVisited) {
    content = [];
  } else {
    context.visitedPageIds.add(entryId);
    try {
      const entryBlocks = await fetchBlockChildren(entryId);
      content = await transformBlocks(entryBlocks, context);
    } catch {
      content = [];
    } finally {
      context.visitedPageIds.delete(entryId);
    }
  }

  return {
    id: entryId,
    title: entryTitle,
    url: entryUrl,
    createdTime: entry.created_time ?? undefined,
    lastEditedTime: entry.last_edited_time ?? undefined,
    properties,
    content,
  };
}

function getTimestamp(value?: string): number {
  if (!value) return 0;
  const timestamp = new Date(value).getTime();
  return Number.isNaN(timestamp) ? 0 : timestamp;
}

async function transformBlocks(
  blocks: any[],
  context: TransformContext
): Promise<NotionOverviewBlock[]> {
  const transformed: NotionOverviewBlock[] = [];

  for (const block of blocks) {
    const base: NotionOverviewBlock = {
      id: block.id,
      type: block.type,
    };

    switch (block.type) {
      case "child_database": {
        const databaseId: string = block.id;
        const databaseTitle = block.child_database?.title ?? "";
        const hasVisitedDatabase = context.visitedDatabaseIds.has(databaseId);
        let entries: NotionOverviewDatabaseEntry[] = [];

        if (hasVisitedDatabase) {
          entries = [];
        } else {
          context.visitedDatabaseIds.add(databaseId);
          try {
            const databaseEntries = await fetchDatabaseEntries(databaseId);
            entries = await Promise.all(
              databaseEntries.map((entry: any) =>
                buildDatabaseEntry(entry, context)
              )
            );

            entries.sort((a, b) => {
              const timeA = getTimestamp(a.lastEditedTime ?? a.createdTime);
              const timeB = getTimestamp(b.lastEditedTime ?? b.createdTime);
              return timeB - timeA;
            });
          } catch {
            entries = [];
          } finally {
            context.visitedDatabaseIds.delete(databaseId);
          }
        }

        base.text = databaseTitle;
        base.database = {
          title: databaseTitle || "연결된 데이터베이스",
          entries,
        };
        break;
      }
      case "paragraph":
      case "heading_1":
      case "heading_2":
      case "heading_3":
      case "bulleted_list_item":
      case "numbered_list_item":
      case "quote":
      case "toggle":
        base.text = extractPlainText(block[block.type]);
        break;
      case "callout":
        base.text = extractPlainText(block.callout);
        if (block.callout?.icon?.type === "emoji") {
          base.icon = block.callout.icon.emoji;
        }
        break;
      case "to_do":
        base.text = extractPlainText(block.to_do);
        base.checked = Boolean(block.to_do?.checked);
        break;
      case "divider":
        break;
      default:
        base.text = extractPlainText(block[block.type]);
        break;
    }

    if (block.has_children) {
      const children = await fetchBlockChildren(block.id);
      const transformedChildren = await transformBlocks(children, context);
      if (transformedChildren.length > 0) {
        base.children = transformedChildren;
      }
    }

    transformed.push(base);
  }

  return transformed;
}

function extractTitle(properties: Record<string, any>): string {
  for (const property of Object.values(properties)) {
    if (property?.type === "title") {
      return (
        property.title?.map((text: any) => text.plain_text).join("") ?? ""
      ).trim();
    }
  }
  return "";
}

function extractDatabaseDescription(database: any): string {
  const description = database?.description;
  if (!Array.isArray(description)) return "";

  return description
    .map((text: any) => text?.plain_text ?? "")
    .join("\n")
    .trim();
}

async function buildOverviewResponseFromDatabase(
  databaseId: string
): Promise<NotionOverviewResponse> {
  const database = (await notion.databases.retrieve({
    database_id: databaseId,
  })) as any;

  const title = (database.title ?? [])
    .map((text: any) => text?.plain_text ?? "")
    .join("")
    .trim();

  const description = extractDatabaseDescription(database);

  const databaseEntries = await fetchDatabaseEntries(databaseId);

  const context = createTransformContext();
  context.visitedDatabaseIds.add(databaseId);

  let entriesWithOrder: {
    entry: NotionOverviewDatabaseEntry;
    order: number | null;
  }[] = [];

  try {
    entriesWithOrder = await Promise.all(
      databaseEntries.map(async (entry: any) => {
        const rawProperties = entry.properties ?? {};
        const order = extractOrderValueFromProperties(rawProperties);
        const entryData = await buildDatabaseEntry(entry, context, {
          filterProperties: (property) =>
            !isOrderPropertyName(property.name),
        });

        return {
          entry: entryData,
          order,
        };
      })
    );
  } finally {
    context.visitedDatabaseIds.delete(databaseId);
  }

  entriesWithOrder.sort((a, b) => {
    const orderA =
      typeof a.order === "number" ? a.order : Number.POSITIVE_INFINITY;
    const orderB =
      typeof b.order === "number" ? b.order : Number.POSITIVE_INFINITY;

    if (orderA !== orderB) {
      return orderA - orderB;
    }

    const timeA = getTimestamp(
      a.entry.lastEditedTime ?? a.entry.createdTime
    );
    const timeB = getTimestamp(
      b.entry.lastEditedTime ?? b.entry.createdTime
    );
    return timeB - timeA;
  });

  const entries = entriesWithOrder.map(({ entry }) => entry);

  const blocks: NotionOverviewBlock[] = [];

  if (description) {
    blocks.push({
      id: `${databaseId}-description`,
      type: "paragraph",
      text: description,
    });
  }

  blocks.push({
    id: `${databaseId}-database`,
    type: "child_database",
    text: title || database.title?.[0]?.plain_text || "자기소개",
    database: {
      title: title || "자기소개",
      entries,
    },
  });

  const response: NotionOverviewResponse = {
    title: title || "자기소개",
    url: database.public_url || database.url || "",
    lastEditedTime: database.last_edited_time ?? "",
    properties: [],
    blocks,
  };

  return response;
}

export async function GET() {
  try {
    if (!process.env.NOTION_API_KEY) {
      throw new Error("NOTION_API_KEY is not set");
    }

    const rawPageId =
      process.env.NOTION_OVERVIEW_PAGE_ID ?? FALLBACK_OVERVIEW_PAGE_ID;
    const pageId = normalizeNotionId(rawPageId);

    if (!pageId) {
      throw new Error(
        "NOTION_OVERVIEW_PAGE_ID is not set or is invalid. Provide a Notion page ID or share URL."
      );
    }
    try {
      const page = (await notion.pages.retrieve({ page_id: pageId })) as any;
      const title = extractTitle(page.properties ?? {});
      const url = page.public_url || page.url || "";
      const lastEditedTime = page.last_edited_time ?? "";
      const properties = extractProperties(page.properties ?? {});

      const rootBlocks = await fetchBlockChildren(pageId);
      const context = createTransformContext();
      context.visitedPageIds.add(pageId);
      const blocks = await transformBlocks(rootBlocks, context);

      const response: NotionOverviewResponse = {
        title,
        url,
        lastEditedTime,
        properties,
        blocks,
      };

      return NextResponse.json(response);
    } catch (pageError) {
      if (
        !isObjectNotFoundError(pageError) &&
        !isDatabaseInsteadOfPageError(pageError)
      ) {
        throw pageError;
      }
    }

    try {
      const databaseResponse = await buildOverviewResponseFromDatabase(pageId);
      return NextResponse.json(databaseResponse);
    } catch (databaseError) {
      throw new Error(
        `Failed to fetch Notion database overview: ${(databaseError as Error).message}`
      );
    }
  } catch (error) {
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 }
    );
  }
}
