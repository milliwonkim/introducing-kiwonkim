import { NextResponse } from "next/server";

import { Client } from "@notionhq/client";

export interface NotionProject {
  id: string;
  title: string;
  company: string;
  date: string;
  url: string;
}

const notion = new Client({ auth: process.env.NOTION_API_KEY });
const databaseId = process.env.NOTION_PORTFOLIO_DATABASE_ID;

export async function fetchNotionProjects(): Promise<NotionProject[]> {
  if (!databaseId) throw new Error("NOTION_PORTFOLIO_DATABASE_ID is not set");

  const response = await notion.databases.query({
    database_id: databaseId,
    page_size: 12,
  });

  return response.results.map((page: any) => {
    const props = page.properties;
    console.info(page);
    return {
      id: page.id,
      title: props.title?.title?.[0]?.plain_text ?? "",
      company: props.company?.select?.name ?? "",
      date: props.date?.date
        ? `${props.date?.date?.start} ~ ${props.date?.date?.end}`
        : "unknown",
      url: props.public_url ?? `https://notion.so/${page.id.replace(/-/g, "")}`,
    };
  });
}

export async function GET() {
  try {
    const projects = await fetchNotionProjects();
    return NextResponse.json({ projects });
  } catch (error) {
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 }
    );
  }
}
