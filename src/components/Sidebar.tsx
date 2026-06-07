import { useLocation, Link } from 'react-router-dom'
import Icon from './Icon'

const primaryNav = [
  { label: 'Dashboard', icon: 'dashboard', to: '/' },
  { label: 'New Triage', icon: 'medical_services', to: '/new-triage' },
  { label: 'History', icon: 'history', to: '/history' },
  { label: 'Care Details', icon: 'local_hospital', to: '/care-details' },
  { label: 'Symptom Tracker', icon: 'monitor_heart', to: '/symptom-tracker' },
  { label: 'Medications', icon: 'pill', to: '/medication-tracker' },
]

const bottomNav = [
  { label: 'Support', icon: 'help' },
  { label: 'Terms & Conditions', icon: 'contract' },
]

type SidebarProps = {
  open: boolean
  onClose: () => void
}

export default function Sidebar({ open, onClose }: SidebarProps) {
  const { pathname } = useLocation()

  const handleNav = () => {
    onClose()
  }

  const isActiveRoute = (to: string) => to === '/' ? pathname === '/' : pathname.startsWith(to)

  const sidebarContent = (
    <div className="flex h-full min-h-0 flex-col">
      <div className="px-3 pb-3">
        <Link
          to="/"
          onClick={handleNav}
          className="flex h-11 items-center gap-2.5 rounded-lg px-2 transition-colors hover:bg-surface-container-high"
        >
          <img src="/moidoctar-logo.svg" alt="MoiDoctar" className="h-8 w-8 object-contain" />
          <div className="min-w-0">
            <h1 className="truncate font-headline-md text-lg font-extrabold text-primary">
              MoiDoctar
            </h1>
          </div>
        </Link>
      </div>

      <nav className="no-scrollbar flex min-h-0 flex-1 flex-col gap-1 overflow-y-auto px-2.5 pb-3" aria-label="Primary navigation">
        {primaryNav.map((item) => {
          const isActive = isActiveRoute(item.to)
          return (
            <Link
              key={item.label}
              to={item.to}
              onClick={handleNav}
              aria-current={isActive ? 'page' : undefined}
              className={`sidebar-active-pill flex h-10 shrink-0 items-center gap-2.5 rounded-lg px-2.5 text-sm transition-colors ${
                isActive
                  ? 'bg-primary-container text-primary shadow-sm'
                  : 'text-secondary hover:bg-surface-container-high hover:text-on-surface'
              }`}
            >
              <span className={`grid h-7 w-7 shrink-0 place-items-center rounded-lg ${
                isActive ? 'bg-surface-container-lowest/70' : 'bg-transparent'
              }`}>
                <Icon icon={item.icon} size="md" />
              </span>
              <span className="truncate font-label-md text-label-md">{item.label}</span>
            </Link>
          )
        })}
      </nav>

      <div className="mt-auto space-y-1 border-t border-outline-variant/40 px-2.5 pt-3">
        {bottomNav.map((item) => {
          return (
            <button
              key={item.label}
              type="button"
              onClick={handleNav}
              className="flex h-10 w-full items-center gap-2.5 rounded-lg px-2.5 text-left text-sm text-secondary transition-colors hover:bg-surface-container-high hover:text-on-surface"
            >
              <span className="grid h-7 w-7 shrink-0 place-items-center">
                <Icon icon={item.icon} size="md" />
              </span>
              <span className="truncate font-label-md text-label-md">{item.label}</span>
            </button>
          )
        })}
      </div>
    </div>
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
        className={`fixed top-0 left-0 h-screen w-[236px] bg-surface-container-low flex flex-col py-3 border-r border-outline-variant/30 z-50 transition-transform duration-300 md:hidden ${
          open ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {sidebarContent}
      </aside>

      {/* Desktop sidebar */}
      <aside className="fixed top-0 left-0 h-screen w-[var(--spacing-sidebar-width,232px)] bg-surface-container-low hidden md:flex flex-col py-4 border-r border-outline-variant/30 z-50">
        {sidebarContent}
      </aside>
    </>
  )
}
