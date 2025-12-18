import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import DesignReference from './DesignReference.tsx'

const isDesignPage = window.location.pathname === '/design'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {isDesignPage ? <DesignReference /> : <App />}
  </StrictMode>,
)
