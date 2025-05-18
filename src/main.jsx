import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Hero from './components/Hero.jsx'
import { Toaster } from 'sonner';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Toaster richColors closeButton position="top-right" style={{ right: '100px' }} />
    <Hero />
  </StrictMode>,
)
