import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

export default function Gallery(){
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch(`${baseUrl}/gallery`)
        if (!res.ok) throw new Error('Failed to load gallery')
        const json = await res.json()
        setItems(json.items || [])
      } catch (e) {
        setError(e.message)
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-900 via-slate-900 to-black text-white p-6">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold">Public Gallery</h1>
          <Link to="/" className="underline text-sm">Home</Link>
        </div>
        {loading && <p>Loading...</p>}
        {error && <p className="text-rose-300">{error}</p>}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {items.map((item) => (
            <Link to={`/f/${item.slug}`} key={item.id} className="block rounded-xl border border-white/10 p-4 bg-white/5 hover:bg-white/10 transition">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-semibold truncate">For {item.recipient_name}</h3>
                <span className="text-xs text-white/60">{item.tier}</span>
              </div>
              <p className="text-sm text-white/70 line-clamp-3">{item.message}</p>
            </Link>
          ))}
          {!loading && !error && items.length === 0 && (
            <p className="text-white/70">No items yet. Create one and opt-in to the gallery!</p>
          )}
        </div>
      </div>
    </div>
  )
}
