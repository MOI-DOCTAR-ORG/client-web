import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import Icon from '../components/Icon'

interface MedSchedule {
  name: string
  dosage: string
  time: string
  note?: string
  taken: boolean
  missed?: boolean
}

interface Prescription {
  name: string
  dosage: string
  type: string
  frequency: { icon: string; label: string }[]
  supplyCurrent: number
  supplyTotal: number
  supplyLabel: string
  icon: string
  error?: boolean
  refillCta?: string
  barOpacity?: boolean
}

export default function MedicationTracker() {
  const navigate = useNavigate()
  const { signOut } = useAuth()
  const [schedule, setSchedule] = useState<MedSchedule[]>([
    { name: 'Lisinopril (10mg)', dosage: '10mg Tablet', time: '8:00 AM', note: 'With food', taken: true },
    { name: 'Metformin (500mg)', dosage: '500mg Tablet', time: '9:00 AM', note: 'Missed dose', taken: false, missed: true },
    { name: 'Vitamin D3 (1000 IU)', dosage: '1000 IU Capsule', time: '2:00 PM', taken: false },
  ])

  const [prescriptions] = useState<Prescription[]>([
    { name: 'Lisinopril', dosage: '10mg Tablet', type: 'pill', icon: 'pill', frequency: [{ icon: 'light_mode', label: 'Morning' }, { icon: '', label: 'Daily' }], supplyCurrent: 24, supplyTotal: 30, supplyLabel: 'Refill needed in 24 days' },
    { name: 'Metformin', dosage: '500mg Tablet', type: 'medication', icon: 'medication', frequency: [{ icon: 'light_mode', label: 'Morning' }, { icon: 'bedtime', label: 'Night' }], supplyCurrent: 5, supplyTotal: 60, supplyLabel: 'Refill needed soon!', error: true, refillCta: 'Request Refill' },
    { name: 'Vitamin D3', dosage: '1000 IU Capsule', type: 'vaccines', icon: 'vaccines', frequency: [{ icon: 'wb_sunny', label: 'Afternoon' }, { icon: '', label: 'As Needed' }], supplyCurrent: 85, supplyTotal: 100, supplyLabel: 'Ample supply', barOpacity: true },
  ])

  const toggleTaken = (index: number) => {
    setSchedule((prev) =>
      prev.map((item, i) =>
        i === index ? { ...item, taken: !item.taken } : item
      )
    )
  }

  return (
    <main className="flex-1 flex flex-col h-full min-h-screen overflow-y-auto relative z-10 w-full bg-[#F7F8FF] font-body-md text-on-surface antialiased">
      <div className="ambient-blob fixed rounded-full blur-[100px] opacity-15 -z-10 pointer-events-none top-[-10%] left-[20%] w-[40vw] h-[40vw] bg-[radial-gradient(circle,#001bd4_0%,transparent_70%)]" />
      <div className="ambient-blob fixed rounded-full blur-[100px] opacity-15 -z-10 pointer-events-none bottom-[-20%] right-[10%] w-[50vw] h-[50vw] bg-[radial-gradient(circle,#2b3ef0_0%,transparent_70%)]" />

      <header className="flex justify-between items-center w-full px-margin-mobile md:px-gutter h-16 bg-surface/90 backdrop-blur-md sticky top-0 z-50 flex-shrink-0 border-b border-outline-variant/30">
        <div className="flex items-center gap-3">
          <button className="md:hidden p-2 text-secondary hover:bg-surface-variant rounded-full transition-all">
            <Icon icon="menu" />
          </button>
          <h2 className="font-headline-md text-headline-md text-on-surface tracking-tight md:hidden">Medication</h2>
        </div>
        <div className="flex items-center gap-4">
          <button onClick={() => navigate('/notifications')} className="text-secondary hover:bg-surface-variant rounded-full p-2 transition-all relative">
            <Icon icon="notifications" />
            <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-error rounded-full border-2 border-surface" />
          </button>
          <div className="w-8 h-8 rounded-full bg-primary-container flex items-center justify-center text-on-primary-container font-label-md cursor-pointer overflow-hidden border border-outline-variant">
            <img
              alt="User"
              className="w-full h-full object-cover"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBttJ1V3NM_DpwWYy7JHdmTFcnypTqxS5wtqtUnw74IQjEsLI7DkA5TtB2_ViQA20LtVSQPAzRTwfd24eDqEtHEHiEPhX8n0NoUxOEynRpUBIOcEB8xIVyFEIwCp4aKYoJ25BRkaIKQLfRDq37d36dpGUuce8Uzg0uCcAxhSVtkNx64pZ0y4E9bqCseigFFIQlI2Bw3lJaqEldi_Sp4BJEdko8wFhZnFVHUsN2etDR9KsuB85aeIbz4ronT3K8Ulvsn3yCUlI5YgOk"
            />
          </div>
        </div>
      </header>

      <div className="flex-1 p-margin-mobile md:p-stack-lg max-w-container-max-width mx-auto w-full pb-32 md:pb-stack-lg">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-stack-lg">
          <div>
            <h2 className="font-headline-lg text-headline-lg-mobile md:text-headline-lg font-bold text-on-surface tracking-tight">Medication Tracker</h2>
            <p className="font-body-md text-body-md text-secondary mt-1">Manage your prescriptions and daily schedule.</p>
          </div>
          <button onClick={() => navigate('/medical-history')} className="bg-primary text-on-primary hover:bg-[#1A2AC2] font-label-md text-label-md py-3 px-6 rounded-full flex items-center justify-center gap-2 transition-colors shadow-sm self-start md:self-auto">
            <Icon icon="add" className="text-[20px]" />
            Add Medication
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter">
          <div className="lg:col-span-4 flex flex-col gap-gutter">
            <div className="bg-surface rounded-xl border border-outline-variant p-6 shadow-sm flex flex-col h-full">
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-headline-md text-headline-md text-on-surface">Today's Schedule</h3>
                <span className="bg-surface-container-high text-on-surface font-label-md text-label-md px-3 py-1 rounded-full text-xs">Mon, Oct 24</span>
              </div>
              <div className="flex flex-col gap-4 flex-1">
                <div>
                  <h4 className="font-caption text-caption text-secondary uppercase tracking-wider mb-3 flex items-center gap-2">
                    <Icon icon="light_mode" className="text-[16px]" /> Morning
                  </h4>
                  <div className="flex flex-col gap-3">
                    {schedule.slice(0, 2).map((item, i) => (
                      <label
                        key={i}
                        onClick={() => toggleTaken(i)}
                        className={
                          'flex items-start gap-3 p-3 rounded-lg border cursor-pointer group transition-colors ' +
                          (item.missed
                            ? 'border-error/30 bg-error-container/20 hover:bg-error-container/30 relative overflow-hidden'
                            : 'border-outline-variant bg-surface-container-lowest hover:bg-surface-container-low')
                        }
                      >
                        {item.missed && <div className="absolute left-0 top-0 bottom-0 w-1 bg-error" />}
                        <div className={'pt-0.5 ' + (item.missed ? 'pl-1' : '')}>
                          <input
                            type="checkbox"
                            checked={item.taken}
                            onChange={() => {}}
                            className={
                              'w-5 h-5 rounded transition-colors ' +
                              (item.missed
                                ? 'border-error text-[#10B981] focus:ring-error'
                                : 'border-outline text-[#10B981] focus:ring-primary')
                            }
                          />
                        </div>
                        <div className="flex-1 flex justify-between items-start">
                          <div>
                            <p className={'font-label-md text-label-md group-hover:text-primary transition-colors ' + (item.missed ? 'text-on-error-container' : 'text-on-surface')}>
                              {item.name}
                            </p>
                            <p className={'font-caption text-caption ' + (item.missed ? 'text-error/80' : 'text-secondary')}>
                              {item.time}{item.note ? ` • ${item.note}` : ''}
                            </p>
                          </div>
                          {item.missed && (
                            <span className="bg-error text-on-error text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wide">Missed</span>
                          )}
                        </div>
                      </label>
                    ))}
                  </div>
                </div>
                <div className="w-full h-[1px] bg-outline-variant/50 my-2" />
                <div>
                  <h4 className="font-caption text-caption text-secondary uppercase tracking-wider mb-3 flex items-center gap-2">
                    <Icon icon="wb_sunny" className="text-[16px]" /> Afternoon
                  </h4>
                  <div className="flex flex-col gap-3">
                    <label
                      onClick={() => toggleTaken(2)}
                      className="flex items-start gap-3 p-3 rounded-lg border border-outline-variant bg-surface-container-lowest hover:bg-surface-container-low transition-colors cursor-pointer group"
                    >
                      <div className="pt-0.5">
                        <input
                          type="checkbox"
                          checked={schedule[2].taken}
                          onChange={() => {}}
                          className="w-5 h-5 rounded border-outline text-[#10B981] focus:ring-primary transition-colors"
                        />
                      </div>
                      <div className="flex-1">
                        <p className="font-label-md text-label-md text-on-surface group-hover:text-primary transition-colors">{schedule[2].name}</p>
                        <p className="font-caption text-caption text-secondary">{schedule[2].time}</p>
                      </div>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-8 flex flex-col gap-gutter">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-headline-md text-headline-md text-on-surface">Active Prescriptions</h3>
              <div className="flex items-center gap-2 text-secondary text-sm">
                <Icon icon="sort" className="text-[18px]" />
                <span>Sort by: Name</span>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-gutter">
              {prescriptions.map((med, i) => (
                <div
                  key={i}
                  className="bg-surface rounded-xl border border-outline-variant p-6 shadow-sm flex flex-col hover:border-primary/50 transition-colors group relative overflow-hidden"
                >
                  {med.error && <div className="absolute top-0 right-0 w-16 h-16 bg-error/5 rounded-bl-[100px] z-0" />}
                  <div className="flex items-start justify-between mb-4 relative z-10">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-surface-container-high flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-on-primary transition-colors">
                        <Icon icon={med.icon} className="text-[24px]" />
                      </div>
                      <div>
                        <h4 className="font-label-md text-label-md text-on-surface text-lg">{med.name}</h4>
                        <p className="font-caption text-caption text-secondary">{med.dosage}</p>
                      </div>
                    </div>
                    <button className="text-outline hover:text-primary transition-colors">
                      <Icon icon="more_vert" />
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-2 mb-6 relative z-10">
                    {med.frequency.map((f, j) => (
                      <span
                        key={j}
                        className={
                          'inline-flex items-center gap-1 bg-surface-container-highest text-on-surface-variant font-caption text-caption px-3 py-1 rounded-full ' +
                          (f.icon === '' && f.label === 'As Needed' ? 'border border-outline-variant/50 bg-transparent' : '')
                        }
                      >
                        {f.icon && <Icon icon={f.icon} className="text-[14px]" />}
                        {f.label}
                      </span>
                    ))}
                  </div>
                  <div className="mt-auto relative z-10">
                    <div className="flex justify-between items-end mb-2">
                      <span className="font-caption text-caption text-secondary">Supply Left</span>
                      <span className={'font-label-md text-label-md ' + (med.error ? 'text-error' : 'text-on-surface')}>
                        {med.supplyCurrent} / {med.supplyTotal} pills
                      </span>
                    </div>
                    <div className="w-full bg-surface-variant rounded-full h-2 overflow-hidden">
                      <div
                        className={'h-2 rounded-full ' + (med.error ? 'bg-error' : med.barOpacity ? 'bg-primary opacity-60' : 'bg-primary')}
                        style={{ width: `${(med.supplyCurrent / med.supplyTotal) * 100}%` }}
                      />
                    </div>
                    <div className="flex justify-between items-center mt-2">
                      <p className={'font-caption text-caption ' + (med.error ? 'text-error font-medium' : 'text-secondary') + ' mt-2 text-right'}>
                        {med.supplyLabel}
                      </p>
                      {med.refillCta && (
                        <button onClick={() => console.log('Refill requested for', med.name)} className="text-primary font-label-md text-caption hover:underline">{med.refillCta}</button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
