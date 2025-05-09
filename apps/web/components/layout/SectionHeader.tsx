import { motion } from "motion/react";
import { ReactNode } from "react";

interface SectionHeaderProps {
  title: ReactNode;
  subtitle?: string;
  label?: string;
  className?: string;
}

export default function SectionHeader({
  title,
  subtitle,
  label,
  className = "",
}: SectionHeaderProps) {
  return (
    <motion.div
      className={`text-center mb-12 md:mb-16 ${className}`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      {label && (
        <span className="text-primary font-medium text-sm mb-2 block tracking-wide">
          {label}
        </span>
      )}
      <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-3">
        {title}
      </h2>
      {subtitle && (
        <p className="text-text-secondary max-w-lg mx-auto">{subtitle}</p>
      )}
    </motion.div>
  );
}
