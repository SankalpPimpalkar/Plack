import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ClerkProvider } from '@clerk/clerk-react'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from "react-router-dom"
import { ModalProvider } from './context/ModalProvider.jsx'
import OnlineUserContextProvider from './context/OnlineUserProvider.jsx'

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

if (!PUBLISHABLE_KEY) {
  throw new Error('Missing Publishable Key')
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
      <BrowserRouter>
        <OnlineUserContextProvider>
          <ModalProvider>
            <App />
          </ModalProvider>
        </OnlineUserContextProvider>
      </BrowserRouter>
    </ClerkProvider>
  </StrictMode>,
)
