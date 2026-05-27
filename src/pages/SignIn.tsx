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
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({})

  const validate = () => {
    const e: { email?: string; password?: string } = {}
    if (!email.trim()) {
      e.email = 'Email or phone is required'
    } else if (!/\S+@\S+/.test(email) && !/^\+?[\d\s()-]{7,}$/.test(email)) {
      e.email = 'Enter a valid email or phone number'
    }
    if (!password) {
      e.password = 'Password is required'
    } else if (password.length < 6) {
      e.password = 'Password must be at least 6 characters'
    }
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!validate()) return
    signIn(email)
    navigate('/otp-verification')
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-surface">
      <div className="w-full max-w-md bg-white rounded-xl shadow-level-1 border border-secondary-fixed p-8 flex flex-col gap-6 relative z-10">
        <div className="flex flex-col items-center gap-4 text-center">
          <img src="/doctarr.jpeg" alt="moidoctar" className="w-20 h-20 rounded-2xl object-cover shadow-level-1" />
          <div>
            <h1 className="font-headline-lg text-headline-lg text-on-surface">Welcome Back</h1>
            <p className="font-body-md text-body-md text-secondary mt-2">Enter your details to access your triage history.</p>
          </div>
        </div>

        <form className="flex flex-col gap-5" onSubmit={handleSubmit} noValidate>
          <div className="flex flex-col gap-2">
            <label className="font-label-md text-label-md text-on-surface" htmlFor="email">Email or Phone</label>
            <div className={`relative flex items-center border rounded-lg transition-all duration-200 ${
              errors.email ? 'bg-error-container border-error' : 'bg-surface-container-low border-secondary-fixed'
            }`}>
              <Icon icon="mail" className={`ml-3 absolute ${errors.email ? 'text-error' : 'text-secondary'}`} />
              <input
                className={`w-full bg-transparent border-none py-3 pl-10 pr-4 font-body-md text-body-md focus:ring-0 rounded-lg ${
                  errors.email ? 'text-on-error-container placeholder-secondary-fixed-dim' : 'text-on-surface placeholder-secondary-fixed-dim'
                }`}
                id="email"
                placeholder="name@example.com"
                type="text"
                value={email}
                onChange={(e) => { setEmail(e.target.value); setErrors(p => ({ ...p, email: undefined })) }}
              />
            </div>
            {errors.email && (
              <p className="font-caption text-caption text-error mt-1 flex items-center gap-1">
                <Icon icon="error" className="text-[16px]" />
                {errors.email}
              </p>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <div className="flex justify-between items-center">
              <label className="font-label-md text-label-md text-on-surface" htmlFor="password">Password</label>
              <Link className="font-label-md text-label-md text-primary hover:text-on-primary-fixed-variant transition-colors" to="/forgot-password">Forgot password?</Link>
            </div>
            <div className={`relative flex items-center border rounded-lg transition-all duration-200 ${
              errors.password ? 'bg-error-container border-error' : 'bg-surface-container-low border-secondary-fixed'
            }`}>
              <Icon icon="lock" className={`ml-3 absolute ${errors.password ? 'text-error' : 'text-secondary'}`} />
              <input
                className={`w-full bg-transparent border-none py-3 pl-10 pr-10 font-body-md text-body-md focus:ring-0 rounded-lg ${
                  errors.password ? 'text-on-error-container' : 'text-on-surface'
                } placeholder-secondary-fixed-dim`}
                id="password"
                placeholder="••••••••"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => { setPassword(e.target.value); setErrors(p => ({ ...p, password: undefined })) }}
              />
              <button
                className="absolute right-3 text-secondary hover:text-on-surface transition-colors"
                type="button"
                onClick={() => setShowPassword(!showPassword)}
              >
                <Icon icon={showPassword ? 'visibility' : 'visibility_off'} />
              </button>
            </div>
            {errors.password && (
              <p className="font-caption text-caption text-error mt-1 flex items-center gap-1">
                <Icon icon="error" className="text-[16px]" />
                {errors.password}
              </p>
            )}
          </div>

          <button
            className="w-full bg-primary hover:bg-primary/90 text-on-primary font-label-md text-label-md py-3 rounded-full transition-colors duration-200 mt-2 disabled:opacity-40 disabled:cursor-not-allowed"
            type="submit"
            disabled={!email.trim() || !password}
          >
            Continue
          </button>
        </form>

        <div className="flex items-center gap-4 py-2">
          <div className="h-px bg-secondary-fixed flex-1" />
          <span className="font-caption text-caption text-secondary">OR</span>
          <div className="h-px bg-secondary-fixed flex-1" />
        </div>

        <div className="flex justify-center gap-4">
          <button onClick={() => { signIn('google-user@example.com'); navigate('/otp-verification') }} className="w-12 h-12 flex items-center justify-center rounded-full border border-secondary-fixed bg-white hover:bg-surface-container-low transition-colors" aria-label="Sign in with Google">
            <svg viewBox="0 0 24 24" className="w-5 h-5">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
          </button>
          <button onClick={() => { signIn('apple-user@example.com'); navigate('/otp-verification') }} className="w-12 h-12 flex items-center justify-center rounded-full border border-secondary-fixed bg-white hover:bg-surface-container-low transition-colors" aria-label="Sign in with Apple">
            <svg viewBox="0 0 24 24" className="w-5 h-5">
              <path fill="#000" d="M17.05 20.28c-.98.95-2.05.88-3.08.4-1.09-.5-2.08-.48-3.24 0-1.44.62-2.2.44-3.06-.4C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/>
            </svg>
          </button>
        </div>

        <div className="text-center mt-2">
          <p className="font-body-md text-body-md text-secondary">
            New to moidoctar?{' '}
            <Link className="text-primary font-bold hover:underline" to="/sign-up">Create an account</Link>
          </p>
        </div>
      </div>
    </div>
  )
}
