import SessionCard from './SessionCard'

const sessions = [
  {
    severity: 'Urgent' as const,
    condition: 'Severe Migraine',
    description:
      'Reported sensitivity to light and sharp recurring pain in the left temple area.',
    date: 'Oct 24, 2023',
    statusLabel: 'Review Sent',
    statusIcon: 'clinical_notes',
  },
  {
    severity: 'Moderate' as const,
    condition: 'Persistent Cough',
    description:
      'Dry cough lasting for 5 days with mild chest tightness during physical activity.',
    date: 'Oct 21, 2023',
    statusLabel: 'Resolved',
    statusIcon: 'task_alt',
  },
  {
    severity: 'Stable' as const,
    condition: 'Lower Back Pain',
    description:
      'Mild soreness after lifting heavy objects. No radiating pain or numbness reported.',
    date: 'Oct 18, 2023',
    statusLabel: 'Tracking',
    statusIcon: 'monitoring',
  },
]

export default function SessionGrid() {
  return (
    <section className="grid grid-cols-1 md:grid-cols-3 gap-gutter">
      {sessions.map((session) => (
        <SessionCard key={session.condition} {...session} />
      ))}
    </section>
  )
}
