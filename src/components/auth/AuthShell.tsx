import type { ReactNode } from 'react'
import Icon from '../Icon'

type AuthShellProps = {
  title: string
  subtitle: ReactNode
  children: ReactNode
  footer?: ReactNode
  eyebrow?: string
  maxWidthClass?: string
}

const visualItems = [
  { icon: 'shield', label: 'Private triage space' },
  { icon: 'monitor_heart', label: 'Clear symptom context' },
  { icon: 'clinical_notes', label: 'Care-ready records' },
]

export default function AuthShell({
  title,
  subtitle,
  children,
  footer,
  eyebrow = 'MoiDoctar',
  maxWidthClass = 'max-w-[440px]',
}: AuthShellProps) {
  return (
    <main className="auth-page-shell min-h-screen bg-background text-on-background px-4 py-5 sm:px-6 md:p-8">
      <div className="auth-window mx-auto grid w-full max-w-[1180px] overflow-hidden border border-outline-variant bg-surface-container-lowest lg:grid-cols-[minmax(0,0.92fr)_minmax(420px,1.08fr)]">
        <section className="relative flex min-h-[calc(100vh-2.5rem)] items-center justify-center px-4 py-7 sm:px-8 md:py-10 lg:min-h-[720px] lg:px-10">
          <div className={`auth-card-enter w-full ${maxWidthClass}`}>
            <header className="mb-7 flex flex-col gap-6">
              <div className="auth-brand-lockup flex items-center justify-center gap-4 lg:justify-start">
                <img src="/moidoctar-logo.svg" alt="MoiDoctar" className="h-16 w-16 object-contain sm:h-[72px] sm:w-[72px]" />
                <div>
                  <p className="auth-eyebrow">{eyebrow}</p>
                  <p className="auth-muted-text text-sm">Health Triage</p>
                </div>
              </div>

              <div className="auth-copy text-center lg:text-left">
                <h1 className="auth-title text-on-surface">{title}</h1>
                <p className="auth-muted-text mt-3 font-body-md text-body-md">{subtitle}</p>
              </div>
            </header>

            {children}

            {footer && (
              <footer className="mt-6 text-center font-body-md text-body-md text-secondary">
                {footer}
              </footer>
            )}
          </div>
        </section>

        <aside className="auth-visual-panel relative hidden overflow-hidden p-10 text-on-primary-container lg:flex lg:flex-col lg:justify-between">
          <div className="auth-visual-header relative z-10 flex items-center gap-4">
            <img src="/moidoctar-logo.svg" alt="" className="h-16 w-16 object-contain" aria-hidden="true" />
            <div>
              <p className="auth-visual-muted font-label-md text-label-md">Secure intake</p>
              <p className="font-headline-md text-headline-md font-bold text-on-primary-container">Guided health support</p>
            </div>
          </div>

          <div className="auth-visual-center relative z-10 mx-auto flex w-full max-w-[420px] flex-col items-center py-10">
            <div className="auth-visual-mark" aria-hidden="true">
              <img src="/moidoctar-logo.svg" alt="" className="h-48 w-48 object-contain" />
            </div>
            <div className="auth-visual-card mt-8 w-full">
              <div className="flex items-start gap-4">
                <div className="auth-visual-icon">
                  <Icon icon="verified_user" size="lg" />
                </div>
                <div>
                  <h2 className="font-headline-md text-headline-md font-bold text-on-primary-container">
                    Sign in with confidence
                  </h2>
                  <p className="auth-visual-muted mt-3 font-body-md text-body-md">
                    A focused entry point for tracking symptoms, medications, and triage history.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="relative z-10 grid gap-3">
            {visualItems.map((item) => (
              <div key={item.label} className="auth-visual-list-item">
                <Icon icon={item.icon} size="lg" />
                <span>{item.label}</span>
              </div>
            ))}
          </div>
        </aside>
      </div>
    </main>
  )
}
