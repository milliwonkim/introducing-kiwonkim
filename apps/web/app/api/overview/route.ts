import { NextResponse } from "next/server";
import { Client } from "@notionhq/client";

/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable turbo/no-undeclared-env-vars */

export interface NotionOverviewBlock {
  id: string;
  type: string;
  text?: string;
  checked?: boolean;
  icon?: string;
  children?: NotionOverviewBlock[];
}

export type NotionOverviewPropertyValue =
  | { kind: "text"; text: string }
  | { kind: "tags"; tags: { id: string; name: string; color?: string }[] }
  | { kind: "people"; people: { id: string; name: string; avatarUrl?: string | null }[] }
  | { kind: "date"; start?: string | null; end?: string | null; timeZone?: string | null }
  | { kind: "status"; status: { id: string; name: string; color?: string } | null }
  | { kind: "url"; url: string }
  | { kind: "email"; email: string }
  | { kind: "phone"; phone: string }
  | { kind: "number"; number: number | null }
  | { kind: "files"; files: { name: string; url: string }[] }
  | { kind: "checkbox"; checked: boolean }
  | { kind: "unknown"; label: string };

export interface NotionOverviewProperty {
  id: string;
  name: string;
  value: NotionOverviewPropertyValue;
}

export interface NotionOverviewResponse {
  title: string;
  lastEditedTime: string;
  url: string;
  properties: NotionOverviewProperty[];
  blocks: NotionOverviewBlock[];
}

const notion = new Client({ auth: process.env.NOTION_API_KEY });

const FALLBACK_OVERVIEW_PAGE_ID = "2749a57291028051aafcf7982552da08";

function normalizeNotionId(id: string): string {
  const cleaned = id.replace(/-/g, "").replace(/\?.*/, "");
  if (cleaned.length !== 32) return id;
  return `${cleaned.slice(0, 8)}-${cleaned.slice(8, 12)}-${cleaned.slice(12, 16)}-${cleaned.slice(16, 20)}-${cleaned.slice(20)}`;
}

function extractPlainText(property: any): string {
  if (!property) return "";
  const richText = property.rich_text ?? property.title;
  if (!Array.isArray(richText)) return "";
  return richText.map((text: any) => text.plain_text).join("").trim();
}

function createTextProperty(
  id: string,
  name: string,
  text: string
): NotionOverviewProperty | null {
  const trimmed = text.trim();
  if (!trimmed) return null;
  return { id, name, value: { kind: "text", text: trimmed } };
}

function createTagsProperty(
  id: string,
  name: string,
  tags: { id: string; name: string; color?: string }[]
): NotionOverviewProperty | null {
  if (!tags || tags.length === 0) return null;
  return { id, name, value: { kind: "tags", tags } };
}

function createFilesProperty(
  id: string,
  name: string,
  files: { name: string; url: string }[]
): NotionOverviewProperty | null {
  if (!files || files.length === 0) return null;
  return { id, name, value: { kind: "files", files } };
}

function resolveFileUrl(file: any): string | null {
  if (!file) return null;
  if (file.type === "file") return file.file?.url ?? null;
  if (file.type === "external") return file.external?.url ?? null;
  return null;
}

