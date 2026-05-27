import { useState, useMemo, useCallback } from 'react'
import { Link } from 'react-router-dom'
import Icon from '../components/Icon'

type Strength = 'Weak' | 'Medium' | 'Strong'

export default function SignUp() {
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
          <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
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

          <div className="mt-6 text-center">
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
