import { useState } from 'react'
import { useAdmin } from '../../context/AdminContext'
import { useLang } from '../../context/LangContext'

const WA = '5493534092392'

export default function Contact() {
  const { extraFields } = useAdmin()
  const t = useLang()
  const [form, setForm] = useState({ nombre: '', email: '', destino: '', mensaje: '' })
  const [extra, setExtra] = useState({})
  const [sent, setSent] = useState(false)

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }))
  const setEx = (k, v) => setExtra(f => ({ ...f, [k]: v }))

  const handleSubmit = (e) => {
    e.preventDefault()
    const extraText = extraFields.map(f => `${f.label}: ${extra[f.id] || ''}`).join('\n')
    const text =
      `Hola! Soy ${form.nombre}${form.email ? ` (${form.email})` : ''}.\n\n` +
      `Quiero ir a: ${form.destino}\n\n` +
      `${form.mensaje || ''}${extraText ? '\n\n' + extraText : ''}`
    window.open(`https://wa.me/${WA}?text=${encodeURIComponent(text)}`, '_blank')
    setSent(true)
    setTimeout(() => setSent(false), 3000)
  }

  const inputClass = "w-full px-4 py-3 border-2 border-gray-200 dark:border-white/20 rounded-xl text-sm font-semibold outline-none focus:border-yellow transition-colors bg-white dark:bg-night text-night dark:text-white"
  const labelClass = "block text-xs font-black text-night dark:text-white uppercase tracking-wide mb-1"

  return (
    <section id="contacto" className="bg-cream dark:bg-night py-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-12 items-start mb-12">

          {/* Left */}
          <div>
            <span className="inline-block text-xs font-black uppercase tracking-widest text-yellow-dark bg-yellow/20 px-3 py-1.5 rounded-full mb-4">
              {t.contact.label}
            </span>
            <h2 className="text-3xl md:text-4xl font-black text-night dark:text-white mb-8 leading-tight">
              {t.contact.title}
            </h2>

            {/* Map */}
            <div className="rounded-2xl overflow-hidden shadow-lg border border-gray-200 dark:border-white/10">
              <iframe
                title="Ubicación Vámonos"
                className="w-full h-52 border-none"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3!2d-63.24166849999999!3d-32.414741899999996!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzLCsDI0JzUzLjEiUyA2M8KwMTQnMzAuMCJX!5e0!3m2!1ses!2sar!4v1"
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
              <button
                type="button"
                onClick={() => window.open('https://www.google.com/maps/dir/?api=1&destination=Mendoza+1020+Villa+Maria+Cordoba+Argentina', '_blank')}
                className="flex items-center justify-center gap-2 w-full py-3 bg-night hover:bg-night-light text-white text-sm font-black transition-all"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polygon points="3 11 22 2 13 21 11 13 3 11"/>
                </svg>
                {t.contact.map}
              </button>
            </div>
          </div>

          {/* Right */}
          <div>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className={labelClass}>{t.contact.fields.nombre}</label>
                  <input type="text" placeholder={t.contact.placeholders.nombre} value={form.nombre} onChange={e => set('nombre', e.target.value)} required className={inputClass} />
                </div>
                <div>
                  <label className={labelClass}>{t.contact.fields.email} <span className="font-normal normal-case text-gray-400">{t.contact.fields.emailOpt}</span></label>
                  <input type="email" placeholder={t.contact.placeholders.email} value={form.email} onChange={e => set('email', e.target.value)} className={inputClass} />
                </div>
              </div>
              <div>
                <label className={labelClass}>{t.contact.fields.destino}</label>
                <input type="text" placeholder={t.contact.placeholders.destino} value={form.destino} onChange={e => set('destino', e.target.value)} required className={inputClass} />
              </div>
              <div>
                <label className={labelClass}>{t.contact.fields.mensaje}</label>
                <textarea placeholder={t.contact.placeholders.mensaje} value={form.mensaje} onChange={e => set('mensaje', e.target.value)} rows={4} className={`${inputClass} resize-none`} />
              </div>

              {/* Extra fields */}
              {extraFields.map(f => (
                <div key={f.id}>
                  <label className={labelClass}>{f.label}{f.required && <span className="text-red-400 ml-1">*</span>}</label>
                  <input type="text" placeholder={f.placeholder} value={extra[f.id] || ''} onChange={e => setEx(f.id, e.target.value)} required={f.required} className={inputClass} />
                </div>
              ))}

              <button
                type="submit"
                className={`w-full py-4 rounded-full font-black text-sm transition-all shadow-lg ${sent ? 'bg-green-500 text-white' : 'bg-yellow hover:bg-yellow-dark text-night'}`}
              >
                {sent ? t.contact.submitted : t.contact.submit}
              </button>
            </form>
          </div>
        </div>

        {/* Cards */}
        <div className="grid sm:grid-cols-3 gap-4">
          {[
            { icon: '📍', ...t.contact.cards.address, href: 'https://www.google.com/maps/dir/?api=1&destination=Mendoza+1020+Villa+Maria+Cordoba+Argentina' },
            { icon: '💬', ...t.contact.cards.whatsapp, href: `https://wa.me/${WA}` },
            { icon: '📸', ...t.contact.cards.instagram, href: 'https://instagram.com/vamonos.ok' },
          ].map(card => (
            <a
              key={card.label}
              href={card.href}
              target="_blank"
              rel="noreferrer"
              className="group flex items-center gap-4 p-5 bg-white dark:bg-night-light rounded-2xl border-2 border-transparent hover:border-yellow shadow-sm hover:shadow-lg transition-all duration-300"
            >
              <span className="text-3xl flex-shrink-0">{card.icon}</span>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-black uppercase tracking-wider text-night dark:text-white">{card.label}</p>
                <p className="text-sm text-gray-500 dark:text-white/60 font-semibold truncate">{card.value}</p>
              </div>
              <span className="text-xs font-black text-yellow-dark opacity-0 group-hover:opacity-100 transition-all -translate-x-2 group-hover:translate-x-0 whitespace-nowrap">
                {card.cta}
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
