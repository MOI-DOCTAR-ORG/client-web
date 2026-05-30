import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Icon from '../components/Icon'

export default function SplashScreen() {
  const navigate = useNavigate()
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const fadeTimer = setTimeout(() => setVisible(true), 100)
    const navTimer = setTimeout(() => navigate('/sign-in', { replace: true }), 1800)
    return () => {
      clearTimeout(fadeTimer)
      clearTimeout(navTimer)
    }
  }, [navigate])

  return (
    <main className="relative flex flex-col items-center justify-center min-h-screen w-full bg-primary-container overflow-hidden">
      <div
        className={`relative z-10 flex flex-col items-center px-gutter text-center transition-all duration-[1500ms] cubic-bezier(0.16,1,0.3,1) ${
          visible ? 'opacity-100 scale-100' : 'opacity-0 scale-[0.95]'
        }`}
      >
        <div className="flex flex-col items-center justify-center mb-stack-lg">
          <img
            alt="Moidoctar Brand Logo"
            className="w-32 h-32 md:w-40 md:h-40 object-contain mb-stack-md"
            src="/doctarr.jpeg"
          />
        </div>
        <h1 className="font-headline-xl text-headline-xl text-on-primary tracking-tight mb-stack-sm">
          MoiDoctar
        </h1>
        <p className="font-body-lg text-body-lg text-primary-fixed-dim uppercase tracking-[0.2em]">
          Health Triage
        </p>
      </div>
    </main>
  )
}
