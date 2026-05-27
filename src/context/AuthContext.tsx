import { createContext, useContext, useState, useCallback, type ReactNode } from 'react'

type User = {
  name: string
  email: string
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
}

const AuthContext = createContext<AuthContextValue | null>(null)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AuthState>({
    user: null,
    isAuthenticated: false,
    isLoading: false,
  })

  const signIn = useCallback((email: string) => {
    setState({ user: { name: 'Alex', email }, isAuthenticated: false, isLoading: true })
  }, [])

  const signUp = useCallback((email: string, _password: string) => {
    setState({ user: { name: email.split('@')[0], email }, isAuthenticated: false, isLoading: true })
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
  }, [])

  return (
    <AuthContext.Provider value={{ ...state, signIn, signUp, verifyOtp, signOut }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
