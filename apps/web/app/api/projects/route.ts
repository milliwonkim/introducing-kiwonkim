import { NextResponse } from "next/server";

import { Client } from "@notionhq/client";

/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable turbo/no-undeclared-env-vars */

export interface NotionProject {
  id: string;
  title: string;
  company: string;
  date: string;
  url: string;
}

const notion = new Client({ auth: process.env.NOTION_API_KEY });
const databaseId = process.env.NOTION_PORTFOLIO_DATABASE_ID;

async function fetchNotionProjects(): Promise<NotionProject[]> {
  if (!databaseId) throw new Error("NOTION_PORTFOLIO_DATABASE_ID is not set");

  let hasMore = true;
  let startCursor: string | undefined;
  const projects: NotionProject[] = [];

  while (hasMore) {
    const response = await notion.databases.query({
      database_id: databaseId,
      page_size: 100,
      start_cursor: startCursor,
    });

    response.results.forEach((page: any) => {
      const props = page.properties;
      projects.push({
        id: page.id,
        title: props.title?.title?.[0]?.plain_text ?? "",
        company: props.company?.select?.name ?? "",
        date: (() => {
          const start = props.date?.date?.start ?? "";
          const end = props.date?.date?.end ?? "";
          return start && end ? `${start} ~ ${end}` : start;
        })(),
        url: page.public_url || props.url?.url || `https://notion.so/${page.id.replace(/-/g, "")}`,
      });
    });

    hasMore = response.has_more;
    startCursor = response.next_cursor ?? undefined;
  }

  return projects;
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
