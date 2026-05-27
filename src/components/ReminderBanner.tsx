import { useState } from 'react'
import Icon from './Icon'

export default function ReminderBanner() {
  const [dismissed, setDismissed] = useState(false)

  if (dismissed) return null

  return (
    <div className="mb-gutter bg-[#FFF9E6] border border-tertiary-fixed-dim/30 rounded-xl p-4 flex items-center gap-4">
      <Icon icon="priority_high" className="text-[#B45309]" />
      <p className="font-body-md text-[#92400E]">
        <strong>Reminder:</strong> Schedule your follow-up for "Persistent Cough"
        if symptoms continue past Friday.
      </p>
      <button
        onClick={() => setDismissed(true)}
        className="ml-auto font-label-md text-primary underline underline-offset-4"
      >
        Dismiss
      </button>
    </div>
  )
}
