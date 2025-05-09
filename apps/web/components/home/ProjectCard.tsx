import { motion } from "motion/react";
import Link from "next/link";

interface ProjectCardProps {
  title: string;
  description: string;
  technologies: string[];
  imageUrl?: string;
  projectUrl: string;
  index: number;
}

export default function ProjectCard({
  title,
  description,
  technologies,
  imageUrl,
  projectUrl,
  index,
}: ProjectCardProps) {
  return (
    <motion.div
      className="card"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{
        duration: 0.5,
        delay: 0.1 * index,
        ease: "easeOut",
      }}
    >
      <div className="aspect-[16/9] bg-gray-100 rounded-xl mb-4 flex items-center justify-center text-text-tertiary overflow-hidden">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={title}
            className="w-full h-full object-cover"
          />
        ) : (
          <svg
            className="w-full h-full text-gray-300 dark:text-gray-600 scale-110"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z" />
          </svg>
        )}
      </div>
      <h3 className="font-semibold text-lg text-text-primary mb-1">{title}</h3>
      <p className="text-text-secondary text-sm mb-4 line-clamp-2">
        {description}
      </p>
      <div className="flex flex-wrap gap-2 mb-4">
        {technologies.map((tech) => (
          <span key={tech} className="tag blue">
            {tech}
          </span>
        ))}
      </div>
      <Link
        href={projectUrl}
        className="text-primary font-medium text-sm inline-flex items-center group hover:text-primary-hover transition-colors"
      >
        자세히 보기
        <svg
          className="w-4 h-4 ml-1 transform translate-x-0 group-hover:translate-x-1 transition-transform duration-200 ease-in-out"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5l7 7-7 7"
          />
        </svg>
      </Link>
    </motion.div>
  );
}
