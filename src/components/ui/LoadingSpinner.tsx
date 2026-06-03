export default function LoadingSpinner({ text = 'Loading...' }: { text?: string }) {
  return (
    <div className="auth-page-shell min-h-screen flex items-center justify-center bg-background px-4 py-6">
      <div className="auth-card-enter w-full max-w-sm rounded-2xl border border-outline-variant bg-surface-container-lowest p-8 text-center shadow-[0_18px_54px_rgba(15,23,42,0.14)]">
        <img src="/moidoctar-logo.svg" alt="MoiDoctar" className="mx-auto mb-5 h-20 w-20 object-contain" />
        <div className="w-10 h-10 border-4 border-primary/20 border-t-primary rounded-full animate-spin mx-auto mb-4" />
        <p className="font-body-md text-secondary">{text}</p>
      </div>
    </div>
  )
}
