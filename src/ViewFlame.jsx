import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'

export default function ViewFlame() {
  const { slug } = useParams()
  const [data, setData] = useState(null)
  const [error, setError] = useState('')
  const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch(`${baseUrl}/flames/${slug}`)
        if (!res.ok) throw new Error('Not found')
        const json = await res.json()
        setData(json)
      } catch (e) {
        setError(e.message)
      }
    }
    load()
  }, [slug])

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-rose-900 via-slate-900 to-black text-white p-6">
        <div className="max-w-xl w-full text-center">
          <p className="mb-4">Could not load this flame.</p>
          <Link className="underline" to="/">Back</Link>
        </div>
      </div>
    )
  }

  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-rose-900 via-slate-900 to-black text-white">
        <p>Loading...</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-900 via-slate-900 to-black text-white p-6">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold tracking-tight">For {data.recipient_name}</h1>
          <p className="text-sm text-white/70 mt-2">From {data.sender_name}</p>
        </div>

        <div className="rounded-2xl border border-white/10 p-6 bg-white/5 shadow-lg">
          <p className="leading-7 whitespace-pre-wrap">{data.message}</p>
        </div>

        {Array.isArray(data.photos) && data.photos.length > 0 && (
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-3">
            {data.photos.map((url, i) => (
              <img key={i} src={url} className="rounded-lg w-full h-40 object-cover" />
            ))}
          </div>
        )}

        <div className="mt-8 flex items-center justify-between">
          <Link to="/" className="text-sm underline">Create your own</Link>
          <span className="text-xs text-white/60">Tier: {data.tier} • Status: {data.payment_status}</span>
        </div>
      </div>
    </div>
  )
}
