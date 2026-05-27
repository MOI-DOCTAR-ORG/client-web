import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import Icon from '../components/Icon'
import { usePersistState } from '../hooks/usePersistState'

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
  const [schedule, setSchedule] = usePersistState<MedSchedule[]>('doctarr_med_schedule', [])
  const [prescriptions, setPrescriptions] = usePersistState<Prescription[]>('doctarr_prescriptions', [])

  const [showForm, setShowForm] = useState(false)
  const [medName, setMedName] = useState('')
  const [medDosage, setMedDosage] = useState('')
  const [medTime, setMedTime] = useState('08:00')
  const [medFrequency, setMedFrequency] = useState('Morning')
  const [medSupply, setMedSupply] = useState('30')

  const toggleTaken = (index: number) => {
    setSchedule((prev) =>
      prev.map((item, i) =>
        i === index ? { ...item, taken: !item.taken } : item
      )
    )
  }

  const addMedication = () => {
    if (!medName.trim() || !medDosage.trim()) return
    const timeDisplay = new Date(`2000-01-01T${medTime}`).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true })
    const supplyTotal = parseInt(medSupply) || 30
    const supplyCurrent = supplyTotal
    const freqIcon: Record<string, string> = { Morning: 'light_mode', Afternoon: 'wb_sunny', Night: 'bedtime' }
    const freqLabel = medFrequency

    setSchedule(prev => [...prev, { name: medName, dosage: medDosage, time: timeDisplay, taken: false }])
    setPrescriptions(prev => [...prev, {
      name: medName,
      dosage: medDosage,
      type: 'pill',
      icon: 'medication',
      frequency: [{ icon: freqIcon[medFrequency] || '', label: freqLabel }],
      supplyCurrent,
      supplyTotal,
      supplyLabel: `Refill needed in ${supplyCurrent} days`,
    }])

    setMedName('')
    setMedDosage('')
    setMedSupply('30')
    setMedFrequency('Morning')
    setMedTime('08:00')
    setShowForm(false)
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
          <button onClick={() => setShowForm(!showForm)} className="bg-primary text-on-primary hover:bg-[#1A2AC2] font-label-md text-label-md py-3 px-6 rounded-full flex items-center justify-center gap-2 transition-colors shadow-sm self-start md:self-auto">
            <Icon icon={showForm ? 'close' : 'add'} className="text-[20px]" />
            {showForm ? 'Cancel' : 'Add Medication'}
          </button>
        </div>

        {showForm && (
          <div className="bg-white rounded-xl border border-outline-variant p-6 shadow-sm mb-6">
            <h3 className="font-headline-md text-headline-md text-on-surface mb-4">New Medication</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="flex flex-col gap-1">
                <label className="font-label-md text-caption text-secondary">Medication Name</label>
                <input className="bg-surface-container-low border border-outline-variant rounded-lg px-4 py-3 font-body-md outline-none focus:border-primary" placeholder="e.g. Lisinopril" value={medName} onChange={e => setMedName(e.target.value)} />
              </div>
              <div className="flex flex-col gap-1">
                <label className="font-label-md text-caption text-secondary">Dosage</label>
                <input className="bg-surface-container-low border border-outline-variant rounded-lg px-4 py-3 font-body-md outline-none focus:border-primary" placeholder="e.g. 10mg" value={medDosage} onChange={e => setMedDosage(e.target.value)} />
              </div>
              <div className="flex flex-col gap-1">
                <label className="font-label-md text-caption text-secondary">Time</label>
                <input className="bg-surface-container-low border border-outline-variant rounded-lg px-4 py-3 font-body-md outline-none focus:border-primary" type="time" value={medTime} onChange={e => setMedTime(e.target.value)} />
              </div>
              <div className="flex flex-col gap-1">
                <label className="font-label-md text-caption text-secondary">Frequency</label>
                <select className="bg-surface-container-low border border-outline-variant rounded-lg px-4 py-3 font-body-md outline-none focus:border-primary" value={medFrequency} onChange={e => setMedFrequency(e.target.value)}>
                  <option value="Morning">Morning</option>
                  <option value="Afternoon">Afternoon</option>
                  <option value="Night">Night</option>
                </select>
              </div>
              <div className="flex flex-col gap-1">
                <label className="font-label-md text-caption text-secondary">Supply (pills)</label>
                <input className="bg-surface-container-low border border-outline-variant rounded-lg px-4 py-3 font-body-md outline-none focus:border-primary" type="number" min="1" value={medSupply} onChange={e => setMedSupply(e.target.value)} />
              </div>
              <div className="flex items-end">
                <button onClick={addMedication} className="w-full bg-primary text-white py-3 rounded-lg font-label-md hover:bg-primary/90 transition-colors flex items-center justify-center gap-2">
                  <Icon icon="check_circle" />
                  Save Medication
                </button>
              </div>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter">
          <div className="lg:col-span-4 flex flex-col gap-gutter">
            <div className="bg-surface rounded-xl border border-outline-variant p-6 shadow-sm flex flex-col h-full">
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-headline-md text-headline-md text-on-surface">Today's Schedule</h3>
                <span className="bg-surface-container-high text-on-surface font-label-md text-label-md px-3 py-1 rounded-full text-xs">{new Date().toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}</span>
              </div>
              {schedule.length === 0 ? (
                <div className="flex-1 flex items-center justify-center">
                  <p className="text-secondary font-body-md text-center">No medications scheduled. Add your first medication to get started.</p>
                </div>
              ) : (
                <div className="flex flex-col gap-4 flex-1">
                  <div>
                    <h4 className="font-caption text-caption text-secondary uppercase tracking-wider mb-3 flex items-center gap-2">
                      <Icon icon="light_mode" className="text-[16px]" /> Morning
                    </h4>
                    <div className="flex flex-col gap-3">
                      {schedule.filter(m => m.time.includes('AM')).map((item, i) => (
                        <label key={i} onClick={() => toggleTaken(i)} className="flex items-start gap-3 p-3 rounded-lg border border-outline-variant bg-surface-container-lowest hover:bg-surface-container-low transition-colors cursor-pointer group">
                          <div className="pt-0.5">
                            <input type="checkbox" checked={item.taken} onChange={() => {}} className="w-5 h-5 rounded border-outline text-[#10B981] focus:ring-primary transition-colors" />
                          </div>
                          <div className="flex-1">
                            <p className="font-label-md text-label-md text-on-surface group-hover:text-primary transition-colors">{item.name}</p>
                            <p className="font-caption text-caption text-secondary">{item.time}</p>
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
                      {schedule.filter(m => m.time.includes('PM')).map((item, i) => (
                        <label key={i} onClick={() => toggleTaken(i)} className="flex items-start gap-3 p-3 rounded-lg border border-outline-variant bg-surface-container-lowest hover:bg-surface-container-low transition-colors cursor-pointer group">
                          <div className="pt-0.5">
                            <input type="checkbox" checked={item.taken} onChange={() => {}} className="w-5 h-5 rounded border-outline text-[#10B981] focus:ring-primary transition-colors" />
                          </div>
                          <div className="flex-1">
                            <p className="font-label-md text-label-md text-on-surface group-hover:text-primary transition-colors">{item.name}</p>
                            <p className="font-caption text-caption text-secondary">{item.time}</p>
                          </div>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
              )}
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
            {prescriptions.length === 0 ? (
              <div className="bg-surface rounded-xl border border-outline-variant p-12 shadow-sm flex flex-col items-center justify-center text-center">
                <Icon icon="medication" className="text-4xl text-outline mb-4" />
                <p className="font-body-md text-secondary">No active prescriptions yet.</p>
                <p className="font-caption text-caption text-outline mt-1">Add medications to track your prescriptions and refill schedule.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-gutter">
                {prescriptions.map((med, i) => (
                  <div key={i} className="bg-surface rounded-xl border border-outline-variant p-6 shadow-sm flex flex-col hover:border-primary/50 transition-colors group relative overflow-hidden">
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
                    </div>
                    <div className="flex flex-wrap gap-2 mb-6 relative z-10">
                      {med.frequency.map((f, j) => (
                        <span key={j} className="inline-flex items-center gap-1 bg-surface-container-highest text-on-surface-variant font-caption text-caption px-3 py-1 rounded-full">
                          {f.icon && <Icon icon={f.icon} className="text-[14px]" />}
                          {f.label}
                        </span>
                      ))}
                    </div>
                    <div className="mt-auto relative z-10">
                      <div className="flex justify-between items-end mb-2">
                        <span className="font-caption text-caption text-secondary">Supply Left</span>
                        <span className="font-label-md text-label-md text-on-surface">{med.supplyCurrent} / {med.supplyTotal} pills</span>
                      </div>
                      <div className="w-full bg-surface-variant rounded-full h-2 overflow-hidden">
                        <div className="h-2 rounded-full bg-primary" style={{ width: `${(med.supplyCurrent / med.supplyTotal) * 100}%` }} />
                      </div>
                      <p className="font-caption text-caption text-secondary mt-2">{med.supplyLabel}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  )
}
