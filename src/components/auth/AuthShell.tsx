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

const trustItems = [
  { icon: 'shield_lock', label: 'Encrypted access' },
  { icon: 'ecg_heart', label: 'Triage-ready context' },
  { icon: 'schedule', label: 'Care history saved' },
]

const workflowItems = [
  { icon: 'verified_user', label: 'Identity checked', value: 'Secure session' },
  { icon: 'monitor_heart', label: 'Health context', value: 'Symptoms, notes, meds' },
  { icon: 'encrypted', label: 'Private records', value: 'Protected by default' },
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
    <main className="relative flex min-h-[100dvh] overflow-hidden bg-[linear-gradient(135deg,var(--color-background)_0%,var(--color-surface-container-low)_48%,var(--color-primary-container)_100%)] px-3 py-3 text-on-background sm:px-5 sm:py-5 lg:p-6">
      <div className="pointer-events-none absolute inset-0 opacity-45 [background-image:linear-gradient(var(--color-outline-variant)_1px,transparent_1px),linear-gradient(90deg,var(--color-outline-variant)_1px,transparent_1px)] [background-size:42px_42px]" />

      <div className="relative mx-auto grid min-h-[calc(100dvh-1.5rem)] w-full max-w-[1240px] overflow-hidden rounded-[28px] border border-outline-variant bg-surface-container-lowest/80 shadow-[0_30px_90px_rgba(15,23,42,0.16)] backdrop-blur-xl sm:min-h-[calc(100dvh-2.5rem)] lg:min-h-[calc(100dvh-3rem)] lg:grid-cols-[minmax(0,0.92fr)_minmax(460px,1.08fr)] dark:bg-surface-container-low/80 dark:shadow-[0_34px_100px_rgba(0,0,0,0.42)]">
        <section className="relative flex min-h-full items-center justify-center overflow-y-auto px-4 py-6 sm:px-8 sm:py-8 lg:px-11">
          <div className={`w-full ${maxWidthClass} motion-safe:animate-[auth-rise-in_520ms_cubic-bezier(0.16,1,0.3,1)_both]`}>
            <header className="mb-6 flex flex-col gap-5 sm:mb-7">
              <div className="flex items-center justify-between gap-4">
                <div className="flex min-w-0 items-center gap-4">
                  <img
                    src="/moidoctar-logo.svg"
                    alt="MoiDoctar"
                    className="h-20 w-20 shrink-0 object-contain sm:h-24 sm:w-24 motion-safe:animate-[auth-float-soft_5.5s_ease-in-out_infinite]"
                  />
                  <div className="min-w-0">
                    <p className="font-headline-md text-xl font-extrabold leading-7 text-primary sm:text-2xl">
                      {eyebrow}
                    </p>
                    <p className="font-body-md text-sm text-secondary">Health Triage</p>
                  </div>
                </div>

                <div className="hidden min-h-10 items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3 text-xs font-extrabold text-primary sm:inline-flex">
                  <Icon icon="lock" size="sm" aria-hidden="true" />
                  Secure
                </div>
              </div>

              <div className="flex flex-wrap gap-2 lg:hidden" aria-label="Auth security highlights">
                {trustItems.slice(0, 2).map((item) => (
                  <span
                    key={item.label}
                    className="inline-flex min-h-9 items-center gap-2 rounded-full border border-outline-variant bg-surface-container-low/70 px-3 text-xs font-bold text-secondary"
                  >
                    <Icon icon={item.icon} size="sm" aria-hidden="true" />
                    {item.label}
                  </span>
                ))}
              </div>

              <div>
                <h1 className="font-headline-md text-[2rem] font-extrabold leading-[2.45rem] text-on-surface sm:text-[2.35rem] sm:leading-[2.8rem]">
                  {title}
                </h1>
                <p className="mt-3 font-body-md text-body-md text-secondary">{subtitle}</p>
              </div>
            </header>

            {children}

            {footer && (
              <footer className="mt-5 text-center font-body-md text-body-md text-secondary sm:mt-6">
                {footer}
              </footer>
            )}
          </div>
        </section>

        <aside className="relative hidden min-h-full overflow-hidden bg-[linear-gradient(150deg,var(--color-primary-container)_0%,var(--color-primary-fixed-dim)_56%,var(--color-secondary-container)_120%)] p-8 text-on-primary-container lg:flex lg:flex-col lg:justify-between xl:p-10 dark:bg-[linear-gradient(150deg,#071249_0%,var(--color-primary-container)_58%,#123d51_120%)]">
          <div className="pointer-events-none absolute inset-0 opacity-25 [background-image:linear-gradient(var(--color-on-primary-container)_1px,transparent_1px),linear-gradient(90deg,var(--color-on-primary-container)_1px,transparent_1px)] [background-size:34px_34px]" />
          <div className="pointer-events-none absolute right-8 top-8 h-[calc(100%-4rem)] w-px bg-on-primary-container/20" />

          <div className="relative z-10 flex items-center justify-between gap-4 motion-safe:animate-[auth-rise-in_560ms_cubic-bezier(0.16,1,0.3,1)_both]">
            <div className="flex items-center gap-4">
              <img
                src="/moidoctar-logo.svg"
                alt=""
                className="h-24 w-24 shrink-0 object-contain motion-safe:animate-[auth-float-soft_6s_ease-in-out_infinite]"
                aria-hidden="true"
              />
              <div>
                <p className="font-label-md text-label-md text-on-primary-container/75">Secure intake</p>
                <p className="font-headline-md text-headline-md font-extrabold text-on-primary-container">
                  Guided health support
                </p>
              </div>
            </div>
            <div className="inline-flex min-h-10 items-center gap-2 rounded-full border border-on-primary-container/20 bg-on-primary-container/10 px-3 text-xs font-extrabold text-on-primary-container">
              <span className="h-2 w-2 rounded-full bg-teal-400 motion-safe:animate-[auth-pulse-soft_1.8s_ease-out_infinite]" aria-hidden="true" />
              Live
            </div>
          </div>

          <div className="relative z-10 mx-auto flex w-full max-w-[470px] flex-col py-8">
            <div className="rounded-[30px] border border-on-primary-container/20 bg-on-primary-container/[0.07] p-6 shadow-[0_28px_70px_rgba(0,0,0,0.14)] backdrop-blur-xl motion-safe:animate-[auth-rise-in_620ms_cubic-bezier(0.16,1,0.3,1)_both]">
              <div className="flex items-start justify-between gap-5 border-b border-on-primary-container/15 pb-5">
                <div>
                  <p className="font-body-md text-sm text-on-primary-container/75">Current session</p>
                  <h2 className="mt-1 font-headline-md text-headline-md font-extrabold text-on-primary-container">
                    Sign in with confidence
                  </h2>
                </div>
                <Icon icon="health_and_safety" size="xl" className="text-primary dark:text-primary-fixed-dim" aria-hidden="true" />
              </div>

              <div className="relative mx-auto my-8 grid h-60 w-60 place-items-center">
                <span className="absolute inset-3 rounded-full border border-on-primary-container/20 motion-safe:animate-[auth-ring-spin_12s_linear_infinite]" aria-hidden="true" />
                <span className="absolute inset-12 rounded-full border border-dashed border-on-primary-container/25 motion-safe:animate-[auth-ring-spin_16s_linear_infinite_reverse]" aria-hidden="true" />
                <Icon
                  icon="ecg_heart"
                  size="3xl"
                  className="relative z-10 text-primary drop-shadow-[0_16px_28px_rgba(0,38,214,0.22)] motion-safe:animate-[auth-pulse-soft_2.4s_ease-in-out_infinite]"
                  aria-hidden="true"
                />
              </div>

              <div className="grid gap-3">
                {workflowItems.map((item, index) => (
                  <div
                    key={item.label}
                    className="flex items-center gap-3 rounded-2xl border border-on-primary-container/15 bg-on-primary-container/[0.06] p-3 motion-safe:animate-[auth-rise-in_520ms_cubic-bezier(0.16,1,0.3,1)_both]"
                    style={{ animationDelay: `${120 + index * 70}ms` }}
                  >
                    <Icon icon={item.icon} size="lg" className="shrink-0 text-primary dark:text-primary-fixed-dim" aria-hidden="true" />
                    <div>
                      <p className="font-body-md text-sm font-extrabold text-on-primary-container">{item.label}</p>
                      <p className="font-body-md text-sm text-on-primary-container/70">{item.value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="relative z-10 grid gap-3">
            {trustItems.map((item, index) => (
              <div
                key={item.label}
                className="flex items-center gap-3 rounded-2xl border border-on-primary-container/15 bg-on-primary-container/[0.06] px-4 py-3 font-body-md text-sm font-bold text-on-primary-container backdrop-blur motion-safe:animate-[auth-rise-in_520ms_cubic-bezier(0.16,1,0.3,1)_both]"
                style={{ animationDelay: `${180 + index * 70}ms` }}
              >
                <Icon icon={item.icon} size="lg" className="text-primary dark:text-primary-fixed-dim" aria-hidden="true" />
                <span>{item.label}</span>
              </div>
            ))}
          </div>
        </aside>
      </div>
    </main>
  )
}
