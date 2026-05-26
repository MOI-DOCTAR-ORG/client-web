import { Link } from "react-router-dom";
import Badge from "./Badge";

export default function SiteFooter() {
  return (
    <footer className="bg-white px-6 py-16 sm:px-12 md:px-16">
      <div className="grid gap-12 md:grid-cols-[1.1fr_1fr]">
        <div>
          <Badge>Clinical Grade Protocol</Badge>
          <h2 className="mt-5 max-w-[330px] text-[26px] font-medium leading-tight tracking-normal text-ink">
            Describe how you feel. Get clarity in minutes.
          </h2>
          <p className="mt-10 text-[9px] font-semibold uppercase tracking-[0.12em] text-clinical">
            © 2026 MOI DOCTOR. All rights reserved.
          </p>
        </div>
        <div>
          <div className="flex flex-col gap-3 rounded-3xl bg-slate-100 p-2 sm:flex-row sm:items-center sm:rounded-full">
            <input
              className="h-9 w-full rounded-full bg-transparent px-4 text-[11px] outline-none placeholder:text-slate-500 sm:flex-1"
              placeholder="Your Email Address"
              type="email"
            />
            <button
              className="h-9 w-full rounded-full bg-clinical px-5 text-[11px] font-semibold text-white sm:w-auto"
              type="button"
            >
              Subscribe
            </button>
          </div>
          <div className="mt-10 grid grid-cols-3 gap-6">
            {([
              ["Home", "/"],
              ["How It Works", "/how-it-works"],
              ["Download App", "/download"],
            ] as const).map(([item, to]) => (
              <Link key={item} className="block text-[10px] text-slate-600 transition hover:text-clinical" to={to}>
                {item}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
