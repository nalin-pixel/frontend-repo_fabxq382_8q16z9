import React from 'react'
import { useSearchParams, Link } from 'react-router-dom'

export default function Cancel(){
  const [params] = useSearchParams()
  const slug = params.get('flame')
  return (
    <div className="container" style={{maxWidth:800, textAlign:'center'}}>
      <div className="h1">Payment canceled</div>
      <p className="subtitle">No worries — you can resume anytime.</p>
      {slug && <a className="btn" href={'/f/'+slug}>View your draft</a>}
      <div style={{marginTop:20}}>
        <Link to="/create" className="btn">Try again</Link>
      </div>
    </div>
  )
}
