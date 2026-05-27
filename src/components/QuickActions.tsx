import Icon from './Icon'

const actions = [
  { icon: 'upload_file', label: 'Upload Lab Results' },
  { icon: 'pill', label: 'Medication List' },
]

export default function QuickActions() {
  return (
    <section className="mt-gutter grid grid-cols-1 md:grid-cols-4 gap-gutter">
      {actions.map((action) => (
        <div
          key={action.label}
          className="md:col-span-1 p-6 bg-surface-container rounded-[16px] flex flex-col items-center justify-center text-center group cursor-pointer hover:bg-surface-variant transition-colors"
        >
          <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mb-3 text-primary shadow-sm group-hover:scale-110 transition-transform">
            <Icon icon={action.icon} />
          </div>
          <p className="font-label-md text-on-surface">{action.label}</p>
        </div>
      ))}

      <div className="md:col-span-2 p-6 border-2 border-dashed border-outline-variant rounded-[16px] flex items-center justify-center gap-4 text-secondary hover:bg-white hover:border-primary transition-all cursor-pointer">
        <Icon icon="add_circle" />
        <p className="font-body-md">
          Connect external wearable data (Apple Health, Fitbit)
        </p>
      </div>
    </section>
  )
}
