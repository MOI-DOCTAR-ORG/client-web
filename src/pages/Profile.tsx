import { useState } from 'react'
import Icon from '../components/Icon'

export default function Profile() {
  const [emailNotifs, setEmailNotifs] = useState(true)
  const [smsAlerts, setSmsAlerts] = useState(false)
  const [twoFactor, setTwoFactor] = useState(true)

  return (
    <main className="min-h-screen flex flex-col items-center">
      <header className="flex justify-between items-center w-full px-gutter h-16 sticky top-0 bg-surface/80 backdrop-blur-md z-30">
        <h2 className="font-headline-md text-headline-md text-primary font-bold">Profile</h2>
        <div className="flex items-center gap-stack-md">
          <button className="hover:bg-surface-variant rounded-full p-2 transition-all">
            <Icon icon="notifications" className="text-secondary" />
          </button>
          <div className="w-10 h-10 rounded-full bg-primary-container text-white flex items-center justify-center font-bold">AD</div>
        </div>
      </header>

      <div className="max-w-container-max-width w-full px-4 md:px-gutter py-stack-lg flex flex-col gap-gutter">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-gutter">
          <div className="md:col-span-8 bg-white border border-outline-variant rounded-xl p-6 md:p-8 shadow-[0px_4px_20px_rgba(0,0,0,0.03)] flex flex-col md:flex-row items-center gap-8">
            <div className="relative">
              <div className="w-32 h-32 md:w-40 md:h-40 rounded-full bg-primary-fixed-dim text-primary flex items-center justify-center text-4xl font-extrabold shadow-sm border-4 border-white overflow-hidden">
                <span className="z-10">AD</span>
                <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 to-transparent" />
              </div>
              <button className="absolute bottom-1 right-1 bg-primary text-white p-2 rounded-full shadow-lg border-2 border-white hover:scale-105 transition-transform">
                <Icon icon="edit" className="text-sm" />
              </button>
            </div>
            <div className="text-center md:text-left">
              <h3 className="font-headline-lg text-headline-lg text-on-surface mb-1">Adrian Daniels</h3>
              <p className="font-body-md text-secondary mb-4">adrian.daniels@healthcare.com</p>
              <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                <span className="bg-surface-container-low border border-surface-variant px-3 py-1 rounded-full text-label-md font-label-md text-on-surface">Member since 2021</span>
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
            <button className="relative z-10 mt-6 bg-white text-primary px-6 py-2 rounded-full font-label-md text-label-md hover:bg-surface-container transition-colors w-max">
              View Records
            </button>
            <div className="absolute -right-8 -bottom-8 bg-white/10 w-48 h-48 rounded-full blur-3xl" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-gutter">
          <section className="md:col-span-7 bg-white border border-outline-variant rounded-xl p-6 md:p-8 shadow-[0px_4px_20px_rgba(0,0,0,0.03)]">
            <div className="flex items-center gap-2 mb-6">
              <Icon icon="monitor_heart" className="text-primary" />
              <h3 className="font-headline-md text-headline-md">Health Profile</h3>
            </div>
            <div className="space-y-8">
              <div>
                <p className="font-label-md text-secondary mb-3">DEMOGRAPHICS</p>
                <div className="flex flex-wrap gap-stack-sm">
                  <div className="bg-surface-container-low px-4 py-2 rounded-lg border border-surface-variant flex items-center gap-2">
                    <span className="text-secondary font-label-md">Age Range:</span>
                    <span className="font-label-md">35-44 years</span>
                  </div>
                  <div className="bg-surface-container-low px-4 py-2 rounded-lg border border-surface-variant flex items-center gap-2">
                    <span className="text-secondary font-label-md">Gender:</span>
                    <span className="font-label-md">Male</span>
                  </div>
                  <div className="bg-surface-container-low px-4 py-2 rounded-lg border border-surface-variant flex items-center gap-2">
                    <span className="text-secondary font-label-md">Blood:</span>
                    <span className="font-label-md text-error font-bold">O- (Universal Donor)</span>
                  </div>
                </div>
              </div>
              <div>
                <p className="font-label-md text-secondary mb-3">CURRENT CONDITIONS</p>
                <div className="flex flex-wrap gap-2">
                  <span className="bg-tertiary-container/10 text-tertiary-fixed-dim px-4 py-1.5 rounded-full border border-tertiary-container/20 font-label-md flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-tertiary" />
                    Hypertension
                  </span>
                  <span className="bg-tertiary-container/10 text-tertiary-fixed-dim px-4 py-1.5 rounded-full border border-tertiary-container/20 font-label-md flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-tertiary" />
                    Mild Seasonal Allergy
                  </span>
                  <button className="border-2 border-dashed border-outline-variant text-secondary hover:text-primary hover:border-primary px-4 py-1.5 rounded-full font-label-md flex items-center gap-1 transition-all">
                    <Icon icon="add" className="text-sm" />
                    Add Condition
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
            <div className="bg-white border border-outline-variant rounded-xl p-6 md:p-8 shadow-[0px_4px_20px_rgba(0,0,0,0.03)]">
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
                    <input
                      type="checkbox"
                      className="sr-only peer"
                      checked={emailNotifs}
                      onChange={() => setEmailNotifs(!emailNotifs)}
                    />
                    <div className="w-11 h-6 bg-surface-variant peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary" />
                  </label>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-label-md text-on-surface">SMS Alerts</p>
                    <p className="text-caption font-caption text-secondary">Urgent health notifications</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      className="sr-only peer"
                      checked={smsAlerts}
                      onChange={() => setSmsAlerts(!smsAlerts)}
                    />
                    <div className="w-11 h-6 bg-surface-variant peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary" />
                  </label>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-label-md text-on-surface">Two-Factor Auth</p>
                    <p className="text-caption font-caption text-secondary">Enhanced account security</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      className="sr-only peer"
                      checked={twoFactor}
                      onChange={() => setTwoFactor(!twoFactor)}
                    />
                    <div className="w-11 h-6 bg-surface-variant peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary" />
                  </label>
                </div>
              </div>
            </div>

            <div className="bg-error-container/20 border border-error/10 rounded-xl p-6 md:p-8 shadow-sm flex flex-col items-center">
              <p className="font-label-md text-on-surface mb-2">Manage Account Privacy</p>
              <a className="text-error font-label-md hover:underline flex items-center gap-1 group" href="#">
                Delete Account
                <Icon icon="delete" className="text-sm group-hover:translate-x-0.5 transition-transform" />
              </a>
              <p className="text-caption text-secondary mt-4 text-center">Permanently remove all medical data and triage history.</p>
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
