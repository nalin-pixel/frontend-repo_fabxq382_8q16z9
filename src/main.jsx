import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import App from './App'
import Test from './Test'
import Create from './Create'
import ViewFlame from './ViewFlame'
import Gallery from './pages/Gallery'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/test" element={<Test />} />
        <Route path="/create" element={<Create />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/f/:slug" element={<ViewFlame />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
)
