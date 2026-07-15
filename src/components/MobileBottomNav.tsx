import { useLocation, Link } from 'react-router-dom'
import Icon from './Icon'

const navItems = [
  { label: 'Home', icon: 'dashboard', to: '/' },
  { label: 'Triage', icon: 'medical_services', to: '/new-triage' },
  { label: 'History', icon: 'history', to: '/history' },
  { label: 'Symptoms', icon: 'monitor_heart', to: '/symptom-tracker' },
  { label: 'Profile', icon: 'person', to: '/profile' },
]

export default function MobileBottomNav() {
  const { pathname } = useLocation()

  const isActive = (to: string) => to === '/' ? pathname === '/' : pathname.startsWith(to)

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-outline-variant/30 bg-surface/95 backdrop-blur-lg md:hidden safe-area-bottom">
      <div className="flex items-center justify-around px-2 py-1">
        {navItems.map((item) => {
          const active = isActive(item.to)
          return (
            <Link
              key={item.label}
              to={item.to}
              className={`flex flex-col items-center gap-0.5 py-1.5 px-3 rounded-lg transition-colors min-w-0 ${
                active
                  ? 'text-primary'
                  : 'text-secondary hover:text-on-surface'
              }`}
            >
              <Icon icon={item.icon} size="md" />
              <span className={`text-[10px] font-semibold leading-tight ${active ? 'font-bold' : ''}`}>
                {item.label}
              </span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
