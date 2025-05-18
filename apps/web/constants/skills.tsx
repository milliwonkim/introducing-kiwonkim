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
    description: "컴포넌트 기반의 선언적 UI 개발",
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
    description: "서버 사이드 렌더링과 정적 사이트 생성",
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
    description: "타입 안정성을 갖춘 JavaScript 확장",
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
    description: "유틸리티 기반의 CSS 프레임워크",
  },
  {
    name: "React Query",
    icon: <IconTanstack width={40} height={40} />,
    description: "서버 상태 관리 및 데이터 페칭",
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
    description: "빠른 개발 환경 제공",
  },
];
