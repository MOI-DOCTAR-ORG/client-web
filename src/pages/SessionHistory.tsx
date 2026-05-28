import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import Icon from '../components/Icon'

const filters = ['All Sessions', 'Low', 'Moderate', 'High']

const severityConfig: Record<string, { severityClass: string; severityIcon: string }> = {
  Urgent: { severityClass: 'bg-error text-on-error dark:bg-red-900 dark:text-red-200', severityIcon: 'warning' },
  Moderate: { severityClass: 'bg-tertiary-fixed text-tertiary dark:bg-amber-900/40 dark:text-amber-300', severityIcon: 'info' },
  Stable: { severityClass: 'bg-secondary-container text-secondary dark:bg-slate-700 dark:text-slate-300', severityIcon: 'check_circle' },
}

export default function SessionHistory() {
  const navigate = useNavigate()
  const { sessions } = useAuth()
  const [activeFilter, setActiveFilter] = useState('All Sessions')
  const [currentPage, setCurrentPage] = useState(1)

  const urgentCount = sessions.filter((s) => s.severity === 'Urgent').length

  return (
    <main className="min-h-screen flex flex-col relative bg-surface p-4 md:p-6">
      <div className="bg-blob bg-primary/10 fixed top-[-200px] right-[-200px] w-[600px] h-[600px] rounded-full blur-[120px] -z-10" />
      <div className="bg-blob bg-secondary-container/10 fixed bottom-[-100px] left-[-100px] w-[600px] h-[600px] rounded-full blur-[120px] -z-10" />

      <header className="flex justify-between items-center w-full px-gutter h-20 sticky top-0 bg-surface/80 backdrop-blur-md z-40">
        <h2 className="font-headline-md text-headline-md text-primary">Your Triage History</h2>
        <div className="flex items-center gap-4">
          <button onClick={() => navigate('/notifications')} className="hover:bg-surface-variant rounded-full p-2 transition-all text-secondary">
            <Icon icon="notifications" />
          </button>
          <div className="w-10 h-10 rounded-full border border-primary/20 overflow-hidden bg-surface-container">
            <img
              alt="User"
              className="w-full h-full object-cover"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuAKXdX56RArmULZK_NoQ0L99HNEH3Smr4pCogZr1zloxe29vQZoB26L8Iu78idg7ZwHHUDKRyrKxSMcQWXPY2GAyGcUU_L5ikTUELOgPKOWXEE9Tb7l9pndYlQwpmnKXA5JJdpiAQwriLBBeAT0YoPgHW3irIWbiaGoOPswqOnYqvrc4_ts2NWwIzdymky9Sr03DYK7taoPrRNvjZihhWh501vmdR2fLafOADCKSzevfmE2SFGH3N4vyy5sxGrLAqa6CZyr0Qwj3n4"
            />
          </div>
        </div>
      </header>

      <section className="max-w-container-max-width w-full mx-auto px-gutter py-stack-lg">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-10">
          <div className="overflow-x-auto w-full md:w-auto"><div className="flex p-1 bg-surface-container-low rounded-full border border-outline-variant/30 w-max">
            {filters.map((f) => (
              <button
                key={f}
                onClick={() => setActiveFilter(f)}
                className={
                  activeFilter === f
                    ? 'px-6 py-2 rounded-full font-label-md text-label-md bg-primary text-on-primary transition-all shadow-sm'
                    : 'px-6 py-2 rounded-full font-label-md text-label-md text-secondary hover:text-primary transition-all'
                }
              >
                {f}
              </button>
            ))}
          </div></div>
          <div className="flex gap-4 flex-wrap">
            <div className="px-5 py-3 bg-surface-container-high dark:bg-slate-800 rounded-xl border border-outline-variant/30 flex flex-col">
              <span className="font-caption text-caption text-secondary uppercase tracking-wider">Total Triage</span>
              <span className="font-headline-md text-headline-md text-primary">{sessions.length}</span>
            </div>
            <div className="px-5 py-3 bg-error-container/30 rounded-xl border border-error/10 flex flex-col">
              <span className="font-caption text-caption text-error uppercase tracking-wider">Urgent Alerts</span>
              <span className="font-headline-md text-headline-md text-error">{urgentCount}</span>
            </div>
          </div>
        </div>

        {sessions.length === 0 ? (
          <div className="bg-surface-container-lowest rounded-2xl border border-dashed border-outline-variant/50 p-14 text-center">
            <div className="w-20 h-20 mx-auto mb-5 bg-surface-container-low rounded-full flex items-center justify-center text-secondary">
              <Icon icon="history" className="text-4xl" />
            </div>
            <h3 className="font-headline-md text-headline-md text-on-surface mb-2">No triage history</h3>
            <p className="font-body-md text-body-md text-secondary max-w-md mx-auto mb-6">
              Your completed triage sessions will appear here. Start a new session to begin.
            </p>
            <button onClick={() => navigate('/new-triage')} className="inline-flex items-center gap-2 bg-primary text-on-primary px-6 py-3 rounded-full font-label-md text-label-md hover:bg-primary/90 transition-colors">
              <Icon icon="add" />
              Start New Triage
            </button>
          </div>
        ) : (
          <div className="space-y-stack-md">
            {sessions.map((s) => {
              const config = severityConfig[s.severity] || { severityClass: 'bg-surface-container text-secondary', severityIcon: 'info' }
              return (
                <div
                  key={s.id}
                  className="bg-surface-container-lowest p-6 rounded-xl border border-outline-variant/50 flex flex-col lg:flex-row items-start lg:items-center gap-6 transition-all duration-200 hover:-translate-y-1 hover:shadow-lg hover:shadow-black/5"
                >
                  <div className="flex flex-col min-w-[120px]">
                    <span className="font-label-md text-label-md text-primary">{s.date}</span>
                    <span className="font-caption text-caption text-secondary">{s.time}</span>
                  </div>
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-3 mb-2">
                      <span className="px-3 py-1 bg-surface-container rounded-full text-primary font-label-md text-label-md">
                        {s.condition}
                      </span>
                      <span className={`px-3 py-1 rounded-full font-label-md text-label-md flex items-center gap-1 ${config.severityClass}`}>
                        <Icon icon={config.severityIcon} className="text-[14px]" />
                        {s.severity}
                      </span>
                    </div>
                    <p className="text-on-surface-variant font-body-md line-clamp-1">
                      {s.description}
                    </p>
                  </div>
                  <div className="flex items-center gap-4 w-full lg:w-auto">
                    <button onClick={() => navigate('/care-details')} className="flex-1 lg:flex-none px-6 py-3 border border-primary text-primary font-label-md text-label-md rounded-full hover:bg-primary-fixed transition-colors">
                      View Details
                    </button>
                  </div>
                </div>
              )
            })}
          </div>
        )}

        {sessions.length > 0 && (
          <div className="mt-12 flex justify-center">
            <nav className="flex items-center gap-2">
              <button
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                className="w-10 h-10 flex items-center justify-center rounded-lg hover:bg-surface-container transition-colors text-secondary"
              >
                <Icon icon="chevron_left" />
              </button>
              {[1, 2, 3].map((p) => (
                <button
                  key={p}
                  onClick={() => setCurrentPage(p)}
                  className={
                    currentPage === p
                      ? 'w-10 h-10 flex items-center justify-center rounded-lg bg-primary text-on-primary font-label-md text-label-md'
                      : 'w-10 h-10 flex items-center justify-center rounded-lg hover:bg-surface-container transition-colors font-label-md text-label-md'
                  }
                >
                  {p}
                </button>
              ))}
              <button
                onClick={() => setCurrentPage(Math.min(3, currentPage + 1))}
                className="w-10 h-10 flex items-center justify-center rounded-lg hover:bg-surface-container transition-colors text-secondary"
              >
                <Icon icon="chevron_right" />
              </button>
            </nav>
          </div>
        )}
      </section>

      <section className="max-w-container-max-width w-full mx-auto px-gutter pb-stack-lg grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 p-8 bg-primary text-on-primary rounded-2xl relative overflow-hidden group">
          <div className="relative z-10">
            <h3 className="font-headline-md text-headline-md mb-2">Improve Your Triage Accuracy</h3>
            <p className="opacity-80 font-body-md max-w-lg mb-6">
              Completing your medical profile helps our AI provide better context for every session you start.
            </p>
            <button onClick={() => navigate('/profile')} className="bg-surface-container-lowest text-primary px-6 py-3 rounded-full font-label-md text-label-md hover:scale-105 transition-transform">
              Complete Profile
            </button>
          </div>
          <div className="absolute right-[-40px] bottom-[-40px] opacity-20 group-hover:rotate-12 transition-transform duration-700">
            <Icon icon="health_and_safety" className="text-[200px]" />
          </div>
        </div>
        <div className="p-8 bg-surface-container-high rounded-2xl border border-outline-variant/30">
          <h3 className="font-label-md text-label-md text-primary uppercase mb-4">Latest Health Tip</h3>
          <p className="font-headline-md text-headline-md text-on-surface mb-2">Hydration & Focus</p>
          <p className="text-on-surface-variant font-body-md">
            Drinking 500ml of water within 30 mins of waking up improves cognitive baseline by 14%.
          </p>
        </div>
      </section>
    </main>
  )
}
