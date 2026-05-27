import Icon from '../components/Icon'

const sessions = [
  {
    urgency: 'High',
    color: 'bg-error',
    bg: 'bg-error-container',
    text: 'text-on-error-container',
    icon: 'warning',
    label: 'High',
    title: 'Severe Chest Pain',
    desc: 'Radiating pain to left arm, shortness of breath, nausea.',
    action: 'ER Advised',
    actionIcon: 'stethoscope',
    date: 'Oct 24, 09:15 AM',
  },
  {
    urgency: 'Moderate',
    color: 'bg-amber-400',
    bg: 'bg-amber-100',
    text: 'text-amber-800',
    icon: 'info',
    label: 'Moderate',
    title: 'Persistent Migraine',
    desc: 'Throbbing pain on right side, sensitivity to light, lasting over 24 hours.',
    action: 'See PCP',
    actionIcon: 'medication',
    date: 'Oct 22, 14:30 PM',
  },
  {
    urgency: 'Low',
    color: 'bg-green-500',
    bg: 'bg-green-100',
    text: 'text-green-800',
    icon: 'check_circle',
    label: 'Low',
    title: 'Mild Sore Throat',
    desc: 'Scratchy throat, no fever, slight cough starting yesterday.',
    action: 'Self-Care',
    actionIcon: 'home',
    date: 'Oct 18, 08:00 AM',
  },
]

