import Icon from './Icon'

interface Toast {
  id: number
  message: string
  type: 'success' | 'error' | 'info'
}

export default function ToastContainer({ toasts, onRemove }: { toasts: Toast[]; onRemove: (id: number) => void }) {
  if (toasts.length === 0) return null
  return (
    <div className="fixed bottom-6 right-6 z-[999] flex flex-col gap-3 max-w-sm">
      {toasts.map(t => (
        <div
          key={t.id}
          className={`flex items-center gap-3 px-5 py-4 rounded-xl shadow-2xl border backdrop-blur-md animate-slide-up ${
            t.type === 'success' ? 'bg-green-50 border-green-200 text-green-800' :
            t.type === 'error' ? 'bg-red-50 border-red-200 text-red-800' :
            'bg-blue-50 border-blue-200 text-blue-800'
          }`}
        >
          <Icon icon={t.type === 'success' ? 'check_circle' : t.type === 'error' ? 'error' : 'info'} className={`icon-fill ${t.type === 'success' ? 'text-green-600' : t.type === 'error' ? 'text-red-600' : 'text-blue-600'}`} />
          <p className="font-body-md flex-1">{t.message}</p>
          <button onClick={() => onRemove(t.id)} className="opacity-60 hover:opacity-100 transition-opacity">
            <Icon icon="close" className="text-[18px]" />
          </button>
        </div>
      ))}
    </div>
  )
}
