import { motion } from "motion/react";
import { ReactNode } from "react";

interface SkillCardProps {
  name: string;
  icon: ReactNode;
  index: number;
}

export default function SkillCard({ name, icon, index }: SkillCardProps) {
  return (
    <motion.div
      className="card text-center p-4 md:p-6"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{
        duration: 0.5,
        delay: 0.05 * index,
        ease: "easeOut",
      }}
    >
      <div className="flex justify-center mb-4">
        <div className="w-16 h-16 rounded-xl p-[4px] flex items-center justify-center">
          {icon}
        </div>
      </div>
      <h3 className="font-medium text-text-primary">{name}</h3>
    </motion.div>
  );
}
