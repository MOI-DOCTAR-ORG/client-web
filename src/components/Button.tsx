import type { ReactNode } from "react";
import { Link } from "react-router-dom";

type ButtonProps = {
  children: ReactNode;
  variant?: "primary" | "soft" | "white";
  to?: string;
  type?: "button" | "submit";
};

export default function Button({
  children,
  variant = "primary",
  to,
  type = "button",
}: ButtonProps) {
  const variants = {
    primary:
      "bg-clinical text-white shadow-soft hover:bg-clinical-deep focus-visible:outline-clinical",
    soft:
      "bg-slate-100 text-slate-700 hover:bg-slate-200 focus-visible:outline-slate-400",
    white:
      "bg-white text-clinical hover:bg-clinical-soft focus-visible:outline-white",
  };

  const className = `inline-flex h-10 items-center justify-center gap-2 rounded-full px-5 text-[12px] font-semibold transition ${variants[variant]} focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2`;

  if (to) {
    return (
      <Link className={className} to={to}>
        {children}
      </Link>
    );
  }

  return (
    <button className={className} type={type}>
      {children}
    </button>
  );
}