function transformProperty(
  name: string,
  property: any
): NotionOverviewProperty | null {
  if (!property) return null;

  const id = property.id ?? name;

  switch (property.type) {
    case "title":
      return null; // Title is used as the section heading already
    case "rich_text":
      return createTextProperty(id, name, extractPlainText(property));
    case "number":
      if (typeof property.number !== "number") {
        return null;
      }
      return {
        id,
        name,
        value: { kind: "number", number: property.number },
      };
    case "url":
      if (!property.url) return null;
      return { id, name, value: { kind: "url", url: property.url } };
    case "email":
      if (!property.email) return null;
      return { id, name, value: { kind: "email", email: property.email } };
    case "phone_number":
      if (!property.phone_number) return null;
      return {
        id,
        name,
        value: { kind: "phone", phone: property.phone_number },
      };
    case "checkbox":
      return { id, name, value: { kind: "checkbox", checked: Boolean(property.checkbox) } };
    case "date":
      if (!property.date) return null;
      return {
        id,
        name,
        value: {
          kind: "date",
          start: property.date.start,
          end: property.date.end,
          timeZone: property.date.time_zone,
        },
      };
    case "select":
      if (!property.select) return null;
      return {
        id,
        name,
        value: {
          kind: "tags",
          tags: [
            {
              id: property.select.id ?? property.select.name,
              name: property.select.name,
              color: property.select.color,
            },
          ],
        },
      };
    case "multi_select":
      return createTagsProperty(
        id,
        name,
        (property.multi_select ?? []).map((tag: any) => ({
          id: tag.id ?? tag.name,
          name: tag.name,
          color: tag.color,
        }))
      );
    case "people":
      if (!Array.isArray(property.people) || property.people.length === 0) {
        return null;
      }
      return {
        id,
        name,
        value: {
          kind: "people",
          people: property.people.map((person: any) => ({
            id: person.id ?? person.name,
            name: person.name ?? person.display_name ?? "",
            avatarUrl: person.avatar_url ?? null,
          })),
        },
      };
    case "status":
      return {
        id,
        name,
        value: {
          kind: "status",
          status: property.status
            ? {
                id: property.status.id ?? property.status.name,
                name: property.status.name,
                color: property.status.color,
              }
            : null,
        },
      };
    case "files":
      return createFilesProperty(
        id,
        name,
        (property.files ?? [])
          .map((file: any) => {
            const url = resolveFileUrl(file);
            if (!url) return null;
            return { name: file.name ?? "파일", url };
          })
          .filter(Boolean) as { name: string; url: string }[]
      );
    case "formula":
      if (!property.formula) return null;
      switch (property.formula.type) {
        case "string":
          return createTextProperty(id, name, property.formula.string ?? "");
        case "number":
          return {
            id,
            name,
            value: {
              kind: "number",
              number: property.formula.number ?? null,
            },
          };
        case "boolean":
          return {
            id,
            name,
            value: {
              kind: "checkbox",
              checked: Boolean(property.formula.boolean),
            },
          };
        case "date":
          return {
            id,
            name,
            value: {
              kind: "date",
              start: property.formula.date?.start,
              end: property.formula.date?.end,
              timeZone: property.formula.date?.time_zone,
            },
          };
        default:
          return null;
      }
    case "rollup": {
      const rollup = property.rollup;
      if (!rollup) return null;
      switch (rollup.type) {
        case "number":
          return {
            id,
            name,
            value: { kind: "number", number: rollup.number ?? null },
          };
        case "date":
          return {
            id,
            name,
            value: {
              kind: "date",
              start: rollup.date?.start,
              end: rollup.date?.end,
              timeZone: rollup.date?.time_zone,
            },
          };
        case "array": {
          const texts: string[] = [];
          rollup.array?.forEach((item: any) => {
            if (item.type === "rich_text" || item.type === "title") {
              texts.push(extractPlainText(item));
            }
          });
          if (texts.length > 0) {
            return createTextProperty(id, name, texts.join(", "));
          }
          return null;
        }
        default:
          return null;
      }
    }
    default:
      return {
        id,
        name,
        value: {
          kind: "unknown",
          label: "지원되지 않는 속성 유형입니다.",
        },
      };
  }
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

async function transformBlocks(blocks: any[]): Promise<NotionOverviewBlock[]> {
  const transformed: NotionOverviewBlock[] = [];

  for (const block of blocks) {
    const base: NotionOverviewBlock = {
      id: block.id,
      type: block.type,
    };

    switch (block.type) {
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
      const transformedChildren = await transformBlocks(children);
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

export async function GET() {
  try {
    if (!process.env.NOTION_API_KEY) {
      throw new Error("NOTION_API_KEY is not set");
    }

    const rawPageId =
      process.env.NOTION_OVERVIEW_PAGE_ID ?? FALLBACK_OVERVIEW_PAGE_ID;
    const pageId = normalizeNotionId(rawPageId);

    if (!pageId) {
      throw new Error("NOTION_OVERVIEW_PAGE_ID is not set");
    }

    const page = (await notion.pages.retrieve({ page_id: pageId })) as any;
    const title = extractTitle(page.properties ?? {});
    const url = page.public_url || page.url || "";
    const lastEditedTime = page.last_edited_time ?? "";

    const properties = Object.entries(page.properties ?? {})
      .map(([name, property]) => transformProperty(name, property))
      .filter((property): property is NotionOverviewProperty => Boolean(property));

    const rootBlocks = await fetchBlockChildren(pageId);
    const blocks = await transformBlocks(rootBlocks);

    const response: NotionOverviewResponse = {
      title,
      url,
      lastEditedTime,
      properties,
      blocks,
    };

    return NextResponse.json(response);
  } catch (error) {
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 }
    );
  }
}
