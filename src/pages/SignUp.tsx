import { useState, useMemo, useCallback } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Icon from '../components/Icon'
import { useAuth } from '../context/AuthContext'

type Strength = 'Weak' | 'Medium' | 'Strong'

export default function SignUp() {
  const navigate = useNavigate()
  const { signUp } = useAuth()
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)

  const hasLength = password.length >= 8
  const hasLetter = /[a-zA-Z]/.test(password)
  const hasNumber = /[0-9]/.test(password)

  const strength = useMemo<Strength>(() => {
    let score = 0
    if (hasLength) score++
    if (hasLetter) score++
    if (hasNumber) score++
    if (score === 0) return 'Weak'
    if (score === 1) return 'Weak'
    if (score === 2) return 'Medium'
    return 'Strong'
  }, [hasLength, hasLetter, hasNumber])

  const getBarColor = (index: number) => {
    const score = [hasLength, hasLetter, hasNumber].filter(Boolean).length
    if (index === 0 && score >= 1) return score === 1 ? 'bg-error' : score === 2 ? 'bg-[#EAB308]' : 'bg-[#22C55E]'
    if (index === 1 && score >= 2) return score === 2 ? 'bg-[#EAB308]' : 'bg-[#22C55E]'
    if (index === 2 && score >= 3) return 'bg-[#22C55E]'
    return 'bg-secondary-fixed-dim'
  }

  const getStrengthColor = () => {
    if (strength === 'Weak' && password.length === 0) return 'text-secondary'
    if (strength === 'Weak') return 'text-error'
    if (strength === 'Medium') return 'text-[#EAB308]'
    return 'text-[#22C55E]'
  }

  const requirements = useCallback(() => {
    return [
      { label: 'At least 8 characters', met: hasLength },
      { label: 'Contains a letter', met: hasLetter },
      { label: 'Contains a number', met: hasNumber },
    ]
  }, [hasLength, hasLetter, hasNumber])

  return (
    <div className="bg-background min-h-screen flex items-center justify-center relative overflow-hidden font-body-md text-on-surface">
      <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] rounded-full opacity-[0.05] pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(0,27,212,0.05) 0%, rgba(249,249,255,0) 70%)' }}
      />
      <div className="absolute bottom-[-20%] right-[-10%] w-[60vw] h-[60vw] rounded-full opacity-[0.08] pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(43,62,240,0.08) 0%, rgba(249,249,255,0) 70%)' }}
      />
      <main className="w-full max-w-md px-margin-mobile md:px-0 relative z-10">
        <div className="flex flex-col items-center mb-8">
          <div className="flex items-center justify-center w-16 h-16 rounded-full bg-surface-container-low mb-4 shadow-sm">
            <Icon icon="medical_services" className="text-primary text-4xl" />
          </div>
          <h1 className="font-headline-xl text-headline-xl text-primary text-center">moidoctar</h1>
          <p className="font-body-md text-body-md text-secondary mt-2">Create your secure account</p>
        </div>

        <div className="bg-surface-container-lowest rounded-xl border border-secondary-fixed shadow-[0px_4px_20px_rgba(0,0,0,0.03)] p-8">
          <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); signUp(email, password); navigate('/otp-verification') }}>
            <div className="space-y-2">
              <label className="block font-label-md text-label-md text-on-surface" htmlFor="email">Email Address</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Icon icon="mail" className="text-outline" />
                </div>
                <input
                  className="w-full pl-12 pr-4 py-3 bg-surface-container-low border border-secondary-fixed rounded-full font-body-md text-body-md text-on-surface focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all"
                  id="email"
                  name="email"
                  placeholder="name@example.com"
                  required
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="block font-label-md text-label-md text-on-surface" htmlFor="phone">Phone Number</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Icon icon="phone" className="text-outline" />
                </div>
                <input
                  className="w-full pl-12 pr-4 py-3 bg-surface-container-low border border-secondary-fixed rounded-full font-body-md text-body-md text-on-surface focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all"
                  id="phone"
                  name="phone"
                  placeholder="(555) 000-0000"
                  required
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="block font-label-md text-label-md text-on-surface" htmlFor="password">Password</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Icon icon="lock" className="text-outline" />
                </div>
                <input
                  className="w-full pl-12 pr-12 py-3 bg-surface-container-low border border-secondary-fixed rounded-full font-body-md text-body-md text-on-surface focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all"
                  id="password"
                  name="password"
                  placeholder="Create a password"
                  required
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  className="absolute inset-y-0 right-0 pr-4 flex items-center text-outline hover:text-primary transition-colors"
                  id="togglePassword"
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  <Icon icon={showPassword ? 'visibility' : 'visibility_off'} />
                </button>
              </div>
            </div>

            <div className="space-y-3 pt-2">
              <div className="flex justify-between items-center">
                <span className="font-caption text-caption text-secondary">Password Strength</span>
                <span className={`font-caption text-caption font-medium ${getStrengthColor()}`}>
                  {password.length === 0 ? 'Weak' : strength}
                </span>
              </div>
              <div className="flex gap-2 h-1.5">
                {[0, 1, 2].map((i) => (
                  <div
                    key={i}
                    className={`flex-1 rounded-full transition-colors duration-300 ${getBarColor(i)}`}
                  />
                ))}
              </div>
              <ul className="space-y-2 mt-4">
                {requirements().map((req, i) => (
                  <li
                    key={i}
                    className={`flex items-center gap-2 font-caption text-caption transition-colors ${
                      req.met ? 'text-[#22C55E]' : 'text-secondary'
                    }`}
                  >
                    <Icon icon="check_circle" className="text-[16px]" />
                    {req.label}
                  </li>
                ))}
              </ul>
            </div>

            <button
              className="w-full bg-primary hover:bg-[#1A2AC2] text-on-primary rounded-full py-3 font-label-md text-label-md transition-colors duration-200 mt-6 shadow-sm"
              type="submit"
            >
              Create Account
            </button>
          </form>

          <div className="flex items-center gap-4 py-2 mt-6">
            <div className="h-px bg-secondary-fixed flex-1" />
            <span className="font-caption text-caption text-secondary">OR</span>
            <div className="h-px bg-secondary-fixed flex-1" />
          </div>

          <div className="flex justify-center gap-4 mb-6">
            <button className="w-12 h-12 flex items-center justify-center rounded-full border border-secondary-fixed bg-white hover:bg-surface-container-low transition-colors" aria-label="Sign up with Google">
              <svg viewBox="0 0 24 24" className="w-5 h-5">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
            </button>
            <button className="w-12 h-12 flex items-center justify-center rounded-full border border-secondary-fixed bg-white hover:bg-surface-container-low transition-colors" aria-label="Sign up with Apple">
              <svg viewBox="0 0 24 24" className="w-5 h-5">
                <path fill="#000" d="M17.05 20.28c-.98.95-2.05.88-3.08.4-1.09-.5-2.08-.48-3.24 0-1.44.62-2.2.44-3.06-.4C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/>
              </svg>
            </button>
          </div>

          <div className="text-center">
            <p className="font-body-md text-body-md text-secondary">
              Already have an account?{' '}
              <Link className="text-primary font-medium hover:underline" to="/sign-in">Sign In</Link>
            </p>
          </div>
        </div>
      </main>
    </div>
  )
}
