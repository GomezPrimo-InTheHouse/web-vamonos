import { useState, useRef } from 'react'
import { useAdmin } from '../../context/AdminContext'
import { X, Plus, Trash2, ChevronUp, ChevronDown, Edit3, Eye, EyeOff, Save, Upload } from 'lucide-react'

function ImagePicker({ value, onChange }) {
  const fileRef = useRef()

  const handleFile = (e) => {
    const file = e.target.files[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = (ev) => onChange(ev.target.result)
    reader.readAsDataURL(file)
  }

  return (
    <div className="flex flex-col gap-2">
      <label className="text-xs font-black text-night uppercase tracking-wide mb-1 block">Imagen</label>
      <div className="flex gap-2">
        <input
          className="input-admin flex-1"
          placeholder="https://... o subí un archivo"
          value={value.startsWith('data:') ? '' : value}
          onChange={e => onChange(e.target.value)}
        />
        <button
          type="button"
          onClick={() => fileRef.current.click()}
          className="flex items-center gap-1.5 px-3 py-2 bg-night text-white rounded-xl text-xs font-black hover:bg-night-light transition-all flex-shrink-0"
        >
          <Upload size={14} /> Subir
        </button>
      </div>
      <input
        ref={fileRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleFile}
      />
      {value && (
        <img src={value} alt="preview" className="rounded-xl h-28 w-full object-cover border border-gray-200" />
      )}
    </div>
  )
}

function BannerForm({ initial, onSave, onCancel }) {
  const [form, setForm] = useState(initial || {
    tag: '', title: '', description: '', price: '', image: '', waText: ''
  })
  const set = (k, v) => setForm(f => ({ ...f, [k]: v }))

  return (
    <div className="bg-white border-2 border-yellow rounded-xl p-4 flex flex-col gap-3">
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="text-xs font-black text-night uppercase tracking-wide mb-1 block">Etiqueta</label>
          <input className="input-admin" placeholder="¡Oferta!" value={form.tag} onChange={e => set('tag', e.target.value)} />
        </div>
        <div>
          <label className="text-xs font-black text-night uppercase tracking-wide mb-1 block">Precio</label>
          <input className="input-admin" placeholder="Desde $850 USD" value={form.price} onChange={e => set('price', e.target.value)} />
        </div>
      </div>
      <div>
        <label className="text-xs font-black text-night uppercase tracking-wide mb-1 block">Título</label>
        <input className="input-admin" placeholder="Cancún, México" value={form.title} onChange={e => set('title', e.target.value)} />
      </div>
      <div>
        <label className="text-xs font-black text-night uppercase tracking-wide mb-1 block">Descripción</label>
        <input className="input-admin" placeholder="Vuelo + Hotel · 7 noches" value={form.description} onChange={e => set('description', e.target.value)} />
      </div>

      <ImagePicker value={form.image} onChange={v => set('image', v)} />

      <div>
        <label className="text-xs font-black text-night uppercase tracking-wide mb-1 block">Texto WhatsApp</label>
        <input className="input-admin" placeholder="Hola! Quiero consultar sobre..." value={form.waText} onChange={e => set('waText', e.target.value)} />
      </div>
      <div className="flex gap-2 justify-end">
        <button
          onClick={onCancel}
          className="px-4 py-2 rounded-lg border border-gray-300 text-sm font-bold text-gray-600 hover:bg-gray-50 transition-all"
        >
          Cancelar
        </button>
        <button
          onClick={() => onSave(form)}
          className="px-4 py-2 rounded-lg bg-yellow text-night text-sm font-black hover:bg-yellow-dark transition-all flex items-center gap-1.5"
        >
          <Save size={14} /> Guardar
        </button>
      </div>
    </div>
  )
}

export default function AdminPanel({ open, onClose, onSaved }) {
  const {
    banners, addBanner, updateBanner, deleteBanner, toggleBanner, moveBanner,
    hero, updateHero,
    extraFields, addField, removeField,
  } = useAdmin()

  const [tab, setTab] = useState('banners')
  const [adding, setAdding] = useState(false)
  const [editing, setEditing] = useState(null)
  const [confirmDelete, setConfirmDelete] = useState(null)
  const [heroForm, setHeroForm] = useState(hero)
  const [newField, setNewField] = useState({ label: '', placeholder: '', required: false })
  const heroFileRef = useRef()
  const heroFgFileRef = useRef()
  if (!open) return null

  const tabs = [
    { id: 'banners', label: '🖼 Banners' },
    { id: 'hero', label: '🏠 Hero' },
    { id: 'form', label: '📝 Formulario' },
  ]

  const handleHeroFile = (e) => {
    const file = e.target.files[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = (ev) => setHeroForm(f => ({ ...f, image: ev.target.result }))
    reader.readAsDataURL(file)
  }

  return (
    <div className="fixed inset-0 z-[90] flex items-center justify-center bg-black/60 backdrop-blur-sm px-4 py-8">
      <div className="bg-white dark:bg-night-light rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col">

        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <h2 className="text-lg font-black text-night dark:text-white">Panel de Administración</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors">
            <X size={20} />
          </button>
        </div>

        <div className="flex border-b border-gray-100 px-6 gap-1 overflow-x-auto no-scrollbar">
          {tabs.map(t => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`py-3 px-3 text-sm font-black whitespace-nowrap border-b-2 transition-all ${tab === t.id ? 'border-yellow text-night dark:text-white' : 'border-transparent text-gray-400 hover:text-gray-600'}`}
            >
              {t.label}
            </button>
          ))}
        </div>

        <div className="flex-1 overflow-y-auto p-6">

          {/* BANNERS */}
          {tab === 'banners' && (
            <div className="flex flex-col gap-4">
              {banners.map((b, i) => (
                <div key={b.id}>
                  {editing === b.id ? (
                    <BannerForm
                      initial={b}
                      onSave={(data) => { updateBanner(b.id, data); setEditing(null) }}
                      onCancel={() => setEditing(null)}
                    />
                  ) : (
                    <div className={`flex items-center gap-3 p-3 rounded-xl border-2 transition-all ${b.active ? 'border-gray-200 bg-white' : 'border-gray-100 bg-gray-50 opacity-60'}`}>
                      <img src={b.image} alt={b.title} className="w-16 h-12 object-cover rounded-lg flex-shrink-0" />
                      <div className="flex-1 min-w-0">
                        <p className="font-black text-sm text-night truncate">{b.title}</p>
                        <p className="text-xs text-gray-500 truncate">{b.price}</p>
                      </div>
                      <div className="flex items-center gap-1">
                        <button onClick={() => moveBanner(b.id, -1)} disabled={i === 0} className="p-1.5 rounded-lg hover:bg-gray-100 disabled:opacity-30 transition-all"><ChevronUp size={14} /></button>
                        <button onClick={() => moveBanner(b.id, 1)} disabled={i === banners.length - 1} className="p-1.5 rounded-lg hover:bg-gray-100 disabled:opacity-30 transition-all"><ChevronDown size={14} /></button>
                        <button onClick={() => toggleBanner(b.id)} className="p-1.5 rounded-lg hover:bg-gray-100 transition-all">{b.active ? <Eye size={14} className="text-green-500" /> : <EyeOff size={14} className="text-gray-400" />}</button>
                        <button onClick={() => setEditing(b.id)} className="p-1.5 rounded-lg hover:bg-yellow/20 transition-all"><Edit3 size={14} className="text-yellow-dark" /></button>
                        <button onClick={() => setConfirmDelete(b.id)} className="p-1.5 rounded-lg hover:bg-red-50 transition-all"><Trash2 size={14} className="text-red-400" /></button>
                      </div>
                    </div>
                  )}
                  {confirmDelete === b.id && (
                    <div className="mt-2 p-3 bg-red-50 border border-red-200 rounded-xl flex items-center justify-between">
                      <p className="text-sm font-bold text-red-600">¿Eliminar "{b.title}"?</p>
                      <div className="flex gap-2">
                        <button onClick={() => setConfirmDelete(null)} className="px-3 py-1.5 text-xs font-bold text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50">Cancelar</button>
                        <button onClick={() => { deleteBanner(b.id); setConfirmDelete(null) }} className="px-3 py-1.5 text-xs font-bold text-white bg-red-500 rounded-lg hover:bg-red-600">Eliminar</button>
                      </div>
                    </div>
                  )}
                </div>
              ))}
              {adding ? (
                <BannerForm
                  onSave={(data) => { addBanner(data); setAdding(false); onSaved('Banner agregado correctamente ✓') }}
                  onCancel={() => setAdding(false)}
                />
              ) : (
                <button
                  onClick={() => setAdding(true)}
                  className="flex items-center justify-center gap-2 py-3 border-2 border-dashed border-yellow/50 rounded-xl text-yellow-dark font-black text-sm hover:border-yellow hover:bg-yellow/5 transition-all"
                >
                  <Plus size={16} /> Agregar banner
                </button>
              )}
            </div>
          )}

          {/* HERO */}
          {tab === 'hero' && (
            <div className="flex flex-col gap-4">
              <div>
                <label className="text-xs font-black text-night uppercase tracking-wide mb-1 block">Título</label>
                <input
                  className="input-admin"
                  value={heroForm.title}
                  onChange={e => setHeroForm(f => ({ ...f, title: e.target.value }))}
                />
              </div>
              <div>
                <label className="text-xs font-black text-night uppercase tracking-wide mb-1 block">Subtítulo</label>
                <textarea
                  className="input-admin resize-none"
                  rows={3}
                  value={heroForm.subtitle}
                  onChange={e => setHeroForm(f => ({ ...f, subtitle: e.target.value }))}
                />
              </div>

              <div>
                <label className="text-xs font-black text-night uppercase tracking-wide mb-1 block">Imagen del hero</label>
                <div className="flex gap-2 mb-2">
                  <input
                    className="input-admin flex-1"
                    placeholder="https://... o subí un archivo"
                    value={heroForm.image?.startsWith('data:') ? '' : (heroForm.image || '')}
                    onChange={e => setHeroForm(f => ({ ...f, image: e.target.value }))}
                  />
                  <button
                    type="button"
                    onClick={() => heroFileRef.current.click()}
                    className="flex items-center gap-1.5 px-3 py-2 bg-night text-white rounded-xl text-xs font-black hover:bg-night-light transition-all flex-shrink-0"
                  >
                    <Upload size={14} /> Subir
                  </button>
                </div>
                <input
                  ref={heroFileRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleHeroFile}
                />
                {heroForm.image && (
                  <img src={heroForm.image} alt="preview hero" className="rounded-xl h-36 w-full object-cover border border-gray-200" />
                )}
                {heroForm.image && (
                  <button
                    onClick={() => setHeroForm(f => ({ ...f, image: '' }))}
                    className="mt-2 text-xs text-red-400 font-bold hover:text-red-600 transition-colors"
                  >
                    Quitar imagen (volver a fondo amarillo)
                  </button>
                )}
              </div>
              {/* Imagen delantera */}
              <div>
                <label className="text-xs font-black text-night uppercase tracking-wide mb-1 block">
                  Imagen delantera (derecha del hero)
                </label>
                <div className="flex gap-2 mb-2">
                  <input
                    className="input-admin flex-1"
                    placeholder="https://... o subí un archivo"
                    value={heroForm.imageForeground?.startsWith('data:') ? '' : (heroForm.imageForeground || '')}
                    onChange={e => setHeroForm(f => ({ ...f, imageForeground: e.target.value }))}
                  />
                  <button
                    type="button"
                    onClick={() => heroFgFileRef.current.click()}
                    className="flex items-center gap-1.5 px-3 py-2 bg-night text-white rounded-xl text-xs font-black hover:bg-night-light transition-all flex-shrink-0"
                  >
                    <Upload size={14} /> Subir
                  </button>
                </div>
                <input
                  ref={heroFgFileRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={e => {
                    const file = e.target.files[0]
                    if (!file) return
                    const reader = new FileReader()
                    reader.onload = (ev) => setHeroForm(f => ({ ...f, imageForeground: ev.target.result }))
                    reader.readAsDataURL(file)
                  }}
                />
                {heroForm.imageForeground && (
                  <>
                    <img src={heroForm.imageForeground} alt="preview foreground" className="rounded-xl h-28 w-full object-contain border border-gray-200 bg-gray-50" />
                    <button
                      onClick={() => setHeroForm(f => ({ ...f, imageForeground: '' }))}
                      className="mt-2 text-xs text-red-400 font-bold hover:text-red-600 transition-colors"
                    >
                      Quitar imagen delantera
                    </button>
                  </>
                )}
              </div>

              <button
                onClick={() => updateHero(heroForm)}
                className="flex items-center justify-center gap-2 bg-yellow hover:bg-yellow-dark text-night font-black py-3 rounded-xl transition-all"
              >
                <Save size={16} /> Guardar cambios
              </button>
            </div>
          )}

          {/* FORM */}
          {tab === 'form' && (
            <div className="flex flex-col gap-4">
              <div className="bg-gray-50 rounded-xl p-4">
                <p className="text-xs font-black text-gray-500 uppercase tracking-wide mb-3">Campos base (no editables)</p>
                {['Nombre', 'Email', 'Destino', 'Mensaje'].map(f => (
                  <div key={f} className="flex items-center gap-2 py-2 border-b border-gray-200 last:border-0">
                    <span className="text-sm font-bold text-night flex-1">{f}</span>
                    <span className="text-xs bg-gray-200 text-gray-500 px-2 py-0.5 rounded-full font-bold">Base</span>
                  </div>
                ))}
              </div>

              {extraFields.length > 0 && (
                <div className="flex flex-col gap-2">
                  <p className="text-xs font-black text-gray-500 uppercase tracking-wide">Campos personalizados</p>
                  {extraFields.map(f => (
                    <div key={f.id} className="flex items-center gap-2 p-3 bg-white border border-gray-200 rounded-xl">
                      <span className="flex-1 text-sm font-bold text-night">{f.label}</span>
                      {f.required && <span className="text-xs bg-yellow/20 text-yellow-dark px-2 py-0.5 rounded-full font-bold">Requerido</span>}
                      <button onClick={() => removeField(f.id)} className="p-1.5 hover:bg-red-50 rounded-lg transition-all">
                        <Trash2 size={14} className="text-red-400" />
                      </button>
                    </div>
                  ))}
                </div>
              )}

              <div className="bg-white border-2 border-yellow/30 rounded-xl p-4 flex flex-col gap-3">
                <p className="text-xs font-black text-night uppercase tracking-wide">Agregar campo</p>
                <input
                  className="input-admin"
                  placeholder="Nombre del campo"
                  value={newField.label}
                  onChange={e => setNewField(f => ({ ...f, label: e.target.value }))}
                />
                <input
                  className="input-admin"
                  placeholder="Placeholder"
                  value={newField.placeholder}
                  onChange={e => setNewField(f => ({ ...f, placeholder: e.target.value }))}
                />
                <label className="flex items-center gap-2 text-sm font-bold text-night cursor-pointer">
                  <input
                    type="checkbox"
                    checked={newField.required}
                    onChange={e => setNewField(f => ({ ...f, required: e.target.checked }))}
                    className="accent-yellow w-4 h-4"
                  />
                  Campo obligatorio
                </label>
                <button
                  onClick={() => {
                    if (!newField.label) return
                    addField(newField)
                    setNewField({ label: '', placeholder: '', required: false })
                  }}
                  className="flex items-center justify-center gap-2 bg-yellow hover:bg-yellow-dark text-night font-black py-2.5 rounded-xl transition-all text-sm"
                >
                  <Plus size={15} /> Agregar campo
                </button>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  )
}
