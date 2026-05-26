import type { Step } from "../data/site";

type FeatureStateCardProps = {
  step: Step;
  active?: boolean;
};

export default function FeatureStateCard({
  step,
  active = false,
}: FeatureStateCardProps) {
  const Icon = step.icon;

  return (
    <article
      className={`relative flex min-h-[492px] flex-col justify-end overflow-hidden rounded-[28px] p-9 shadow-card ${
        active ? "bg-clinical text-white" : "bg-white text-ink"
      }`}
    >
      <span
        className={`absolute right-9 top-8 text-[82px] font-light leading-none ${
          active ? "text-white/90" : "text-slate-300"
        }`}
      >
        {step.number}
      </span>
      <span
        className={`mb-6 grid h-7 w-7 place-items-center rounded-full ${
          active ? "bg-white text-clinical" : "bg-slate-50 text-slate-700"
        }`}
      >
        <Icon size={15} />
      </span>
      <h2
        className={`max-w-[230px] text-[22px] font-medium leading-[1.24] tracking-normal ${
          active ? "text-white" : "text-[#22252b]"
        }`}
      >
        {step.title}
      </h2>
      <p
        className={`mt-7 max-w-[270px] text-[16px] leading-[1.45] ${
          active ? "text-white" : "text-muted"
        }`}
      >
        {step.description}
      </p>
    </article>
  );
}
