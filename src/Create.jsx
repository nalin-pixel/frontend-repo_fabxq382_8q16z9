import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Create() {
  const navigate = useNavigate()
  const [form, setForm] = useState({
    recipient_name: '',
    sender_name: '',
    message: '',
    photos: '',
    tier: 'basic',
    allow_public_gallery: false,
    flame_color: '#FF4D4D'
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

  const onChange = (e) => {
    const { name, value, type, checked } = e.target
    setForm((f) => ({ ...f, [name]: type === 'checkbox' ? checked : value }))
  }

  const submit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const payload = {
        recipient_name: form.recipient_name,
        sender_name: form.sender_name,
        message: form.message,
        flame_color: form.flame_color,
        tier: form.tier,
        allow_public_gallery: form.allow_public_gallery,
      }
      if (form.photos.trim()) {
        payload.photos = form.photos.split(',').map(s => s.trim()).filter(Boolean)
      }

      const res = await fetch(`${baseUrl}/flames`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      })
      if (!res.ok) throw new Error('Failed to create')
      const json = await res.json()

      if (form.tier === 'basic') {
        navigate(`/f/${json.slug}`)
        return
      }

      const checkoutRes = await fetch(`${baseUrl}/checkout`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ flame_id: json.id, tier: form.tier })
      })
      const checkout = await checkoutRes.json()
      if (checkout.url) {
        window.location.href = checkout.url
      } else {
        navigate(`/f/${json.slug}`)
      }

    } catch (e) {
      setError(e.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-900 via-slate-900 to-black text-white p-6">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Create your Eternal Flame</h1>
        <form onSubmit={submit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm mb-1">Recipient name</label>
              <input className="w-full px-3 py-2 rounded bg-white/10 border border-white/10" name="recipient_name" value={form.recipient_name} onChange={onChange} required />
            </div>
            <div>
              <label className="block text-sm mb-1">Your name</label>
              <input className="w-full px-3 py-2 rounded bg-white/10 border border-white/10" name="sender_name" value={form.sender_name} onChange={onChange} required />
            </div>
          </div>

          <div>
            <label className="block text-sm mb-1">Message</label>
            <textarea className="w-full px-3 py-2 rounded bg-white/10 border border-white/10 min-h-[140px]" name="message" value={form.message} onChange={onChange} required />
          </div>

          <div>
            <label className="block text-sm mb-1">Photo URLs (comma separated, optional)</label>
            <input className="w-full px-3 py-2 rounded bg-white/10 border border-white/10" name="photos" value={form.photos} onChange={onChange} placeholder="https://...jpg, https://...png" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm mb-1">Tier</label>
              <select name="tier" value={form.tier} onChange={onChange} className="w-full px-3 py-2 rounded bg-white/10 border border-white/10">
                <option value="basic">Basic ($4.99)</option>
                <option value="premium">Premium ($9.99)</option>
              </select>
            </div>
            <div>
              <label className="block text-sm mb-1">Flame color</label>
              <input type="color" name="flame_color" value={form.flame_color} onChange={onChange} className="w-full h-10 p-0 border border-white/10 rounded bg-white/10" />
            </div>
          </div>

          <label className="inline-flex items-center gap-2">
            <input type="checkbox" name="allow_public_gallery" checked={form.allow_public_gallery} onChange={onChange} />
            <span className="text-sm">Opt-in to public gallery</span>
          </label>

          <div className="flex gap-3">
            <button disabled={loading} className="px-4 py-2 rounded bg-rose-500 hover:bg-rose-600 disabled:opacity-60">{loading ? 'Creating...' : 'Create Flame'}</button>
          </div>

        </form>
      </div>
    </div>
  )
}
