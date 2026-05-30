import { createContext, useContext, useState, useCallback, useEffect, type ReactNode } from 'react'
import { scopeKey } from '../utils/storage'

type RegisteredUser = {
  id: string
  fullName: string
  email: string
  passwordHash: string
  verified: boolean
  createdAt: string
}

export type TriageSession = {
  id: string
  date: string
  time: string
  condition: string
  description: string
  severity: 'Urgent' | 'Moderate' | 'Stable'
  statusLabel: string
  statusIcon: string
  tags?: string[]
  summary?: string
  severityClass?: string
  severityIcon?: string
}

type SessionTokens = {
  accessToken: string
  refreshToken: string
  expiresAt: number
}

type LoginResult = { success: true } | { success: false; error: string; lockedUntil?: number }
type SignUpResult = { success: true } | { success: false; error: string }

type AuthState = {
  user: RegisteredUser | null
  isAuthenticated: boolean
  isLoading: boolean
}

type AuthContextValue = AuthState & {
  signIn: (email: string, password: string, rememberMe?: boolean) => LoginResult
  signUp: (fullName: string, email: string, password: string) => SignUpResult
  verifyEmail: (code: string) => boolean
  resendVerificationCode: () => void
  signOut: () => void
  sessions: TriageSession[]
  addSession: (session: TriageSession) => void
  removeSession: (id: string) => void
  userChangeKey: number
}

const USERS_KEY = 'doctarr_users'
const ATTEMPTS_KEY = 'doctarr_login_attempts'
const SESSION_KEY = 'doctarr_session'
const VERIFICATION_KEY = 'doctarr_verification_code'
const MAX_ATTEMPTS = 5
const LOCKOUT_MS = 15 * 60 * 1000

const AuthContext = createContext<AuthContextValue | null>(null)

function getUsers(): RegisteredUser[] {
  try { return JSON.parse(localStorage.getItem(USERS_KEY) || '[]') } catch { return [] }
}

function saveUsers(users: RegisteredUser[]) {
  try { localStorage.setItem(USERS_KEY, JSON.stringify(users)) } catch {}
}

function hashPassword(password: string): string {
  let hash = 0
  for (let i = 0; i < password.length; i++) {
    hash = ((hash << 5) - hash) + password.charCodeAt(i)
    hash |= 0
  }
  return `sim_bcrypt_${Math.abs(hash).toString(36)}`
}

function generateTokens(userId: string): SessionTokens {
  const expiresAt = Date.now() + 7 * 24 * 60 * 60 * 1000
  const accessToken = btoa(JSON.stringify({ sub: userId, iat: Date.now(), exp: expiresAt, type: 'access' })) + '.' + btoa(String(Math.random()))
  const refreshToken = btoa(JSON.stringify({ sub: userId, iat: Date.now(), exp: expiresAt + 86400000, type: 'refresh' })) + '.' + btoa(String(Math.random()))
  return { accessToken, refreshToken, expiresAt }
}

function rotateTokens(userId: string): SessionTokens {
  const tokens = generateTokens(userId)
  try { localStorage.setItem(SESSION_KEY, JSON.stringify(tokens)) } catch {}
  return tokens
}

function loadSessionTokens(): SessionTokens | null {
  try {
    const data = localStorage.getItem(SESSION_KEY)
    return data ? JSON.parse(data) : null
  } catch { return null }
}

function clearSession() {
  try { localStorage.removeItem(SESSION_KEY) } catch {}
}

function getLoginAttempts(): Record<string, { count: number; lastAttempt: number; lockedUntil: number | null }> {
  try { return JSON.parse(localStorage.getItem(ATTEMPTS_KEY) || '{}') } catch { return {} }
}

function saveLoginAttempts(attempts: Record<string, { count: number; lastAttempt: number; lockedUntil: number | null }>) {
  try { localStorage.setItem(ATTEMPTS_KEY, JSON.stringify(attempts)) } catch {}
}

function loadSessions(): TriageSession[] {
  try {
    const data = localStorage.getItem(scopeKey('doctarr_sessions'))
    return data ? JSON.parse(data) : []
  } catch { return [] }
}

function saveSessions(sessions: TriageSession[]) {
  try { localStorage.setItem(scopeKey('doctarr_sessions'), JSON.stringify(sessions)) } catch {}
}

function generateVerificationCode(): string {
  const code = String(Math.floor(100000 + Math.random() * 900000))
  try { localStorage.setItem(VERIFICATION_KEY, code) } catch {}
  return code
}

function getStoredVerificationCode(): string | null {
  try { return localStorage.getItem(VERIFICATION_KEY) } catch { return null }
}

