import { useState } from 'react'
import { X } from 'lucide-react'
import { usePopup } from '../../hooks/usePopup'
import { useLang } from '../../context/LangContext'

const WA = '5493534092392'

export default function Popup() {
  const { show, close } = usePopup()
  const t = useLang()
  const [email, setEmail] = useState('')
  const [done, setDone] = useState(false)

  const handleSubmit = () => {
    if (!email) return
    window.open(`https://wa.me/${WA}?text=${encodeURIComponent(`Hola! Quiero recibir ofertas y novedades de Vámonos. Mi email es: ${email}`)}`, '_blank')
    setDone(true)
    setTimeout(close, 2000)
  }

  if (!show) return null

  return (
    <div className="fixed inset-0 z-[200] flex items-end sm:items-center justify-center sm:justify-end p-4 sm:p-8 pointer-events-none">
      <div className="pointer-events-auto w-full max-w-sm bg-white dark:bg-night-light rounded-2xl shadow-2xl border border-gray-100 dark:border-white/10 p-6 animate-[slideUp_0.4s_ease]">
        <button onClick={close} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600">
          <X size={18} />
        </button>

        <div className="text-3xl mb-3">🎁</div>
        <h3 className="font-black text-night dark:text-white text-lg mb-1">{t.popup.title}</h3>
        <p className="text-gray-500 dark:text-white/60 text-sm font-semibold mb-4">{t.popup.subtitle}</p>

        {done ? (
          <p className="text-green-500 font-black text-center py-2">¡Gracias! 🎉</p>
        ) : (
          <div className="flex flex-col gap-2">
            <input
              type="email"
              placeholder={t.popup.placeholder}
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl text-sm font-semibold outline-none focus:border-yellow transition-colors"
            />
            <button
              onClick={handleSubmit}
              className="w-full bg-yellow hover:bg-yellow-dark text-night font-black py-3 rounded-xl transition-all text-sm"
            >
              {t.popup.cta}
            </button>
            <button onClick={close} className="text-gray-400 text-xs font-semibold hover:text-gray-600 transition-colors">
              {t.popup.skip}
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
