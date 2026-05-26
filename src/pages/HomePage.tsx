import { ArrowRight, ChevronDown, CircleDot } from "lucide-react";
import { Link } from "react-router-dom";
import Badge from "../components/Badge";
import Button from "../components/Button";
import PageShell from "../components/PageShell";
import PatientImage from "../components/PatientImage";
import StepCard from "../components/StepCard";
import { avatars, features, steps, trustItems } from "../data/site";

function Hero() {
  return (
    <section className="grid gap-10 px-6 py-14 sm:px-12 md:grid-cols-[0.92fr_1fr] md:px-16 md:py-11">
      <div className="flex flex-col justify-end pb-4 pt-10 md:min-h-[420px]">
        <Badge>Clinical Grade Protocol</Badge>
        <h1 className="mt-5 max-w-[360px] text-[38px] font-semibold leading-[0.94] tracking-normal text-[#111318] sm:text-[42px]">
          Describe how you feel. Get clarity in minutes.
        </h1>
        <p className="mt-5 max-w-[310px] text-[12px] leading-5 text-muted">
          Get clinical-grade insights and clear next steps for your symptoms,
          powered by advanced medical protocols.
        </p>
        <div className="mt-6 flex flex-wrap items-center gap-3">
          <Button to="/how-it-works">
            Start your free Triage <ArrowRight size={13} />
          </Button>
          <Button variant="soft" to="/how-it-works">
            How it works
          </Button>
        </div>
        <div className="mt-5 flex items-center gap-3">
          <div className="flex">
            {avatars.map((avatar) => (
              <span
                key={avatar}
                className="-ml-1.5 grid h-7 w-7 first:ml-0 place-items-center rounded-full border-2 border-white bg-gradient-to-br from-[#a6d2ff] via-[#ffd3d7] to-[#ff8f5c] text-[8px] font-black text-slate-800"
              >
                {avatar}
              </span>
            ))}
          </div>
          <span className="text-[10px] font-medium text-muted">
            Join 500+ users on our website
          </span>
        </div>
      </div>
      <div className="flex items-center justify-center md:justify-end">
        <div className="w-full max-w-[455px]">
          <PatientImage />
        </div>
      </div>
    </section>
  );
}

function HomeSteps() {
  return (
    <section className="bg-page-soft px-6 py-12 sm:px-12 md:px-16">
      <Badge>Learn More</Badge>
      <h2 className="mt-4 text-[26px] font-medium tracking-normal text-ink">
        How it Works
      </h2>
      <div className="mt-10 grid gap-5 md:grid-cols-3">
        {steps.map((step) => (
          <StepCard key={step.number} step={step} />
        ))}
      </div>
    </section>
  );
}

function Trust() {
  return (
    <section className="relative overflow-hidden bg-clinical px-6 py-12 text-white sm:px-12 md:px-16">
      <div className="absolute -bottom-14 left-2 h-32 w-44 rotate-[15deg] rounded-full bg-white/16" />
      <div className="absolute bottom-20 left-8 h-28 w-28 rounded-full bg-white/18" />
      <div className="absolute -bottom-16 left-40 h-56 w-28 rotate-[18deg] rounded-full bg-white/18" />
      <div className="relative z-10 grid gap-10 md:grid-cols-[0.86fr_1.14fr]">
        <div>
          <Badge>Why People Trust Us</Badge>
          <h2 className="mt-4 max-w-[210px] text-[26px] font-semibold leading-tight">
            Why People Trust Us
          </h2>
        </div>
        <div className="grid gap-4">
          {trustItems.map((item, index) => (
            <article
              key={item.title}
              className="rounded-xl bg-white px-7 py-5 text-ink shadow-card"
            >
              <div className="flex items-start justify-between gap-5">
                <div>
                  <h3 className="text-[16px] font-medium">{item.title}</h3>
                  {index === 0 && (
                    <p className="mt-3 max-w-[350px] text-[11px] leading-5 text-muted">
                      {item.description}
                    </p>
                  )}
                </div>
                <span className="grid h-5 w-5 flex-none place-items-center rounded-full border border-clinical text-clinical">
                  {index === 0 ? <CircleDot size={10} /> : <ChevronDown size={10} />}
                </span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function FeaturePreview() {
  return (
    <section className="bg-page-soft px-6 py-12 sm:px-12 md:px-16">
      <Badge>Features</Badge>
      <h2 className="mt-4 max-w-[250px] text-[28px] font-medium leading-tight tracking-normal text-ink">
        Intelligent Features
      </h2>
      <div className="mt-8 grid gap-5 md:grid-cols-3">
        {features.map((feature) => {
          const Icon = feature.icon;
          return (
            <article
              key={feature.title}
              className={`flex h-[315px] flex-col justify-between rounded-2xl p-7 shadow-card ring-1 ring-slate-100 ${
                feature.featured ? "bg-clinical text-white" : "bg-white text-ink"
              }`}
            >
              <div className="flex justify-end">
                <span
                  className={`grid h-12 w-12 place-items-center rounded-full ${
                    feature.featured
                      ? "bg-[#3f72f4] text-white"
                      : "bg-clinical-soft text-clinical"
                  }`}
                >
                  <Icon size={20} />
                </span>
              </div>
              <div>
                <h3 className="text-[13px] font-medium">{feature.title}</h3>
                <p
                  className={`mt-4 text-[10px] leading-4 ${
                    feature.featured ? "text-white/90" : "text-muted"
                  }`}
                >
                  {feature.description}
                </p>
              </div>
            </article>
          );
        })}
      </div>
      <Link
        className="mt-8 inline-flex h-10 items-center justify-center rounded-full bg-white px-5 text-[12px] font-semibold text-clinical shadow-card"
        to="/features"
      >
        View feature states
      </Link>
    </section>
  );
}

function Stats() {
  return (
    <section className="bg-white px-6 py-10 sm:px-12 md:px-16">
      <div className="grid gap-8 text-center md:grid-cols-3">
        {[
          ["2M+", "Trusted users worldwide"],
          ["99.2%", "Clinical accuracy alignment"],
          ["99.2%", "ISO 13485 certified"],
        ].map(([value, label]) => (
          <div key={label}>
            <p className="text-[26px] font-medium text-ink">{value}</p>
            <p className="mt-2 text-[9px] uppercase tracking-[0.12em] text-muted">
              {label}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

function Cta() {
  return (
    <section className="bg-clinical px-6 py-20 text-center text-white sm:px-12 md:px-16">
      <h2 className="mx-auto max-w-[390px] text-[31px] font-medium leading-tight tracking-normal">
        Your Health, Empowered by Intelligence
      </h2>
      <p className="mx-auto mt-3 max-w-[300px] text-[10px] leading-5 text-white/80">
        Don’t let medical uncertainty linger. Get professional-grade triage
        guidance in minutes.
      </p>
      <Button variant="white" to="/how-it-works">
        Start your triage now
      </Button>
    </section>
  );
}

export default function HomePage() {
  return (
    <PageShell>
      <Hero />
      <HomeSteps />
      <Trust />
      <FeaturePreview />
      <Stats />
      <Cta />
    </PageShell>
  );
}
