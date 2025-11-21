import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import Particles from 'tsparticles-react'
import { loadLinksPreset } from 'tsparticles-preset-links'

export default function App(){
  const particlesInit = async(engine)=>{ await loadLinksPreset(engine) }
  const particlesOptions = {
    preset: 'links',
    background: { color: { value: 'transparent' } },
    particles: {
      color: { value: ['#ff8fb1', '#f6c177', '#b76e79'] },
      links: { color:'#b76e79', distance:130, enable:true, opacity:0.2 },
      move: { enable:true, speed:1.2 },
      number: { value: 40 },
      opacity: { value: 0.4 },
      size: { value: { min: 1, max: 3 } }
    },
    fullScreen: { enable:false }
  }
  return (
    <div>
      <div className="particles"><Particles id="tsparticles" init={particlesInit} options={particlesOptions} /></div>
      <header className="container" style={{display:'flex', alignItems:'center', justifyContent:'space-between'}}>
        <div className="badge">Eternal Flame · Valentine’s 2025</div>
        <Link to="/create" className="btn">Create Yours</Link>
      </header>
      <main className="container" style={{minHeight:'70vh', display:'grid', gap:24, alignItems:'center', gridTemplateColumns:'repeat(auto-fit,minmax(280px,1fr))'}}>
        <motion.div initial={{opacity:0, y:20}} animate={{opacity:1, y:0}} transition={{duration:0.8}}>
          <div className="h1">Create Your Eternal Flame for Valentine’s Day 2025</div>
          <p className="subtitle">A breathtaking, shareable love-letter page with an ever-burning flame, music, animated hearts and photos. Make them cry happy tears.</p>
          <div style={{display:'flex', gap:12, marginTop:18}}>
            <Link to="/create" className="btn">Start Now</Link>
            <a href="#gallery" className="btn" style={{background:'transparent'}}>Top 100 Flames</a>
          </div>
        </motion.div>
        <motion.div className="center" initial={{opacity:0, scale:.95}} animate={{opacity:1, scale:1}} transition={{duration:.8, delay:.2}}>
          <div className="flame" aria-hidden>
            <div className="glow" />
            <div className="core" />
            <div className="wick" />
            <div className="candle" />
          </div>
        </motion.div>
      </main>
      <section id="gallery" className="container">
        <PublicGallery />
      </section>
      <footer className="container" style={{opacity:.8, paddingBottom:40}}>
        Made with love · Eternal Flame 2025
      </footer>
    </div>
  )
}

function PublicGallery(){
  const [items, setItems] = React.useState([])
  React.useEffect(()=>{
    fetch(import.meta.env.VITE_BACKEND_URL + '/gallery').then(r=>r.json()).then(d=> setItems(d.items||[])).catch(()=>{})
  },[])
  if(!items.length) return (
    <div className="card">No public flames yet. Be the first to create one!</div>
  )
  return (
    <div className="card">
      <div className="h2" style={{marginBottom:12}}>Top 100 hottest flames</div>
      <div className="gallery">
        {items.map(it=> (
          <a key={it.id} href={'/f/'+it.slug}>
            <img src={(it.photos && it.photos[0]?.url) || 'https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=1200&auto=format&fit=crop'} alt="flame" />
          </a>
        ))}
      </div>
    </div>
  )
}
