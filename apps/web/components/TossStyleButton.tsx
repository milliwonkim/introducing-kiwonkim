"use client";

import { motion, HTMLMotionProps } from "motion/react";
import React from "react";

/**
 * @description 토스 스타일의 버튼 컴포넌트
 * @param children 버튼 내부 콘텐츠
 * @param variant 버튼 스타일 variant
 * @param size 버튼 크기
 * @param fullWidth 버튼 너비를 100%로 할지 여부
 * @param icon 버튼 아이콘
 * @param iconPosition 아이콘 위치
 * @param disabled 버튼 비활성화 여부
 * @param onClick 클릭 핸들러 함수
 * @param className 추가 클래스명
 */
interface TossStyleButtonProps {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "outline" | "text";
  size?: "sm" | "md" | "lg";
  fullWidth?: boolean;
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
  disabled?: boolean;
  onClick?: () => void;
  className?: string;
  type?: "button" | "submit" | "reset";
}

export function TossStyleButton({
  children,
  variant = "primary",
  size = "md",
  fullWidth = false,
  icon,
  iconPosition = "left",
  disabled = false,
  onClick,
  className = "",
  type = "button",
  ...props
}: TossStyleButtonProps &
  Omit<HTMLMotionProps<"button">, keyof TossStyleButtonProps>) {
  // 스타일 변수 정의
  const baseStyles =
    "inline-flex items-center justify-center font-medium transition-all";

  const variantStyles = {
    primary: "bg-toss-blue-500 hover:bg-toss-blue-600 text-white shadow-sm",
    secondary:
      "bg-gray-100 hover:bg-gray-200 text-gray-800 dark:text-gray-200 dark:bg-gray-200 dark:hover:bg-gray-300 dark:text-gray-800",
    outline:
      "border border-gray-300 dark:border-gray-600 bg-transparent text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800",
    text: "bg-transparent text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800",
  };

  const sizeStyles = {
    sm: "text-sm py-2 px-4 rounded-lg",
    md: "text-base py-2.5 px-5 rounded-xl",
    lg: "text-lg py-3 px-6 rounded-xl",
  };

  const disabledStyles = disabled
    ? "opacity-50 cursor-not-allowed pointer-events-none"
    : "cursor-pointer";

  const widthStyles = fullWidth ? "w-full" : "";

  return (
    <motion.button
      className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${widthStyles} ${disabledStyles} ${className}`}
      onClick={onClick}
      disabled={disabled}
      type={type}
      whileTap={{ scale: disabled ? 1 : 0.97 }}
      whileHover={{ y: disabled ? 0 : -2 }}
      transition={{ duration: 0.2, ease: [0.18, 0.68, 0.43, 0.99] }}
      {...props}
    >
      {icon && iconPosition === "left" && <span className="mr-2">{icon}</span>}
      {children}
      {icon && iconPosition === "right" && <span className="ml-2">{icon}</span>}
    </motion.button>
  );
}
