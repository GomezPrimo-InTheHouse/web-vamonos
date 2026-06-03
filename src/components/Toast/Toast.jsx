import { useEffect, useState } from 'react'
import { CheckCircle, XCircle, X } from 'lucide-react'

function ToastItem({ toast, onRemove }) {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    setTimeout(() => setVisible(true), 10)
    const timer = setTimeout(() => {
      setVisible(false)
      setTimeout(() => onRemove(toast.id), 300)
    }, 3500)
    return () => clearTimeout(timer)
  }, [])

  const isSuccess = toast.type === 'success'

  return (
    <div className={`flex items-center gap-3 px-4 py-3 rounded-xl shadow-xl border transition-all duration-300 min-w-[280px] max-w-sm
      ${isSuccess
        ? 'bg-white border-green-200'
        : 'bg-white border-red-200'}
      ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}
    `}>
      {isSuccess
        ? <CheckCircle size={20} className="text-green-500 flex-shrink-0" />
        : <XCircle size={20} className="text-red-400 flex-shrink-0" />
      }
      <p className="text-sm font-bold text-night flex-1">{toast.message}</p>
      <button onClick={() => onRemove(toast.id)} className="text-gray-300 hover:text-gray-500 transition-colors flex-shrink-0">
        <X size={15} />
      </button>
    </div>
  )
}

export default function Toast({ toasts, onRemove }) {
  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[300] flex flex-col gap-2 items-center">
      {toasts.map(t => (
        <ToastItem key={t.id} toast={t} onRemove={onRemove} />
      ))}
    </div>
  )
}