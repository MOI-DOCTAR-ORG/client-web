import { useNavigate } from 'react-router-dom'
import Icon from './Icon'

type SessionCardProps = {
  severity: 'Urgent' | 'Moderate' | 'Stable'
  condition: string
  description: string
  date: string
  statusLabel: string
  statusIcon: string
}

const severityStyles: Record<string, string> = {
  Urgent: 'bg-error-container text-error',
  Moderate: 'bg-amber-100 text-amber-800',
  Stable: 'bg-green-100 text-green-700',
}

export default function SessionCard({
  severity,
  condition,
  description,
  date,
  statusLabel,
  statusIcon,
}: SessionCardProps) {
  const navigate = useNavigate()

  return (
    <div className="bg-white card-shadow rounded-[16px] p-6 hover:shadow-md transition-shadow group">
      <div className="flex justify-between items-start mb-6">
        <span
          className={`px-3 py-1 rounded-full font-label-md text-xs ${severityStyles[severity]}`}
        >
          {severity}
        </span>
        <span className="font-caption text-caption text-secondary">{date}</span>
      </div>
      <h4 className="font-headline-md text-[20px] mb-2 group-hover:text-primary transition-colors">
        {condition}
      </h4>
      <p className="font-body-md text-on-surface-variant mb-8 line-clamp-2">
        {description}
      </p>
      <div className="pt-4 border-t border-outline-variant/30 flex justify-between items-center">
        <span className="flex items-center gap-2 text-secondary text-caption">
          <Icon icon={statusIcon} className="text-[18px]" />
          {statusLabel}
        </span>
        <button onClick={() => navigate('/care-details')} className="text-primary font-label-md hover:underline">
          View Details
        </button>
      </div>
    </div>
  )
}
