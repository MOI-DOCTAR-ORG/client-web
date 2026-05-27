import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import Icon from '../components/Icon'
import ReminderBanner from '../components/ReminderBanner'
import SessionGrid from '../components/SessionGrid'
import QuickActions from '../components/QuickActions'

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
          <h2 className="font-headline-lg text-headline-lg text-on-surface">Good morning</h2>
          <p className="font-body-md text-secondary">Here is your health overview for today.</p>
        </div>
      </header>

      <ReminderBanner />

      {/* Quick Check-in */}
      {!savedToday ? (
        <div className="bg-surface-container-lowest rounded-[20px] p-6 border border-outline-variant/30 shadow-level-1">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-primary-container flex items-center justify-center text-primary">
              <Icon icon="favorite" />
            </div>
            <h3 className="font-headline-md text-headline-md">How are you feeling today?</h3>
          </div>
          <div className="flex gap-3 mb-4">
            {moods.map(m => (
              <button key={m.label} onClick={() => setMood(m.label)} className={`flex items-center gap-2 px-5 py-3 rounded-full border-2 font-label-md transition-all ${mood === m.label ? 'border-primary bg-primary/5' : 'border-outline-variant hover:border-primary'}`}>
                <Icon icon={m.icon} className={`text-[22px] ${m.color}`} />
                {m.label}
              </button>
            ))}
          </div>
          <div className="flex gap-3">
            <input className="flex-1 bg-surface-container-low border border-outline-variant rounded-full px-5 py-3 font-body-md outline-none focus:border-primary" placeholder="Any notes about how you feel?" value={feeling} onChange={e => setFeeling(e.target.value)} />
            <button onClick={saveCheckIn} disabled={!mood} className="bg-primary text-white px-8 py-3 rounded-full font-label-md hover:bg-primary/90 transition-all disabled:opacity-40 flex items-center gap-2">
              <Icon icon="check" />
              Save
            </button>
          </div>
        </div>
      ) : (
        <div className="bg-green-50 border border-green-200 rounded-[20px] p-5 flex items-center gap-4">
          <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-green-600">
            <Icon icon="check_circle" className="icon-fill" />
          </div>
          <p className="font-body-md text-green-800">Today's check-in saved! Feeling <strong>{mood?.toLowerCase()}</strong>.</p>
        </div>
      )}

      {/* Hero + Wellness Score */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-gradient-to-br from-primary to-primary-container rounded-[24px] p-8 md:p-10 text-on-primary shadow-level-2 relative overflow-hidden flex flex-col justify-between min-h-[260px]">
          <div className="absolute top-[-50%] right-[-10%] w-[300px] h-[300px] bg-white/10 rounded-full blur-[40px]" />
          <div className="absolute bottom-[-20%] left-[-10%] w-[200px] h-[200px] bg-black/10 rounded-full blur-[40px]" />
          <div className="relative z-10 max-w-md">
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-1.5 mb-6 border border-white/10">
              <Icon icon="verified_user" className="text-[18px]" />
              <span className="text-sm font-medium tracking-wide">AI-Powered Assessment</span>
            </div>
            <h3 className="font-headline-lg text-headline-lg mb-3">Feeling unwell?</h3>
            <p className="font-body-md text-body-md text-primary-fixed-dim mb-6 opacity-90 leading-relaxed">
              Start a new triage session to evaluate your symptoms instantly and receive medical-grade guidance on your next steps.
            </p>
          </div>
          <div className="relative z-10">
            <button onClick={() => navigate('/new-triage')} className="bg-white text-primary hover:bg-surface-container-lowest rounded-full px-8 py-3.5 font-label-md text-label-md transition-all shadow-lg flex items-center gap-2 hover:scale-[1.02] active:scale-[0.98] w-fit">
              <Icon icon="add_circle" className="icon-fill" />
              Start New Triage
            </button>
          </div>
        </div>

        <div className="bg-surface-container-lowest rounded-[24px] p-6 border border-[#E5E7EB] shadow-level-1 flex flex-col justify-between min-h-[260px]">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h3 className="font-headline-md text-headline-md text-on-surface">Wellness Score</h3>
              <p className="text-sm text-secondary mt-1">{sessions.length > 0 ? 'Based on your logs' : '7-Day Trend'}</p>
            </div>
            <div className="w-10 h-10 rounded-full bg-surface-container-low flex items-center justify-center text-primary">
              <Icon icon="trending_up" />
            </div>
          </div>
          <div className="flex items-end gap-2 mb-4">
            <span className="text-4xl font-extrabold text-on-surface tracking-tight">{sessions.length > 0 ? sessions.length * 10 : '--'}</span>
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

      {/* Stats Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-surface-container-lowest rounded-[16px] p-5 border border-[#E5E7EB] shadow-level-1 flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-surface-container flex items-center justify-center text-primary flex-shrink-0">
            <Icon icon="forum" className="icon-fill" />
          </div>
          <div>
            <p className="text-sm font-medium text-secondary">Total Sessions</p>
            <p className="text-2xl font-bold text-on-surface">{sessions.length}</p>
          </div>
        </div>
        <div className="bg-surface-container-lowest rounded-[16px] p-5 border border-[#E5E7EB] shadow-level-1 flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-surface-container flex items-center justify-center text-primary flex-shrink-0">
            <Icon icon="vaccines" className="icon-fill" />
          </div>
          <div>
            <p className="text-sm font-medium text-secondary">Active Medications</p>
            <p className="text-2xl font-bold text-on-surface">0</p>
          </div>
        </div>
        <div className="bg-surface-container-lowest rounded-[16px] p-5 border border-[#E5E7EB] shadow-level-1 flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-surface-container flex items-center justify-center text-primary flex-shrink-0">
            <Icon icon="calendar_today" className="icon-fill" />
          </div>
          <div>
            <p className="text-sm font-medium text-secondary">Days Monitored</p>
            <p className="text-2xl font-bold text-on-surface">{sessions.length > 0 ? Math.min(sessions.length, 365) : 0}</p>
          </div>
        </div>
      </div>

      {/* Recent Sessions */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
        <h3 className="font-headline-md text-headline-md text-on-surface">Recent Sessions</h3>
        {sessions.length > 0 && (
          <button onClick={() => navigate('/session-history')} className="text-primary font-label-md flex items-center gap-1 hover:gap-2 transition-all">
            See all activity{' '}
            <Icon icon="arrow_forward" className="text-[18px]" />
          </button>
        )}
      </div>

      <SessionGrid />
      <QuickActions />
    </main>
  )
}
