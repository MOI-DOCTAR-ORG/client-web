import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Icon from '../components/Icon'

interface Notification {
  id: number
  category: string
  categoryClass: string
  barClass: string
  icon: string
  iconBg: string
  iconColor: string
  title: string
  time: string
  body: string
  actions?: { label: string; primary: boolean }[]
  read: boolean
}

const initialNotifications: Notification[] = [
  { id: 1, category: 'Urgency Alerts', categoryClass: 'bg-error', barClass: 'bg-error', icon: 'warning', iconBg: 'bg-error-container', iconColor: 'text-error', title: 'Critical Heart Rate Spike Detected', time: '15m ago', body: 'Patient ID #8829 reported a sustained heart rate of 145bpm while at rest. Immediate triage review is recommended for potential tachycardia.', actions: [{ label: 'Review Vitals', primary: true }, { label: 'Call Patient', primary: false }], read: false },
  { id: 2, category: 'Urgency Alerts', categoryClass: 'bg-error', barClass: 'bg-error', icon: 'error_med', iconBg: 'bg-tertiary-container/10', iconColor: 'text-tertiary', title: 'Missed Prescription Window', time: '2h ago', body: 'John Doe has missed his 10:00 AM insulin dosage check-in. The system has sent an automated reminder, but human follow-up is pending.', read: false },
  { id: 3, category: 'Follow-up Reminders', categoryClass: 'bg-primary', barClass: 'bg-primary', icon: 'calendar_month', iconBg: 'bg-primary-container/10', iconColor: 'text-primary', title: 'Scheduled Post-Op Consultation', time: '4h ago', body: 'The follow-up call for Sarah Mitchell (Hip Replacement recovery) is scheduled for today at 3:30 PM. Prepare triage notes.', read: true },
  { id: 4, category: 'Follow-up Reminders', categoryClass: 'bg-primary', barClass: 'bg-primary', icon: 'check_circle', iconBg: 'bg-surface-container-high', iconColor: 'text-secondary', title: 'Lab Results Uploaded', time: 'Yesterday', body: 'Hematology results for Patient #9910 have been processed and synced to the Care Details dashboard.', read: true },
  { id: 5, category: 'Follow-up Reminders', categoryClass: 'bg-primary', barClass: 'bg-primary', icon: 'assignment_ind', iconBg: 'bg-surface-container-high', iconColor: 'text-secondary', title: 'Profile Update: Maria Garcia', time: '2 days ago', body: 'The patient has updated their primary emergency contact information and insurance provider.', read: true },
]

