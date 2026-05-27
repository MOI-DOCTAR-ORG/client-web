import { useState } from 'react'
import { Link } from 'react-router-dom'
import Icon from '../components/Icon'

export default function SignIn() {
  const [hasError, setHasError] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setHasError(true)
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4" style={{ backgroundColor: '#F7F8FF' }}>
      <div className="w-full max-w-md bg-white rounded-xl shadow-level-1 border border-secondary-fixed p-8 flex flex-col gap-6 relative z-10">
        <div className="flex flex-col items-center gap-4 text-center">
          <div className="w-16 h-16 bg-surface-container-low rounded-full flex items-center justify-center text-primary">
            <Icon icon="medical_services" className="text-4xl" />
          </div>
          <div>
            <h1 className="font-headline-lg text-headline-lg text-on-surface">Welcome Back</h1>
            <p className="font-body-md text-body-md text-secondary mt-2">Enter your details to access your triage history.</p>
          </div>
        </div>

        <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
          <div className="flex flex-col gap-2">
            <label className="font-label-md text-label-md text-on-surface" htmlFor="email">Email or Phone</label>
            <div
              className={`relative flex items-center border rounded-lg transition-all duration-200 ${
                hasError
                  ? 'bg-error-container border-error'
                  : 'bg-surface-container-low border-secondary-fixed'
              }`}
            >
              <Icon icon="mail" className={`ml-3 absolute ${hasError ? 'text-error' : 'text-secondary'}`} />
              <input
                className={`w-full bg-transparent border-none py-3 pl-10 pr-4 font-body-md text-body-md focus:ring-0 rounded-lg ${
                  hasError ? 'text-on-error-container placeholder-secondary-fixed-dim' : 'text-on-surface placeholder-secondary-fixed-dim'
                }`}
                id="email"
                placeholder="name@example.com"
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            {hasError && (
              <p className="font-caption text-caption text-error mt-1 flex items-center gap-1">
                <Icon icon="error" className="text-[16px]" />
                Invalid credentials
              </p>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <div className="flex justify-between items-center">
              <label className="font-label-md text-label-md text-on-surface" htmlFor="password">Password</label>
              <a className="font-label-md text-label-md text-primary hover:text-on-primary-fixed-variant transition-colors" href="#">Forgot password?</a>
            </div>
            <div className="relative flex items-center bg-surface-container-low border border-secondary-fixed rounded-lg transition-all duration-200">
              <Icon icon="lock" className="text-secondary ml-3 absolute" />
              <input
                className="w-full bg-transparent border-none py-3 pl-10 pr-10 font-body-md text-body-md text-on-surface placeholder-secondary-fixed-dim focus:ring-0 rounded-lg"
                id="password"
                placeholder="••••••••"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
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

          <button
            className="w-full bg-primary hover:bg-[#1A2AC2] text-on-primary font-label-md text-label-md py-3 rounded-full transition-colors duration-200 mt-2"
            type="submit"
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
          <button className="w-12 h-12 flex items-center justify-center rounded-full border border-secondary-fixed bg-white hover:bg-surface-container-low transition-colors text-on-surface">
            <span className="font-headline-md font-bold text-lg">G</span>
          </button>
          <button className="w-12 h-12 flex items-center justify-center rounded-full border border-secondary-fixed bg-white hover:bg-surface-container-low transition-colors text-on-surface">
            <Icon icon="ios" />
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
