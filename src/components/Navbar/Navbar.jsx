

import logoColor from '../../assets/img-parmil/SVG/logo color.svg'
import { useState, useEffect } from 'react'
import { useAdmin } from '../../context/AdminContext'
import { useLang } from '../../context/LangContext'
import { Menu, X, Settings, Instagram, LogOut, Sun, Moon } from 'lucide-react'

const WA = '5493534092392'

export default function Navbar({ onOpenLogin, onOpenPanel }) {
  const { isAdmin, logout, darkMode, setDarkMode, lang, setLang } = useAdmin()
  const t = useLang()
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    setMenuOpen(false)
  }

  const handleAdminClick = () => {
    if (isAdmin) {
      onOpenPanel()
    } else {
      onOpenLogin()
    }
    setMenuOpen(false)
  }

  const handleLogout = () => {
    logout()
    setMenuOpen(false)
  }

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${darkMode ? 'bg-night' : 'bg-white border-b border-gray-200'} ${scrolled ? 'shadow-lg' : ''}`}>
      {isAdmin && (
        <div className="bg-yellow text-night text-center text-xs font-black py-1.5 tracking-wide">
          ⚙️ MODO ADMINISTRADOR ACTIVO —{' '}
          <button onClick={onOpenPanel} className="underline hover:no-underline">Abrir panel</button>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between gap-4">

        {/* Logo */}
        <button
          onClick={() => scrollTo('inicio')}
          className="flex-shrink-0"
        >
          <img
            src={logoColor}
            alt="Vámonos"
            className="h-10 w-auto object-contain"
          />
        </button>

        {/* Links desktop */}
        <ul className="hidden md:flex items-center gap-1">
          {[['inicio', t.nav.inicio], ['banner', t.nav.promociones], ['contacto', t.nav.contacto], ['servicios', t.nav.servicios]].map(([id, label]) => (
            <li key={id}>
              <button
                onClick={() => scrollTo(id)}
                className={`px-4 py-2 rounded-full text-sm font-semibold transition-all ${darkMode ? 'text-white/80 hover:text-white hover:bg-white/10' : 'text-night/70 hover:text-night hover:bg-night/10'}`}
              >
                {label}
              </button>
            </li>
          ))}
        </ul>

        {/* Actions desktop */}
        <div className="hidden md:flex items-center gap-2">
          <a
            href="https://instagram.com/vamonos.ok"
            target="_blank"
            rel="noreferrer"
            className={`flex items-center gap-1.5 text-sm font-semibold transition-colors ${darkMode ? 'text-white/60 hover:text-white' : 'text-night/60 hover:text-night'}`}
          >
            <Instagram size={15} />
            @vamonos.ok
          </a>

          <a
            href={`https://wa.me/${WA}`}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 bg-wa hover:bg-green-500 text-white px-4 py-2 rounded-full text-sm font-black transition-all"
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            WhatsApp
          </a>

          {/* Dark mode toggle */}
          <button
            onClick={() => setDarkMode(d => !d)}
            title={darkMode ? 'Modo claro' : 'Modo oscuro'}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-full border-2 transition-all text-sm font-black ${darkMode ? 'border-white/20 text-white/80 hover:text-yellow hover:border-yellow' : 'border-night/20 text-night/80 hover:text-yellow-dark hover:border-yellow-dark'}`}
          >
            {darkMode ? <Sun size={18} /> : <Moon size={18} />}
            {darkMode ? 'Claro' : 'Oscuro'}
          </button>

          {/* Lang toggle */}
          <button
            onClick={() => setLang(l => l === 'es' ? 'en' : 'es')}
            className={`flex items-center px-4 py-2.5 rounded-full border-2 transition-all text-sm font-black min-w-[60px] justify-center ${darkMode ? 'border-white/20 text-white/80 hover:text-yellow hover:border-yellow' : 'border-night/20 text-night/80 hover:text-yellow-dark hover:border-yellow-dark'}`}
          >
            {lang === 'es' ? 'EN' : 'ES'}
          </button>

          {/* Admin */}
          <button
            onClick={handleAdminClick}
            title={isAdmin ? 'Abrir panel admin' : 'Acceso admin'}
            className={`p-2 rounded-full transition-all ${isAdmin ? 'text-yellow bg-yellow/15' : darkMode ? 'text-white/50 hover:text-yellow hover:bg-yellow/10' : 'text-night/50 hover:text-yellow-dark hover:bg-yellow/10'}`}
          >
            <Settings size={17} />
          </button>

          {isAdmin && (
            <button
              onClick={handleLogout}
              title="Salir del modo admin"
              className="p-2 rounded-full text-white/40 hover:text-red-400 hover:bg-red-400/10 transition-all"
            >
              <LogOut size={16} />
            </button>
          )}
        </div>

        {/* Hamburger */}
        <button
          className={`md:hidden p-2 ${darkMode ? 'text-white' : 'text-night'}`}
          onClick={() => setMenuOpen(o => !o)}
          aria-label="Menú"
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile menu */}
      <div className={`md:hidden transition-all duration-300 overflow-hidden ${darkMode ? 'bg-night-light' : 'bg-gray-50'} ${menuOpen ? 'max-h-[500px] border-t border-gray-200' : 'max-h-0'}`}>
        <div className="px-4 py-4 flex flex-col gap-2">
          {[['inicio', t.nav.inicio], ['banner', t.nav.promociones], ['contacto', t.nav.contacto], ['servicios', t.nav.servicios]].map(([id, label]) => (
            <button
              key={id}
              onClick={() => scrollTo(id)}
              className={`text-left py-2 px-3 rounded-lg font-semibold transition-all ${darkMode ? 'text-white/80 hover:text-white hover:bg-white/10' : 'text-night/80 hover:text-night hover:bg-night/10'}`}
            >
              {label}
            </button>
          ))}

          <div className="border-t border-gray-200 mt-2 pt-3 flex flex-col gap-2">
            <a
              href={`https://wa.me/${WA}`}
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-center gap-2 bg-wa text-white py-2.5 rounded-full font-black text-sm"
            >
              WhatsApp
            </a>

            <div className="flex gap-2">
              <button
                onClick={() => setDarkMode(d => !d)}
                className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-full text-sm font-black border transition-all ${darkMode ? 'border-white/20 text-white/70 hover:text-yellow' : 'border-night/20 text-night/70 hover:text-yellow-dark'}`}
              >
                {darkMode ? <Sun size={15} /> : <Moon size={15} />}
                {darkMode ? 'Modo claro' : 'Modo oscuro'}
              </button>
              <button
                onClick={() => setLang(l => l === 'es' ? 'en' : 'es')}
                className={`px-5 py-2.5 rounded-full text-sm font-black border transition-all ${darkMode ? 'border-white/20 text-white/70 hover:text-yellow' : 'border-night/20 text-night/70 hover:text-yellow-dark'}`}
              >
                {lang === 'es' ? 'EN' : 'ES'}
              </button>
            </div>

            <button
              onClick={handleAdminClick}
              className={`flex items-center justify-center gap-2 py-2.5 rounded-full font-black text-sm transition-all ${isAdmin ? 'bg-yellow text-night' : darkMode ? 'border border-white/20 text-white/70' : 'border border-night/20 text-night/70'}`}
            >
              <Settings size={15} />
              {isAdmin ? 'Panel Admin' : 'Acceso Admin'}
            </button>

            {isAdmin && (
              <button
                onClick={handleLogout}
                className="flex items-center justify-center gap-2 py-2.5 rounded-full font-black text-sm border border-red-400/30 text-red-400"
              >
                <LogOut size={15} />
                Salir del admin
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}