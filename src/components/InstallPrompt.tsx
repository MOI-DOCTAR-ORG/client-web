import { useState, useEffect } from 'react'
import Icon from './Icon'

export default function InstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState<Event | null>(null)
  const [show, setShow] = useState(false)

  useEffect(() => {
    const handler = (e: Event) => {
      e.preventDefault()
      setDeferredPrompt(e)
      setShow(true)
    }
    window.addEventListener('beforeinstallprompt', handler)
    return () => window.removeEventListener('beforeinstallprompt', handler)
  }, [])

  const handleInstall = () => {
    if (!deferredPrompt) return
    ;(deferredPrompt as any).prompt()
    ;(deferredPrompt as any).userChoice.then(() => {
      setDeferredPrompt(null)
      setShow(false)
    })
  }

  if (!show) return null

  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 bg-surface-container-lowest border border-outline-variant rounded-2xl shadow-level-2 p-4 flex items-center gap-4 max-w-md w-[calc(100%-32px)]">
      <div className="w-10 h-10 rounded-full bg-primary-container flex items-center justify-center text-primary flex-shrink-0">
        <Icon icon="download" />
      </div>
      <p className="flex-1 font-body-md text-sm text-on-surface">Install moidoctar for quick access.</p>
      <button onClick={handleInstall} className="bg-primary text-white px-5 py-2 rounded-full font-label-md text-sm hover:bg-primary/90 transition-colors">
        Install
      </button>
      <button onClick={() => setShow(false)} className="text-secondary hover:text-on-surface p-1" aria-label="Close">
        <Icon icon="close" />
      </button>
    </div>
  )
}
