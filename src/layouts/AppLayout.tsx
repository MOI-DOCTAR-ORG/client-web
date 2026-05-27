import { useState } from 'react'
import { Outlet, Navigate } from 'react-router-dom'
import Sidebar from '../components/Sidebar'
import { useAuth } from '../context/AuthContext'
import LoadingSpinner from '../components/ui/LoadingSpinner'
import Icon from '../components/Icon'

export default function AppLayout() {
  const { isAuthenticated, isLoading } = useAuth()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  if (isLoading) return <LoadingSpinner text="Verifying session..." />
  if (!isAuthenticated) return <Navigate to="/splash" replace />

  return (
    <div className="min-h-screen bg-background text-on-background font-body-md">
      {/* Blobs - hidden on mobile */}
      <div className="hidden md:block bg-blob w-[500px] h-[500px] bg-primary rounded-full top-[-10%] right-[-10%]" />
      <div className="hidden md:block bg-blob w-[400px] h-[400px] bg-secondary rounded-full bottom-[-5%] left-[-5%]" />

      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Mobile top bar */}
      <div className="md:hidden fixed top-0 left-0 right-0 h-14 bg-surface-container-low/95 backdrop-blur-md border-b border-outline-variant/30 flex items-center justify-between px-4 z-30">
        <button
          onClick={() => setSidebarOpen(true)}
          className="p-2 text-secondary hover:text-primary rounded-lg"
        >
          <Icon icon="menu" className="text-2xl" />
        </button>
        <h1 className="font-headline-md text-headline-md font-extrabold text-primary">
          moidoctar
        </h1>
        <button className="w-8 h-8 rounded-full bg-surface-container flex items-center justify-center text-secondary">
          <Icon icon="person" className="text-lg" />
        </button>
      </div>

      {/* Content */}
      <div className="md:ml-[var(--spacing-sidebar-width,280px)] pt-14 md:pt-0 min-h-screen">
        <Outlet />
      </div>
    </div>
  )
}
