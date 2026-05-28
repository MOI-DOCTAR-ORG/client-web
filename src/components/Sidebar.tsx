import { useLocation, Link, useNavigate } from 'react-router-dom'
import Icon from './Icon'
import { useAuth } from '../context/AuthContext'
import { useTheme } from '../context/ThemeContext'
import ThemeToggle from './ThemeToggle'

const primaryNav = [
  { label: 'Dashboard', icon: 'dashboard', to: '/' },
  { label: 'New Triage', icon: 'medical_services', to: '/new-triage' },
  { label: 'History', icon: 'history', to: '/history' },
  { label: 'Care Details', icon: 'local_hospital', to: '/care-details' },
  { label: 'Symptom Tracker', icon: 'monitor_heart', to: '/symptom-tracker' },
  { label: 'Medications', icon: 'pill', to: '/medication-tracker' },
  { label: 'Notifications', icon: 'notifications', to: '/notifications' },
  { label: 'Profile', icon: 'person', to: '/profile' },
]

const bottomNav = [
  { label: 'Support', icon: 'help', to: '#' },
  { label: 'Sign Out', icon: 'logout', to: '#' },
]

type SidebarProps = {
  open: boolean
  onClose: () => void
}

export default function Sidebar({ open, onClose }: SidebarProps) {
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const { signOut } = useAuth()

  const handleNav = () => {
    onClose()
  }

  const handleSignOut = () => {
    signOut()
    navigate('/splash')
    onClose()
  }

  const sidebarContent = (
    <>
      <Link to="/" onClick={handleNav} className="px-4 md:px-8 mb-6 md:mb-10 flex items-center gap-3">
        <img src="/doctarr.jpeg" alt="moidoctar" className="w-10 h-10 rounded-lg object-cover" />
        <div>
          <h1 className="font-headline-md text-headline-md font-extrabold text-primary">
            moidoctar
          </h1>
          <p className="font-label-md text-label-md text-secondary opacity-70">
            Health Triage
          </p>
        </div>
      </Link>

      <nav className="flex-1 flex flex-col overflow-y-auto">
        {primaryNav.map((item) => {
          const isActive = pathname === item.to
          return (
            <Link
              key={item.label}
              to={item.to}
              onClick={handleNav}
              className={`flex items-center gap-3 md:gap-stack-md py-2.5 md:py-3 sidebar-active-pill shrink-0 text-sm md:text-base ${
                isActive
                  ? 'text-primary font-bold border-l-4 border-primary pl-4'
                  : 'text-secondary pl-5 hover:text-primary transition-colors duration-200'
              }`}
            >
              <Icon icon={item.icon} className="text-xl md:text-2xl" />
              <span className="font-label-md text-label-md">{item.label}</span>
            </Link>
          )
        })}
      </nav>

      <div className="mt-auto px-5 space-y-1 md:space-y-2 pt-4 border-t border-outline-variant/30">
        <ThemeToggle />
        {bottomNav.map((item) => {
          const isSignOut = item.label === 'Sign Out'
          return (
            <button
              key={item.label}
              onClick={isSignOut ? handleSignOut : handleNav}
              className={`w-full flex items-center gap-3 md:gap-stack-md pl-5 py-2.5 md:py-3 hover:text-primary transition-colors text-sm md:text-base text-left ${
                isSignOut ? 'text-secondary hover:text-error' : 'text-secondary'
              }`}
            >
              <Icon icon={item.icon} className="text-xl md:text-2xl" />
              <span className="font-label-md text-label-md">{item.label}</span>
            </button>
          )
        })}
      </div>
    </>
  )

  return (
    <>
      {/* Mobile overlay */}
      {open && (
        <div
          className="fixed inset-0 bg-black/40 z-40 md:hidden"
          onClick={onClose}
        />
      )}

      {/* Mobile sidebar */}
      <aside
        className={`fixed top-0 left-0 h-screen w-[260px] bg-surface-container-low flex flex-col py-4 md:py-stack-lg border-r border-outline-variant/30 z-50 transition-transform duration-300 md:hidden ${
          open ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {sidebarContent}
      </aside>

      {/* Desktop sidebar */}
      <aside className="fixed top-0 left-0 h-screen w-[var(--spacing-sidebar-width,280px)] bg-surface-container-low hidden md:flex flex-col py-stack-lg border-r border-outline-variant/30 z-50">
        {sidebarContent}
      </aside>
    </>
  )
}
