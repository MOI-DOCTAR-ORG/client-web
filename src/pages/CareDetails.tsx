import { useState } from 'react'
import Icon from '../components/Icon'

export default function CareDetails() {
  const [followUp, setFollowUp] = useState(true)

  return (
    <main className="ml-[var(--spacing-sidebar-width,280px)] min-h-screen p-margin-mobile md:p-stack-lg max-w-container-max-width mx-auto bg-surface text-on-surface font-body-md">
      <div className="blob bg-primary/15 w-[400px] h-[400px] fixed -top-20 -right-20 rounded-full blur-[80px] -z-10" />
      <div className="blob bg-tertiary-container/15 w-[300px] h-[300px] fixed bottom-10 -left-10 rounded-full blur-[80px] -z-10" />

      <header className="mb-stack-lg flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <nav className="flex items-center gap-2 text-secondary mb-2">
            <span className="text-caption font-caption">History</span>
            <Icon icon="chevron_right" className="text-[16px]" />
            <span className="text-caption font-caption text-primary font-bold">Session #4829</span>
          </nav>
          <h2 className="font-headline-lg text-headline-lg text-on-surface">Care Details</h2>
        </div>
        <div className="inline-flex items-center gap-3 px-6 py-4 bg-[#FFF4E5] border border-[#FFD699] rounded-xl">
          <div className="w-4 h-4 rounded-full bg-[#F57C00] animate-pulse" />
          <div className="flex flex-col">
            <span className="text-[10px] uppercase font-bold tracking-widest text-[#F57C00]">Urgency Level</span>
            <span className="font-headline-md text-headline-md text-[#F57C00]">Moderate Risk</span>
          </div>
        </div>
      </header>

      <section className="flex flex-wrap gap-2 mb-stack-lg">
        <span className="px-4 py-2 bg-surface-container rounded-full text-label-md font-label-md text-primary flex items-center gap-2">
          <Icon icon="thermostat" className="text-[18px]" /> High Fever
        </span>
        <span className="px-4 py-2 bg-surface-container rounded-full text-label-md font-label-md text-primary flex items-center gap-2">
          <Icon icon="respiratory_rate" className="text-[18px]" /> Shortness of Breath
        </span>
        <span className="px-4 py-2 bg-surface-container rounded-full text-label-md font-label-md text-primary flex items-center gap-2">
          <Icon icon="skull" className="text-[18px]" /> Migraine
        </span>
        <span className="px-4 py-2 bg-surface-container-high rounded-full text-label-md font-label-md text-secondary italic">
          +2 more
        </span>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-gutter">
        <div className="lg:col-span-2 space-y-gutter">
          <section className="bg-surface-container-lowest rounded-xl p-8 lifted-card transition-all duration-700 opacity-100 translate-y-0 border border-outline-variant/20 shadow-sm">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 rounded-lg bg-primary-container/10 flex items-center justify-center text-primary">
                <Icon icon="psychology" className="text-[28px]" />
              </div>
              <h3 className="font-headline-md text-headline-md">What AI found</h3>
            </div>
            <div className="space-y-4 text-on-surface-variant leading-relaxed font-body-md">
              <p>
                Based on the symptoms provided, our analysis indicates a potential <strong>upper respiratory congestion</strong> coupled with inflammatory responses. The reported fever duration (48h) and the intensity of chest discomfort suggest a viral origin rather than bacterial, though monitoring is essential.
              </p>
              <div className="p-4 bg-surface-bright border-l-4 border-primary rounded-r-lg">
                <p className="text-label-md font-label-md text-primary mb-1">Key Insight</p>
                <p className="text-body-md">
                  Symptom patterns align 84% with Seasonal Influenza-A variants identified in your local area over the last 14 days.
                </p>
              </div>
              <p>
                Patient reports no underlying cardiac conditions, which lowers the immediate priority level, however, the persistence of the cough warrants a physical consultation if symptoms do not improve within 24 hours.
              </p>
            </div>
          </section>

          <div className="relative h-[240px] rounded-xl overflow-hidden group">
            <img
              alt="Medical professional reviewing digital health data"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuAKXdX56RArmULZK_NoQ0L99HNEH3Smr4pCogZr1zloxe29vQZoB26L8Iu78idg7ZwHHUDKRyrKxSMcQWXPY2GAyGcUU_L5ikTUELOgPKOWXEE9Tb7l9pndYlQwpmnKXA5JJdpiAQwriLBBeAT0YoPgHW3irIWbiaGoOPswqOnYqvrc4_ts2NWwIzdymky9Sr03DYK7taoPrRNvjZihhWh501vmdR2fLafOADCKSzevfmE2SFGH3N4vyy5sxGrLAqa6CZyr0Qwj3n4"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-6">
              <p className="text-white font-label-md">Expert triage models calibrated to current regional health data.</p>
            </div>
          </div>
        </div>

        <div className="lg:col-span-1 flex flex-col gap-gutter">
          <section className="bg-surface-container-lowest rounded-xl p-6 border border-outline-variant/20 shadow-sm h-full">
            <div className="flex items-center gap-3 mb-6">
              <Icon icon="assignment_turned_in" className="text-primary" />
              <h3 className="font-headline-md text-headline-md">Next Steps</h3>
            </div>
            <ul className="space-y-6">
              {[
                'Schedule a <strong class="text-primary">Telehealth consultation</strong> within the next 6 hours for a secondary review.',
                'Continue monitoring body temperature every <strong>4 hours</strong> and log in the Symptom Tracker.',
                'Increase hydration levels and prioritize rest for at least 48 hours.',
                'Prepare clinical history for potential urgent care visit if breathing worsens.',
              ].map((step, i) => (
                <li key={i} className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-bold text-sm">
                    {i + 1}
                  </div>
                  <p className="text-body-md" dangerouslySetInnerHTML={{ __html: step }} />
                </li>
              ))}
            </ul>

            <div className="mt-10 pt-6 border-t border-outline-variant flex items-center justify-between">
              <div className="flex flex-col">
                <span className="font-label-md text-label-md text-on-surface">Follow-up Reminder</span>
                <span className="text-caption text-secondary">Notify me in 12 hours</span>
              </div>
              <button
                onClick={() => setFollowUp(!followUp)}
                className={
                  'relative inline-flex h-6 w-12 items-center rounded-full transition-colors ' +
                  (followUp ? 'bg-primary' : 'bg-surface-container-high')
                }
              >
                <span
                  className={
                    'inline-block h-5 w-5 transform rounded-full bg-white border-2 border-outline-variant transition-transform ' +
                    (followUp ? 'translate-x-6' : 'translate-x-0.5')
                  }
                />
              </button>
            </div>
          </section>
        </div>
      </div>

      <footer className="mt-stack-lg flex flex-col md:flex-row items-center justify-between p-6 bg-surface-container rounded-xl gap-4">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-white rounded-lg">
            <Icon icon="verified_user" className="text-primary" />
          </div>
          <div>
            <h4 className="font-label-md text-label-md">Medical Disclaimer</h4>
            <p className="text-caption text-secondary">
              This analysis is AI-driven and for informational purposes only. In case of emergency, call local medical services immediately.
            </p>
          </div>
        </div>
        <button className="w-full md:w-auto px-10 py-4 bg-primary text-white rounded-full font-label-md text-label-md flex items-center justify-center gap-2 hover:bg-on-primary-fixed-variant transition-all transform active:scale-95 shadow-lg shadow-primary/20">
          <Icon icon="add" />
          Start New Triage
        </button>
      </footer>
    </main>
  )
}
