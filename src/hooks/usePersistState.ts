import { useState, useEffect, useCallback } from 'react'

export function usePersistState<T>(key: string, initial: T): [T, (value: T | ((prev: T) => T)) => void] {
  const [state, setState] = useState<T>(() => {
    try {
      const stored = localStorage.getItem(key)
      return stored ? JSON.parse(stored) : initial
    } catch {
      return initial
    }
  })

  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(state))
    } catch { /* quota exceeded */ }
  }, [key, state])

  const setPersistedState = useCallback((value: T | ((prev: T) => T)) => {
    setState(value)
  }, [])

  return [state, setPersistedState]
}
