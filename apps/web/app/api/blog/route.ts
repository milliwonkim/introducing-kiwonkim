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

export async function GET() {
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
