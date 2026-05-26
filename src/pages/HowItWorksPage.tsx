import Badge from "../components/Badge";
import PageShell from "../components/PageShell";
import StepCard from "../components/StepCard";
import { steps, trustItems } from "../data/site";

export default function HowItWorksPage() {
  return (
    <PageShell>
      <section className="bg-white px-6 py-16 text-center sm:px-12 md:px-16">
        <Badge>Learn More</Badge>
        <h1 className="mx-auto mt-5 max-w-[560px] text-[42px] font-semibold leading-tight tracking-normal text-ink">
          How MOI DOCTOR guides you from symptoms to next steps.
        </h1>
        <p className="mx-auto mt-5 max-w-[520px] text-sm leading-7 text-muted">
          The process is intentionally simple: explain how you feel, let the AI
          review your responses, then receive clear guidance on what to do next.
        </p>
      </section>
      <section className="bg-page-soft px-6 py-12 sm:px-12 md:px-16">
        <div className="grid gap-5 md:grid-cols-3">
          {steps.map((step) => (
            <StepCard key={step.number} step={step} />
          ))}
        </div>
      </section>
      <section className="bg-clinical px-6 py-14 text-white sm:px-12 md:px-16">
        <div className="grid gap-5 md:grid-cols-3">
          {trustItems.map((item) => (
            <article key={item.title} className="rounded-2xl bg-white p-6 text-ink">
              <h2 className="text-base font-semibold">{item.title}</h2>
              <p className="mt-3 text-[12px] leading-5 text-muted">{item.description}</p>
            </article>
          ))}
        </div>
      </section>
    </PageShell>
  );
}
