import { useState } from 'react'
import { Outlet, Navigate } from 'react-router-dom'
import Sidebar from '../components/Sidebar'
import OfflineBanner from '../components/OfflineBanner'
import { useAuth } from '../context/AuthContext'
import LoadingSpinner from '../components/ui/LoadingSpinner'
import Icon from '../components/Icon'

export default function AppLayout() {
  const { isAuthenticated, isLoading, userChangeKey } = useAuth()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  if (isLoading) return <LoadingSpinner text="Verifying session..." />
  if (!isAuthenticated) return <Navigate to="/sign-in" replace />

  return (
    <div className="min-h-screen bg-background text-on-background font-body-md">
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Mobile top bar */}
      <div className="md:hidden fixed top-0 left-0 right-0 h-14 bg-surface-container-low/95 backdrop-blur-md border-b border-outline-variant/30 flex items-center justify-between px-4 z-30">
        <button
          onClick={() => setSidebarOpen(true)}
          className="p-2 text-secondary hover:text-primary rounded-lg"
        >
          <Icon icon="menu" size="lg" />
        </button>
        <h1 className="font-headline-md text-headline-md font-extrabold text-primary">
          MoiDoctar
        </h1>
        <div className="w-8" />
      </div>

      <OfflineBanner />

      {/* Content */}
      <div className="md:ml-[var(--spacing-sidebar-width,280px)] pt-14 md:pt-0 min-h-screen">
        <Outlet key={userChangeKey} />
      </div>
    </div>
  )
}
