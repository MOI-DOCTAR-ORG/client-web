import { useEffect, useState } from 'react'
import Icon from '../components/Icon'

export default function SplashScreen() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 100)
    return () => clearTimeout(timer)
  }, [])

  return (
    <main className="relative flex flex-col items-center justify-center min-h-screen w-full bg-primary-container overflow-hidden">
      <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] min-w-[400px] min-h-[400px] bg-white opacity-[0.03] rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-[-15%] right-[-5%] w-[60vw] h-[60vw] min-w-[500px] min-h-[500px] bg-white opacity-[0.05] rounded-full blur-[120px] pointer-events-none" />
      <div
        className={`relative z-10 flex flex-col items-center px-gutter text-center transition-all duration-[1500ms] cubic-bezier(0.16,1,0.3,1) ${
          visible ? 'opacity-100 scale-100' : 'opacity-0 scale-[0.95]'
        }`}
      >
        <div className="flex flex-col items-center justify-center mb-stack-lg">
          <img
            alt="Moidoctar Brand Logo"
            className="w-32 h-32 md:w-40 md:h-40 object-contain mb-stack-md"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBttJ1V3NM_DpwWYy7JHdmTFcnypTqxS5wtqtUnw74IQjEsLI7DkA5TtB2_ViQA20LtVSQPAzRTwfd24eDqEtHEHiEPhX8n0NoUxOEynRpUBIOcEB8xIVyFEIwCp4aKYoJ25BRkaIKQLfRDq37d36dpGUuce8Uzg0uCcAxhSVtkNx64pZ0y4E9bqCseigFFIQlI2Bw3lJaqEldi_Sp4BJEdko8wFhZnFVHUsN2etDR9KsuB85aeIbz4ronT3K8Ulvsn3yCUlI5YgOk"
          />
          <Icon icon="medical_services" className="text-[48px] text-on-primary opacity-90 drop-shadow-sm" />
        </div>
        <h1 className="font-headline-xl text-headline-xl text-on-primary tracking-tight mb-stack-sm">
          moidoctar
        </h1>
        <p className="font-body-lg text-body-lg text-primary-fixed-dim uppercase tracking-[0.2em]">
          Health Triage
        </p>
      </div>
    </main>
  )
}
