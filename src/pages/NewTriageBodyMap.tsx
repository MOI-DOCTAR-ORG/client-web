import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Icon from '../components/Icon'
import { useAuth } from '../context/AuthContext'
import { getUserInitials } from '../utils/getUserInitials'
import LianaAvatar from '../components/LianaAvatar'

type Severity = 'Mild' | 'Moderate' | 'Severe'

export default function NewTriageBodyMap() {
  const navigate = useNavigate()
  const { addSession } = useAuth()
  const sessionId = Date.now().toString(36).toUpperCase()
  const [selectedSeverity, setSelectedSeverity] = useState<Severity | null>(null)
  const [inputValue, setInputValue] = useState('')
  const [showPanel, setShowPanel] = useState(true)
  const [messages, setMessages] = useState([
    {
      role: 'ai',
      text: "Hi, I'm LIANA, your personal health assistant. I'm here to help you with your health questions, symptoms, and navigating MoiDoctar. How can I help you today?",
      time: 'Sent at ' + new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
    },
  ])

  const handleSend = () => {
    if (!inputValue.trim()) return
    setMessages(prev => [...prev, { role: 'user', text: inputValue, time: 'Just now' }])
    setInputValue('')
  }

  const severityOptions: { label: Severity; dot: string; border: string; hover: string }[] = [
    { label: 'Mild', dot: 'bg-blue-400', border: 'border-blue-400', hover: 'hover:border-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20' },
    { label: 'Moderate', dot: 'bg-yellow-400', border: 'border-primary', hover: '' },
    { label: 'Severe', dot: 'bg-error', border: 'border-error', hover: 'hover:border-error hover:bg-red-50 dark:hover:bg-red-900/20' },
  ]

  return (
    <main className="h-screen flex overflow-hidden relative">
      {/* Left Info Panel */}
      {showPanel && (
        <div className="md:hidden fixed inset-0 bg-black/30 z-30" onClick={() => setShowPanel(false)} />
      )}
      <aside className={`${showPanel ? 'flex' : 'hidden'} md:flex fixed md:relative inset-y-0 left-0 z-40 md:z-auto w-80 bg-primary p-stack-lg text-on-primary flex-col shrink-0 overflow-hidden`}>
        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 bg-surface-container-lowest/20 backdrop-blur-md px-3 py-1 rounded-full mb-8">
            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            <span className="text-caption font-caption uppercase tracking-wider">Active Session</span>
          </div>
          <h2 className="font-headline-md text-headline-md mb-8">Triage Summary</h2>
          <div className="space-y-6">
            <div className="flex flex-col gap-1">
              <span className="text-white/60 text-caption font-label-md">START TIME</span>
              <span className="font-body-md">{new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-white/60 text-caption font-label-md">PATIENT ID</span>
              <span className="font-body-md">#--</span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-white/60 text-caption font-label-md">PRIMARY CHIEF COMPLAINT</span>
              <span className="font-body-md">--</span>
            </div>
          </div>
          <div className="mt-12 bg-surface-container-lowest/10 rounded-xl p-4 border border-white/10">
            <h3 className="font-label-md text-label-md mb-3 flex items-center gap-2">
              <Icon icon="info" className="text-[20px]" />
              Clinical Context
            </h3>
            <p className="text-caption font-caption leading-relaxed text-white/80">
              Please describe the onset and nature of symptoms clearly. The system uses clinical-grade reasoning to suggest next steps.
            </p>
          </div>
        </div>
        <div className="mt-auto pt-6 border-t border-white/20 text-white/40 text-caption italic">
          Secure 256-bit HIPAA compliant session
        </div>
      </aside>

      {/* Right Chat Panel */}
      <section className="flex-grow flex flex-col bg-surface relative">
        <header className="h-16 flex items-center justify-between px-gutter border-b border-outline-variant bg-surface-container-lowest/80 backdrop-blur-md sticky top-0 z-20">
          <div className="flex items-center gap-3">
            <LianaAvatar size="sm" />
            <div>
              <p className="font-label-md text-label-md font-bold">LIANA</p>
              <p className="text-caption text-secondary">Your Personal Health Assistant · MoiDoctar</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              className="md:hidden p-2 hover:bg-surface-container-high rounded-full transition-colors text-secondary"
              onClick={() => setShowPanel(!showPanel)}
            >
              <Icon icon={showPanel ? 'close' : 'info'} />
            </button>
            <button className="p-2 hover:bg-surface-container-high rounded-full transition-colors text-secondary" onClick={() => navigate('/history')}>
              <Icon icon="history" />
            </button>
            <button className="p-2 hover:bg-surface-container-high rounded-full transition-colors text-secondary">
              <Icon icon="more_vert" />
            </button>
          </div>
        </header>

        <div className="flex-grow overflow-y-auto p-gutter space-y-8 chat-container pb-32">
          {messages.map((msg, i) => (
            msg.role === 'ai' ? (
              <div key={i} className="flex gap-4 max-w-full md:max-w-2xl">
                <div className="shrink-0">
                  <LianaAvatar size="sm" />
                </div>
                <div className="bg-surface-container-lowest border border-outline-variant rounded-2xl rounded-tl-none p-4 shadow-sm">
                  <p className="font-body-md text-on-surface">{msg.text}</p>
                  <p className="text-caption text-secondary mt-2">{msg.time}</p>
                </div>
              </div>
            ) : (
              <div key={i} className="flex gap-4 justify-end">
                <div className="bg-primary text-on-primary rounded-2xl rounded-tr-none px-6 py-4 shadow-lg max-w-full md:max-w-xl">
                  <p className="font-body-md">{msg.text}</p>
                  <p className="text-caption text-on-primary-container mt-2 opacity-80 text-right">{msg.time}</p>
                </div>
                <div className="w-8 h-8 rounded-full bg-primary-container flex items-center justify-center shrink-0 font-bold text-white text-xs">
                  {getUserInitials()}
                </div>
              </div>
            )
          ))}

          {/* Severity & Body Map Selection */}
          {messages.length > 1 && !selectedSeverity && (
            <div className="flex gap-4 max-w-full md:max-w-2xl">
              <div className="shrink-0">
                <LianaAvatar size="sm" />
              </div>
              <div className="bg-surface-container-lowest border border-outline-variant rounded-2xl rounded-tl-none p-4 shadow-sm space-y-4">
                <p className="font-body-md text-on-surface">
                  I understand. On a scale of severity, how would you classify this pain right now?
                </p>
                <div className="flex flex-wrap gap-2 pt-2">
                  <button
                    onClick={() => navigate('/symptom-tracker-body-map')}
                    className="px-5 py-2 rounded-full border border-primary bg-primary-container/10 text-primary hover:bg-primary-container/20 transition-all font-label-md text-label-md flex items-center gap-2"
                  >
                    <Icon icon="body_system" className="text-[18px]" />
                    Map My Pain
                  </button>
                  {severityOptions.map((opt) => (
                    <button
                      key={opt.label}
                      onClick={() => setSelectedSeverity(opt.label)}
                      className={`px-5 py-2 rounded-full font-label-md text-label-md flex items-center gap-2 transition-all ${
                        selectedSeverity === opt.label
                          ? `border-2 ${opt.border} bg-primary-container/5`
                          : `border border-outline-variant ${opt.hover}`
                      }`}
                    >
                      <span className={`w-2 h-2 ${opt.dot} rounded-full`} />
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Triage Result Card */}
          {selectedSeverity && (
            <div className="flex gap-4 max-w-full md:max-w-2xl">
              <div className="shrink-0">
                <LianaAvatar size="sm" />
              </div>
              <div className="bg-surface-container-low border border-outline-variant rounded-2xl rounded-tl-none p-6 shadow-md w-full border-l-4 border-l-tertiary-container">
                <div className="flex justify-between items-start mb-4">
                  <h4 className="font-headline-md text-headline-md text-on-surface">Preliminary Assessment</h4>
                  <span className="bg-tertiary-container text-white px-3 py-1 rounded-full text-caption font-label-md uppercase tracking-wide">
                    {selectedSeverity === 'Severe' ? 'High Urgency' : selectedSeverity === 'Moderate' ? 'Moderate' : 'Low'}
                  </span>
                </div>
                <p className="font-body-md text-on-surface-variant mb-6">
                  Based on your reports, we recommend monitoring your symptoms and consulting a healthcare professional if they persist.
                </p>
                <div className="flex gap-3">
                  <button
                    className="flex-grow bg-primary text-on-primary py-3 rounded-xl font-label-md text-label-md hover:bg-primary-container transition-colors shadow-md shadow-primary/20"
                    onClick={() => {
                      addSession({
                        id: 'sess-' + Date.now(),
                        date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
                        time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
                        condition: 'Self-reported symptoms',
                        description: 'Triage assessment completed.',
                        severity: selectedSeverity === 'Severe' ? 'Urgent' : selectedSeverity === 'Moderate' ? 'Moderate' : 'Stable',
                        statusLabel: 'Review Sent',
                        statusIcon: 'clinical_notes',
                      })
                      navigate('/care-details')
                    }}
                  >
                    View Care Details
                  </button>
                  <button className="px-4 py-3 border border-outline rounded-xl hover:bg-surface-container transition-colors">
                    <Icon icon="share" />
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Bottom Input Bar */}
        <div className="absolute bottom-0 left-0 right-0 p-gutter bg-surface pt-12 pointer-events-none">
          <div className="max-w-4xl mx-auto w-full pointer-events-auto">
            <div className="bg-surface-container-lowest border border-outline-variant rounded-2xl p-2 shadow-xl flex items-center gap-2 group focus-within:ring-2 focus-within:ring-primary/20 transition-all">
              <button className="p-3 text-secondary hover:text-primary transition-colors hover:bg-surface-container-low rounded-xl">
                <Icon icon="attach_file" />
              </button>
              <input
                className="flex-grow bg-transparent border-none focus:ring-0 font-body-md text-on-surface placeholder:text-secondary px-2"
                placeholder="Type your symptoms or questions..."
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={(e) => { if (e.key === 'Enter') handleSend() }}
              />
              <div className="flex items-center gap-1">
                <button className="p-3 text-secondary hover:text-primary transition-colors hover:bg-surface-container-low rounded-xl">
                  <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>
                    mic
                  </span>
                </button>
                <button
                  className="bg-primary text-on-primary p-3 rounded-xl hover:scale-105 active:scale-95 transition-all shadow-lg shadow-primary/30 flex items-center justify-center"
                  onClick={handleSend}
                >
                  <Icon icon="send" />
                </button>
              </div>
            </div>
            <p className="text-center text-[11px] text-secondary mt-3 uppercase tracking-widest font-label-md">
              Encrypted Medical Dialogue • Session ID: #TR-{sessionId}
            </p>
          </div>
        </div>
      </section>
    </main>
  )
}
