import { JSX } from "react";
import IconNextJS from "../icon/IconNextJS";
import IconReactJS from "../icon/IconReactJS";
import IconTailwindcss from "../icon/IconTailwindcss";
import IconTanstack from "../icon/IconTanstack";
import IconTypeScript from "../icon/IconTypeScript";
import IconVite from "../icon/IconVite";

export interface Skill {
  name: string;
  icon: JSX.Element;
  description?: string;
}

export const SKILLS: Skill[] = [
  {
    name: "React",
    icon: <IconReactJS width={32} height={32} className="text-cyan-500" />,
    description: "Component-based declarative UI development",
  },
  {
    name: "Next.js",
    icon: (
      <IconNextJS
        width={60}
        height={32}
        className="text-[var(--color-text-primary)]"
      />
    ),
    description: "Server-side rendering and static site generation",
  },
  {
    name: "TypeScript",
    icon: (
      <IconTypeScript
        width={32}
        height={32}
        className="text-[var(--color-blue-600)]"
      />
    ),
    description: "Type-safe JavaScript extension",
  },
  {
    name: "TailwindCSS",
    icon: (
      <IconTailwindcss
        width={90}
        height={32}
        className="text-[var(--color-text-primary)]"
      />
    ),
    description: "Utility-based CSS framework",
  },
  {
    name: "React Query",
    icon: <IconTanstack width={40} height={40} />,
    description: "Server state management and data fetching",
  },
  {
    name: "Vite",
    icon: (
      <IconVite
        width={32}
        height={32}
        className="text-[var(--color-purple-500)]"
      />
    ),
    description: "Fast development environment",
  },
];
