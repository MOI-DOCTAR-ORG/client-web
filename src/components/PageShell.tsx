import type { ReactNode } from "react";
import InstallPrompt from "./InstallPrompt";
import SiteFooter from "./SiteFooter";
import SiteHeader from "./SiteHeader";

type PageShellProps = {
  children: ReactNode;
  withFooter?: boolean;
};

export default function PageShell({ children, withFooter = true }: PageShellProps) {
  return (
    <div className="flex min-h-screen flex-col bg-white text-ink">
      <SiteHeader />
      <main className="flex-1">{children}</main>
      {withFooter && <SiteFooter />}
      <InstallPrompt />
    </div>
  );
}
