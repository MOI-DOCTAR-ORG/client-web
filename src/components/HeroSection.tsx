import { Link } from 'react-router-dom'
import Icon from './Icon'

export default function HeroSection() {
  return (
    <section className="grid grid-cols-1 md:grid-cols-3 gap-gutter mb-gutter">
      <div className="md:col-span-2 relative overflow-hidden rounded-[16px] p-10 bg-gradient-to-br from-primary to-primary-container text-on-primary shadow-lg flex flex-col justify-center min-h-[300px]">
        <div className="absolute right-[-5%] top-[-10%] opacity-20 transform rotate-12">
          <Icon icon="health_and_safety" className="text-[200px]" />
        </div>
        <h3 className="font-headline-xl text-headline-xl mb-4 relative z-10">
          Check your symptoms now.
        </h3>
        <p className="font-body-lg text-body-lg mb-8 max-w-md opacity-90 relative z-10">
          Our AI-driven triage system provides clinical-grade guidance in under
          3 minutes.
        </p>
        <Link
          to="/new-triage"
          className="inline-block w-fit px-8 py-4 bg-surface-container-lowest text-primary rounded-full font-label-md text-label-md hover:bg-surface-container transition-all hover:scale-105 active:scale-95 shadow-xl relative z-10"
        >
          Start New Triage
        </Link>
      </div>

      <TrendChart />
    </section>
  )
}

const dayLabels = ['M', 'T', 'W', 'T', 'F', 'S', 'S']

const dayData = [
  { height: '40%', isPrimary: false },
  { height: '60%', isPrimary: false },
  { height: '85%', isPrimary: true },
  { height: '45%', isPrimary: false },
  { height: '30%', isPrimary: false },
  { height: '20%', isPrimary: false },
  { height: '25%', isPrimary: false },
]

function TrendChart() {
  return (
    <div className="bg-surface-container-lowest card-shadow rounded-[16px] p-6 flex flex-col justify-between">
      <div>
        <h4 className="font-label-md text-label-md text-secondary mb-1">
          Symptom Trend
        </h4>
        <p className="font-headline-md text-headline-md text-on-surface">
          Stable
        </p>
      </div>

      <div className="h-32 w-full flex items-end gap-2 px-2">
        {dayData.map((day, i) => (
          <div
            key={i}
            className={`flex-1 rounded-t-lg ${
              day.isPrimary ? 'bg-primary' : 'bg-surface-container'
            }`}
            style={{ height: day.height }}
            title={dayLabels[i]}
          />
        ))}
      </div>

      <div className="flex justify-between font-caption text-caption text-secondary px-2 mt-4">
        {dayLabels.map((label) => (
          <span key={label}>{label}</span>
        ))}
      </div>
    </div>
  )
}
