import { useState } from 'react'
import { Link, Outlet, Navigate, useLocation, useNavigate } from 'react-router-dom'
import Sidebar from '../components/Sidebar'
import MobileBottomNav from '../components/MobileBottomNav'
import OfflineBanner from '../components/OfflineBanner'
import { useAuth } from '../context/AuthContext'
import { useTheme } from '../context/ThemeContext'
import LoadingSpinner from '../components/ui/LoadingSpinner'
import Icon from '../components/Icon'

const pageTitles = [
  { path: '/new-triage-interface', label: 'New Triage' },
  { path: '/new-triage-body-map', label: 'New Triage' },
  { path: '/symptom-tracker-body-map', label: 'Symptom Tracker' },
  { path: '/new-triage', label: 'New Triage' },
  { path: '/history', label: 'History' },
  { path: '/care-details', label: 'Care Details' },
  { path: '/symptom-tracker', label: 'Symptom Tracker' },
  { path: '/medication-tracker', label: 'Medications' },
  { path: '/notifications', label: 'Notifications' },
  { path: '/profile', label: 'Profile' },
]

function getPageTitle(pathname: string) {
  if (pathname === '/') return 'Dashboard'
  return pageTitles.find(page => pathname.startsWith(page.path))?.label || 'MoiDoctar'
}

function getInitials(name?: string) {
  const parts = name?.trim().split(/\s+/).filter(Boolean) || []
  if (parts.length === 0) return 'U'
  if (parts.length === 1) return parts[0][0].toUpperCase()
  return `${parts[0][0].toUpperCase()}${parts[parts.length - 1][0].toUpperCase()}`
}

export default function AppLayout() {
  const { isAuthenticated, isLoading, signOut, user, userChangeKey } = useAuth()
  const { theme, toggleTheme } = useTheme()
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const isDark = theme === 'dark'
  const pageTitle = getPageTitle(pathname)

  const handleSignOut = async () => {
    await signOut()
    navigate('/sign-in')
    setSidebarOpen(false)
  }

  if (isLoading) return <LoadingSpinner text="Verifying session..." />
  if (!isAuthenticated) return <Navigate to="/sign-in" replace />

  return (
    <div className="min-h-screen bg-background text-on-background font-body-md">
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="fixed top-0 left-0 right-0 md:left-[var(--spacing-sidebar-width,232px)] h-14 md:h-16 bg-surface/85 backdrop-blur-md border-b border-outline-variant/30 z-30">
        <div className="mx-auto flex h-full w-full max-w-[1400px] items-center justify-between px-3 sm:px-4 md:px-6">
          <div className="flex min-w-0 items-center gap-2 sm:gap-3">
            <button
              type="button"
              onClick={() => setSidebarOpen(true)}
              className="grid h-10 w-10 md:h-9 md:w-9 shrink-0 place-items-center rounded-full bg-primary-container text-primary md:hidden"
              aria-label="Open sidebar"
            >
              <Icon icon="menu" size="lg" />
            </button>
            <div className="min-w-0">
              <h1 className="truncate font-headline-md text-lg md:text-xl font-bold text-on-surface">
                {pageTitle}
              </h1>
              <p className="hidden truncate text-xs font-semibold text-secondary md:block">
                MoiDoctar health workspace
              </p>
            </div>
          </div>

          <div className="flex shrink-0 items-center gap-1 sm:gap-2">
            <button
              type="button"
              onClick={toggleTheme}
              className="grid h-10 w-10 md:h-9 md:w-9 place-items-center rounded-full text-secondary transition-colors hover:bg-surface-variant hover:text-primary"
              aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              <Icon icon={isDark ? 'light_mode' : 'dark_mode'} size="lg" />
            </button>
            <Link
              to="/notifications"
              className="grid h-10 w-10 md:h-9 md:w-9 place-items-center rounded-full text-secondary transition-colors hover:bg-surface-variant hover:text-primary"
              aria-label="Notifications"
            >
              <Icon icon="notifications" size="lg" />
            </Link>
            <Link
              to="/profile"
              className="grid h-10 w-10 md:h-9 md:w-9 place-items-center rounded-full bg-primary-container text-sm font-bold text-primary transition hover:ring-2 hover:ring-primary/30"
              aria-label="Profile"
              title={user?.userName || 'Profile'}
            >
              {getInitials(user?.userName)}
            </Link>
            <button
              type="button"
              onClick={handleSignOut}
              className="grid h-10 w-10 md:h-9 md:w-9 place-items-center rounded-full text-secondary transition-colors hover:bg-error-container hover:text-error"
              aria-label="Sign out"
            >
              <Icon icon="logout" size="lg" />
            </button>
          </div>
        </div>
      </div>

      <OfflineBanner />

      {/* Content */}
      <div className="md:ml-[var(--spacing-sidebar-width,232px)] pt-14 md:pt-16 pb-16 md:pb-0 min-h-screen min-h-[100dvh]">
        <Outlet key={userChangeKey} />
      </div>

      <MobileBottomNav />
    </div>
  )
}
