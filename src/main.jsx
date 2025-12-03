import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

try {
  const saved = localStorage.getItem('theme');
  if (saved === 'dark') document.documentElement.classList.add('dark');
  else document.documentElement.classList.remove('dark');
} catch (e) {}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
