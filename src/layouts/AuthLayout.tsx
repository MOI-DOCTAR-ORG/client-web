import { Outlet, Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import OfflineBanner from '../components/OfflineBanner'

export default function AuthLayout() {
  const { isAuthenticated } = useAuth()

  if (isAuthenticated) {
    return <Navigate to="/" replace />
  }

  return (
    <div className="min-h-screen overflow-x-hidden bg-background text-on-background">
      <OfflineBanner />
      <Outlet />
    </div>
  )
}
