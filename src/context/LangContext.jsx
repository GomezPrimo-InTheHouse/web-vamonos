import { createContext, useContext } from 'react'
import { useAdmin } from './AdminContext'
import es from '../i18n/es'
import en from '../i18n/en'

const LangContext = createContext(es)

export function LangProvider({ children }) {
  const { lang } = useAdmin()
  const t = lang === 'en' ? en : es
  return <LangContext.Provider value={t}>{children}</LangContext.Provider>
}

export const useLang = () => useContext(LangContext)