function clearVerificationCode() {
  try { localStorage.removeItem(VERIFICATION_KEY) } catch {}
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AuthState>(() => {
    try {
      const tokens = loadSessionTokens()
      if (tokens && tokens.expiresAt > Date.now()) {
        const users = getUsers()
        const payload = JSON.parse(atob(tokens.accessToken.split('.')[0]))
        const user = users.find(u => u.id === payload.sub)
        if (user) return { user, isAuthenticated: true, isLoading: false }
      }
      if (tokens && tokens.expiresAt <= Date.now()) clearSession()
    } catch {}
    return { user: null, isAuthenticated: false, isLoading: false }
  })

  const [sessions, setSessions] = useState<TriageSession[]>(loadSessions)
  const [userChangeKey, setUserChangeKey] = useState(0)

  useEffect(() => { saveSessions(sessions) }, [sessions])

  const signIn = useCallback((email: string, password: string, rememberMe?: boolean): LoginResult => {
    const normalizedEmail = email.toLowerCase().trim()
    const users = getUsers()
    const attempts = getLoginAttempts()
    const record = attempts[normalizedEmail]

    if (record?.lockedUntil && Date.now() < record.lockedUntil) {
      const remaining = Math.ceil((record.lockedUntil - Date.now()) / 60000)
      return { success: false, error: `Too many attempts. Try again in ${remaining} minute${remaining === 1 ? '' : 's'}.`, lockedUntil: record.lockedUntil }
    }

    if (record?.lockedUntil && Date.now() >= record.lockedUntil) {
      delete attempts[normalizedEmail]
      saveLoginAttempts(attempts)
    }

    const user = users.find(u => u.email === normalizedEmail)
    if (!user || user.passwordHash !== hashPassword(password)) {
      const newRecord = attempts[normalizedEmail] || { count: 0, lastAttempt: 0, lockedUntil: null }
      newRecord.count++
      newRecord.lastAttempt = Date.now()
      if (newRecord.count >= MAX_ATTEMPTS) {
        newRecord.lockedUntil = Date.now() + LOCKOUT_MS
      }
      attempts[normalizedEmail] = newRecord
      saveLoginAttempts(attempts)
      return { success: false, error: 'Incorrect email or password' }
    }

    delete attempts[normalizedEmail]
    saveLoginAttempts(attempts)

    if (!user.verified) {
      return { success: false, error: 'Please verify your email before signing in.' }
    }

    const tokens = generateTokens(user.id)
    if (rememberMe) {
      try { localStorage.setItem(SESSION_KEY, JSON.stringify(tokens)) } catch {}
    } else {
      try { sessionStorage.setItem(SESSION_KEY, JSON.stringify(tokens)) } catch {}
    }

    try { localStorage.setItem('doctarr_current_user_email', user.email) } catch {}

    setState({ user, isAuthenticated: true, isLoading: false })
    setUserChangeKey(k => k + 1)
    return { success: true }
  }, [])

  const signUp = useCallback((fullName: string, email: string, password: string): SignUpResult => {
    const normalizedEmail = email.toLowerCase().trim()
    const users = getUsers()

    if (users.some(u => u.email === normalizedEmail)) {
      return { success: false, error: 'This email is already registered. Log in instead?' }
    }

    const newUser: RegisteredUser = {
      id: 'user_' + Date.now().toString(36) + Math.random().toString(36).slice(2, 6),
      fullName,
      email: normalizedEmail,
      passwordHash: hashPassword(password),
      verified: false,
      createdAt: new Date().toISOString(),
    }

    saveUsers([...users, newUser])
    generateVerificationCode()
    setState(prev => ({ ...prev, user: newUser }))
    return { success: true }
  }, [])

  const verifyEmail = useCallback((code: string): boolean => {
    // TODO: Replace with real backend verification
    if (code.length !== 6) return false

    const users = getUsers()
    const currentUser = state.user
    if (!currentUser) return false

    const updated = users.map(u => u.id === currentUser.id ? { ...u, verified: true } : u)
    saveUsers(updated)
    clearVerificationCode()

    const verifiedUser = updated.find(u => u.id === currentUser.id)!
    const tokens = generateTokens(verifiedUser.id)
    try { localStorage.setItem(SESSION_KEY, JSON.stringify(tokens)) } catch {}
    try { localStorage.setItem('doctarr_current_user_email', verifiedUser.email) } catch {}

    setState({ user: verifiedUser, isAuthenticated: true, isLoading: false })
    setUserChangeKey(k => k + 1)
    return true
  }, [state.user])

  const resendVerificationCode = useCallback(() => {
    generateVerificationCode()
  }, [])

  const signOut = useCallback(() => {
    const tokens = loadSessionTokens()
    if (tokens) {
      const payload = JSON.parse(atob(tokens.refreshToken.split('.')[0]))
      payload.exp = 0
    }
    clearSession()
    try { sessionStorage.removeItem(SESSION_KEY) } catch {}
    setState({ user: null, isAuthenticated: false, isLoading: false })
    setSessions([])
    setUserChangeKey(k => k + 1)
    try { localStorage.removeItem('doctarr_current_user_email') } catch {}
  }, [])

  const addSession = useCallback((session: TriageSession) => {
    setSessions(prev => [session, ...prev])
  }, [])

  const removeSession = useCallback((id: string) => {
    setSessions(prev => prev.filter(s => s.id !== id))
  }, [])

  return (
    <AuthContext.Provider value={{ ...state, signIn, signUp, verifyEmail, resendVerificationCode, signOut, sessions, addSession, removeSession, userChangeKey }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
