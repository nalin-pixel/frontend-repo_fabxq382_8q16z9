import React from 'react'
import { useSearchParams, Link } from 'react-router-dom'
import QRCode from 'react-qr-code'

export default function Success(){
  const [params] = useSearchParams()
  const slug = params.get('flame')
  const url = window.location.origin + '/f/' + slug
  return (
    <div className="container" style={{maxWidth:800, textAlign:'center'}}>
      <div className="h1">Your Eternal Flame is live</div>
      <p className="subtitle">Share the link or QR code below</p>
      <div className="card center" style={{padding:30}}>
        <QRCode value={url} />
        <div style={{marginTop:20}}>
          <a className="btn" href={url} target="_blank">Open Flame</a>
          <button className="btn" onClick={()=> navigator.clipboard.writeText(url)} style={{marginLeft:10}}>Copy Link</button>
        </div>
      </div>
      <div style={{marginTop:20}}>
        <Link to="/create" className="btn">Send another flame</Link>
      </div>
    </div>
  )
}
