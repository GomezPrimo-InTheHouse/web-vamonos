import logoSvg from '../../assets/img-parmil/SVG/logo.svg'
import { useAdmin } from '../../context/AdminContext'
import { useLang } from '../../context/LangContext'

const WA = '5493534092392'

import aereo from '../../assets/img-parmil/SVG/aereo.svg'
import crucero from '../../assets/img-parmil/SVG/crucero.svg'
import bus from '../../assets/img-parmil/SVG/bus.svg'
import hotel from '../../assets/img-parmil/SVG/hotel.svg'
import disney from '../../assets/img-parmil/SVG/disney.svg'
import isoColor from '../../assets/img-parmil/SVG/iso icono positivo.svg'

const SERVICES = [
  { icon: aereo, label: 'Vuelos' },
  { icon: crucero, label: 'Cruceros' },
  { icon: bus, label: 'Traslados' },
  { icon: hotel, label: 'Hotelería' },
  { icon: disney, label: 'Disney' },
  { icon: isoColor, label: 'Todo incluido' },
]

export default function Hero() {
  const { hero } = useAdmin()
  const t = useLang()

  const hasImage = Boolean(hero.image)
  const hasForeground = Boolean(hero.imageForeground)

  return (
    <section
      className="relative overflow-hidden pt-16"
      style={{
        background: hasImage
          ? `url(${hero.image}) center/cover no-repeat`
          : '#FBCD44',
        minHeight: '100vh',
      }}
    >
{!hasImage && (
  <>
    {/* Círculo grande difuminado superior derecha */}
    <div
      className="absolute pointer-events-none"
      style={{
        top: '-10%',
        right: '-5%',
        width: '500px',
        height: '500px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(196,154,0,0.25) 0%, transparent 70%)',
      }}
    />

    {/* Círculo mediano difuminado inferior izquierda */}
    <div
      className="absolute pointer-events-none"
      style={{
        bottom: '-15%',
        left: '-8%',
        width: '400px',
        height: '400px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(196,154,0,0.2) 0%, transparent 70%)',
      }}
    />

    {/* Forma boomerang superior izquierda — más blanca */}
    <svg
      className="absolute top-0 left-0 pointer-events-none"
      width="320"
      height="320"
      viewBox="0 0 320 320"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M -20 280 Q 80 80 280 -20"
        stroke="rgba(255,255,255,0.35)"
        strokeWidth="48"
        strokeLinecap="round"
        fill="none"
      />
    </svg>

    {/* Forma boomerang inferior derecha — más doblada */}
    <svg
      className="absolute bottom-0 right-0 pointer-events-none"
      width="380"
      height="380"
      viewBox="0 0 380 380"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M 400 80 Q 200 200 80 400"
        stroke="rgba(255,255,255,0.25)"
        strokeWidth="56"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M 440 120 Q 240 240 120 440"
        stroke="rgba(255,255,255,0.15)"
        strokeWidth="56"
        strokeLinecap="round"
        fill="none"
      />
    </svg>

    {/* Puntos decorativos */}
    <div
      className="absolute pointer-events-none"
      style={{
        top: '20%',
        left: '5%',
        width: '6px',
        height: '6px',
        borderRadius: '50%',
        background: 'rgba(255,255,255,0.4)',
        boxShadow: '20px 30px 0 rgba(255,255,255,0.3), 40px 10px 0 rgba(255,255,255,0.2), 60px 40px 0 rgba(255,255,255,0.15)',
      }}
    />
  </>
)}



  {/* Contenido principal */}
<div className="relative flex-1 max-w-7xl mx-auto px-6 py-20 grid md:grid-cols-2 gap-12 items-center w-full" style={{ minHeight: 'calc(100vh - 64px)' }}>

  {/* LEFT — texto */}
  <div className="z-10">
    {/* Logo — solo sin imagen de fondo */}
    {!hasImage && (
      <img
        src={logoSvg}
        alt="Vámonos"
    className="mb-6 h-24 md:h-32 w-auto object-contain"
      />
    )}

    <h1
      className="font-black leading-tight mb-5 text-white"
      style={{ fontSize: 'clamp(32px, 5vw, 64px)' }}
    >
      {hero.title}
    </h1>

    <p
      className="font-semibold mb-8 max-w-md"
      style={{ color: 'rgba(255,255,255,0.85)', fontSize: 'clamp(15px, 2vw, 18px)', lineHeight: 1.6 }}
    >
      {hero.subtitle}
    </p>

    <div className="flex flex-wrap gap-4">
      <button
        onClick={() => document.getElementById('banner')?.scrollIntoView({ behavior: 'smooth' })}
        className="bg-white text-night font-black px-8 py-4 rounded-full hover:bg-night hover:text-yellow transition-all shadow-lg text-sm"
      >
        {t.hero.cta}
      </button>

      <a
        href={`https://wa.me/${WA}?text=Hola! quiero consultar sobre un viaje`}
        target="_blank"
        rel="noreferrer"
        className="bg-wa text-white font-black px-8 py-4 rounded-full hover:bg-green-500 transition-all shadow-lg text-sm flex items-center gap-2"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
        </svg>
        {t.hero.wa}
      </a>
    </div>
  </div>

  {/* RIGHT — imagen delantera o maleta por defecto */}
  <div className="hidden md:flex justify-center items-center relative z-10">
    {hasForeground ? (
      <img
        src={hero.imageForeground}
        alt="Hero foreground"
        className="relative z-10 w-full max-w-lg h-auto object-contain"
        style={{ filter: 'drop-shadow(0 24px 48px rgba(0,0,0,0.2))' }}
      />
    ) : (
      <>
        <div className="absolute w-80 h-80 rounded-full bg-yellow-dark/20 blur-3xl" />
        <img
          src="https://vamonosdeviaje.com.ar/wp-content/uploads/2024/valija-vamonos.png"
          alt="Maleta Vámonos"
          onError={e => {
            e.target.src = 'https://images.unsplash.com/photo-1565026057447-bc90a3dceb87?w=700&q=85'
          }}
    className="relative z-10 w-full max-w-xs h-auto object-contain"
          style={{ filter: 'drop-shadow(0 24px 48px rgba(0,0,0,0.15))' }}
        />
      </>
    )}
  </div>

</div>


      {!hasImage && (
  <div className="relative bg-black/10 py-6 md:py-5">
    <div className="max-w-7xl mx-auto px-4 grid grid-cols-3 gap-4 md:flex md:items-center md:justify-center md:gap-14">
      {SERVICES.map(s => (
        <div key={s.label} className="flex flex-col items-center gap-2">
          <div className="w-16 h-16 md:w-24 md:h-24 rounded-full bg-yellow/40 flex items-center justify-center shadow-sm p-3 md:p-5">
            <img
              src={s.icon}
              alt={s.label}
              className="w-full h-full object-contain"
            />
          </div>
          <span className="text-white/90 text-xs font-black text-center">{s.label}</span>
        </div>
      ))}
    </div>
  </div>
)}

    </section>
  )
}