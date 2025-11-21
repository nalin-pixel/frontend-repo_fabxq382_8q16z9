import React from 'react'
import { useParams } from 'react-router-dom'
import Confetti from 'react-confetti'
import { motion } from 'framer-motion'

export default function ViewFlame(){
  const { slug } = useParams()
  const [flame, setFlame] = React.useState(null)
  const [playing, setPlaying] = React.useState(false)
  const [loveBack, setLoveBack] = React.useState(false)
  const audioRef = React.useRef(null)

  React.useEffect(()=>{
    fetch(import.meta.env.VITE_BACKEND_URL + '/flames/' + slug).then(r=>r.json()).then(setFlame).catch(()=>{})
  },[slug])

  const togglePlay = ()=>{
    if(!audioRef.current) return
    if(playing){ audioRef.current.pause() } else { audioRef.current.play() }
    setPlaying(p=>!p)
  }

  if(!flame) return <div className="container">Loading...</div>
  const colorMap = { red:'#ff6b6b', pink:'#ff8fb1', gold:'#f6c177', purple:'#a78bfa' }

  return (
    <div>
      <audio ref={audioRef} src="https://cdn.pixabay.com/download/audio/2023/02/28/audio_6a8bd48c42.mp3?filename=romantic-piano-melody-14013.mp3" loop />
      <div className="container" style={{textAlign:'center', marginTop:20}}>
        <div className="h1" style={{color:colorMap[flame.flame_color]}}>For {flame.recipient_name}</div>
        <div className="subtitle">from {flame.sender_name}</div>
      </div>
      <main className="container" style={{display:'grid', gap:24, alignItems:'start', gridTemplateColumns:'repeat(auto-fit,minmax(280px,1fr))'}}>
        <motion.div className="center" initial={{opacity:0, y:10}} animate={{opacity:1, y:0}}>
          <div className="flame" style={{filter:`drop-shadow(0 0 35px ${colorMap[flame.flame_color]}55)`}}>
            <div className="glow" />
            <div className="core" />
            <div className="wick" />
            <div className="candle" />
          </div>
        </motion.div>
        <motion.div className="card" initial={{opacity:0, y:10}} animate={{opacity:1, y:0}}>
          <Typewriter text={flame.message} />
          <div style={{display:'flex', gap:10, marginTop:14}}>
            <button onClick={togglePlay} className="btn">{playing? 'Pause music' : 'Play music'}</button>
            <LoveBack onLove={()=> setLoveBack(true)} />
          </div>
        </motion.div>
      </main>
      {flame.photos?.length ? (
        <section className="container">
          <div className="card">
            <div className="h2" style={{marginBottom:12}}>Memories</div>
            <div className="gallery">
              {flame.photos.map((p, i)=> <img key={i} src={p.url} alt="memory" />)}
            </div>
          </div>
        </section>
      ) : null}

      <section className="container" style={{paddingBottom:60}}>
        <Share slug={flame.slug} />
      </section>

      {loveBack && <Confetti recycle={false} numberOfPieces={500} />}

      {flame.watermark && (
        <div className="watermark">Created with Eternal Flame</div>
      )}
    </div>
  )
}

function Typewriter({ text }){
  const [output, setOutput] = React.useState('')
  React.useEffect(()=>{
    let i = 0
    const id = setInterval(()=>{
      setOutput(text.slice(0, i))
      i++
      if(i>text.length) clearInterval(id)
    }, 25)
    return ()=> clearInterval(id)
  },[text])
  return <div className="typewriter"><span>{output}</span></div>
}

function LoveBack({ onLove }){
  const [clicked, setClicked] = React.useState(false)
  return (
    <button className="btn" onClick={()=>{ setClicked(true); onLove?.() }}>I love you too</button>
  )
}

function Share({ slug }){
  const url = window.location.origin + '/f/' + slug
  const copy = ()=> navigator.clipboard.writeText(url)
  return (
    <div className="card" style={{display:'flex', flexWrap:'wrap', gap:12, alignItems:'center', justifyContent:'space-between'}}>
      <div>
        <div className="h2">Share the love</div>
        <div className="subtitle">Copy link or send via your favorite app</div>
      </div>
      <div style={{display:'flex', gap:10}}>
        <a className="btn" href={`https://wa.me/?text=${encodeURIComponent(url)}`} target="_blank">WhatsApp</a>
        <a className="btn" href={`https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent('Eternal Flame for you')}`} target="_blank">Telegram</a>
        <button className="btn" onClick={copy}>Copy link</button>
      </div>
    </div>
  )
}
