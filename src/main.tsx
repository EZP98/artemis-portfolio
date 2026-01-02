import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import DesignReference from './DesignReference.tsx'
import DesignEditor from './DesignEditor.tsx'

const path = window.location.pathname

const getComponent = () => {
  if (path === '/design') return <DesignReference />
  if (path === '/back') return <DesignEditor />
  return <App />
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {getComponent()}
  </StrictMode>,
)
