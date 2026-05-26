import { ArrowRight, Download } from "lucide-react";
import { NavLink } from "react-router-dom";
import Logo from "./Logo";

const navItems = [
  { label: "Home", to: "/" },
  { label: "How It Works", to: "/how-it-works" },
  { label: "Features", to: "/features" },
  { label: "Contact", to: "/contact" },
];

export default function SiteHeader() {
  return (
    <header className="flex h-[86px] items-center justify-between border-b border-slate-100 bg-white px-6 sm:px-12 md:px-16">
      <Logo />
      <nav
        className="hidden items-center gap-9 text-[11px] font-medium md:flex"
        aria-label="Main navigation"
      >
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            className={({ isActive }) =>
              `transition hover:text-clinical ${
                isActive ? "text-clinical" : "text-slate-500"
              }`
            }
            to={item.to}
          >
            {item.label}
          </NavLink>
        ))}
        <NavLink
          className={({ isActive }) =>
            `inline-flex items-center gap-1.5 text-[11px] font-semibold transition ${
              isActive
                ? "text-clinical"
                : "text-clinical/80 hover:text-clinical"
            }`
          }
          to="/download"
        >
          <Download size={12} />
          Download App
        </NavLink>
      </nav>
      <div className="flex items-center gap-3">
        <button
          className="hidden h-8 items-center rounded-full bg-slate-100 px-5 text-[11px] font-semibold text-slate-600 sm:flex"
          type="button"
        >
          login
        </button>
        <NavLink
          className="inline-flex h-8 items-center gap-2 rounded-full bg-clinical px-5 text-[11px] font-semibold text-white shadow-soft"
          to="/how-it-works"
        >
          get started <ArrowRight size={12} />
        </NavLink>
      </div>
    </header>
  );
}
