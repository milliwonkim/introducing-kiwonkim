import { ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="relative py-16 sm:py-20">
      <div className="mx-auto max-w-6xl space-y-16 px-6 sm:px-8 text-[color:var(--color-text-primary)]">
        {children}
      </div>
    </div>
  );
};

export default Layout;
