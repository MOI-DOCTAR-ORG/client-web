import { useState, useRef, useEffect, useCallback } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import Icon from '../components/Icon'
import AuthShell from '../components/auth/AuthShell'
import {
  authErrorBanner,
  authLink,
  authPrimaryButton,
} from '../components/auth/authStyles'
import { useAuth } from '../context/AuthContext'
import { useToastContext } from '../context/ToastContext'
import { getAccessToken } from '../services/api'

export default function OtpVerification() {
  const navigate = useNavigate()
  const location = useLocation()
  const { verifyEmail, resendVerificationCode, isAuthenticated } = useAuth()
  const { addToast } = useToastContext()

  const email = (location.state as { email?: string } | null)?.email || 'your email'
  const [otp, setOtp] = useState<string[]>(Array(6).fill(''))
  const [isVerifying, setIsVerifying] = useState(false)
  const [isResending, setIsResending] = useState(false)
  const [isError, setIsError] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')
  const inputRefs = useRef<(HTMLInputElement | null)[]>([])

  useEffect(() => {
    inputRefs.current[0]?.focus()
  }, [])

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/', { replace: true })
    }
  }, [isAuthenticated, navigate])

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
    setErrorMsg('')
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

  const handleResend = useCallback(async () => {
    if (isResending) return
    if (!getAccessToken()) {
      addToast('Session expired. Please sign in again.', 'error')
      navigate('/sign-in', { replace: true })
      return
    }
    setIsResending(true)
    setOtp(Array(6).fill(''))
    setIsError(false)
    setErrorMsg('')
    await resendVerificationCode()
    setIsResending(false)
    addToast('A new code has been sent to your email.', 'success')
    setTimeout(() => focusInput(0), 50)
  }, [isResending, resendVerificationCode, addToast, navigate, focusInput])

  const handleVerify = async () => {
    const code = otp.join('')
    if (code.length !== 6) {
      setIsError(true)
      setErrorMsg('Please enter the full 6-digit code.')
      return
    }

    setIsVerifying(true)
    const ok = await verifyEmail(code)
    if (ok) {
      navigate('/', { replace: true })
    } else {
      setIsVerifying(false)
      setIsError(true)
      setErrorMsg('Invalid or expired code. Please try again.')
    }
  }

  return (
    <AuthShell
      title="Verify your email"
      subtitle={
        <>
          Enter the verification code sent to <span className="font-semibold text-on-surface">{email}</span>.
        </>
      }
    >
      <div className="auth-form-stack flex flex-col gap-6">
        <div className="flex justify-center gap-2 sm:gap-3 w-full">
          {otp.map((digit, i) => (
            <input
              key={i}
              ref={(el) => { inputRefs.current[i] = el }}
              autoComplete="one-time-code"
              autoFocus={i === 0}
              className={`auth-otp-input ${isError && !digit ? 'auth-otp-input-error animate-shake' : ''} ${
                isVerifying ? 'opacity-50 pointer-events-none' : ''
              }`}
              maxLength={1}
              type="text"
              inputMode="numeric"
              value={digit}
              onChange={(e) => handleChange(i, e.target.value)}
              onKeyDown={(e) => handleKeyDown(i, e)}
              onPaste={i === 0 ? handlePaste : undefined}
              disabled={isVerifying}
              aria-label={`Digit ${i + 1} of 6`}
            />
          ))}
        </div>

        {isError && (
          <div className={authErrorBanner} role="alert" aria-live="polite">
            <Icon icon="error" size="lg" className="mt-0.5 shrink-0" aria-hidden="true" />
            <p className="flex-1">{errorMsg}</p>
          </div>
        )}

        <button
          className={authPrimaryButton}
          type="button"
          onClick={handleVerify}
          disabled={otp.some(d => !d) || isVerifying}
          aria-label="Verify email code"
        >
          {isVerifying ? (
            <>
              <span className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" aria-hidden="true" />
              Verifying...
            </>
          ) : (
            'Verify Email'
          )}
        </button>

        <div className="flex flex-wrap items-center justify-center gap-1.5 font-body-md">
          <span className="text-secondary text-sm">Didn&apos;t receive the code?</span>
          <button
            className={`${authLink} text-sm disabled:opacity-50 disabled:cursor-not-allowed`}
            disabled={isVerifying || isResending}
            onClick={handleResend}
            aria-label="Resend verification code"
            type="button"
          >
            {isResending ? 'Sending...' : 'Resend Code'}
          </button>
        </div>
      </div>
    </AuthShell>
  )
}
