import type { Step } from "../data/site";

type StepCardProps = {
  step: Step;
  active?: boolean;
  className?: string;
};

export default function StepCard({ step, active = false, className = "" }: StepCardProps) {
  const Icon = step.icon;

  return (
    <article
      className={`relative flex min-h-[318px] flex-col justify-end rounded-2xl p-7 shadow-card ring-1 ring-slate-100 ${
        active ? "bg-clinical text-white" : "bg-white text-ink"
      } ${className}`}
    >
      <span
        className={`absolute right-7 top-7 text-[62px] font-light leading-none ${
          active ? "text-white/85" : "text-slate-300"
        }`}
      >
        {step.number}
      </span>
      <span
        className={`mb-4 grid h-6 w-6 place-items-center rounded-full ring-1 ${
          active
            ? "bg-white text-clinical ring-white"
            : "bg-slate-50 text-slate-700 ring-slate-100"
        }`}
      >
        <Icon size={12} />
      </span>
      <h3
        className={`max-w-[150px] text-[13px] font-medium leading-tight ${
          active ? "text-white" : "text-[#22252b]"
        }`}
      >
        {step.title}
      </h3>
      <p
        className={`mt-4 max-w-[190px] text-[10px] leading-4 ${
          active ? "text-white" : "text-muted"
        }`}
      >
        {step.description}
      </p>
    </article>
  );
}
