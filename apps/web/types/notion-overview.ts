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
  | {
      kind: "people";
      people: { id: string; name: string; avatarUrl?: string | null }[];
    }
  | {
      kind: "date";
      start?: string | null;
      end?: string | null;
      timeZone?: string | null;
    }
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
