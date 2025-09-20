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

export interface NotionOverviewResponse {
  title: string;
  lastEditedTime: string;
  url: string;
  blocks: NotionOverviewBlock[];
}

const notion = new Client({ auth: process.env.NOTION_API_KEY });

const FALLBACK_OVERVIEW_PAGE_ID = "2749a57291028051aafcf7982552da08";

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

function extractPlainText(property: any): string {
  if (!property) return "";
  const richText = property.rich_text;
  if (!Array.isArray(richText)) return "";
  return richText.map((text: any) => text.plain_text).join("").trim();
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
      throw new Error(
        "NOTION_OVERVIEW_PAGE_ID is not set or is invalid. Provide a Notion page ID or share URL."
      );
    }

    const page = (await notion.pages.retrieve({ page_id: pageId })) as any;
    const title = extractTitle(page.properties ?? {});
    const url = page.public_url || page.url || "";
    const lastEditedTime = page.last_edited_time ?? "";

    const rootBlocks = await fetchBlockChildren(pageId);
    const blocks = await transformBlocks(rootBlocks);

    const response: NotionOverviewResponse = {
      title,
      url,
      lastEditedTime,
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
