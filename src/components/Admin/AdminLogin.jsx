import { useState } from 'react'
import { useAdmin } from '../../context/AdminContext'
import { X, Lock, Eye, EyeOff, User } from 'lucide-react'

export default function AdminLogin({ open, onClose, onSuccess, onError }) {
  const { login } = useAdmin()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [showPwd, setShowPwd] = useState(false)
  const [error, setError] = useState('')
  const [shake, setShake] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (login(username, password)) {
      setUsername('')
      setPassword('')
      setError('')
      onSuccess()
    } else {
      setError('Usuario o contraseña incorrectos')
      setShake(true)
      setTimeout(() => setShake(false), 500)
      onError()
    }
  }

  if (!open) return null

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm px-4"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className={`bg-white dark:bg-night-light rounded-2xl shadow-2xl w-full max-w-sm p-8 relative transition-transform ${shake ? 'animate-bounce' : ''}`}>
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors">
          <X size={20} />
        </button>

        <div className="flex justify-center mb-4">
          <div className="w-14 h-14 rounded-full bg-yellow/20 flex items-center justify-center">
            <Lock size={28} className="text-yellow-dark" />
          </div>
        </div>

        <h2 className="text-center text-xl font-black text-night dark:text-white mb-1">Acceso Admin</h2>
        <p className="text-center text-sm text-gray-500 mb-6">Ingresá tus credenciales para administrar el sitio</p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <div className="relative">
            <User size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
            <input
              type="text"
              placeholder="Usuario"
              value={username}
              onChange={e => { setUsername(e.target.value); setError('') }}
              autoFocus
              className="w-full pl-9 pr-4 py-3 border-2 border-gray-200 rounded-xl text-sm font-semibold outline-none focus:border-yellow transition-colors"
            />
          </div>

          <div className="relative">
            <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
            <input
              type={showPwd ? 'text' : 'password'}
              placeholder="Contraseña"
              value={password}
              onChange={e => { setPassword(e.target.value); setError('') }}
              className={`w-full pl-9 pr-10 py-3 border-2 rounded-xl text-sm font-semibold outline-none focus:border-yellow transition-colors ${error ? 'border-red-400' : 'border-gray-200'}`}
            />
            <button
              type="button"
              onClick={() => setShowPwd(s => !s)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              {showPwd ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>

          {error && <p className="text-red-500 text-xs font-semibold text-center">{error}</p>}

          <button
            type="submit"
            className="mt-2 bg-yellow hover:bg-yellow-dark text-night font-black py-3 rounded-xl transition-all text-sm"
          >
            Ingresar →
          </button>
        </form>
      </div>
    </div>
  )
}