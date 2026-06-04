const focusRing = 'focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary/25 focus-visible:ring-offset-2 focus-visible:ring-offset-surface-container-lowest'

export const authField = 'flex flex-col gap-2'
export const authLabel = 'font-label-md text-label-md text-on-surface'
export const authInputFrame = [
  'relative flex min-h-14 items-center rounded-2xl border border-outline-variant',
  'bg-surface-container-lowest/70 text-on-surface shadow-[0_10px_26px_rgba(15,23,42,0.05)]',
  'transition duration-200 ease-out focus-within:-translate-y-0.5 focus-within:border-primary focus-within:ring-4 focus-within:ring-primary/15',
  'dark:bg-surface-container-high/70 dark:border-outline/35',
].join(' ')
export const authInputFrameError = [
  authInputFrame,
  'border-error ring-4 ring-error/15 focus-within:border-error focus-within:ring-error/15',
].join(' ')
export const authInputIcon = 'ml-3.5 shrink-0 text-primary'
export const authInput = [
  'w-full border-0 bg-transparent px-3.5 py-3 font-body-md text-base leading-6 text-on-surface outline-none',
  'placeholder:text-secondary-fixed-dim disabled:cursor-not-allowed disabled:opacity-60',
  'dark:placeholder:text-on-surface-variant/60',
].join(' ')
export const authPrimaryButton = [
  'inline-flex min-h-14 w-full items-center justify-center gap-2.5 rounded-2xl border border-primary',
  'bg-primary px-5 py-3.5 font-body-md text-sm font-extrabold text-on-primary shadow-[0_16px_36px_rgba(0,38,214,0.24)]',
  'transition duration-200 ease-out hover:-translate-y-0.5 hover:shadow-[0_20px_44px_rgba(0,38,214,0.28)] active:translate-y-0 active:scale-[0.99]',
  'disabled:cursor-not-allowed disabled:opacity-60 disabled:shadow-none',
  focusRing,
].join(' ')
export const authSecondaryButton = [
  'inline-flex min-h-14 w-full items-center justify-center gap-2.5 rounded-2xl border border-outline-variant',
  'bg-surface-container-low/70 px-5 py-3.5 font-body-md text-sm font-extrabold text-on-surface shadow-[0_10px_26px_rgba(15,23,42,0.05)]',
  'transition duration-200 ease-out hover:-translate-y-0.5 hover:border-primary/45 hover:bg-surface-container-high active:translate-y-0 active:scale-[0.99]',
  'disabled:cursor-not-allowed disabled:opacity-60 disabled:shadow-none',
  'dark:border-outline/35 dark:bg-surface-container-high/65',
  focusRing,
].join(' ')
export const authLink = [
  'rounded-md font-extrabold text-primary no-underline transition hover:underline',
  'focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary/25 focus-visible:ring-offset-2 focus-visible:ring-offset-surface-container-lowest',
].join(' ')
export const authErrorBanner = [
  'flex items-start gap-3 rounded-2xl border border-error/35 bg-error-container/30 px-3.5 py-3 font-body-md text-sm leading-5 text-error',
].join(' ')
export const authSuccessBanner = [
  'flex items-start gap-3 rounded-2xl border border-green-500/35 bg-green-500/10 px-3.5 py-3 font-body-md text-sm leading-5 text-green-700 dark:text-green-300',
].join(' ')
export const authDivider = [
  'flex items-center gap-3 font-body-md text-xs font-bold text-secondary',
  'before:h-px before:flex-1 before:bg-outline-variant after:h-px after:flex-1 after:bg-outline-variant',
].join(' ')
export const authFormStack = 'flex flex-col gap-5 motion-safe:[&>*]:animate-[auth-rise-in_500ms_cubic-bezier(0.16,1,0.3,1)_both]'
