import { createContext, useContext, useState, useCallback, useEffect, type ReactNode } from 'react'

type User = {
  name: string
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
  signUp: (email: string, password: string) => void
  verifyOtp: (code: string) => boolean
  signOut: () => void
  sessions: TriageSession[]
  addSession: (session: TriageSession) => void
  removeSession: (id: string) => void
}

const AuthContext = createContext<AuthContextValue | null>(null)

function loadSessions(): TriageSession[] {
  try {
    const data = localStorage.getItem('doctarr_sessions')
    return data ? JSON.parse(data) : []
  } catch { return [] }
}

function saveSessions(sessions: TriageSession[]) {
  try { localStorage.setItem('doctarr_sessions', JSON.stringify(sessions)) } catch {}
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

  useEffect(() => {
    if (state.isAuthenticated) {
      try { localStorage.setItem('doctarr_auth', JSON.stringify(state)) } catch {}
    }
  }, [state])

  useEffect(() => { saveSessions(sessions) }, [sessions])

  const signIn = useCallback((email: string) => {
    const user = { name: email.split('@')[0], email }
    setState({ user, isAuthenticated: false, isLoading: true })
  }, [])

  const signUp = useCallback((email: string, _password: string) => {
    const user = { name: email.split('@')[0], email }
    setState({ user, isAuthenticated: false, isLoading: true })
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
    try {
      localStorage.removeItem('doctarr_auth')
      localStorage.removeItem('doctarr_sessions')
    } catch {}
  }, [])

  const addSession = useCallback((session: TriageSession) => {
    setSessions((prev) => [session, ...prev])
  }, [])

  const removeSession = useCallback((id: string) => {
    setSessions((prev) => prev.filter(s => s.id !== id))
  }, [])

  return (
    <AuthContext.Provider value={{ ...state, signIn, signUp, verifyOtp, signOut, sessions, addSession, removeSession }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
