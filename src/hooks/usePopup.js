import { useState, useEffect } from 'react'

export function usePopup() {
  const [show, setShow] = useState(false)

  useEffect(() => {
    if (sessionStorage.getItem('vamonos_popup_shown')) return
    const timer = setTimeout(() => {
      setShow(true)
      sessionStorage.setItem('vamonos_popup_shown', '1')
    }, 15000)
    return () => clearTimeout(timer)
  }, [])

  const close = () => setShow(false)

  return { show, close }
}
