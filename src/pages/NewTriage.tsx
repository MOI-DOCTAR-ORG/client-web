import { useState } from 'react'
import Icon from '../components/Icon'

type Severity = 'Mild' | 'Moderate' | 'Severe'

const messages = [
  {
    role: 'ai',
    text: 'Hello. I am here to help prioritize your healthcare needs. Could you please describe what you are feeling and when the symptoms started?',
    time: 'Sent at 14:32',
  },
  {
    role: 'user',
    text: 'I have a sharp pain in my upper abdomen. It started about two hours after lunch. It feels quite intense.',
    time: 'Delivered',
  },
]

export default function NewTriage() {
  const [selectedSeverity, setSelectedSeverity] = useState<Severity | null>('Moderate')
  const [inputValue, setInputValue] = useState('')

  const severityOptions: { label: Severity; dot: string; border: string; hover: string }[] = [
    { label: 'Mild', dot: 'bg-blue-400', border: 'border-blue-400', hover: 'hover:border-blue-400 hover:bg-blue-50' },
    { label: 'Moderate', dot: 'bg-yellow-400', border: 'border-primary', hover: '' },
    { label: 'Severe', dot: 'bg-error', border: 'border-error', hover: 'hover:border-error hover:bg-red-50' },
  ]

  return (
    <main className="ml-[var(--spacing-sidebar-width,280px)] h-screen flex overflow-hidden">
      {/* Left Info Panel */}
      <aside className="w-80 bg-gradient-to-br from-primary to-primary-container p-stack-lg text-on-primary flex flex-col shrink-0 relative overflow-hidden">
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-2xl" />
        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md px-3 py-1 rounded-full mb-8">
            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            <span className="text-caption font-caption uppercase tracking-wider">Active Session</span>
          </div>
          <h2 className="font-headline-md text-headline-md mb-8">Triage Summary</h2>
          <div className="space-y-6">
            <div className="flex flex-col gap-1">
              <span className="text-white/60 text-caption font-label-md">START TIME</span>
              <span className="font-body-md">Oct 24, 2023 · 14:32</span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-white/60 text-caption font-label-md">PATIENT ID</span>
              <span className="font-body-md">#MD-992-04X</span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-white/60 text-caption font-label-md">PRIMARY CHIEF COMPLAINT</span>
              <span className="font-body-md">Acute Abdominal Pain</span>
            </div>
          </div>
          <div className="mt-12 bg-white/10 rounded-xl p-4 border border-white/10">
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
        <header className="h-16 flex items-center justify-between px-gutter border-b border-outline-variant bg-white/80 backdrop-blur-md sticky top-0 z-20">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary-container/10 rounded-full flex items-center justify-center text-primary">
              <Icon icon="medical_information" />
            </div>
            <div>
              <p className="font-label-md text-label-md">AI Medical Triage Assistant</p>
              <p className="text-caption text-secondary">Neural Diagnosis Engine v4.2</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button className="p-2 hover:bg-surface-container-high rounded-full transition-colors text-secondary">
              <Icon icon="history" />
            </button>
            <button className="p-2 hover:bg-surface-container-high rounded-full transition-colors text-secondary">
              <Icon icon="more_vert" />
            </button>
          </div>
        </header>

        <div className="flex-grow overflow-y-auto p-gutter space-y-8 chat-container pb-32">
          {/* AI Message */}
          <div className="flex gap-4 max-w-2xl">
            <div className="w-8 h-8 rounded-full bg-surface-container-high flex items-center justify-center shrink-0">
              <Icon icon="smart_toy" className="text-primary text-[20px]" />
            </div>
            <div className="bg-white border border-outline-variant rounded-2xl rounded-tl-none p-4 shadow-sm">
              <p className="font-body-md text-on-surface">
                Hello. I am here to help prioritize your healthcare needs. Could you please describe what you are feeling and when the symptoms started?
              </p>
              <p className="text-caption text-secondary mt-2">Sent at 14:32</p>
            </div>
          </div>

          {/* User Message */}
          <div className="flex gap-4 justify-end">
            <div className="bg-primary text-on-primary rounded-2xl rounded-tr-none px-6 py-4 shadow-lg max-w-xl">
              <p className="font-body-md">
                I have a sharp pain in my upper abdomen. It started about two hours after lunch. It feels quite intense.
              </p>
              <p className="text-caption text-on-primary-container mt-2 opacity-80 text-right">Delivered</p>
            </div>
            <div className="w-8 h-8 rounded-full bg-primary-container flex items-center justify-center shrink-0">
              <Icon icon="person" className="text-white text-[18px]" />
            </div>
          </div>

          {/* AI Message with Severity Triage */}
          <div className="flex gap-4 max-w-2xl">
            <div className="w-8 h-8 rounded-full bg-surface-container-high flex items-center justify-center shrink-0">
              <Icon icon="smart_toy" className="text-primary text-[20px]" />
            </div>
            <div className="bg-white border border-outline-variant rounded-2xl rounded-tl-none p-4 shadow-sm space-y-4">
              <p className="font-body-md text-on-surface">
                I understand. On a scale of severity, how would you classify this pain right now?
              </p>
              <div className="flex flex-wrap gap-2 pt-2">
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

          {/* Triage Result Card */}
          <div className="flex gap-4 max-w-2xl">
            <div className="w-8 h-8 rounded-full bg-surface-container-high flex items-center justify-center shrink-0">
              <Icon icon="smart_toy" className="text-primary text-[20px]" />
            </div>
            <div className="bg-surface-container-low border border-outline-variant rounded-2xl rounded-tl-none p-6 shadow-md w-full border-l-4 border-l-tertiary-container">
              <div className="flex justify-between items-start mb-4">
                <h4 className="font-headline-md text-headline-md text-on-surface">Preliminary Assessment</h4>
                <span className="bg-tertiary-container text-white px-3 py-1 rounded-full text-caption font-label-md uppercase tracking-wide">
                  High Urgency
                </span>
              </div>
              <p className="font-body-md text-on-surface-variant mb-6">
                Based on your reports of sharp upper abdominal pain post-prandial, we recommend a clinical evaluation within the next 4 hours to rule out acute biliary or pancreatic issues.
              </p>
              <div className="flex gap-3">
                <button className="flex-grow bg-primary text-on-primary py-3 rounded-xl font-label-md text-label-md hover:bg-primary-container transition-colors shadow-md shadow-primary/20">
                  View Care Details
                </button>
                <button className="px-4 py-3 border border-outline rounded-xl hover:bg-surface-container transition-colors">
                  <Icon icon="share" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Input Bar */}
        <div className="absolute bottom-0 left-0 right-0 p-gutter bg-gradient-to-t from-surface via-surface to-transparent pt-12 pointer-events-none">
          <div className="max-w-4xl mx-auto w-full pointer-events-auto">
            <div className="bg-white border border-outline-variant rounded-2xl p-2 shadow-xl flex items-center gap-2 group focus-within:ring-2 focus-within:ring-primary/20 transition-all">
              <button className="p-3 text-secondary hover:text-primary transition-colors hover:bg-surface-container-low rounded-xl">
                <Icon icon="attach_file" />
              </button>
              <input
                className="flex-grow bg-transparent border-none focus:ring-0 font-body-md text-on-surface placeholder:text-secondary px-2"
                placeholder="Type your symptoms or questions..."
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
              />
              <div className="flex items-center gap-1">
                <button className="p-3 text-secondary hover:text-primary transition-colors hover:bg-surface-container-low rounded-xl">
                  <span
                    className="material-symbols-outlined"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    mic
                  </span>
                </button>
                <button className="bg-primary text-on-primary p-3 rounded-xl hover:scale-105 active:scale-95 transition-all shadow-lg shadow-primary/30 flex items-center justify-center">
                  <Icon icon="send" />
                </button>
              </div>
            </div>
            <p className="text-center text-[11px] text-secondary mt-3 uppercase tracking-widest font-label-md">
              Encrypted Medical Dialogue • Session ID: #TR-40291
            </p>
          </div>
        </div>
      </section>
    </main>
  )
}
