import { useAuth } from '../context/AuthContext'
import SessionCard from './SessionCard'
import Icon from './Icon'

export default function SessionGrid() {
  const { sessions } = useAuth()

  if (sessions.length === 0) {
    return (
      <section className="bg-surface-container-lowest rounded-2xl border border-dashed border-outline-variant/50 p-10 text-center">
        <div className="w-16 h-16 mx-auto mb-4 bg-surface-container-low rounded-full flex items-center justify-center text-secondary">
          <Icon icon="history" className="text-3xl" />
        </div>
        <h4 className="font-headline-md text-headline-md text-on-surface mb-2">No sessions yet</h4>
        <p className="font-body-md text-body-md text-secondary max-w-sm mx-auto">
          Start a new triage session to see your history here.
        </p>
      </section>
    )
  }

  return (
    <section className="grid grid-cols-1 md:grid-cols-3 gap-gutter">
      {sessions.map((session) => (
        <SessionCard
          key={session.id}
          severity={session.severity}
          condition={session.condition}
          description={session.description}
          date={session.date}
          statusLabel={session.statusLabel}
          statusIcon={session.statusIcon}
        />
      ))}
    </section>
  )
}
