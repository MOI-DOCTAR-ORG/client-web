import { useState } from 'react'
import { Link } from 'react-router-dom'
import Icon from '../components/Icon'

export default function ForgotPassword() {
  const [email, setEmail] = useState('')
  const [sent, setSent] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (email.trim()) setSent(true)
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-surface">
      <div className="w-full max-w-md bg-surface-container-lowest rounded-xl shadow-level-1 border border-secondary-fixed p-8 flex flex-col gap-6 relative z-10">
        <div className="flex flex-col items-center gap-4 text-center">
          <div className="w-16 h-16 bg-surface-container-low rounded-full flex items-center justify-center text-primary">
            <Icon icon="lock_reset" className="text-4xl" />
          </div>
          <div>
            <h1 className="font-headline-lg text-headline-lg text-on-surface">Forgot Password</h1>
            <p className="font-body-md text-body-md text-secondary mt-2">
              {sent ? 'Check your email for the reset link.' : 'Enter your email and we will send you a reset link.'}
            </p>
          </div>
        </div>

        {!sent ? (
          <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
            <div className="flex flex-col gap-2">
              <label className="font-label-md text-label-md text-on-surface" htmlFor="reset-email">Email Address</label>
              <div className="relative flex items-center bg-surface-container-low border border-secondary-fixed rounded-lg transition-all duration-200">
                <Icon icon="mail" className="text-secondary ml-3 absolute" />
                <input
                  className="w-full bg-transparent border-none py-3 pl-10 pr-4 font-body-md text-body-md text-on-surface placeholder-secondary-fixed-dim focus:ring-0 rounded-lg"
                  id="reset-email"
                  placeholder="name@example.com"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>
            <button
              className="w-full bg-primary hover:bg-primary/90 text-on-primary font-label-md text-label-md py-3 rounded-full transition-colors duration-200"
              type="submit"
            >
              Send Reset Link
            </button>
          </form>
        ) : (
          <div className="flex flex-col items-center gap-5 py-4">
            <div className="w-16 h-16 bg-green-50 dark:bg-green-900/30 rounded-full flex items-center justify-center">
              <Icon icon="check_circle" className="text-green-700 dark:text-green-300 text-4xl" />
            </div>
            <p className="font-body-md text-body-md text-secondary text-center">
              If an account with <strong className="text-on-surface">{email}</strong> exists, you will receive a password reset link shortly.
            </p>
            <button
              onClick={() => { setSent(false); setEmail('') }}
              className="text-primary font-label-md text-label-md hover:underline"
            >
              Send to another email
            </button>
          </div>
        )}

        <div className="text-center mt-2">
          <Link className="text-primary font-bold hover:underline inline-flex items-center gap-1" to="/sign-in">
            <Icon icon="arrow_back" className="text-[18px]" />
            Back to Sign In
          </Link>
        </div>
      </div>
    </div>
  )
}
