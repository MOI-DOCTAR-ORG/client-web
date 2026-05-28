import { useState, useRef, useEffect, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import Icon from '../components/Icon'
import { useAuth } from '../context/AuthContext'

export default function OtpVerification() {
  const navigate = useNavigate()
  const { verifyOtp } = useAuth()
  const [otp, setOtp] = useState<string[]>(Array(6).fill(''))
  const [timeLeft, setTimeLeft] = useState(45)
  const [canResend, setCanResend] = useState(false)
  const [isVerified, setIsVerified] = useState(false)
  const [isError, setIsError] = useState(false)
  const inputRefs = useRef<(HTMLInputElement | null)[]>([])

  useEffect(() => {
    if (timeLeft <= 0) {
      setCanResend(true)
      return
    }
    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1)
    }, 1000)
    return () => clearInterval(timer)
  }, [timeLeft])

  useEffect(() => {
    inputRefs.current[0]?.focus()
  }, [])

  const focusInput = useCallback((index: number) => {
    if (index >= 0 && index < 6) {
      inputRefs.current[index]?.focus()
    }
  }, [])

  const handleChange = (index: number, value: string) => {
    const digit = value.replace(/[^0-9]/g, '')
    if (!digit) return
    const newOtp = [...otp]
    newOtp[index] = digit
    setOtp(newOtp)
    setIsError(false)
    if (index < 5) focusInput(index + 1)
  }

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace') {
      if (otp[index] === '' && index > 0) {
        const newOtp = [...otp]
        newOtp[index - 1] = ''
        setOtp(newOtp)
        focusInput(index - 1)
      } else if (otp[index] !== '') {
        const newOtp = [...otp]
        newOtp[index] = ''
        setOtp(newOtp)
      }
    } else if (e.key === 'Enter') {
      if (otp.every(d => d !== '')) handleVerify()
    }
  }

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault()
    const pastedData = e.clipboardData.getData('text').replace(/[^0-9]/g, '').slice(0, 6)
    if (!pastedData) return
    const newOtp = [...otp]
    pastedData.split('').forEach((char, i) => {
      if (i < 6) newOtp[i] = char
    })
    setOtp(newOtp)
    const nextIndex = Math.min(pastedData.length, 5)
    focusInput(nextIndex)
  }

  const handleResend = () => {
    if (!canResend) return
    setTimeLeft(45)
    setCanResend(false)
    setOtp(Array(6).fill(''))
    setIsVerified(false)
    setIsError(false)
    setTimeout(() => focusInput(0), 50)
  }

  const handleVerify = () => {
    const code = otp.join('')
    if (code.length !== 6) {
      setIsError(true)
      return
    }
    const ok = verifyOtp(code)
    if (ok) {
      setIsVerified(true)
      setTimeout(() => navigate('/'), 1500)
    } else {
      setIsError(true)
    }
  }

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60)
    const s = seconds % 60
    return `${m}:${s < 10 ? '0' : ''}${s}`
  }

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden font-body-md text-on-surface bg-surface">
      <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] rounded-full blur-[80px] opacity-30 pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(0,27,212,0.15) 0%, rgba(249,249,255,0) 70%)' }}
      />
      <div className="absolute bottom-[-20%] right-[-10%] w-[60vw] h-[60vw] rounded-full blur-[80px] opacity-30 pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(43,62,240,0.1) 0%, rgba(249,249,255,0) 70%)' }}
      />
      <main className="w-full max-w-[480px] px-margin-mobile md:px-0 relative z-10">
        <div className="bg-surface-container-lowest rounded-card border border-outline-variant shadow-level-1 p-8 md:p-10 flex flex-col items-center relative overflow-hidden transition-all duration-300">
          {!isVerified ? (
            <>
              <div className="mb-8 flex flex-col items-center">
                <div className="w-16 h-16 bg-surface-container rounded-full flex items-center justify-center mb-4 text-primary">
                  <Icon icon="shield_person" className="text-[32px]" />
                </div>
                <h1 className="font-headline-md text-headline-md text-center text-on-surface">Enter Verification Code</h1>
                <p className="mt-2 text-secondary font-body-md text-center">
                  We've sent a 6-digit code to <br />
                  <span className="font-semibold text-on-surface">your email address</span>
                </p>
              </div>

              <form className="w-full flex flex-col items-center" onSubmit={(e) => e.preventDefault()}>
                <div className="flex justify-center gap-2 md:gap-3 mb-8 w-full">
                  {otp.map((digit, i) => (
                    <input
                      key={i}
                      ref={(el) => { inputRefs.current[i] = el }}
                      autoComplete="one-time-code"
                      autoFocus={i === 0}
                      className={`w-12 h-14 md:w-14 md:h-16 text-center font-headline-md text-headline-md rounded-input border bg-surface text-on-surface transition-all duration-200 outline-none ${
                        isError && !digit ? 'border-error' : 'border-outline-variant'
                      } ${isError && !digit ? '' : 'focus:border-primary focus:shadow-[0_0_0_2px_rgba(0,27,212,0.2)]'}`}
                      maxLength={1}
                      type="text"
                      inputMode="numeric"
                      value={digit}
                      onChange={(e) => handleChange(i, e.target.value)}
                      onKeyDown={(e) => handleKeyDown(i, e)}
                      onPaste={i === 0 ? handlePaste : undefined}
                    />
                  ))}
                </div>

                {isError && (
                  <p className="font-caption text-caption text-error mb-4 flex items-center gap-1 -mt-4">
                    <Icon icon="error" className="text-[16px]" />
                    Invalid code. Please try again.
                  </p>
                )}

                <button
                  className="w-full bg-primary hover:bg-primary/90 text-on-primary font-label-md text-label-md py-4 rounded-full transition-colors duration-200 flex justify-center items-center gap-2 disabled:opacity-40"
                  type="button"
                  onClick={handleVerify}
                  disabled={otp.some(d => !d)}
                >
                  Verify Account
                </button>
              </form>

              <div className="mt-6 flex items-center justify-center gap-1 font-body-md">
                <span className="text-secondary">Didn't receive the code?</span>
                <button
                  className={`text-primary hover:text-primary/90 font-semibold transition-colors duration-200 ${
                    !canResend ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                  disabled={!canResend}
                  onClick={handleResend}
                >
                  {canResend ? 'Resend Code Now' : `Resend code in ${formatTime(timeLeft)}`}
                </button>
              </div>
            </>
          ) : (
            <div className="flex flex-col items-center justify-center py-8">
              <div className="w-20 h-20 bg-green-50 dark:bg-green-900/30 rounded-full flex items-center justify-center mb-6">
                <Icon icon="check_circle" className="text-green-700 dark:text-green-300 text-[48px]" />
              </div>
              <h2 className="font-headline-md text-headline-md text-on-surface mb-2">Verified Successfully</h2>
              <p className="text-secondary font-body-md text-center">Redirecting to your dashboard...</p>
            </div>
          )}
        </div>

        <div className="mt-8 text-center">
          <a className="inline-flex items-center gap-2 text-secondary hover:text-primary transition-colors font-label-md text-label-md" href="#">
            <Icon icon="help" className="text-[20px]" />
            Contact Support
          </a>
        </div>
      </main>
    </div>
  )
}
