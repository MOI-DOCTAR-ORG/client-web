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
            t.type === 'success' ? 'bg-green-50 dark:bg-green-900/30 border-green-200 dark:border-green-800 text-green-800 dark:text-green-200' :
            t.type === 'error' ? 'bg-red-50 dark:bg-red-900/30 border-red-200 dark:border-red-800 text-red-800 dark:text-red-200' :
            'bg-blue-50 dark:bg-blue-900/30 border-blue-200 dark:border-blue-800 text-blue-800 dark:text-blue-200'
          }`}
        >
          <Icon icon={t.type === 'success' ? 'check_circle' : t.type === 'error' ? 'error' : 'info'} className={`icon-fill ${t.type === 'success' ? 'text-green-600 dark:text-green-400' : t.type === 'error' ? 'text-red-600 dark:text-red-400' : 'text-blue-600 dark:text-blue-400'}`} />
          <p className="font-body-md flex-1">{t.message}</p>
          <button onClick={() => onRemove(t.id)} className="opacity-60 hover:opacity-100 transition-opacity">
            <Icon icon="close" className="text-[18px]" />
          </button>
        </div>
      ))}
    </div>
  )
}
