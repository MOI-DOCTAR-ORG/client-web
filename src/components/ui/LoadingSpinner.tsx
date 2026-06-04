export default function LoadingSpinner({ text = 'Loading...' }: { text?: string }) {
  return (
    <div className="relative flex min-h-[100dvh] items-center justify-center overflow-hidden bg-[linear-gradient(135deg,var(--color-background)_0%,var(--color-surface-container-low)_48%,var(--color-primary-container)_100%)] px-4 py-6 text-on-background">
      <div className="w-full max-w-sm rounded-[28px] border border-outline-variant bg-surface-container-lowest/80 p-8 text-center shadow-[0_24px_70px_rgba(15,23,42,0.14)] backdrop-blur-xl motion-safe:animate-[auth-rise-in_520ms_cubic-bezier(0.16,1,0.3,1)_both] dark:bg-surface-container-low/80">
        <img src="/moidoctar-logo.svg" alt="MoiDoctar" className="mx-auto mb-5 h-24 w-24 object-contain motion-safe:animate-[auth-float-soft_5.5s_ease-in-out_infinite]" />
        <div className="w-10 h-10 border-4 border-primary/20 border-t-primary rounded-full animate-spin mx-auto mb-4" />
        <p className="font-body-md text-secondary">{text}</p>
      </div>
    </div>
  )
}
