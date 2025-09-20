import { ReactNode } from "react";
import clsx from "clsx";

interface SectionContainerProps {
  id: string;
  className?: string;
  children: ReactNode;
}

const SectionContainer = ({ id, className, children }: SectionContainerProps) => {
  return (
    <section
      id={id}
      className={clsx(
        "relative py-24 sm:py-28",
        "scroll-mt-[calc(var(--header-height,4.5rem)+2rem)]",
        className
      )}
    >
      <div className="max-w-6xl mx-auto px-6 sm:px-8">{children}</div>
    </section>
  );
};

export default SectionContainer;
