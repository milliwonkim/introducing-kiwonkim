import { ReactNode } from "react";

interface SectionContainerProps {
  children: ReactNode;
  className?: string;
}

export default function SectionContainer({
  children,
  className = "",
}: SectionContainerProps) {
  return (
    <section className={`py-20 ${className}`}>
      <div className="container mx-auto px-6 md:px-8">{children}</div>
    </section>
  );
}
