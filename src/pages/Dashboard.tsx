import { useState, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import Icon from '../components/Icon'
import ReminderBanner from '../components/ReminderBanner'
import SessionGrid from '../components/SessionGrid'
import QuickActions from '../components/QuickActions'
import { scopeKey } from '../utils/storage'
import { getUserInitials } from '../utils/getUserInitials'

const greeting = () => {
  const h = new Date().getHours()
  if (h < 12) return 'Good morning'
  if (h < 17) return 'Good afternoon'
  return 'Good evening'
}

export default function Dashboard() {
  const navigate = useNavigate()
  const { sessions, addSession } = useAuth()

  const [feeling, setFeeling] = useState('')
  const [mood, setMood] = useState<string | null>(null)
  const [savedToday, setSavedToday] = useState(false)

  const moods = [
    { label: 'Great', icon: 'sentiment_very_satisfied', color: 'text-green-500' },
    { label: 'Okay', icon: 'sentiment_neutral', color: 'text-amber-500' },
    { label: 'Unwell', icon: 'sentiment_dissatisfied', color: 'text-error' },
  ]

  const medCount = useMemo(() => {
    try {
      const data = localStorage.getItem(scopeKey('doctarr_prescriptions'))
      return data ? JSON.parse(data).length : 0
    } catch { return 0 }
  }, [])

  const daysSinceFirstSession = useMemo(() => {
    if (sessions.length === 0) return 0
    const dates = sessions.map(s => new Date(s.date).getTime()).filter(t => !isNaN(t))
    if (dates.length === 0) return 0
    const first = Math.min(...dates)
    return Math.max(1, Math.floor((Date.now() - first) / 86400000))
  }, [sessions])

  const wellnessScore = useMemo(() => {
    if (sessions.length === 0) return null
    const severityValues: Record<string, number> = { Urgent: 30, Moderate: 60, Stable: 90 }
    const scores = sessions.map(s => severityValues[s.severity] || 50)
    return Math.round(scores.reduce((a, b) => a + b, 0) / scores.length)
  }, [sessions])

  const saveCheckIn = () => {
    if (!mood) return
    addSession({
      id: 'sess-' + Date.now(),
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
      condition: `Daily check-in: ${mood}`,
      description: `Feeling ${mood.toLowerCase()}. ${feeling || 'No additional notes.'}`,
      severity: mood === 'Unwell' ? 'Moderate' : 'Stable',
      statusLabel: 'Logged',
      statusIcon: 'check_circle',
    })
    setSavedToday(true)
  }

  return (
    <main className="min-h-screen p-4 md:p-gutter max-w-[1400px] mx-auto flex flex-col gap-6">
      <header className="flex justify-between items-center">
        <div>
          <h2 className="font-headline-lg text-headline-lg text-on-surface">{greeting()}</h2>
          <p className="font-body-md text-secondary">Here is your health overview for today.</p>
        </div>
        <button onClick={() => navigate('/profile')} className="w-10 h-10 rounded-full bg-primary-container text-white flex items-center justify-center font-bold hover:opacity-80 transition-opacity">
          {getUserInitials()}
        </button>
      </header>

      <ReminderBanner />

      {!savedToday ? (
        <div className="bg-surface-container-lowest rounded-xl px-4 py-3 border border-outline-variant/30 shadow-level-1">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-7 h-7 rounded-full bg-primary-container flex items-center justify-center text-primary">
              <Icon icon="favorite" size="sm" />
            </div>
            <h3 className="text-sm font-semibold">How are you feeling today?</h3>
          </div>
          <div className="flex gap-1.5 mb-2">
            {moods.map(m => (
              <button key={m.label} onClick={() => setMood(m.label)} className={`flex items-center gap-1 px-3 py-1.5 rounded-full border text-xs font-medium transition-all ${mood === m.label ? 'border-primary bg-primary/5' : 'border-outline-variant hover:border-primary'}`}>
                <Icon icon={m.icon} size="sm" className={m.color} />
                {m.label}
              </button>
            ))}
          </div>
          <div className="flex gap-1.5">
            <input className="flex-1 bg-surface-container-low border border-outline-variant rounded-full px-3 py-1.5 text-xs outline-none focus:border-primary" placeholder="Any notes?" value={feeling} onChange={e => setFeeling(e.target.value)} onKeyDown={e => { if (e.key === 'Enter') saveCheckIn() }} />
            <button onClick={saveCheckIn} disabled={!mood} className="bg-primary text-white px-4 py-1.5 rounded-full text-xs font-semibold hover:bg-primary/90 transition-all disabled:opacity-40 flex items-center gap-1">
              <Icon icon="check" size="sm" />
              Save
            </button>
          </div>
        </div>
      ) : (
        <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-[20px] p-5 flex items-center gap-4">
          <div className="w-10 h-10 rounded-full bg-green-100 dark:bg-green-800/40 flex items-center justify-center text-green-600 dark:text-green-300">
            <Icon icon="check_circle" size="lg" className="icon-fill" />
          </div>
          <p className="font-body-md text-green-800 dark:text-green-200">Today's check-in saved! Feeling <strong>{mood?.toLowerCase()}</strong>.</p>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-blue-700 rounded-[24px] p-8 md:p-10 text-on-primary shadow-level-2 relative overflow-hidden flex flex-col justify-between min-h-[260px]">
          <div className="relative z-10 max-w-md">
            <div className="inline-flex items-center gap-2 bg-surface-container-lowest/20 backdrop-blur-sm rounded-full px-4 py-1.5 mb-6 border border-white/10">
              <Icon icon="verified_user" size="sm" />
              <span className="text-sm font-medium tracking-wide">AI-Powered Assessment</span>
            </div>
            <h3 className="font-headline-lg text-headline-lg mb-3">Feeling unwell?</h3>
            <p className="font-body-md text-body-md text-primary-fixed-dim mb-6 opacity-90 leading-relaxed">
              Start a new triage session to evaluate your symptoms instantly and receive medical-grade guidance on your next steps.
            </p>
          </div>
          <div className="relative z-10">
            <button onClick={() => navigate('/new-triage')} className="bg-surface-container-lowest text-primary hover:bg-surface-container-lowest rounded-full px-8 py-3.5 font-label-md text-label-md transition-all shadow-lg flex items-center gap-2 hover:scale-[1.02] active:scale-[0.98] w-fit">
              <Icon icon="add_circle" size="md" className="icon-fill" />
              Start New Triage
            </button>
          </div>
        </div>

        <div className="bg-surface-container-lowest rounded-[24px] p-6 border border-outline-variant/30 shadow-level-1 flex flex-col justify-between min-h-[260px]">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h3 className="font-headline-md text-headline-md text-on-surface">Wellness Score</h3>
              <p className="text-sm text-secondary mt-1">{wellnessScore !== null ? 'Average across all sessions' : '7-Day Trend'}</p>
            </div>
            <div className="w-10 h-10 rounded-full bg-surface-container-low flex items-center justify-center text-primary">
              <Icon icon={wellnessScore !== null && wellnessScore >= 70 ? 'trending_up' : wellnessScore !== null ? 'trending_flat' : 'trending_up'} size="lg" />
            </div>
          </div>
          <div className="flex items-end gap-2 mb-4">
            <span className="text-4xl font-extrabold text-on-surface tracking-tight">{wellnessScore !== null ? wellnessScore : '--'}</span>
          </div>
          <div className="w-full h-24 mt-auto relative">
            <div className="absolute inset-0 flex flex-col justify-between pointer-events-none">
              <div className="border-b border-dashed border-outline-variant/30 w-full h-[1px]" />
              <div className="border-b border-dashed border-outline-variant/30 w-full h-[1px]" />
              <div className="border-b border-dashed border-outline-variant/30 w-full h-[1px]" />
            </div>
            {sessions.length === 0 ? (
              <div className="w-full h-full flex items-center justify-center text-secondary text-sm">No data yet</div>
            ) : (
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
                <circle cx="200" cy="10" fill="#001bd4" r="5" stroke="white" strokeWidth="2" />
              </svg>
            )}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-surface-container-lowest rounded-[16px] p-5 border border-outline-variant/30 shadow-level-1 flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-surface-container flex items-center justify-center text-primary flex-shrink-0">
            <Icon icon="forum" size="xl" className="icon-fill" />
          </div>
          <div>
            <p className="text-sm font-medium text-secondary">Total Sessions</p>
            <p className="text-2xl font-bold text-on-surface">{sessions.length}</p>
          </div>
        </div>
        <div className="bg-surface-container-lowest rounded-[16px] p-5 border border-outline-variant/30 shadow-level-1 flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-surface-container flex items-center justify-center text-primary flex-shrink-0">
            <Icon icon="vaccines" size="xl" className="icon-fill" />
          </div>
          <div>
            <p className="text-sm font-medium text-secondary">Active Medications</p>
            <p className="text-2xl font-bold text-on-surface">{medCount}</p>
          </div>
        </div>
        <div className="bg-surface-container-lowest rounded-[16px] p-5 border border-outline-variant/30 shadow-level-1 flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-surface-container flex items-center justify-center text-primary flex-shrink-0">
            <Icon icon="calendar_today" size="xl" className="icon-fill" />
          </div>
          <div>
            <p className="text-sm font-medium text-secondary">Days Monitored</p>
            <p className="text-2xl font-bold text-on-surface">{daysSinceFirstSession}</p>
          </div>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
        <h3 className="font-headline-md text-headline-md text-on-surface">Recent Sessions</h3>
        {sessions.length > 0 && (
          <button onClick={() => navigate('/history')} className="text-primary font-label-md flex items-center gap-1 hover:gap-2 transition-all">
            See all activity{' '}
            <Icon icon="arrow_forward" size="sm" />
          </button>
        )}
      </div>

      <SessionGrid />
      <QuickActions />
    </main>
  )
}