export default function Notifications() {
  const navigate = useNavigate()
  const [notifications, setNotifications] = useState(initialNotifications)
  const [activeTab, setActiveTab] = useState('All')

  const dismiss = (id: number) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id))
  }

  const markAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })))
  }

  const filteredNotifications = activeTab === 'All'
    ? notifications
    : activeTab === 'Unread'
      ? notifications.filter((n) => !n.read)
      : notifications

  const grouped = filteredNotifications.reduce<Record<string, Notification[]>>((acc, n) => {
    if (!acc[n.category]) acc[n.category] = []
    acc[n.category].push(n)
    return acc
  }, {})

  const tabs = ['All', 'Unread', 'Important']

  return (
    <main className="min-h-screen bg-surface text-on-background">
      <header className="sticky top-0 z-30 bg-surface/80 backdrop-blur-md px-margin-mobile md:px-gutter h-16 flex justify-between items-center border-b border-outline-variant md:border-none">
        <div className="flex items-center gap-4">
          <button className="md:hidden p-2 text-secondary">
            <Icon icon="menu" />
          </button>
          <h2 className="font-headline-lg-mobile md:font-headline-lg text-headline-lg-mobile md:text-headline-lg text-on-surface">Notifications</h2>
        </div>
        <div className="flex items-center gap-stack-md">
          <button onClick={() => navigate('/profile')} className="p-2 text-secondary hover:bg-surface-variant rounded-full transition-all">
            <Icon icon="settings" />
          </button>
          <div className="w-10 h-10 rounded-full bg-secondary-container overflow-hidden">
            <img
              alt="User"
              className="w-full h-full object-cover"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBpC59_BsWuU4EFq7CqKj6kbq5w4IKcsKTlbDnfiNDsOhBfhyNEm02KLiU1iv_vNzbA6ourXPB8bExozCll90LJacchBwBEslmM4dmglN8GfbdotRz4Kd4fWLYymOhSeum0gQEGNcLwXUwOQMOnZ2DiU-D6oVMMtF50D-UpTUTtrmJakT49KC3et1e0d7vO1_MDdFQ0JSJ1zZwv7Kw8s2S965rPGpf9Oj-fwQa54nxA8eF6_wEQ9XPGJUl9opqUSTtL5ua1ykzdz00"
            />
          </div>
        </div>
      </header>

      <div className="max-w-container-max-width mx-auto px-margin-mobile md:px-gutter py-stack-lg">
        <div className="overflow-x-auto mb-8"><div className="flex gap-2">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={
                'px-5 py-2 rounded-full font-label-md text-label-md transition-all ' +
                (activeTab === tab
                  ? 'bg-primary text-on-primary shadow-sm'
                  : 'text-secondary hover:text-primary hover:bg-surface-variant')
              }
            >
              {tab}
            </button>
            ))}
          </div></div>

        <div className="flex flex-col gap-10">
          {Object.entries(grouped).map(([category, items]) => {
            const barClass = items[0]?.barClass || 'bg-primary'
            return (
              <section key={category}>
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <span className={`w-2 h-6 rounded-full ${barClass}`} />
                    <h3 className="font-headline-md text-headline-md text-on-surface">{category}</h3>
                  </div>
                  {category === 'Urgency Alerts' && (
                    <button onClick={markAllRead} className="text-primary font-label-md text-label-md hover:underline">
                      Mark all as read
                    </button>
                  )}
                </div>
                <div className="space-y-4">
                  {items.map((n) => (
                    <div
                      key={n.id}
                      className="bg-surface-container-lowest border border-outline-variant rounded-xl p-5 shadow-sm flex items-start gap-4 transition-all hover:border-primary/30 relative group"
                    >
                      <div className={`w-12 h-12 rounded-full ${n.iconBg} flex items-center justify-center shrink-0`}>
                        <Icon icon={n.icon} className={n.iconColor} />
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between items-start mb-1">
                          <h4 className="font-label-md text-label-md text-on-surface flex items-center gap-2">
                            {n.title}
                            {!n.read && <span className="w-2 h-2 rounded-full bg-primary" />}
                          </h4>
                          <span className="font-caption text-caption text-secondary shrink-0">{n.time}</span>
                        </div>
                        <p className="font-body-md text-body-md text-on-surface-variant mb-4">{n.body}</p>
                        {n.actions && (
                          <div className="flex gap-3">
                            {n.actions.map((a) =>
                              a.primary ? (
                                <button key={a.label} className="bg-primary text-white px-6 py-2 rounded-full font-label-md text-label-md hover:bg-primary/90 transition-colors">
                                  {a.label}
                                </button>
                              ) : (
                                <button key={a.label} className="bg-surface text-primary border border-primary px-6 py-2 rounded-full font-label-md text-label-md hover:bg-primary/5 transition-colors">
                                  {a.label}
                                </button>
                              )
                            )}
                          </div>
                        )}
                      </div>
                      <button
                        onClick={() => dismiss(n.id)}
                        className="opacity-0 group-hover:opacity-100 absolute top-4 right-4 p-1 text-outline hover:text-error transition-all"
                      >
                        <Icon icon="close" />
                      </button>
                    </div>
                  ))}
                </div>
              </section>
            )
          })}
        </div>
      </div>

      <div className="fixed top-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-primary/5 blur-[120px] pointer-events-none -z-10" />
      <div className="fixed bottom-[-5%] left-[20%] w-[30%] h-[30%] rounded-full bg-tertiary-container/5 blur-[100px] pointer-events-none -z-10" />
    </main>
  )
}
