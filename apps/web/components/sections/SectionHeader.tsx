import clsx from "clsx";

interface SectionHeaderProps {
  eyebrow?: string;
  title?: string;
  description?: string;
  align?: "left" | "center";
}

const SectionHeader = ({
  eyebrow,
  title,
  description,
  align = "left",
}: SectionHeaderProps) => {
  return (
    <div
      className={clsx("max-w-3xl", {
        "mx-auto text-center": align === "center",
      })}
    >
      {eyebrow && (
        <span className="text-xs font-semibold tracking-[0.35em] uppercase text-[color:var(--color-text-tertiary)]">
          {eyebrow}
        </span>
      )}
      {title && (
        <h2 className="mt-3 text-3xl sm:text-4xl font-semibold text-[color:var(--color-text-primary)]">
          {title}
        </h2>
      )}
      {description && (
        <p className="mt-4 text-lg leading-relaxed text-[color:var(--color-text-secondary)]">
          {description}
        </p>
      )}
    </div>
  );
};

export default SectionHeader;
