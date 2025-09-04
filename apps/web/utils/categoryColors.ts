export interface CategoryColor {
  bg: string;
  text: string;
  border: string;
}

const CATEGORY_COLORS: CategoryColor[] = [
  { bg: "bg-[#dbeafe]", text: "text-[#1e40af]", border: "border-[#93c5fd]" }, // blue
  { bg: "bg-[#dcfce7]", text: "text-[#065f46]", border: "border-[#86efac]" }, // green
  { bg: "bg-[#fef9c3]", text: "text-[#92400e]", border: "border-[#fde68a]" }, // yellow
  { bg: "bg-[#fae8ff]", text: "text-[#86198f]", border: "border-[#f5d0fe]" }, // purple
  { bg: "bg-[#fee2e2]", text: "text-[#991b1b]", border: "border-[#fecaca]" }, // red
  { bg: "bg-[#fce7f3]", text: "text-[#9d174d]", border: "border-[#fbcfe8]" }, // pink
];

export function getCategoryColor(category: string): CategoryColor {
  let hash = 0;
  for (let i = 0; i < category.length; i++) {
    hash = category.charCodeAt(i) + ((hash << 5) - hash);
  }
  const index = Math.abs(hash) % CATEGORY_COLORS.length;
  return CATEGORY_COLORS[index]!;
}

