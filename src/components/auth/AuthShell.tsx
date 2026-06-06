import type { ReactNode } from 'react'
import Icon from '../Icon'

type AuthShellProps = {
  title: string
  subtitle: ReactNode
  children: ReactNode
  footer?: ReactNode
  eyebrow?: string
  maxWidthClass?: string
  visualPosition?: 'left' | 'right'
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

const animatedMedicalIcons = [
  {
    icon: 'ecg_heart',
    label: 'Vitals',
    centerClass: 'motion-safe:animate-[auth-medical-surface-1_12s_cubic-bezier(0.16,1,0.3,1)_infinite]',
    stationClass: 'left-1/2 top-0 -translate-x-1/2',
    stationPulseClass: 'motion-safe:animate-[auth-station-pulse-1_12s_ease-in-out_infinite]',
  },
  {
    icon: 'medical_services',
    label: 'Care',
    centerClass: 'motion-safe:animate-[auth-medical-surface-2_12s_cubic-bezier(0.16,1,0.3,1)_infinite]',
    stationClass: 'right-0 top-1/2 -translate-y-1/2',
    stationPulseClass: 'motion-safe:animate-[auth-station-pulse-2_12s_ease-in-out_infinite]',
  },
  {
    icon: 'clinical_notes',
    label: 'Notes',
    centerClass: 'motion-safe:animate-[auth-medical-surface-3_12s_cubic-bezier(0.16,1,0.3,1)_infinite]',
    stationClass: 'bottom-0 left-1/2 -translate-x-1/2',
    stationPulseClass: 'motion-safe:animate-[auth-station-pulse-3_12s_ease-in-out_infinite]',
  },
  {
    icon: 'medication',
    label: 'Meds',
    centerClass: 'motion-safe:animate-[auth-medical-surface-4_12s_cubic-bezier(0.16,1,0.3,1)_infinite]',
    stationClass: 'left-0 top-1/2 -translate-y-1/2',
    stationPulseClass: 'motion-safe:animate-[auth-station-pulse-4_12s_ease-in-out_infinite]',
  },
]

export default function AuthShell({
  title,
  subtitle,
  children,
  footer,
  eyebrow = 'MoiDoctar',
  maxWidthClass = 'max-w-[440px]',
  visualPosition = 'right',
}: AuthShellProps) {
  const visualOnLeft = visualPosition === 'left'
  const gridClass = visualOnLeft
    ? 'lg:grid-cols-[minmax(460px,1.08fr)_minmax(0,0.92fr)]'
    : 'lg:grid-cols-[minmax(0,0.92fr)_minmax(460px,1.08fr)]'
  const formOrderClass = visualOnLeft
    ? 'lg:order-2 motion-safe:lg:animate-[auth-panel-slide-from-right_720ms_cubic-bezier(0.16,1,0.3,1)_both]'
    : 'motion-safe:lg:animate-[auth-panel-slide-from-left_720ms_cubic-bezier(0.16,1,0.3,1)_both]'
  const visualOrderClass = visualOnLeft
    ? 'lg:order-1 motion-safe:lg:animate-[auth-panel-slide-from-left_760ms_cubic-bezier(0.16,1,0.3,1)_both]'
    : 'motion-safe:lg:animate-[auth-panel-slide-from-right_760ms_cubic-bezier(0.16,1,0.3,1)_both]'

  return (
    <main className="relative flex min-h-[100dvh] overflow-hidden bg-[linear-gradient(135deg,var(--color-background)_0%,var(--color-surface-container-low)_48%,var(--color-primary-container)_100%)] px-3 py-3 text-on-background sm:px-5 sm:py-5 lg:p-6">
      <div className="pointer-events-none absolute inset-0 opacity-45 [background-image:linear-gradient(var(--color-outline-variant)_1px,transparent_1px),linear-gradient(90deg,var(--color-outline-variant)_1px,transparent_1px)] [background-size:42px_42px]" />

      <div className={`relative mx-auto grid min-h-[calc(100dvh-1.5rem)] w-full max-w-[1240px] overflow-hidden rounded-[28px] border border-outline-variant bg-surface-container-lowest/80 shadow-[0_30px_90px_rgba(15,23,42,0.16)] backdrop-blur-xl sm:min-h-[calc(100dvh-2.5rem)] lg:min-h-[calc(100dvh-3rem)] ${gridClass} dark:bg-surface-container-low/80 dark:shadow-[0_34px_100px_rgba(0,0,0,0.42)]`}>
        <section className={`relative flex min-h-full items-start justify-center overflow-y-auto px-4 py-6 sm:px-8 sm:py-8 lg:px-11 ${formOrderClass}`}>
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

        <aside className={`relative hidden min-h-full overflow-hidden bg-[linear-gradient(150deg,var(--color-primary-container)_0%,var(--color-primary-fixed-dim)_56%,var(--color-secondary-container)_120%)] p-8 text-on-primary-container lg:flex lg:flex-col lg:justify-between xl:p-10 ${visualOrderClass} dark:bg-[linear-gradient(150deg,#071249_0%,var(--color-primary-container)_58%,#123d51_120%)]`}>
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

              <div className="relative mx-auto my-8 grid h-[19rem] w-[19rem] place-items-center">
                <span className="absolute inset-0 rounded-full border-2 border-on-primary-container/15" aria-hidden="true" />
                <span className="absolute inset-4 rounded-full border-[5px] border-primary/25 shadow-[0_0_54px_rgba(0,38,214,0.22)] motion-safe:animate-[auth-ring-breathe_3.4s_ease-in-out_infinite]" aria-hidden="true" />
                <span className="absolute inset-9 rounded-full border-2 border-dashed border-on-primary-container/40 motion-safe:animate-[auth-ring-spin_14s_linear_infinite]" aria-hidden="true" />
                <span className="absolute inset-[4.35rem] rounded-full border-2 border-on-primary-container/20 motion-safe:animate-[auth-ring-spin_18s_linear_infinite_reverse]" aria-hidden="true" />

                {animatedMedicalIcons.map((item) => (
                  <div
                    key={item.icon}
                    className={`absolute z-20 grid h-11 w-11 place-items-center rounded-2xl border border-on-primary-container/20 bg-on-primary-container/[0.08] text-primary shadow-[0_12px_30px_rgba(0,38,214,0.12)] backdrop-blur dark:text-primary-fixed-dim ${item.stationClass} ${item.stationPulseClass}`}
                    aria-hidden="true"
                  >
                    <Icon icon={item.icon} size="lg" />
                  </div>
                ))}

                <div className="relative z-10 grid h-44 w-44 place-items-center overflow-hidden rounded-full border-[5px] border-primary/35 bg-[radial-gradient(circle_at_35%_20%,var(--color-primary-container)_0%,var(--color-primary)_72%,var(--color-primary)_100%)] shadow-[0_28px_64px_rgba(0,38,214,0.28)] backdrop-blur-xl">
                  <div className="absolute inset-2 rounded-full border border-on-primary/20 bg-[radial-gradient(circle_at_35%_20%,rgba(255,255,255,0.32)_0%,transparent_28%),radial-gradient(circle_at_74%_78%,rgba(94,234,212,0.22)_0%,transparent_32%)] opacity-90" aria-hidden="true" />

                  <div className="absolute inset-x-[-24%] bottom-[-10%] h-[120%] origin-bottom overflow-hidden rounded-[46%] bg-[linear-gradient(180deg,rgba(125,245,229,0.92)_0%,rgba(38,99,235,0.94)_48%,rgba(0,38,214,0.98)_100%)] shadow-[inset_0_18px_40px_rgba(255,255,255,0.18)] motion-safe:animate-[auth-real-water-fill_12s_ease-in-out_infinite]" aria-hidden="true">
                    <span className="absolute -top-5 left-[-26%] h-11 w-[154%] rounded-[48%] bg-teal-100/55 motion-safe:animate-[auth-wave-drift_3.2s_linear_infinite]" />
                    <span className="absolute -top-3 left-[-38%] h-10 w-[178%] rounded-[46%] bg-primary-fixed-dim/42 motion-safe:animate-[auth-wave-drift_4.4s_linear_infinite_reverse]" />
                    <span className="absolute bottom-8 left-8 h-2 w-2 rounded-full bg-on-primary/55 motion-safe:animate-[auth-bubble-rise_4.8s_ease-in_infinite]" />
                    <span className="absolute bottom-5 left-20 h-1.5 w-1.5 rounded-full bg-on-primary/45 motion-safe:animate-[auth-bubble-rise_5.8s_ease-in_900ms_infinite]" />
                    <span className="absolute bottom-12 right-10 h-2.5 w-2.5 rounded-full bg-on-primary/35 motion-safe:animate-[auth-bubble-rise_6.2s_ease-in_1400ms_infinite]" />
                  </div>

                  <div className="pointer-events-none absolute left-10 top-8 h-4 w-10 rotate-[-18deg] rounded-full bg-on-primary/24 blur-[2px]" aria-hidden="true" />

                  {animatedMedicalIcons.map((item) => (
                    <span
                      key={item.icon}
                      className={`absolute z-10 grid place-items-center text-on-primary drop-shadow-[0_12px_26px_rgba(0,0,0,0.24)] ${item.centerClass}`}
                    >
                      <Icon icon={item.icon} size="3xl" aria-hidden="true" />
                      <span className="mt-2 font-label-md text-xs font-extrabold uppercase text-on-primary/90">{item.label}</span>
                    </span>
                  ))}
                </div>
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
