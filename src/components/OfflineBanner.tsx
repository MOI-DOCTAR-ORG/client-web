import { useState, useEffect } from 'react'
import Icon from './Icon'

export default function OfflineBanner() {
  const [offline, setOffline] = useState(!navigator.onLine)

  useEffect(() => {
    const goOffline = () => setOffline(true)
    const goOnline = () => setOffline(false)
    window.addEventListener('offline', goOffline)
    window.addEventListener('online', goOnline)
    return () => {
      window.removeEventListener('offline', goOffline)
      window.removeEventListener('online', goOnline)
    }
  }, [])

  if (!offline) return null

  return (
    <div className="fixed top-0 left-0 right-0 z-[9999] bg-error text-on-error px-4 py-3 flex items-center justify-center gap-3 shadow-lg">
      <Icon icon="wifi_off" size="lg" />
      <p className="font-body-md text-sm font-medium">
        You are offline. Some features may be unavailable until your connection is restored.
      </p>
    </div>
  )
}
