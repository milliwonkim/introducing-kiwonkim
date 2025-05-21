import { NextResponse } from "next/server";
import { Client } from "@notionhq/client";

const NOTION_DATABASE_ID = process.env.NOTION_DATABASE_ID!;
const NOTION_API_KEY = process.env.NOTION_API_KEY!;
const notion = new Client({ auth: NOTION_API_KEY });

function parseTitle(property: any): string {
  if (!property || property.type !== "title" || !Array.isArray(property.title))
    return "";
  return property.title.map((t: any) => t.plain_text).join("");
}
function parseRichText(property: any): string {
  if (
    !property ||
    property.type !== "rich_text" ||
    !Array.isArray(property.rich_text)
  )
    return "";
  return property.rich_text.map((t: any) => t.plain_text).join("");
}
function parseCreatedTime(property: any): string {
  if (!property || property.type !== "created_time" || !property.created_time)
    return "";
  const date = new Date(property.created_time);
  return date.toLocaleString("ko-KR", { timeZone: "Asia/Seoul" });
}

// 블록 파싱 함수 (텍스트, 헤딩, 리스트 등 기본 지원)
function parseBlock(block: any): any {
  const base = { id: block.id, type: block.type };
  if (block.type === "paragraph") {
    return {
      ...base,
      text: block.paragraph.rich_text.map((t: any) => t.plain_text).join(""),
    };
  }
  if (
    block.type === "heading_1" ||
    block.type === "heading_2" ||
    block.type === "heading_3"
  ) {
    return {
      ...base,
      text: block[block.type].rich_text.map((t: any) => t.plain_text).join(""),
    };
  }
  if (
    block.type === "bulleted_list_item" ||
    block.type === "numbered_list_item"
  ) {
    return {
      ...base,
      text: block[block.type].rich_text.map((t: any) => t.plain_text).join(""),
    };
  }
  if (block.type === "code") {
    return {
      ...base,
      text: block.code.rich_text.map((t: any) => t.plain_text).join("") ?? "",
      language: block.code.language ?? "plain text",
    };
  }
  if (block.type === "image") {
    let url = "";
    if (block.image.type === "external") url = block.image.external.url;
    if (block.image.type === "file") url = block.image.file.url;
    const caption =
      block.image.caption?.map((t: any) => t.plain_text).join("") ?? "";
    return {
      ...base,
      url,
      caption,
    };
  }
  if (block.type === "divider") {
    return { ...base };
  }
  if (block.type === "table") {
    // table의 children(row) 파싱
    return {
      ...base,
      has_children: block.has_children,
    };
  }
  if (block.type === "table_row") {
    // row의 셀 파싱
    return {
      ...base,
      cells: block.table_row.cells.map((cell: any[]) =>
        cell.map((t: any) => t.plain_text).join("")
      ),
    };
  }
  // 기타 블록은 타입과 id만
  return base;
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");
  if (id) {
    // 단일 글 상세 조회
    const page = await notion.pages.retrieve({ page_id: id });
    const properties = (page as any).properties;
    // 본문 블록 가져오기
    const blocksRes = await notion.blocks.children.list({
      block_id: id,
      page_size: 100,
    });
    const blocks = blocksRes.results.map(parseBlock);
    const post = {
      id: page.id,
      title: parseTitle(properties.title),
      description: parseRichText(properties.description),
      url: (page as any).url,
      createdAt: parseCreatedTime(properties.createdAt),
      blocks,
    };
    return NextResponse.json(post);
  }
  // 전체 리스트
  const response = await notion.databases.query({
    database_id: NOTION_DATABASE_ID,
  });
  const posts = response.results.map((page: any) => {
    const properties = page.properties;
    return {
      id: page.id,
      title: parseTitle(properties.title),
      description: parseRichText(properties.description),
      url: page.url,
      createdAt: parseCreatedTime(properties.createdAt),
    };
  });
  posts.sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
  return NextResponse.json(posts);
}