export default function Dashboard2() {
  return (
    <main className="pt-6 md:pt-24 pb-12 p-4 md:px-gutter max-w-container-max-width mx-auto flex flex-col gap-8">
      <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 flex flex-col sm:flex-row items-start sm:items-center gap-4 shadow-sm relative overflow-hidden">
        <div className="absolute left-0 top-0 bottom-0 w-1 bg-amber-400" />
        <div className="flex-shrink-0 text-amber-600 bg-amber-100 rounded-full p-2">
          <Icon icon="assignment_late" className="icon-fill" />
        </div>
        <div className="flex-1">
          <p className="font-label-md text-label-md text-amber-900">Follow-up Required</p>
          <p className="text-sm text-amber-700 mt-1">Please complete the symptom diary for your recent 'Moderate Migraine' triage session.</p>
        </div>
        <button className="mt-3 sm:mt-0 px-4 py-2 bg-amber-100 hover:bg-amber-200 text-amber-800 rounded-full font-label-md text-label-md transition-colors whitespace-nowrap">
          Complete Now
        </button>
      </div>

      <header>
        <h2 className="font-headline-xl text-headline-xl text-on-surface">Good morning, Alex</h2>
        <p className="font-body-lg text-body-lg text-secondary mt-1">Here is your health overview for today.</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-gradient-to-br from-primary to-primary-container rounded-[24px] p-8 md:p-10 text-on-primary shadow-level-2 relative overflow-hidden flex flex-col justify-between min-h-[280px]">
          <div className="absolute top-[-50%] right-[-10%] w-[300px] h-[300px] bg-white/10 rounded-full blur-[40px]" />
          <div className="absolute bottom-[-20%] left-[-10%] w-[200px] h-[200px] bg-black/10 rounded-full blur-[40px]" />
          <div className="relative z-10 max-w-md">
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-1.5 mb-6 border border-white/10">
              <Icon icon="verified_user" className="text-[18px]" />
              <span className="text-sm font-medium tracking-wide">AI-Powered Assessment</span>
            </div>
            <h3 className="font-headline-lg text-headline-lg mb-3">Feeling unwell?</h3>
            <p className="font-body-md text-body-md text-primary-fixed-dim mb-8 opacity-90 leading-relaxed">
              Start a new triage session to evaluate your symptoms instantly and receive medical-grade guidance on your next steps.
            </p>
          </div>
          <div className="relative z-10 flex gap-4 mt-auto">
            <button className="bg-white text-primary hover:bg-surface-container-lowest rounded-full px-8 py-3.5 font-label-md text-label-md transition-all shadow-lg flex items-center gap-2 hover:scale-[1.02] active:scale-[0.98]">
              <Icon icon="add_circle" className="icon-fill" />
              Start New Triage
            </button>
          </div>
        </div>

        <div className="bg-surface-container-lowest rounded-[24px] p-6 border border-[#E5E7EB] shadow-level-1 flex flex-col justify-between min-h-[280px]">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h3 className="font-headline-md text-headline-md text-on-surface">Wellness Score</h3>
              <p className="text-sm text-secondary mt-1">7-Day Trend</p>
            </div>
            <div className="w-10 h-10 rounded-full bg-surface-container-low flex items-center justify-center text-primary">
              <Icon icon="trending_up" />
            </div>
          </div>
          <div className="flex items-end gap-2 mb-4">
            <span className="text-4xl font-extrabold text-on-surface tracking-tight">84</span>
            <span className="text-sm font-medium text-green-600 bg-green-50 px-2 py-0.5 rounded-full mb-1 flex items-center gap-1">
              <Icon icon="arrow_upward" className="text-[14px]" /> 4%
            </span>
          </div>
          <div className="w-full h-24 mt-auto relative">
            <div className="absolute inset-0 flex flex-col justify-between pointer-events-none">
              <div className="border-b border-dashed border-outline-variant/30 w-full h-[1px]" />
              <div className="border-b border-dashed border-outline-variant/30 w-full h-[1px]" />
              <div className="border-b border-dashed border-outline-variant/30 w-full h-[1px]" />
            </div>
            <svg className="w-full h-full overflow-visible drop-shadow-md" viewBox="0 0 200 60">
              <defs>
                <linearGradient id="lineGradient2" x1="0%" x2="100%" y1="0%" y2="0%">
                  <stop offset="0%" stopColor="#3143f4" stopOpacity="0.4" />
                  <stop offset="100%" stopColor="#001bd4" stopOpacity="1" />
                </linearGradient>
                <linearGradient id="areaGradient2" x1="0%" x2="0%" y1="0%" y2="100%">
                  <stop offset="0%" stopColor="#001bd4" stopOpacity="0.15" />
                  <stop offset="100%" stopColor="#001bd4" stopOpacity="0" />
                </linearGradient>
              </defs>
              <path d="M 0,50 C 20,45 40,55 60,40 S 100,20 120,30 S 160,40 180,20 L 200,10 L 200,60 L 0,60 Z" fill="url(#areaGradient2)" />
              <path d="M 0,50 C 20,45 40,55 60,40 S 100,20 120,30 S 160,40 180,20 L 200,10" fill="none" stroke="url(#lineGradient2)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" />
              <circle cx="120" cy="30" fill="white" r="4" stroke="#001bd4" strokeWidth="2" />
              <circle cx="180" cy="20" fill="white" r="4" stroke="#001bd4" strokeWidth="2" />
              <circle cx="200" cy="10" fill="#001bd4" r="5" stroke="white" strokeWidth="2" />
            </svg>
          </div>
        </div>

        <div className="lg:col-span-3 grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="bg-surface-container-lowest rounded-[16px] p-5 border border-[#E5E7EB] shadow-level-1 flex items-center gap-4 hover:-translate-y-1 transition-transform duration-300 cursor-default">
            <div className="w-12 h-12 rounded-full bg-surface-container flex items-center justify-center text-primary flex-shrink-0">
              <Icon icon="forum" className="icon-fill" />
            </div>
            <div>
              <p className="text-sm font-medium text-secondary">Total Sessions</p>
              <p className="text-2xl font-bold text-on-surface">12</p>
            </div>
          </div>
          <div className="bg-surface-container-lowest rounded-[16px] p-5 border border-[#E5E7EB] shadow-level-1 flex items-center gap-4 hover:-translate-y-1 transition-transform duration-300 cursor-default">
            <div className="w-12 h-12 rounded-full bg-surface-container flex items-center justify-center text-primary flex-shrink-0">
              <Icon icon="vaccines" className="icon-fill" />
            </div>
            <div>
              <p className="text-sm font-medium text-secondary">Active Medications</p>
              <p className="text-2xl font-bold text-on-surface">3</p>
            </div>
          </div>
          <div className="bg-surface-container-lowest rounded-[16px] p-5 border border-[#E5E7EB] shadow-level-1 flex items-center gap-4 hover:-translate-y-1 transition-transform duration-300 cursor-default">
            <div className="w-12 h-12 rounded-full bg-surface-container flex items-center justify-center text-primary flex-shrink-0">
              <Icon icon="calendar_today" className="icon-fill" />
            </div>
            <div>
              <p className="text-sm font-medium text-secondary">Days Monitored</p>
              <p className="text-2xl font-bold text-on-surface">24</p>
            </div>
          </div>
        </div>
      </div>

      <section className="mt-4">
        <div className="flex justify-between items-end mb-6">
          <h3 className="font-headline-md text-headline-md text-on-surface">Recent Triage Sessions</h3>
          <a className="font-label-md text-label-md text-primary hover:underline flex items-center gap-1" href="#">
            View All <Icon icon="arrow_forward" className="text-[16px]" />
          </a>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sessions.map((s, i) => (
            <div key={i} className="bg-surface-container-lowest rounded-[16px] p-6 border border-[#E5E7EB] shadow-level-1 flex flex-col gap-4 relative overflow-hidden group">
              <div className={`absolute top-0 left-0 w-full h-1 ${s.color}`} />
              <div className="flex justify-between items-start">
                <div className={`${s.bg} ${s.text} px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider inline-flex items-center gap-1`}>
                  <Icon icon={s.icon} className="text-[14px]" /> {s.label}
                </div>
                <span className="text-xs text-secondary font-medium">{s.date}</span>
              </div>
              <div>
                <h4 className="font-headline-md text-lg text-on-surface mb-1">{s.title}</h4>
                <p className="text-sm text-secondary line-clamp-2">{s.desc}</p>
              </div>
              <div className="mt-auto pt-4 border-t border-outline-variant/30 flex justify-between items-center">
                <span className="text-sm font-medium text-on-surface-variant flex items-center gap-1">
                  <Icon icon={s.actionIcon} className="text-[16px]" /> {s.action}
                </span>
                <button className="w-8 h-8 rounded-full bg-surface-container flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                  <Icon icon="chevron_right" className="text-[18px]" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  )
}
