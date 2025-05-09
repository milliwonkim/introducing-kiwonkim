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
      className="group relative bg-white/80 dark:bg-zinc-900/80 backdrop-blur-sm rounded-2xl overflow-hidden border border-zinc-100/50 dark:border-zinc-800/50 hover:border-zinc-200/50 dark:hover:border-zinc-700/50 transition-all duration-300 hover:shadow-lg"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{
        duration: 0.5,
        delay: 0.1 * index,
        ease: "easeOut",
      }}
    >
      <div className="aspect-[16/9] bg-zinc-50/50 dark:bg-zinc-800/30 overflow-hidden">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={title}
            className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-zinc-200 dark:text-zinc-700">
            <svg className="w-16 h-16" fill="currentColor" viewBox="0 0 24 24">
              <path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z" />
            </svg>
          </div>
        )}
      </div>
      <div className="p-6">
        <h3 className="font-semibold text-xl text-zinc-900 dark:text-white mb-2 group-hover:text-primary transition-colors">
          {title}
        </h3>
        <p className="text-zinc-600 dark:text-zinc-400 text-sm mb-4 line-clamp-2">
          {description}
        </p>
        <div className="flex flex-wrap gap-2 mb-4">
          {technologies.map((tech) => (
            <span
              key={tech}
              className="px-2.5 py-1 text-xs font-medium bg-zinc-50/50 dark:bg-zinc-800/30 text-zinc-600 dark:text-zinc-400 rounded-full"
            >
              {tech}
            </span>
          ))}
        </div>
        <Link
          href={projectUrl}
          className="inline-flex items-center text-sm font-medium text-primary hover:text-primary-hover transition-colors"
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
      </div>
    </motion.div>
  );
}
