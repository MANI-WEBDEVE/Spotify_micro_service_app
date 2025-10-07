import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { SongContextProvider } from './context/SongContext.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <SongContextProvider>
      <App />
    </SongContextProvider>
  </StrictMode>,
)
