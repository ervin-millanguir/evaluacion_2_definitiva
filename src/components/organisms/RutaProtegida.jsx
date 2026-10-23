import { Navigate, useLocation } from 'react-router-dom'
import useAuth from '../../context/useAuth'

export default function RutaProtegida({ children }) {
  const { estaAutenticado } = useAuth()
  const location = useLocation()

  if (!estaAutenticado) {
    return <Navigate to="/login" replace state={{ desde: location.pathname }} />
  }

  return children
}
