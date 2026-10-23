import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import './index.css'
import App from './App'
import ProductosProvider from './context/ProductosProvider'
import AuthProvider from './context/AuthProvider'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <ProductosProvider>
        <AuthProvider>
          <App />
        </AuthProvider>
      </ProductosProvider>
    </BrowserRouter>
  </StrictMode>,
)