import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Icon from '../components/Icon'
import { useAuth } from '../context/AuthContext'

export default function SignIn() {
  const navigate = useNavigate()
  const { signIn } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [rememberMe, setRememberMe] = useState(false)
  const [error, setError] = useState('')
  const [lockedUntil, setLockedUntil] = useState<number | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const validate = () => {
    if (!email.trim() || !password) {
      setError('Invalid email or password.')
      return false
    }
    return true
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    if (!validate()) return
    setIsSubmitting(true)
    const result = signIn(email.trim(), password, rememberMe)
    setIsSubmitting(false)
    if (result.success) {
      navigate('/', { replace: true })
    } else {
      setError(result.error)
      if (result.lockedUntil) setLockedUntil(result.lockedUntil)
    }
  }

  const formatLockout = (until: number) => {
    const remaining = Math.ceil((until - Date.now()) / 60000)
    return `${remaining} minute${remaining === 1 ? '' : 's'}`
  }

  const handleQuickFill = (e: string, p: string) => {
    setEmail(e)
    setPassword(p)
    setError('')
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-surface">
      <div className="w-full max-w-md bg-surface-container-lowest rounded-xl shadow-level-1 border border-secondary-fixed p-8 flex flex-col gap-6 relative z-10">
        <div className="flex flex-col items-center gap-4 text-center">
          <img src="/doctarr.jpeg" alt="MoiDoctar" className="w-20 h-20 rounded-2xl object-cover shadow-level-1" />
          <div>
            <h1 className="font-headline-lg text-headline-lg text-on-surface">Welcome Back</h1>
            <p className="font-body-md text-body-md text-secondary mt-2">Enter your details to access your triage history.</p>
          </div>
        </div>

        {error && (
          <div className="flex items-center gap-3 px-4 py-3 rounded-lg bg-error-container/20 border border-error/30 text-error">
            <Icon icon="error" className="text-xl shrink-0" />
            <p className="font-body-md text-sm">
              {error}
              {lockedUntil && Date.now() < lockedUntil && (
                <span className="block text-xs mt-1 opacity-80">Lockout expires in {formatLockout(lockedUntil)}</span>
              )}
            </p>
          </div>
        )}

        <form className="flex flex-col gap-5" onSubmit={handleSubmit} noValidate>
          <div className="flex flex-col gap-2">
            <label className="font-label-md text-label-md text-on-surface" htmlFor="email">Email or Username</label>
            <div className="relative flex items-center border border-secondary-fixed bg-surface-container-low rounded-lg transition-all duration-200 focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/20">
              <Icon icon="mail" className="ml-3 absolute text-secondary" />
              <input
                className="w-full bg-transparent border-none py-3 pl-10 pr-4 font-body-md text-body-md focus:ring-0 rounded-lg text-on-surface placeholder-secondary-fixed-dim"
                id="email"
                placeholder="name@example.com"
                type="text"
                value={email}
                onChange={(e) => { setEmail(e.target.value); setError('') }}
              />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <div className="flex justify-between items-center">
              <label className="font-label-md text-label-md text-on-surface" htmlFor="password">Password</label>
              <Link className="font-label-md text-label-md text-primary hover:text-on-primary-fixed-variant transition-colors" to="/forgot-password">Forgot password?</Link>
            </div>
            <div className="relative flex items-center border border-secondary-fixed bg-surface-container-low rounded-lg transition-all duration-200 focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/20">
              <Icon icon="lock" className="ml-3 absolute text-secondary" />
              <input
                className="w-full bg-transparent border-none py-3 pl-10 pr-10 font-body-md text-body-md focus:ring-0 rounded-lg text-on-surface placeholder-secondary-fixed-dim"
                id="password"
                placeholder="••••••••"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => { setPassword(e.target.value); setError('') }}
              />
              <button
                className="absolute right-3 text-secondary hover:text-on-surface transition-colors"
                type="button"
                onClick={() => setShowPassword(!showPassword)}
              >
                <Icon icon={showPassword ? 'visibility' : 'visibility_off'} />
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="w-4 h-4 rounded border-outline text-primary focus:ring-primary"
              />
              <span className="font-body-md text-sm text-on-surface">Remember me</span>
            </label>
          </div>

          <button
            className="w-full bg-primary hover:bg-primary/90 text-on-primary font-label-md text-label-md py-3 rounded-full transition-colors duration-200 mt-2 disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            type="submit"
            disabled={!email.trim() || !password || isSubmitting}
          >
            {isSubmitting ? (
              <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              'Sign In'
            )}
          </button>
        </form>

        <div className="flex items-center gap-4 py-2">
          <div className="h-px bg-secondary-fixed flex-1" />
          <span className="font-caption text-caption text-secondary">OR</span>
          <div className="h-px bg-secondary-fixed flex-1" />
        </div>

        <div className="text-center">
          <button onClick={() => handleQuickFill('demo@example.com', 'Demo1234')} className="text-sm text-secondary hover:text-primary transition-colors font-label-md">
            Use demo account
          </button>
        </div>

        <div className="text-center mt-2">
          <p className="font-body-md text-body-md text-secondary">
            New to MoiDoctar?{' '}
            <Link className="text-primary font-bold hover:underline" to="/sign-up">Create an account</Link>
          </p>
        </div>
      </div>
    </div>
  )
}
