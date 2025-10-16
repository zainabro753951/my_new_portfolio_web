import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { CursorHoverProvider } from './context/CursorHover.jsx'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <CursorHoverProvider>
      <StrictMode>
        <App />
      </StrictMode>
    </CursorHoverProvider>
  </BrowserRouter>
)
