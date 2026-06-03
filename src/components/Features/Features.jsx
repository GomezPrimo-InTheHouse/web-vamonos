import { useRef } from 'react'
import { useLang } from '../../context/LangContext'
import { useAdmin } from '../../context/AdminContext'
import { Heart, Zap, Shield, Trophy } from 'lucide-react'
import personaje02 from '../../assets/img-parmil/PERSONAJE 02.png'

const ICONS = [Heart, Zap, Shield, Trophy]

export default function Features() {
  const t = useLang()
  const { isAdmin, featuresImage, updateFeaturesImage } = useAdmin()
  const fileRef = useRef()

  const handleFile = (e) => {
    const file = e.target.files[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = (ev) => updateFeaturesImage(ev.target.result)
    reader.readAsDataURL(file)
  }

  const imgSrc = featuresImage || personaje02

  return (
    <section className="bg-night py-20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 items-center">

          {/* LEFT — cards */}
          <div className="grid sm:grid-cols-2 gap-6">
            {t.features.items.map((item, i) => {
              const Icon = ICONS[i]
              return (
                <div
                  key={i}
                  className="group p-6 rounded-2xl border border-white/10 hover:border-yellow/50 hover:bg-white/5 transition-all duration-300"
                >
                  <div className="w-12 h-12 rounded-xl bg-yellow/20 flex items-center justify-center mb-4 group-hover:bg-yellow/30 transition-all">
                    <Icon size={24} className="text-yellow" />
                  </div>
                  <h3 className="text-white font-black text-lg mb-2">{item.title}</h3>
                  <p className="text-white/60 text-sm leading-relaxed font-semibold">{item.desc}</p>
                </div>
              )
            })}
          </div>

          {/* RIGHT — imagen personaje */}
          <div className="relative flex justify-center items-end">
            <img
              src={imgSrc}
              alt="Personaje Vámonos"
              className="relative z-10 w-72 md:w-96 h-auto object-contain"
              style={{ filter: 'drop-shadow(0 20px 40px rgba(0,0,0,0.4))' }}
            />

            {/* Círculo decorativo detrás */}
            <div className="absolute bottom-0 w-72 h-72 rounded-full bg-yellow/10 blur-3xl pointer-events-none" />

            {/* Botón editar — solo admin */}
            {isAdmin && (
              <div className="absolute top-0 right-0 z-20 flex flex-col gap-1">
                <button
                  onClick={() => fileRef.current.click()}
                  className="flex items-center gap-1 bg-yellow text-night text-xs font-black px-2 py-1.5 rounded-lg shadow-lg hover:bg-yellow-dark transition-all"
                >
                  📁 Cambiar imagen
                </button>
                <input
                  ref={fileRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleFile}
                />
                <input
                  type="text"
                  placeholder="URL..."
                  className="bg-white/90 text-night text-xs font-semibold px-2 py-1.5 rounded-lg shadow-lg outline-none w-28"
                  onBlur={e => { if (e.target.value) updateFeaturesImage(e.target.value) }}
                />
              </div>
            )}
          </div>

        </div>
      </div>
    </section>
  )
}