import Badge from "../components/Badge";
import Button from "../components/Button";
import PageShell from "../components/PageShell";

function LabelInput({ label, placeholder }: { label: string; placeholder: string }) {
  return (
    <label className="grid gap-2 text-[11px] font-semibold text-ink">
      {label}
      <input
        className="h-11 rounded-lg border-0 bg-slate-100 px-4 text-sm font-normal outline-none ring-1 ring-transparent transition placeholder:text-slate-400 focus:ring-clinical"
        placeholder={placeholder}
        type="text"
      />
    </label>
  );
}

export default function ContactPage() {
  return (
    <PageShell>
      <section className="bg-white px-6 py-16 text-center sm:px-12 md:px-16">
        <Badge>Contact Support</Badge>
        <h1 className="mx-auto mt-5 max-w-[520px] text-[42px] font-semibold leading-tight tracking-normal text-ink">
          Contact Us
        </h1>
        <p className="mx-auto mt-5 max-w-[500px] text-sm leading-7 text-muted">
          Send a message to the MOI DOCTOR team and we’ll respond with the right
          support for your question.
        </p>
      </section>
      <section className="relative overflow-hidden bg-page-soft px-6 py-14 sm:px-12 md:px-16">
        <div className="absolute bottom-3 right-7 hidden h-56 w-56 rounded-full bg-slate-200/70 md:block" />
        <div className="absolute bottom-8 right-44 hidden h-48 w-24 rotate-[18deg] rounded-full bg-slate-200/70 md:block" />
        <div className="absolute -bottom-10 right-20 hidden h-56 w-24 rotate-[18deg] rounded-full bg-slate-200/70 md:block" />
        <div className="relative z-10 grid gap-12 md:grid-cols-[0.82fr_1fr]">
          <form className="rounded-2xl bg-white p-8 shadow-card" action="#">
            <h2 className="text-sm font-medium text-ink">Send Us a Message</h2>
            <div className="mt-7 grid gap-5">
              <LabelInput label="Full Name" placeholder="Your name" />
              <LabelInput label="Phone Number" placeholder="Your Phone Number" />
              <LabelInput label="Email Address" placeholder="Your email address" />
              <label className="grid gap-2 text-[11px] font-semibold text-ink">
                Message
                <textarea
                  className="min-h-[96px] resize-none rounded-lg border-0 bg-slate-100 px-4 py-3 text-sm font-normal outline-none ring-1 ring-transparent transition placeholder:text-slate-400 focus:ring-clinical"
                  placeholder="Message..."
                />
              </label>
            </div>
            <div className="mt-7">
              <Button type="submit">submit</Button>
            </div>
          </form>
          <div className="pt-2">
            <h2 className="text-[32px] font-medium tracking-normal text-ink">
              We’re here to help.
            </h2>
            <p className="mt-5 max-w-[380px] text-sm leading-7 text-muted">
              For urgent medical symptoms, seek emergency care immediately. For
              product, privacy, or support questions, use the form and our team
              will follow up.
            </p>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
