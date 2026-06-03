import { useState } from 'react'
import { AdminProvider } from './context/AdminContext'
import { LangProvider } from './context/LangContext'
import Navbar from './components/Navbar/Navbar'
import Hero from './components/Hero/Hero'
import BannerCarousel from './components/Banner/BannerCarousel'
import Features from './components/Features/Features'
import Services from './components/Services/Services'
import Contact from './components/Contact/Contact'
import Footer from './components/Footer/Footer'
import WhatsAppButton from './components/WhatsApp/WhatsAppButton'
import AdminLogin from './components/Admin/AdminLogin'
import AdminPanel from './components/Admin/AdminPanel'
import Popup from './components/Popup/Popup'
import Toast from './components/Toast/Toast'
import { useToast } from './hooks/useToast'

function AppInner() {
  const [loginOpen, setLoginOpen] = useState(false)
  const [panelOpen, setPanelOpen] = useState(false)
  const { toasts, addToast, removeToast } = useToast()

  return (
    <>
      <Navbar
        onOpenLogin={() => setLoginOpen(true)}
        onOpenPanel={() => setPanelOpen(true)}
      />
      <AdminLogin
        open={loginOpen}
        onClose={() => setLoginOpen(false)}
        onSuccess={() => {
          setLoginOpen(false)
          addToast('¡Bienvenido, admin! Sesión iniciada correctamente.', 'success')
        }}
        onError={() => addToast('Usuario o contraseña incorrectos.', 'error')}
      />
      <AdminPanel
        open={panelOpen}
        onClose={() => setPanelOpen(false)}
        onSaved={(msg) => addToast(msg, 'success')}
      />

      <main>
        <section id="inicio"><Hero /></section>
        <section id="banner"><BannerCarousel /></section>
        <section id="servicios"><Features /><Services /></section>
        <section id="contacto"><Contact /></section>
      </main>

      <Footer />
      <WhatsAppButton />
      <Popup />
      <Toast toasts={toasts} onRemove={removeToast} />
    </>
  )
}

export default function App() {
  return (
    <AdminProvider>
      <LangProvider>
        <AppInner />
      </LangProvider>
    </AdminProvider>
  )
}