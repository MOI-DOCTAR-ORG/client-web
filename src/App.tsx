import { Navigate, Routes, Route } from 'react-router-dom'
import AppLayout from './layouts/AppLayout'
import AuthLayout from './layouts/AuthLayout'
import Landing from './pages/Landing'
import Dashboard from './pages/Dashboard'
import NewTriage from './pages/NewTriage'
import SplashScreen from './pages/SplashScreen'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'
import OtpVerification from './pages/OtpVerification'
import AgeSelection from './pages/AgeSelection'
import BodyMap from './pages/BodyMap'
import PinpointPain from './pages/PinpointPain'
import History from './pages/History'
import CareDetails from './pages/CareDetails'
import SymptomTracker from './pages/SymptomTracker'
import MedicationTracker from './pages/MedicationTracker'
import Notifications from './pages/Notifications'
import Profile from './pages/Profile'
import NewTriageInterface from './pages/NewTriageInterface'
import NewTriageBodyMap from './pages/NewTriageBodyMap'
import SymptomTrackerBodyMap from './pages/SymptomTrackerBodyMap'
import NotFound from './pages/NotFound'
import ForgotPassword from './pages/ForgotPassword'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />

      {/* Auth pages - no sidebar, redirect to app if authenticated */}
      <Route element={<AuthLayout />}>
        <Route path="/splash" element={<SplashScreen />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/verify-email" element={<OtpVerification />} />
        <Route path="/age-selection" element={<AgeSelection />} />
        <Route path="/body-map" element={<BodyMap />} />
        <Route path="/pinpoint-pain" element={<PinpointPain />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
      </Route>

      {/* App pages - with sidebar, require auth */}
      <Route path="/app" element={<AppLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="new-triage" element={<NewTriage />} />
        <Route path="history" element={<History />} />
        <Route path="care-details" element={<CareDetails />} />
        <Route path="symptom-tracker" element={<SymptomTracker />} />
        <Route path="medication-tracker" element={<MedicationTracker />} />
        <Route path="notifications" element={<Notifications />} />
        <Route path="profile" element={<Profile />} />
        <Route path="new-triage-interface" element={<NewTriageInterface />} />
        <Route path="new-triage-body-map" element={<NewTriageBodyMap />} />
        <Route path="symptom-tracker-body-map" element={<SymptomTrackerBodyMap />} />
      </Route>

      {/* Legacy app route redirects */}
      <Route path="/new-triage" element={<Navigate to="/app/new-triage" replace />} />
      <Route path="/history" element={<Navigate to="/app/history" replace />} />
      <Route path="/care-details" element={<Navigate to="/app/care-details" replace />} />
      <Route path="/symptom-tracker" element={<Navigate to="/app/symptom-tracker" replace />} />
      <Route path="/medication-tracker" element={<Navigate to="/app/medication-tracker" replace />} />
      <Route path="/notifications" element={<Navigate to="/app/notifications" replace />} />
      <Route path="/profile" element={<Navigate to="/app/profile" replace />} />
      <Route path="/new-triage-interface" element={<Navigate to="/app/new-triage-interface" replace />} />
      <Route path="/new-triage-body-map" element={<Navigate to="/app/new-triage-body-map" replace />} />
      <Route path="/symptom-tracker-body-map" element={<Navigate to="/app/symptom-tracker-body-map" replace />} />

      {/* Catch-all 404 */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}
