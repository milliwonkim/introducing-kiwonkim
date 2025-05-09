import { motion } from "motion/react";
import Link from "next/link";

interface CTAProps {
  title: string;
  description: string;
  buttonText: string;
  buttonUrl: string;
  className?: string;
}

export default function CTA({
  title,
  description,
  buttonText,
  buttonUrl,
  className = "",
}: CTAProps) {
  return (
    <section className={`py-24 md:py-32 ${className}`}>
      <div className="container mx-auto px-6 md:px-8">
        <div className="max-w-3xl mx-auto">
          <motion.div
            className="card flex flex-col items-center justify-center text-center"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <h2 className="text-2xl md:text-3xl font-bold text-zinc-900 mb-4">
              {title}
            </h2>
            <p className="text-text-primary mb-8 max-w-lg mx-auto text-lg">
              {description}
            </p>
            <Link href={buttonUrl} className="btn btn-primary px-8">
              {buttonText}
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
