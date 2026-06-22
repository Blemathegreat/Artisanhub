import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {BrowserRouter} from 'react-router-dom'
import ArtisansProvider from './content/ArtisansPage.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <ArtisansProvider>
        <App />
      </ArtisansProvider>
    </BrowserRouter>
  </StrictMode>,
)
