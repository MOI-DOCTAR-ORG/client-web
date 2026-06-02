import { useState } from 'react'
import Icon from './Icon'
import { usePersistState } from '../hooks/usePersistState'

export default function ReminderBanner() {
  const [dismissed, setDismissed] = useState(false)
  const [showForm, setShowForm] = useState(false)
  const [reminderText, setReminderText] = useState('')
  const [reminderDate, setReminderDate] = useState('')
  const [reminders, setReminders] = usePersistState<{ text: string; date: string }[]>('doctarr_reminders', [])

  const addReminder = () => {
    if (!reminderText.trim()) return
    setReminders([...reminders, { text: reminderText, date: reminderDate || 'today' }])
    setReminderText('')
    setReminderDate('')
    setShowForm(false)
  }

  const dismissReminder = (index: number) => {
    setReminders(reminders.filter((_, i) => i !== index))
  }

  if (dismissed && reminders.length === 0) return null

  return (
    <div className="space-y-3">
      {reminders.map((r, i) => (
        <div key={i} className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-xl p-4 flex items-center gap-4">
          <Icon icon="priority_high" size="lg" className="text-amber-600 dark:text-amber-400" />
          <p className="font-body-md text-amber-800 dark:text-amber-200 flex-1">
            <strong>Reminder:</strong> {r.text}
            {r.date && <span className="text-sm ml-2 opacity-70">({r.date})</span>}
          </p>
          <button onClick={() => dismissReminder(i)} className="font-label-md text-primary underline underline-offset-4">Dismiss</button>
        </div>
      ))}

      {!dismissed && (
        <div className="flex items-center gap-3">
          {!showForm ? (
            <>
              <p className="font-body-md text-secondary text-sm">No reminders set.</p>
              <button onClick={() => setShowForm(true)} className="text-primary font-label-md text-sm flex items-center gap-1 hover:underline">
                <Icon icon="add" size="sm" />
                Add a health reminder
              </button>
            </>
          ) : (
            <div className="flex flex-wrap gap-2 w-full bg-surface-container-lowest rounded-xl border border-outline-variant p-3">
              <input className="flex-1 min-w-[200px] bg-surface-container-low border border-outline-variant rounded-lg px-4 py-2 font-body-md outline-none focus:border-primary" placeholder="e.g. Drink more water" value={reminderText} onChange={e => setReminderText(e.target.value)} />
              <input className="bg-surface-container-low border border-outline-variant rounded-lg px-4 py-2 font-body-md outline-none focus:border-primary" type="date" value={reminderDate} onChange={e => setReminderDate(e.target.value)} />
              <button onClick={addReminder} className="bg-primary text-white px-5 py-2 rounded-lg font-label-md hover:bg-primary/90 transition-colors">Save</button>
              <button onClick={() => setShowForm(false)} className="px-4 py-2 text-secondary font-label-md hover:text-primary">Cancel</button>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
