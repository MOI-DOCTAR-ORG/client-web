import { useLocation, Link } from 'react-router-dom'
import Icon from './Icon'

const primaryNav = [
  { label: 'Dashboard', icon: 'dashboard', to: '/' },
  { label: 'New Triage', icon: 'medical_services', to: '/new-triage' },
  { label: 'History', icon: 'history', to: '/session-history' },
  { label: 'Care Details', icon: 'local_hospital', to: '/care-details' },
  { label: 'Symptom Tracker', icon: 'monitor_heart', to: '/symptom-tracker' },
  { label: 'Medications', icon: 'pill', to: '/medication-tracker' },
  { label: 'Notifications', icon: 'notifications', to: '/notifications' },
  { label: 'Profile', icon: 'person', to: '/profile' },
]

const bottomNav = [
  { label: 'Medical History', icon: 'assignment', to: '/medical-history' },
  { label: 'Support', icon: 'help', to: '#' },
  { label: 'Sign Out', icon: 'logout', to: '#' },
]

export default function Sidebar() {
  const { pathname } = useLocation()

  return (
    <aside className="fixed h-screen w-[var(--spacing-sidebar-width,280px)] left-0 top-0 bg-surface-container-low flex flex-col py-stack-lg border-r border-outline-variant/30 z-50">
      <Link to="/" className="px-8 mb-10">
        <h1 className="font-headline-md text-headline-md font-extrabold text-primary">
          moidoctar
        </h1>
        <p className="font-label-md text-label-md text-secondary opacity-70">
          Health Triage
        </p>
      </Link>

      <nav className="flex-1 flex flex-col overflow-y-auto">
        {primaryNav.map((item) => {
          const isActive = pathname === item.to
          return (
            <Link
              key={item.label}
              to={item.to}
              className={`flex items-center gap-stack-md py-3 sidebar-active-pill shrink-0 ${
                isActive
                  ? 'text-primary font-bold border-l-4 border-primary pl-4'
                  : 'text-secondary pl-5 hover:text-primary transition-colors duration-200'
              }`}
            >
              <Icon icon={item.icon} />
              <span className="font-label-md text-label-md">{item.label}</span>
            </Link>
          )
        })}
      </nav>

      <div className="mt-auto px-5 space-y-2 pt-4 border-t border-outline-variant/30">
        {bottomNav.map((item) => {
          const isSignOut = item.label === 'Sign Out'
          const Comp = item.to === '#' ? 'a' : Link
          return (
            <Comp
              key={item.label}
              to={item.to as string}
              href={item.to === '#' ? '#' : undefined}
              className={`flex items-center gap-stack-md pl-5 py-3 hover:text-primary transition-colors ${
                isSignOut ? 'text-secondary hover:text-error' : 'text-secondary'
              }`}
            >
              <Icon icon={item.icon} />
              <span className="font-label-md text-label-md">{item.label}</span>
            </Comp>
          )
        })}
      </div>
    </aside>
  )
}
