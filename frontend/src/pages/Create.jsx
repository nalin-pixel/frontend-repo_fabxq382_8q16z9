import React from 'react'
import { motion } from 'framer-motion'
import toast, { Toaster } from 'react-hot-toast'

export default function Create(){
  const [form, setForm] = React.useState({
    recipient_name:'', sender_name:'', message:'', flame_color:'red', tier:'basic', allow_public_gallery:true
  })
  const [creating, setCreating] = React.useState(false)
  const [flame, setFlame] = React.useState(null)

  const onChange = (e)=> setForm(prev=> ({...prev, [e.target.name]: e.target.value}))

  const submit = async()=>{
    if(!form.recipient_name || !form.message){ toast.error('Please enter recipient and your message'); return }
    setCreating(true)
    try{
      const res = await fetch(import.meta.env.VITE_BACKEND_URL + '/flames',{
        method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({
          recipient_name: form.recipient_name,
          sender_name: form.sender_name || 'Anonymous',
          message: form.message,
          photos: form.photos || [],
          flame_color: form.flame_color,
          tier: form.tier,
          allow_public_gallery: !!form.allow_public_gallery
        })
      })
      const data = await res.json()
      if(!res.ok) throw new Error(data.detail||'Failed')
      setFlame(data)
      toast.success('Flame created. Proceed to payment')
    }catch(e){ toast.error(e.message) } finally{ setCreating(false) }
  }

  const pay = async()=>{
    try{
      const res = await fetch(import.meta.env.VITE_BACKEND_URL + '/checkout',{
        method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({
          flame_id: flame.id, tier: form.tier
        })
      })
      const data = await res.json()
      if(!res.ok) throw new Error(data.detail||'Checkout failed')
      window.location.href = data.url
    }catch(e){ toast.error(e.message) }
  }

  return (
    <div className="container" style={{maxWidth:900}}>
      <Toaster />
      <div className="h1">Craft your love</div>
      <div className="card grid two">
        <div>
          <label>Recipient’s name</label>
          <input className="input" name="recipient_name" value={form.recipient_name} onChange={onChange} placeholder="Anna, My Secret Crush..."/>
        </div>
        <div>
          <label>Your name</label>
          <input className="input" name="sender_name" value={form.sender_name} onChange={onChange} placeholder="John or Anonymous"/>
        </div>
        <div style={{gridColumn:'1/-1'}}>
          <label>Your love message</label>
          <textarea rows={6} name="message" value={form.message} onChange={onChange} placeholder="Write from the heart... emojis welcome 💘"/>
        </div>
        <div>
          <label>Flame color</label>
          <select className="input" name="flame_color" value={form.flame_color} onChange={onChange}>
            <option value="red">Crimson Red</option>
            <option value="pink">Soft Pink</option>
            <option value="gold">Rose Gold</option>
            <option value="purple">Royal Purple</option>
          </select>
        </div>
        <div>
          <label>Tier</label>
          <select className="input" name="tier" value={form.tier} onChange={onChange}>
            <option value="basic">Basic – $4.99</option>
            <option value="premium">Premium – $9.99</option>
          </select>
        </div>
        <div style={{gridColumn:'1/-1'}}>
          <button disabled={creating} onClick={submit} className="btn">{creating? 'Creating...' : 'Create Flame'}</button>
          {flame && (<button onClick={pay} className="btn" style={{marginLeft:12, background:'linear-gradient(120deg, rgba(246,193,119,.6), rgba(183,110,121,.8))'}}>Pay & Get Link</button>)}
        </div>
      </div>
    </div>
  )
}
