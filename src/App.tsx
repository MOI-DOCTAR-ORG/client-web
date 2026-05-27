import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Sidebar from './components/Sidebar'
import Dashboard from './pages/Dashboard'
import NewTriage from './pages/NewTriage'
import SplashScreen from './pages/SplashScreen'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'
import OtpVerification from './pages/OtpVerification'
import AgeSelection from './pages/AgeSelection'
import BodyMap from './pages/BodyMap'
import PinpointPain from './pages/PinpointPain'
import SessionHistory from './pages/SessionHistory'
import CareDetails from './pages/CareDetails'
import SymptomTracker from './pages/SymptomTracker'
import MedicationTracker from './pages/MedicationTracker'
import Notifications from './pages/Notifications'
import Profile from './pages/Profile'
import MedicalHistory from './pages/MedicalHistory'
import Dashboard2 from './pages/Dashboard2'
import NewTriageInterface from './pages/NewTriageInterface'
import NewTriageBodyMap from './pages/NewTriageBodyMap'
import SymptomTrackerBodyMap from './pages/SymptomTrackerBodyMap'

function AppLayout() {
  return (
    <div className="min-h-screen bg-background text-on-background font-body-md">
      <div className="bg-blob w-[500px] h-[500px] bg-primary rounded-full top-[-10%] right-[-10%]" />
      <div className="bg-blob w-[400px] h-[400px] bg-secondary rounded-full bottom-[-5%] left-[-5%]" />
      <Sidebar />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/new-triage" element={<NewTriage />} />
        <Route path="/session-history" element={<SessionHistory />} />
        <Route path="/care-details" element={<CareDetails />} />
        <Route path="/symptom-tracker" element={<SymptomTracker />} />
        <Route path="/medication-tracker" element={<MedicationTracker />} />
        <Route path="/notifications" element={<Notifications />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/medical-history" element={<MedicalHistory />} />
        <Route path="/dashboard-alt" element={<Dashboard2 />} />
        <Route path="/new-triage-interface" element={<NewTriageInterface />} />
        <Route path="/new-triage-body-map" element={<NewTriageBodyMap />} />
        <Route path="/symptom-tracker-body-map" element={<SymptomTrackerBodyMap />} />
      </Routes>
    </div>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/splash" element={<SplashScreen />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/otp-verification" element={<OtpVerification />} />
        <Route path="/age-selection" element={<AgeSelection />} />
        <Route path="/body-map" element={<BodyMap />} />
        <Route path="/pinpoint-pain" element={<PinpointPain />} />
        <Route path="/*" element={<AppLayout />} />
      </Routes>
    </BrowserRouter>
  )
}
