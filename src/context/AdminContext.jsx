import { createContext, useContext, useState, useEffect } from 'react'

const AdminContext = createContext(null)

const ADMIN_USER = 'admin'
const ADMIN_PASS = 'vamonos2025'

const DEFAULT_BANNERS = [
  {
    id: '1',
    tag: '¡Oferta especial!',
    title: 'Cancún, México',
    description: 'Vuelo + Hotel + Traslados · 7 noches',
    price: 'Desde $850 USD',
    image: 'https://images.unsplash.com/photo-1552074284-5e88ef1aef18?w=1400&q=80',
    active: true,
    waText: 'Hola! Quiero consultar sobre: Cancún, México ✈️',
  },
  {
    id: '2',
    tag: '¡Novedad!',
    title: 'Roma, Italia',
    description: 'Vuelo + Hotel · 10 noches',
    price: 'Desde $1.200 USD',
    image: 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=1400&q=80',
    active: true,
    waText: 'Hola! Quiero consultar sobre: Roma, Italia ✈️',
  },
  {
    id: '3',
    tag: '¡Familia!',
    title: 'Disney Orlando, EE.UU.',
    description: 'Vuelo + Hotel + Entradas · 8 noches',
    price: 'Desde $2.100 USD',
    image: 'https://images.unsplash.com/photo-1534430480872-3498386e7856?w=1400&q=80',
    active: true,
    waText: 'Hola! Quiero consultar sobre: Disney Orlando ✈️',
  },
  {
    id: '4',
    tag: 'Aventura',
    title: 'Tokio, Japón',
    description: 'Vuelo + Hotel · 12 noches',
    price: 'Desde $2.800 USD',
    image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=1400&q=80',
    active: true,
    waText: 'Hola! Quiero consultar sobre: Tokio, Japón ✈️',
  },
]

const DEFAULT_SERVICES = [
  {
    img: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=800&q=80',
    color: 'from-blue-900/80',
  },
  {
    img: 'https://images.unsplash.com/photo-1599640842225-85d111c60e6b?w=800&q=80',
    color: 'from-cyan-900/80',
  },
  {
    img: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=800&q=80',
    color: 'from-emerald-900/80',
  },
  {
    img: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80',
    color: 'from-amber-900/80',
  },
  {
    img: 'https://images.unsplash.com/photo-1575517111839-3a3843ee7f5d?w=800&q=80',
    color: 'from-purple-900/80',
  },
  {
    img: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&q=80',
    color: 'from-rose-900/80',
  },
]

const DEFAULT_HERO = {
  title: '¿Estás listo para tu próxima aventura?',
  subtitle: 'Tu agencia de confianza en Villa María. Paquetes, vuelos, cruceros, hoteles, playa, Disney, viajes a medida y mucho más — con atención real y personalizada.',
  image: '',
  imageForeground: '',
}

const DEFAULT_EXTRA_FIELDS = []

function load(key, fallback) {
  try {
    const v = localStorage.getItem(key)
    return v ? JSON.parse(v) : fallback
  } catch {
    return fallback
  }
}

export function AdminProvider({ children }) {
  const [isAdmin, setIsAdmin] = useState(false)
  const [banners, setBanners] = useState(() => load('vamonos_banners', DEFAULT_BANNERS))
  const [hero, setHero] = useState(() => load('vamonos_hero', DEFAULT_HERO))
  const [extraFields, setExtraFields] = useState(() => load('vamonos_fields', DEFAULT_EXTRA_FIELDS))
  const [darkMode, setDarkMode] = useState(() => load('vamonos_dark', false))
  const [lang, setLang] = useState(() => load('vamonos_lang', 'es'))
  const [serviceImages, setServiceImages] = useState(() => load('vamonos_services', DEFAULT_SERVICES))

const [featuresImage, setFeaturesImage] = useState(() => load('vamonos_features_img', ''))



const updateFeaturesImage = (img) => setFeaturesImage(img)

const updateServiceImage = (index, img) =>
  setServiceImages(prev => prev.map((s, i) => i === index ? { ...s, img } : s))

useEffect(() => {
  localStorage.setItem('vamonos_features_img', JSON.stringify(featuresImage))
}, [featuresImage])

useEffect(() => {
  localStorage.setItem('vamonos_services', JSON.stringify(serviceImages))
}, [serviceImages])
  useEffect(() => { localStorage.setItem('vamonos_banners', JSON.stringify(banners)) }, [banners])
  useEffect(() => { localStorage.setItem('vamonos_hero', JSON.stringify(hero)) }, [hero])
  useEffect(() => { localStorage.setItem('vamonos_fields', JSON.stringify(extraFields)) }, [extraFields])
  useEffect(() => { localStorage.setItem('vamonos_dark', JSON.stringify(darkMode)) }, [darkMode])
  useEffect(() => { localStorage.setItem('vamonos_lang', JSON.stringify(lang)) }, [lang])

  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode)
  }, [darkMode])

  const login = (username, password) => {
    if (username === ADMIN_USER && password === ADMIN_PASS) {
      setIsAdmin(true)
      return true
    }
    return false
  }

  const logout = () => setIsAdmin(false)

  const addBanner = (banner) =>
    setBanners(prev => [...prev, { ...banner, id: Date.now().toString(), active: true }])

  const updateBanner = (id, data) =>
    setBanners(prev => prev.map(b => b.id === id ? { ...b, ...data } : b))

  const deleteBanner = (id) =>
    setBanners(prev => prev.filter(b => b.id !== id))

  const toggleBanner = (id) =>
    setBanners(prev => prev.map(b => b.id === id ? { ...b, active: !b.active } : b))

  const moveBanner = (id, dir) => {
    setBanners(prev => {
      const arr = [...prev]
      const idx = arr.findIndex(b => b.id === id)
      const to = idx + dir
      if (to < 0 || to >= arr.length) return arr
      ;[arr[idx], arr[to]] = [arr[to], arr[idx]]
      return arr
    })
  }

  const updateHero = (data) => setHero(prev => ({ ...prev, ...data }))

  const addField = (field) =>
    setExtraFields(prev => [...prev, { ...field, id: Date.now().toString() }])

  const removeField = (id) =>
    setExtraFields(prev => prev.filter(f => f.id !== id))

  return (
    <AdminContext.Provider value={{
      isAdmin, login, logout,
      banners, addBanner, updateBanner, deleteBanner, toggleBanner, moveBanner,
      hero, updateHero,
      extraFields, addField, removeField,
      darkMode, setDarkMode,
      lang, setLang,
      serviceImages, updateServiceImage,
      featuresImage, updateFeaturesImage,
    }}>
      {children}
    </AdminContext.Provider>
  )
}

export const useAdmin = () => useContext(AdminContext)
