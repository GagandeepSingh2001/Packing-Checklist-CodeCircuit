import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Categories from './components/Categories.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Categories />
  </StrictMode>,
)
