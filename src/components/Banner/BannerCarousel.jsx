import { useState, useEffect, useRef, useCallback } from 'react'
import { useAdmin } from '../../context/AdminContext'
import { ChevronLeft, ChevronRight } from 'lucide-react'

const WA = '5493534092392'

export default function BannerCarousel() {
  const { banners } = useAdmin()
  const active = banners.filter(b => b.active)
  const [idx, setIdx] = useState(0)
  const [dragging, setDragging] = useState(false)
  const startX = useRef(0)
  const timerRef = useRef(null)

  const next = useCallback(() => setIdx(i => (i + 1) % active.length), [active.length])
  const prev = () => setIdx(i => (i - 1 + active.length) % active.length)

  const resetTimer = useCallback(() => {
    clearInterval(timerRef.current)
    timerRef.current = setInterval(next, 5000)
  }, [next])

  useEffect(() => {
    if (active.length <= 1) return
    resetTimer()
    return () => clearInterval(timerRef.current)
  }, [active.length, resetTimer])

  useEffect(() => {
    if (idx >= active.length) setIdx(0)
  }, [active.length, idx])

  const handleTouchStart = (e) => {
    startX.current = e.touches[0].clientX
    setDragging(false)
  }

  const handleTouchEnd = (e) => {
    const diff = startX.current - e.changedTouches[0].clientX
    if (Math.abs(diff) > 50) {
      diff > 0 ? next() : prev()
      resetTimer()
    }
  }

  if (!active.length) return null

  const banner = active[idx]

  return (
    <section className="relative h-[70vh] min-h-[480px] overflow-hidden bg-night select-none">
      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center transition-all duration-700"
        style={{ backgroundImage: `url(${banner.image})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-night/85 via-night/50 to-transparent" />

      {/* Content */}
      <div
        className="relative h-full max-w-7xl mx-auto px-6 flex items-center"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <div className="max-w-lg">
          <span className="inline-block bg-yellow text-night text-xs font-black uppercase tracking-widest px-3 py-1.5 rounded-full mb-4">
            {banner.tag}
          </span>
          <h2 className="text-4xl md:text-6xl font-black text-white leading-tight mb-3">
            {banner.title}
          </h2>
          <p className="text-white/80 text-lg font-semibold mb-2">{banner.description}</p>
          <p className="text-yellow font-black text-2xl mb-6">{banner.price}</p>
          <a
            href={`https://wa.me/${WA}?text=${encodeURIComponent(banner.waText || `Hola! Quiero consultar sobre: ${banner.title}`)}`}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 bg-yellow hover:bg-yellow-dark text-night font-black px-8 py-4 rounded-full transition-all shadow-xl text-sm"
          >
            ¡Quiero este viaje! ✈️
          </a>
        </div>
      </div>

      {/* Arrows */}
      {active.length > 1 && (
        <>
          <button
            onClick={() => { prev(); resetTimer() }}
            className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/20 hover:bg-white/40 backdrop-blur-sm flex items-center justify-center text-white transition-all"
          >
            <ChevronLeft size={22} />
          </button>
          <button
            onClick={() => { next(); resetTimer() }}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/20 hover:bg-white/40 backdrop-blur-sm flex items-center justify-center text-white transition-all"
          >
            <ChevronRight size={22} />
          </button>
        </>
      )}

      {/* Dots */}
      {active.length > 1 && (
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
          {active.map((_, i) => (
            <button
              key={i}
              onClick={() => { setIdx(i); resetTimer() }}
              className={`rounded-full transition-all ${i === idx ? 'w-8 h-2.5 bg-yellow' : 'w-2.5 h-2.5 bg-white/50 hover:bg-white/80'}`}
            />
          ))}
        </div>
      )}
    </section>
  )
}
