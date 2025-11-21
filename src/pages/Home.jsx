import { Link } from 'react-router-dom'

export default function Home(){
  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-900 via-slate-900 to-black text-white">
      <div className="relative min-h-screen flex items-center justify-center p-8">
        <div className="max-w-3xl w-full text-center">
          <h1 className="text-5xl font-extrabold tracking-tight mb-4">Eternal Flame</h1>
          <p className="text-white/80 mb-8">Create a forever-burning love-letter page with glowing flame, photos, music, and a secure checkout.</p>

          <div className="flex items-center justify-center gap-3">
            <Link to="/create" className="px-5 py-3 rounded bg-rose-500 hover:bg-rose-600">Create Your Flame</Link>
            <Link to="/test" className="px-5 py-3 rounded bg-white/10 hover:bg-white/20">Check Backend</Link>
          </div>
        </div>
      </div>
    </div>
  )
}