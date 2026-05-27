import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Icon from '../components/Icon'
import { usePersistState } from '../hooks/usePersistState'

export default function SymptomTracker() {
  const navigate = useNavigate()
  const [severity, setSeverity] = useState<string | null>(null)
  const [symptomName, setSymptomName] = useState('')
  const [timelineEntries, setTimelineEntries] = usePersistState<{ date: string; label: string; severity: string; severityClass: string; dotClass: string }[]>('doctarr_symptoms', [])

  const handleSaveEntry = () => {
    if (!symptomName.trim()) return
    const now = new Date()
    const dateStr = now.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) + ', ' + now.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true })
    const sev = severity || 'Mild'
    const classes: Record<string, { severityClass: string, dotClass: string }> = {
      Mild: { severityClass: 'bg-secondary-container text-secondary', dotClass: 'bg-on-secondary-container' },
      Moderate: { severityClass: 'bg-primary/10 text-primary', dotClass: 'bg-primary' },
      Severe: { severityClass: 'bg-error/10 text-error', dotClass: 'bg-error' },
    }
    setTimelineEntries(prev => [...prev, { date: dateStr, label: symptomName, severity: sev, ...classes[sev] }])
    setSymptomName('')
    setSeverity(null)
  }

  return (
    <main className="min-h-screen p-4 md:p-6 max-w-[1200px] mx-auto font-body-md bg-[#F7F8FF]">
      <div className="bg-gradient-blob bg-primary/15 w-[500px] h-[500px] fixed -top-64 -right-64 rounded-full blur-[80px] -z-10" />
      <div className="bg-gradient-blob bg-secondary/15 w-[400px] h-[400px] fixed bottom-0 -left-48 rounded-full blur-[80px] -z-10" />

      <header className="mb-stack-lg flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="font-headline-lg text-headline-lg text-on-surface">Symptom Tracker</h1>
          <p className="text-secondary font-body-md">Monitor your daily health and visualize trends over time.</p>
        </div>
        <div className="flex items-center gap-stack-sm bg-white p-2 rounded-xl border border-outline-variant/30 shadow-sm">
          <Icon icon="calendar_month" className="text-primary" />
          <span className="font-label-md text-label-md pr-2">Today</span>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter">
        <section className="lg:col-span-12 bg-white rounded-[16px] border border-outline-variant/30 shadow-sm p-stack-lg">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-primary-container flex items-center justify-center text-white">
              <Icon icon="edit_note" />
            </div>
            <h2 className="font-headline-md text-headline-md">New Log Entry</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-stack-lg">
            <div className="space-y-4">
              <label className="font-label-md block text-secondary">WHAT ARE YOU FEELING?</label>
              <input
                className="w-full h-14 px-4 rounded-lg bg-surface-container-low border border-outline-variant focus:border-primary focus:ring-0 outline-none transition-all placeholder:text-outline-variant/60 font-body-md"
                placeholder="e.g., Migraine, Chest Tightness, Fatigue"
                type="text"
                value={symptomName}
                onChange={(e) => setSymptomName(e.target.value)}
              />
            </div>
            <div className="space-y-4">
              <label className="font-label-md block text-secondary">SEVERITY LEVEL</label>
              <div className="flex gap-2">
                {['Mild', 'Moderate', 'Severe'].map((s) => (
                  <button
                    key={s}
                    onClick={() => setSeverity(s)}
                    className={
                      'flex-1 py-3 px-4 rounded-full border transition-all font-label-md ' +
                      (severity === s
                        ? 'bg-primary text-white border-primary'
                        : 'border-outline-variant hover:border-primary')
                    }
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          </div>
          <div className="mt-8 flex justify-end">
            <button onClick={handleSaveEntry} className="bg-primary text-white font-label-md px-8 py-4 rounded-full hover:bg-opacity-90 transition-transform active:scale-95 flex items-center gap-2">
              <span>Save Entry</span>
              <Icon icon="arrow_forward" />
            </button>
          </div>
        </section>

        <section className="lg:col-span-8 bg-white rounded-[16px] border border-outline-variant/30 shadow-sm p-stack-lg flex flex-col">
          <div className="flex items-center justify-between mb-8">
            <h2 className="font-headline-md text-headline-md">30-Day Severity Trend</h2>
            <span className="flex items-center gap-1 text-caption text-secondary">
              <span className="w-3 h-3 rounded-full bg-primary" /> Severity
            </span>
          </div>
          <div className="flex-1 min-h-[300px] relative mt-4">
            <svg className="w-full h-full" viewBox="0 0 800 300">
              <line stroke="#E5E7EB" strokeDasharray="4" x1="0" x2="800" y1="50" y2="50" />
              <line stroke="#E5E7EB" strokeDasharray="4" x1="0" x2="800" y1="150" y2="150" />
              <line stroke="#E5E7EB" strokeDasharray="4" x1="0" x2="800" y1="250" y2="250" />
              <text className="text-[10px] fill-secondary font-label-md uppercase" x="5" y="45">Severe</text>
              <text className="text-[10px] fill-secondary font-label-md uppercase" x="5" y="145">Moderate</text>
              <text className="text-[10px] fill-secondary font-label-md uppercase" x="5" y="245">Mild</text>
            </svg>
          </div>
          <div className="flex justify-between mt-6 text-caption text-secondary px-2">
            <span>30 Days Ago</span>
            <span>15 Days Ago</span>
            <span>Today</span>
          </div>
        </section>

        <section className="lg:col-span-4 bg-white rounded-[16px] border border-outline-variant/30 shadow-sm overflow-hidden flex flex-col h-full">
          <div className="p-stack-lg border-b border-outline-variant/30">
            <h2 className="font-headline-md text-headline-md">Past Entries</h2>
          </div>
          <div className="flex-1 overflow-y-auto max-h-[480px] p-stack-lg space-y-6">
            {timelineEntries.length === 0 ? (
              <p className="text-secondary font-body-md text-center py-8">No entries yet. Log your first symptom above.</p>
            ) : (
              timelineEntries.map((entry, i) => (
                <div key={i} className="relative pl-8 border-l-2 border-outline-variant">
                  <div className={`absolute left-[-9px] top-0 w-4 h-4 rounded-full ${entry.dotClass} border-4 border-white shadow-sm`} />
                  <div className="flex flex-col gap-1">
                    <span className="font-label-md text-caption text-secondary uppercase">{entry.date}</span>
                    <div className="flex items-center justify-between">
                      <h3 className="font-body-md font-bold text-on-surface">{entry.label}</h3>
                      <span className={`font-label-md text-[12px] px-2 py-0.5 rounded-full uppercase ${entry.severityClass}`}>
                        {entry.severity}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </section>

        <section onClick={() => navigate('/symptom-tracker-body-map')} className="lg:col-span-12 relative h-48 rounded-[16px] overflow-hidden group cursor-pointer">
          <img
            alt="AI Health Analysis"
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuAKXdX56RArmULZK_NoQ0L99HNEH3Smr4pCogZr1zloxe29vQZoB26L8Iu78idg7ZwHHUDKRyrKxSMcQWXPY2GAyGcUU_L5ikTUELOgPKOWXEE9Tb7l9pndYlQwpmnKXA5JJdpiAQwriLBBeAT0YoPgHW3irIWbiaGoOPswqOnYqvrc4_ts2NWwIzdymky9Sr03DYK7taoPrRNvjZihhWh501vmdR2fLafOADCKSzevfmE2SFGH3N4vyy5sxGrLAqa6CZyr0Qwj3n4"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-primary/90 to-transparent flex items-center p-stack-lg">
            <div className="max-w-md text-white">
              <h3 className="font-headline-md text-headline-md mb-2">AI Health Insights</h3>
              <p className="font-body-md opacity-90">
                Start logging your symptoms to unlock AI-powered health insights and trends.
              </p>
            </div>
          </div>
        </section>
      </div>
    </main>
  )
}
