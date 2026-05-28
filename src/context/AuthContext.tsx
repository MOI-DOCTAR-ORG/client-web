import { createContext, useContext, useState, useCallback, useEffect, type ReactNode } from 'react'
import { scopeKey } from '../utils/storage'


type User = {
  firstName: string
  lastName: string
  username: string
  email: string
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

type AuthState = {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
}

type AuthContextValue = AuthState & {
  signIn: (email: string) => void
  signUp: (firstName: string, lastName: string, username: string, email: string, password: string) => void
  verifyOtp: (code: string) => boolean
  signOut: () => void
  sessions: TriageSession[]
  addSession: (session: TriageSession) => void
  removeSession: (id: string) => void
  userChangeKey: number
}

const AuthContext = createContext<AuthContextValue | null>(null)

function loadSessions(): TriageSession[] {
  try {
    const data = localStorage.getItem(scopeKey('doctarr_sessions'))
    return data ? JSON.parse(data) : []
  } catch { return [] }
}

function saveSessions(sessions: TriageSession[]) {
  try { localStorage.setItem(scopeKey('doctarr_sessions'), JSON.stringify(sessions)) } catch {}
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AuthState>(() => {
    try {
      const stored = localStorage.getItem('doctarr_auth')
      if (stored) return JSON.parse(stored)
    } catch {}
    return { user: null, isAuthenticated: false, isLoading: false }
  })
  const [sessions, setSessions] = useState<TriageSession[]>(loadSessions)
  const [userChangeKey, setUserChangeKey] = useState(0)

  useEffect(() => {
    if (state.isAuthenticated) {
      try { localStorage.setItem('doctarr_auth', JSON.stringify(state)) } catch {}
    }
  }, [state])

  useEffect(() => { saveSessions(sessions) }, [sessions])

  const signIn = useCallback((email: string) => {
    const user: User = { firstName: '', lastName: '', username: '', email }
    setState({ user, isAuthenticated: false, isLoading: true })
    setUserChangeKey(k => k + 1)
  }, [])

  const signUp = useCallback((firstName: string, lastName: string, username: string, email: string, _password: string) => {
    const user: User = { firstName, lastName, username, email }
    setState({ user, isAuthenticated: false, isLoading: true })
    setUserChangeKey(k => k + 1)
    try {
      localStorage.setItem(scopeKey('doctarr_name'), `${firstName} ${lastName}`)
    } catch {}
  }, [])

  const verifyOtp = useCallback((code: string) => {
    if (code.length === 6) {
      setState((prev) => ({
        user: prev.user,
        isAuthenticated: true,
        isLoading: false,
      }))
      return true
    }
    return false
  }, [])

  const signOut = useCallback(() => {
    setState({ user: null, isAuthenticated: false, isLoading: false })
    setSessions([])
    setUserChangeKey(k => k + 1)
    try {
      localStorage.removeItem('doctarr_auth')
    } catch {}
  }, [])

  const addSession = useCallback((session: TriageSession) => {
    setSessions((prev) => [session, ...prev])
  }, [])

  const removeSession = useCallback((id: string) => {
    setSessions((prev) => prev.filter(s => s.id !== id))
  }, [])

  return (
    <AuthContext.Provider value={{ ...state, signIn, signUp, verifyOtp, signOut, sessions, addSession, removeSession, userChangeKey }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
