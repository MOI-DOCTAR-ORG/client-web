import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Icon from '../components/Icon'

const initialMessages = [
  { role: 'ai', text: "Hello. I'm ready to help assess your symptoms. Could you please describe what you're feeling and when it started?" },
]

export default function NewTriageInterface() {
  const navigate = useNavigate()
  const [inputValue, setInputValue] = useState('')
  const [messages, setMessages] = useState(initialMessages)

  const handleSend = () => {
    if (!inputValue.trim()) return
    setMessages(prev => [...prev, { role: 'user', text: inputValue }])
    setInputValue('')
  }

  return (
    <div className="flex flex-col h-full relative z-10">
      <header className="flex justify-between items-center w-full px-margin-mobile md:px-gutter h-16 max-w-container-max-width mx-auto bg-surface/80 backdrop-blur-md sticky top-0 z-50">
        <div className="flex items-center gap-4 md:hidden">
          <button className="text-on-surface p-2 rounded-full hover:bg-surface-variant transition-colors">
            <Icon icon="menu" />
          </button>
          <h1 className="font-headline-md text-headline-md font-extrabold text-primary">moidoctar</h1>
        </div>
        <div className="hidden md:block">
          <h2 className="font-headline-md text-headline-md font-bold text-on-surface">New Triage Session</h2>
        </div>
        <div className="flex items-center gap-4">
          <button className="text-secondary hover:bg-surface-variant dark:hover:bg-surface-container-highest rounded-full p-2 transition-all">
            <Icon icon="notifications" />
          </button>
          <div className="w-8 h-8 rounded-full bg-primary-container flex items-center justify-center text-on-primary font-bold cursor-pointer hover:opacity-80 transition-opacity">
            U
          </div>
        </div>
      </header>

      <main className="flex-1 max-w-container-max-width mx-auto w-full p-margin-mobile md:p-gutter flex flex-col md:flex-row gap-gutter h-[calc(100vh-64px)] pb-6 overflow-hidden">
        <aside className="w-full md:w-80 flex-shrink-0 flex flex-col gap-stack-md">
          <div className="bg-gradient-to-br from-primary-fixed to-surface-container rounded-xl p-6 shadow-sm border border-outline-variant/20 flex-1 flex flex-col relative overflow-hidden">
            <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-primary-container rounded-full mix-blend-multiply opacity-10 filter blur-xl" />
            <div className="mb-6">
              <span className="inline-block px-3 py-1 bg-surface-container-highest text-on-surface-variant text-xs font-semibold rounded-full mb-3 shadow-sm border border-outline-variant/30">In Progress</span>
              <h3 className="font-headline-md text-headline-md text-on-primary-fixed font-bold">New Session</h3>
              <p className="font-caption text-caption text-secondary mt-1 flex items-center gap-1">
                <Icon icon="schedule" className="text-[14px]" /> Started {new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true })}
              </p>
            </div>
            <div className="flex-1">
              <h4 className="font-label-md text-label-md text-on-surface-variant mb-2 font-bold uppercase tracking-wider text-xs">Primary Complaint</h4>
              <div className="bg-surface/60 rounded-lg p-3 backdrop-blur-sm border border-outline-variant/30 mb-4">
                <p className="font-body-md text-body-md text-on-surface">--</p>
              </div>
              <h4 className="font-label-md text-label-md text-on-surface-variant mb-2 font-bold uppercase tracking-wider text-xs">Identified Symptoms</h4>
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1.5 bg-surface/60 rounded-full text-sm font-medium text-on-surface border border-outline-variant/30 shadow-sm backdrop-blur-sm">--</span>
              </div>
            </div>
            <div className="mt-auto pt-4 border-t border-primary/10">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-surface-variant flex items-center justify-center">
                  <Icon icon="psychology" className="text-primary" />
                </div>
                <div>
                  <p className="font-label-md text-label-md text-on-surface font-bold">Moidoctar AI</p>
                  <p className="font-caption text-caption text-secondary">Analyzing continuously</p>
                </div>
              </div>
            </div>
          </div>
        </aside>

        <section className="flex-1 bg-surface-container-lowest rounded-xl shadow-sm border border-outline-variant/30 flex flex-col h-full overflow-hidden relative">
          <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-6 custom-scrollbar">
            {messages.map((msg, i) => (
              msg.role === 'ai' ? (
                <div key={i} className="flex gap-4 max-w-[85%]">
                  <div className="w-8 h-8 rounded-full bg-primary-container flex-shrink-0 flex items-center justify-center mt-1">
                    <Icon icon="smart_toy" className="text-on-primary text-[18px]" />
                  </div>
                  <div className="bg-surface-container-low p-4 rounded-2xl rounded-tl-sm border border-outline-variant/20 shadow-sm">
                    <p className="font-body-md text-body-md text-on-surface">{msg.text}</p>
                  </div>
                </div>
              ) : (
                <div key={i} className="flex gap-4 max-w-[85%] self-end flex-row-reverse">
                  <div className="w-8 h-8 rounded-full bg-secondary-container flex-shrink-0 flex items-center justify-center mt-1">
                    <span className="font-bold text-on-surface-variant text-sm">U</span>
                  </div>
                  <div className="bg-primary text-on-primary p-4 rounded-2xl rounded-tr-sm shadow-md">
                    <p className="font-body-md text-body-md">{msg.text}</p>
                  </div>
                </div>
              )
            ))}

            {messages.length > 2 && (
              <div className="mt-4 mb-2 mx-auto w-full max-w-md bg-surface-container-lowest rounded-xl p-5 border border-outline-variant shadow-[0px_4px_20px_rgba(0,0,0,0.03)] relative overflow-hidden group">
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-tertiary-container" />
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h4 className="font-headline-md text-[18px] font-bold text-on-surface">Preliminary Assessment</h4>
                    <p className="font-caption text-caption text-secondary">Based on current data</p>
                  </div>
                  <span className="px-3 py-1 bg-tertiary-fixed text-on-tertiary-fixed-variant text-xs font-bold rounded-full uppercase tracking-wide">Pending</span>
                </div>
                <p className="font-body-md text-[14px] text-on-surface-variant mb-4">Assessment will appear once more information is gathered.</p>
                <button className="w-full py-2.5 rounded-lg bg-surface-container-high text-primary font-label-md text-label-md font-bold hover:bg-surface-variant transition-colors border border-outline-variant/30" onClick={() => navigate('/care-details')}>
                  View Detailed Care Pathway
                </button>
              </div>
            )}

            <div className="h-4" />
          </div>

          <div className="p-4 bg-surface-container-lowest border-t border-outline-variant/30">
            <div className="flex items-center gap-2 bg-surface-container-low rounded-xl p-2 border border-outline-variant/40 focus-within:border-primary focus-within:ring-1 focus-within:ring-primary transition-all">
              <button className="p-2 text-secondary hover:text-primary transition-colors rounded-full hover:bg-surface-variant shrink-0" title="Attach Photo">
                <Icon icon="add_a_photo" />
              </button>
              <input
                className="flex-1 bg-transparent border-none focus:ring-0 text-on-surface font-body-md placeholder:text-outline p-2 min-w-0"
                placeholder="Describe your symptoms or reply..."
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={(e) => { if (e.key === 'Enter') handleSend() }}
              />
              <button className="p-2 text-secondary hover:text-primary transition-colors rounded-full hover:bg-surface-variant shrink-0" title="Voice Input">
                <Icon icon="mic" />
              </button>
              <button className="p-2 bg-primary text-on-primary rounded-lg hover:bg-primary/90 transition-colors shrink-0 ml-1 shadow-sm flex items-center justify-center w-10 h-10" title="Send" onClick={handleSend}>
                <Icon icon="send" className="text-[20px]" />
              </button>
            </div>
            <div className="text-center mt-2">
              <span className="font-caption text-[11px] text-secondary">Moidoctar provides triage guidance, not a medical diagnosis. In an emergency, dial 911.</span>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
