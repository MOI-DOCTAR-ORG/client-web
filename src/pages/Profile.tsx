import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import Icon from '../components/Icon'
import { usePersistState } from '../hooks/usePersistState'

export default function Profile() {
  const navigate = useNavigate()
  const { signOut } = useAuth()
  const [emailNotifs, setEmailNotifs] = useState(true)
  const [smsAlerts, setSmsAlerts] = useState(false)
  const [twoFactor, setTwoFactor] = useState(true)
  const [deleteConfirmText, setDeleteConfirmText] = useState('')
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)

  const [ageRange, setAgeRange] = usePersistState('doctarr_age', '')
  const [gender, setGender] = usePersistState('doctarr_gender', '')
  const [bloodType, setBloodType] = usePersistState('doctarr_blood', '')
  const [conditions, setConditions] = usePersistState<string[]>('doctarr_profile_conditions', [])
  const [newCondition, setNewCondition] = useState('')
  const [name, setName] = usePersistState('doctarr_name', '')
  const [email, setEmail] = usePersistState('doctarr_email', '')

  const addCondition = () => {
    const trimmed = newCondition.trim()
    if (trimmed && !conditions.includes(trimmed)) {
      setConditions([...conditions, trimmed])
      setNewCondition('')
    }
  }

  const removeCondition = (c: string) => {
    setConditions(conditions.filter(x => x !== c))
  }

  const ageOptions = ['Under 18', '18-24', '25-34', '35-44', '45-54', '55-64', '65+']
  const genderOptions = ['Male', 'Female', 'Non-binary', 'Prefer not to say']
  const bloodOptions = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']

  return (
    <main className="min-h-screen flex flex-col items-center">
      <header className="flex justify-between items-center w-full px-gutter h-16 sticky top-0 bg-surface/80 backdrop-blur-md z-30">
        <h2 className="font-headline-md text-headline-md text-primary font-bold">Profile</h2>
        <div className="flex items-center gap-stack-md">
          <button onClick={() => navigate('/notifications')} className="hover:bg-surface-variant rounded-full p-2 transition-all">
            <Icon icon="notifications" className="text-secondary" />
          </button>
          <div className="w-10 h-10 rounded-full bg-primary-container text-white flex items-center justify-center font-bold">
            {name ? name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase() : 'U'}
          </div>
        </div>
      </header>

      <div className="max-w-container-max-width w-full px-4 md:px-gutter py-stack-lg flex flex-col gap-gutter">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-gutter">
          <div className="md:col-span-8 bg-surface-container-lowest border border-outline-variant rounded-xl p-6 md:p-8 shadow-[0px_4px_20px_rgba(0,0,0,0.03)] flex flex-col md:flex-row items-center gap-8">
            <div className="relative">
              <div className="w-32 h-32 md:w-40 md:h-40 rounded-full bg-primary-fixed-dim text-primary flex items-center justify-center text-4xl font-extrabold shadow-sm border-4 border-white overflow-hidden">
                <span className="z-10">{name ? name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase() : 'U'}</span>
                <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 to-transparent" />
              </div>
            </div>
            <div className="text-center md:text-left flex-1 w-full">
              <input
                className="font-headline-lg text-headline-lg text-on-surface mb-1 bg-transparent border-b border-dashed border-outline-variant focus:border-primary focus:outline-none w-full max-w-xs"
                placeholder="Your Name"
                value={name}
                onChange={e => setName(e.target.value)}
              />
              <input
                className="font-body-md text-secondary mb-4 bg-transparent border-b border-dashed border-outline-variant focus:border-primary focus:outline-none w-full max-w-xs"
                placeholder="your.email@example.com"
                value={email}
                onChange={e => setEmail(e.target.value)}
              />
              <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                <span className="bg-surface-container-low border border-surface-variant px-3 py-1 rounded-full text-label-md font-label-md text-on-surface">Member</span>
                <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-label-md font-label-md border border-primary/20">Verified Identity</span>
              </div>
            </div>
          </div>

          <div className="md:col-span-4 bg-primary-container text-white rounded-xl p-6 md:p-8 shadow-[0px_4px_20px_rgba(0,0,0,0.03)] flex flex-col justify-between relative overflow-hidden">
            <div className="relative z-10">
              <Icon icon="verified_user" className="text-4xl mb-4" />
              <h4 className="font-headline-md text-headline-md mb-2">Health Passport</h4>
              <p className="font-label-md text-on-primary-container">Secure access to your medical records across 40+ providers.</p>
            </div>
            <button onClick={() => navigate('/medical-history')} className="relative z-10 mt-6 bg-surface-container-lowest text-primary px-6 py-2 rounded-full font-label-md text-label-md hover:bg-surface-container transition-colors w-max">
              View Records
            </button>
            <div className="absolute -right-8 -bottom-8 bg-surface-container-lowest/10 w-48 h-48 rounded-full blur-3xl" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-gutter">
          <section className="md:col-span-7 bg-surface-container-lowest border border-outline-variant rounded-xl p-6 md:p-8 shadow-[0px_4px_20px_rgba(0,0,0,0.03)]">
            <div className="flex items-center gap-2 mb-6">
              <Icon icon="monitor_heart" className="text-primary" />
              <h3 className="font-headline-md text-headline-md">Health Profile</h3>
            </div>
            <div className="space-y-8">
              <div>
                <p className="font-label-md text-secondary mb-3">DEMOGRAPHICS</p>
                <div className="flex flex-wrap gap-stack-sm">
                  <div className="flex flex-col gap-1">
                    <label className="text-caption text-secondary font-label-md">Age Range</label>
                    <select
                      className="bg-surface-container-low px-4 py-2 rounded-lg border border-surface-variant font-label-md text-on-surface outline-none focus:border-primary"
                      value={ageRange}
                      onChange={e => setAgeRange(e.target.value)}
                    >
                      <option value="">Select age range</option>
                      {ageOptions.map(o => <option key={o} value={o}>{o}</option>)}
                    </select>
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-caption text-secondary font-label-md">Gender</label>
                    <select
                      className="bg-surface-container-low px-4 py-2 rounded-lg border border-surface-variant font-label-md text-on-surface outline-none focus:border-primary"
                      value={gender}
                      onChange={e => setGender(e.target.value)}
                    >
                      <option value="">Select gender</option>
                      {genderOptions.map(o => <option key={o} value={o}>{o}</option>)}
                    </select>
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-caption text-secondary font-label-md">Blood Type</label>
                    <select
                      className="bg-surface-container-low px-4 py-2 rounded-lg border border-surface-variant font-label-md text-on-surface outline-none focus:border-primary"
                      value={bloodType}
                      onChange={e => setBloodType(e.target.value)}
                    >
                      <option value="">Select blood type</option>
                      {bloodOptions.map(o => <option key={o} value={o}>{o}</option>)}
                    </select>
                  </div>
                </div>
              </div>
              <div>
                <p className="font-label-md text-secondary mb-3">CURRENT CONDITIONS</p>
                <div className="flex flex-wrap gap-2 mb-3">
                  {conditions.map(c => (
                    <span key={c} className="bg-tertiary-container/10 text-tertiary-fixed-dim px-4 py-1.5 rounded-full border border-tertiary-container/20 font-label-md flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-tertiary" />
                      {c}
                      <button onClick={() => removeCondition(c)} className="text-secondary hover:text-error transition-colors ml-1">
                        <Icon icon="close" className="text-[14px]" />
                      </button>
                    </span>
                  ))}
                </div>
                <div className="flex gap-2">
                  <input
                    className="bg-surface-container-low px-4 py-2 rounded-lg border border-outline-variant font-body-md text-on-surface outline-none focus:border-primary flex-1 min-w-0"
                    placeholder="Add a condition..."
                    value={newCondition}
                    onChange={e => setNewCondition(e.target.value)}
                    onKeyDown={e => { if (e.key === 'Enter') addCondition() }}
                  />
                  <button onClick={addCondition} className="bg-primary text-white px-4 py-2 rounded-lg font-label-md hover:bg-primary/90 transition-colors">
                    <Icon icon="add" />
                  </button>
                </div>
              </div>
              <div className="p-4 bg-surface-container-lowest border border-surface-variant rounded-lg flex items-start gap-4">
                <Icon icon="info" className="text-secondary" />
                <p className="text-caption font-caption text-secondary">
                  This profile information is used only to personalize your triage experience. It is fully encrypted and never shared with advertisers.
                </p>
              </div>
            </div>
          </section>

          <section className="md:col-span-5 flex flex-col gap-gutter">
            <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-6 md:p-8 shadow-[0px_4px_20px_rgba(0,0,0,0.03)]">
              <div className="flex items-center gap-2 mb-6">
                <Icon icon="settings" className="text-primary" />
                <h3 className="font-headline-md text-headline-md">Preferences</h3>
              </div>
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-label-md text-on-surface">Email Notifications</p>
                    <p className="text-caption font-caption text-secondary">Updates on triage results</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" checked={emailNotifs} onChange={() => setEmailNotifs(!emailNotifs)} />
                    <div className="w-11 h-6 bg-surface-variant peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary" />
                  </label>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-label-md text-on-surface">SMS Alerts</p>
                    <p className="text-caption font-caption text-secondary">Urgent health notifications</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" checked={smsAlerts} onChange={() => setSmsAlerts(!smsAlerts)} />
                    <div className="w-11 h-6 bg-surface-variant peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary" />
                  </label>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-label-md text-on-surface">Two-Factor Auth</p>
                    <p className="text-caption font-caption text-secondary">Enhanced account security</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" checked={twoFactor} onChange={() => setTwoFactor(!twoFactor)} />
                    <div className="w-11 h-6 bg-surface-variant peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary" />
                  </label>
                </div>
              </div>
            </div>

            <div className="border border-error/30 rounded-xl overflow-hidden shadow-sm">
              <div className="bg-error/5 p-6 md:p-8">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-error/10 flex items-center justify-center text-error">
                    <Icon icon="delete_forever" className="text-2xl" />
                  </div>
                  <div>
                    <h3 className="font-headline-md text-headline-md text-on-surface">Delete Account</h3>
                    <p className="text-caption text-secondary">Permanently remove all data and triage history</p>
                  </div>
                </div>
                <div className="bg-error-container/10 border border-error/20 rounded-lg p-4 mb-5 flex items-start gap-3">
                  <Icon icon="warning" className="text-error shrink-0 mt-0.5" />
                  <p className="text-caption text-on-surface-variant">
                    This action <strong>cannot be undone</strong>. All your medical records, triage sessions, medication data, and personal information will be permanently deleted.
                  </p>
                </div>
                {!showDeleteConfirm ? (
                  <button onClick={() => setShowDeleteConfirm(true)} className="w-full py-3 px-6 rounded-full bg-error text-white font-label-md text-label-md hover:bg-red-700 transition-colors flex items-center justify-center gap-2">
                    <Icon icon="delete" className="text-xl" />
                    Delete My Account
                  </button>
                ) : (
                  <div className="space-y-4">
                    <div>
                      <label className="block font-label-md text-label-md text-on-surface mb-2">
                        Type <strong className="text-error">DELETE</strong> to confirm
                      </label>
                      <input className="w-full bg-surface-container-low border border-error/50 rounded-lg px-4 py-3 font-body-md text-on-surface focus:border-error focus:ring-2 focus:ring-error/20 transition-all outline-none placeholder:text-secondary" placeholder="Type DELETE here..." type="text" value={deleteConfirmText} onChange={(e) => setDeleteConfirmText(e.target.value)} />
                    </div>
                    <div className="flex gap-3">
                      <button onClick={() => { setShowDeleteConfirm(false); setDeleteConfirmText('') }} className="flex-1 py-3 px-6 rounded-full border border-outline-variant text-secondary font-label-md text-label-md hover:bg-surface-container transition-colors">Cancel</button>
                      <button disabled={deleteConfirmText !== 'DELETE'} onClick={() => { signOut(); navigate('/splash') }} className="flex-1 py-3 px-6 rounded-full bg-error text-white font-label-md text-label-md hover:bg-red-700 transition-colors disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2">
                        <Icon icon="delete_forever" className="text-xl" />
                        Permanently Delete
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </section>
        </div>

        <footer className="mt-8 mb-12 flex flex-col md:flex-row items-center justify-between py-6 border-t border-outline-variant gap-4">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2 px-3 py-1.5 bg-surface-container-high rounded-lg border border-outline-variant">
              <Icon icon="verified" className="text-primary text-xl" />
              <span className="font-label-md text-on-surface">HIPAA COMPLIANT</span>
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 bg-surface-container-high rounded-lg border border-outline-variant">
              <Icon icon="lock" className="text-primary text-xl" />
              <span className="font-label-md text-on-surface">AES-256 ENCRYPTED</span>
            </div>
          </div>
          <div className="flex gap-stack-lg">
            <a className="text-caption text-secondary hover:text-primary transition-colors" href="#">Privacy Policy</a>
            <a className="text-caption text-secondary hover:text-primary transition-colors" href="#">Terms of Service</a>
          </div>
        </footer>
      </div>
    </main>
  )
}
