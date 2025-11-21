import React from 'react'

export default function Admin(){
  const [items, setItems] = React.useState([])
  const [key, setKey] = React.useState('')
  const load = async()=>{
    const res = await fetch(import.meta.env.VITE_BACKEND_URL + '/admin/flames', { headers: { 'x-admin-key': key } })
    const data = await res.json()
    setItems(data.items||[])
  }
  return (
    <div className="container">
      <div className="h1">Admin</div>
      <div className="card" style={{display:'flex', gap:10, alignItems:'center'}}>
        <input className="input" placeholder="Admin Key" value={key} onChange={e=> setKey(e.target.value)} style={{maxWidth:260}} />
        <button className="btn" onClick={load}>Load</button>
      </div>
      <div className="gallery" style={{marginTop:16}}>
        {items.map(it=> (
          <a key={it.id} href={'/f/'+it.slug}>
            <img src={(it.photos && it.photos[0]?.url) || 'https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=1200&auto=format&fit=crop'} alt="flame" />
          </a>
        ))}
      </div>
    </div>
  )
}
