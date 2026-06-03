

// import { useRef } from 'react'
// import { useLang } from '../../context/LangContext'
// import { useAdmin } from '../../context/AdminContext'

// const WA = '5493534092392'

// const LABELS = [
//   'Vuelos', 'Cruceros', 'Traslados', 'Hotelería', 'Disney & Parques', 'Todo incluido'
// ]

// export default function Services() {
//   const t = useLang()
//   const { serviceImages, updateServiceImage, isAdmin } = useAdmin()

//   return (
//     <section id="servicios" className="bg-cream dark:bg-night py-20">
//       <div className="max-w-7xl mx-auto px-6">
//         <div className="text-center mb-12">
//           <span className="inline-block text-xs font-black uppercase tracking-widest text-yellow-dark bg-yellow/20 px-3 py-1.5 rounded-full mb-4">
//             Nuestros servicios
//           </span>
//           <h2 className="text-3xl md:text-5xl font-black text-night dark:text-white mb-3">
//             {t.services.title}
//           </h2>
//           <p className="text-gray-500 dark:text-white/60 font-semibold max-w-xl mx-auto">
//             {t.services.subtitle}
//           </p>
//         </div>

//         <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
//           {t.services.items.map((item, i) => (
//             <ServiceCard
//               key={i}
//               item={item}
//               image={serviceImages[i]}
//               isAdmin={isAdmin}
//               onImageChange={(img) => updateServiceImage(i, img)}
//             />
//           ))}
//         </div>
//       </div>
//     </section>
//   )
// }

// function ServiceCard({ item, image, isAdmin, onImageChange }) {
//   const fileRef = useRef()

//   const handleFile = (e) => {
//     const file = e.target.files[0]
//     if (!file) return
//     const reader = new FileReader()
//     reader.onload = (ev) => onImageChange(ev.target.result)
//     reader.readAsDataURL(file)
//   }

//   return (
//     <div className="relative group">
//       <a
//         href={`https://wa.me/${WA}?text=${encodeURIComponent(item.msg)}`}
//         target="_blank"
//         rel="noreferrer"
//         className="relative overflow-hidden rounded-2xl md:rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-1 block"
//         style={{ aspectRatio: '4/3' }}
//       >
//         <img
//           src={image.img}
//           alt={item.label}
//           className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
//         />

//         <div className={`absolute inset-0 bg-gradient-to-t ${image.color} to-transparent opacity-80 group-hover:opacity-70 transition-opacity duration-500`} />

//         <div className="absolute inset-0 rounded-2xl md:rounded-3xl border-2 border-transparent group-hover:border-yellow transition-all duration-300" />

//         <div className="absolute inset-0 flex flex-col justify-end p-4 md:p-6">
//           <span className="text-white font-black text-base md:text-xl leading-tight mb-2">
//             {item.label}
//           </span>
//           <span className="inline-flex items-center gap-1.5 text-yellow font-black text-xs opacity-0 group-hover:opacity-100 transition-all duration-300 -translate-y-1 group-hover:translate-y-0">
//             Consultar ahora ✈️
//           </span>
//         </div>
//       </a>

//       {/* Botón editar imagen — solo admin */}
//       {isAdmin && (
//         <div className="absolute top-2 right-2 z-20 flex flex-col gap-1">
//           <button
//             onClick={() => fileRef.current.click()}
//             className="flex items-center gap-1 bg-yellow text-night text-xs font-black px-2 py-1.5 rounded-lg shadow-lg hover:bg-yellow-dark transition-all"
//           >
//             📁 Subir
//           </button>
//           <input
//             ref={fileRef}
//             type="file"
//             accept="image/*"
//             className="hidden"
//             onChange={handleFile}
//           />
//           <input
//             type="text"
//             placeholder="URL..."
//             className="bg-white/90 text-night text-xs font-semibold px-2 py-1.5 rounded-lg shadow-lg outline-none w-24 focus:w-36 transition-all"
//             onBlur={e => { if (e.target.value) onImageChange(e.target.value) }}
//           />
//         </div>
//       )}
//     </div>
//   )
// }

import { useRef } from 'react'
import { useLang } from '../../context/LangContext'
import { useAdmin } from '../../context/AdminContext'

const WA = '5493534092392'

export default function Services() {
  const t = useLang()
  const { serviceImages, updateServiceImage, isAdmin } = useAdmin()

  return (
    <section id="servicios" className="bg-yellow dark:bg-night py-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <span className="inline-block text-xs font-black uppercase tracking-widest text-night/60 bg-night/10 px-3 py-1.5 rounded-full mb-4">
            Nuestros servicios
          </span>
          <h2 className="text-3xl md:text-5xl font-black text-night dark:text-white mb-3">
            {t.services.title}
          </h2>
          <p className="text-night/70 dark:text-white/60 font-semibold max-w-xl mx-auto">
            {t.services.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
          {t.services.items.map((item, i) => (
            <ServiceCard
              key={i}
              item={item}
              image={serviceImages[i]}
              isAdmin={isAdmin}
              onImageChange={(img) => updateServiceImage(i, img)}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

function ServiceCard({ item, image, isAdmin, onImageChange }) {
  const fileRef = useRef()

  const handleFile = (e) => {
    const file = e.target.files[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = (ev) => onImageChange(ev.target.result)
    reader.readAsDataURL(file)
  }

  return (
    <div className="relative group">
      <a
        href={`https://wa.me/${WA}?text=${encodeURIComponent(item.msg)}`}
        target="_blank"
        rel="noreferrer"
        className="relative overflow-hidden rounded-2xl md:rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-1 block"
        style={{ aspectRatio: '4/3' }}
      >
        <img
          src={image.img}
          alt={item.label}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />

        <div className={`absolute inset-0 bg-gradient-to-t ${image.color} to-transparent opacity-80 group-hover:opacity-70 transition-opacity duration-500`} />

        <div className="absolute inset-0 rounded-2xl md:rounded-3xl border-2 border-transparent group-hover:border-yellow transition-all duration-300" />

        <div className="absolute inset-0 flex flex-col justify-end p-4 md:p-6">
          <span className="text-white font-black text-base md:text-xl leading-tight mb-2">
            {item.label}
          </span>
          <span className="inline-flex items-center gap-1.5 text-yellow font-black text-xs opacity-0 group-hover:opacity-100 transition-all duration-300 -translate-y-1 group-hover:translate-y-0">
            Consultar ahora ✈️
          </span>
        </div>
      </a>

      {isAdmin && (
        <div className="absolute top-2 right-2 z-20 flex flex-col gap-1">
          <button
            onClick={() => fileRef.current.click()}
            className="flex items-center gap-1 bg-yellow text-night text-xs font-black px-2 py-1.5 rounded-lg shadow-lg hover:bg-yellow-dark transition-all"
          >
            📁 Subir
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
            className="bg-white/90 text-night text-xs font-semibold px-2 py-1.5 rounded-lg shadow-lg outline-none w-24 focus:w-36 transition-all"
            onBlur={e => { if (e.target.value) onImageChange(e.target.value) }}
          />
        </div>
      )}
    </div>
  )
}