"use client";

import { motion } from "motion/react";

/**
 * @description 토스 스타일의 카드 컴포넌트
 * @param title 카드 제목
 * @param description 카드 설명
 * @param icon 카드 아이콘
 * @param tags 카드 태그 목록
 * @param onClick 클릭 핸들러 함수
 */
interface TossStyleCardProps {
  title: string;
  description: string;
  icon?: React.ReactNode;
  tags?: Array<{
    label: string;
    color?: "blue" | "green" | "red" | "yellow";
  }>;
  onClick?: () => void;
}

export function TossStyleCard({
  title,
  description,
  icon,
  tags,
  onClick,
}: TossStyleCardProps) {
  return (
    <motion.div
      className="card hover-lift cursor-pointer"
      onClick={onClick}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: [0.18, 0.68, 0.43, 0.99] }}
      whileHover={{ y: -8 }}
      whileTap={{ y: -4 }}
    >
      {icon && <div className="mb-4 text-toss-blue-500">{icon}</div>}

      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="mb-4">{description}</p>

      {tags && tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-auto pt-2">
          {tags.map((tag, index) => (
            <span key={index} className={`tag ${tag.color || ""}`}>
              {tag.label}
            </span>
          ))}
        </div>
      )}
    </motion.div>
  );
}

/**
 * @description 토스 스타일 카드 그리드 컴포넌트
 * @param children 카드 컴포넌트들
 * @param className 추가 클래스
 */
export function TossStyleCardGrid({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ${className}`}
    >
      {children}
    </div>
  );
}
