import { Link } from 'react-router-dom'

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-900 via-slate-900 to-black text-white">
      <header className="flex items-center justify-between px-6 py-4">
        <Link to="/" className="font-bold tracking-tight">Eternal Flame</Link>
        <nav className="flex items-center gap-4 text-sm">
          <Link to="/create" className="hover:underline">Create</Link>
          <Link to="/gallery" className="hover:underline">Gallery</Link>
          <Link to="/test" className="hover:underline">Check Backend</Link>
        </nav>
      </header>

      <div className="relative min-h-[70vh] flex items-center justify-center p-8">
        <div className="max-w-3xl w-full text-center">
          <h1 className="text-5xl font-extrabold tracking-tight mb-4">Eternal Flame</h1>
          <p className="text-white/80 mb-8">Create a forever-burning love-letter page with glowing flame, photos, music, and a secure checkout.</p>

          <div className="flex items-center justify-center gap-3">
            <Link to="/create" className="px-5 py-3 rounded bg-rose-500 hover:bg-rose-600">Create Your Flame</Link>
            <Link to="/gallery" className="px-5 py-3 rounded bg-white/10 hover:bg-white/20">Explore Gallery</Link>
          </div>
        </div>
      </div>

      <footer className="px-6 py-6 text-center text-xs text-white/60">
        © 2025 Eternal Flame. All rights reserved.
      </footer>
    </div>
  )
}

export default App