import type { ReactNode } from "react";

export default function Badge({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full bg-clinical-soft px-4 py-1.5 text-[10px] font-semibold uppercase tracking-[0.08em] text-clinical">
      {children}
    </span>
  );
}
