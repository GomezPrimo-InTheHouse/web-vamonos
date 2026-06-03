import { useLang } from '../../context/LangContext'
import { Instagram, MapPin, Phone } from 'lucide-react'

const WA = '5493534092392'

export default function Footer() {
  const t = useLang()

  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })

  return (
    <footer className="bg-night border-t border-white/10 pt-14 pb-8">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-3 gap-10 mb-10">
          {/* Brand */}
          <div>
            <p className="text-yellow font-black text-2xl italic mb-3">Vámonos</p>
            <p className="text-white/60 text-sm font-semibold leading-relaxed">{t.footer.tagline}</p>
          </div>

          {/* Nav */}
          <div>
            <p className="text-white font-black text-sm uppercase tracking-widest mb-4">Navegación</p>
            <ul className="flex flex-col gap-2">
              {[['inicio', t.nav.inicio], ['banner', t.nav.promociones], ['contacto', t.nav.contacto], ['servicios', t.nav.servicios]].map(([id, label]) => (
                <li key={id}>
                  <button onClick={() => scrollTo(id)} className="text-white/60 hover:text-yellow text-sm font-semibold transition-colors">
                    {label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <p className="text-white font-black text-sm uppercase tracking-widest mb-4">Contacto</p>
            <div className="flex flex-col gap-3">
              <a href="https://maps.google.com/?q=Mendoza+1020,+Villa+Maria" target="_blank" rel="noreferrer" className="flex items-center gap-2 text-white/60 hover:text-yellow text-sm font-semibold transition-colors">
                <MapPin size={15} /> Mendoza 1020, Villa María
              </a>
              <a href={`https://wa.me/${WA}`} target="_blank" rel="noreferrer" className="flex items-center gap-2 text-white/60 hover:text-yellow text-sm font-semibold transition-colors">
                <Phone size={15} /> 353 409-2392
              </a>
              <a href="https://instagram.com/vamonos.ok" target="_blank" rel="noreferrer" className="flex items-center gap-2 text-white/60 hover:text-yellow text-sm font-semibold transition-colors">
                <Instagram size={15} /> @vamonos.ok
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 pt-6 text-center">
          <p className="text-white/40 text-xs font-semibold">{t.footer.rights}</p>
        </div>
      </div>
    </footer>
  )
}
