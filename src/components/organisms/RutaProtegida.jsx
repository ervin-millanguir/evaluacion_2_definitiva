import { Navigate, Link, useLocation } from 'react-router-dom'
import useAuth from '../../context/useAuth'
export default function RutaProtegida({children,rolesPermitidos}) {
  const { estaAutenticado, usuario } = useAuth()
  const location = useLocation()
  if (!estaAutenticado) return <Navigate to='/login' replace state={{desde:location.pathname}} />
  if (rolesPermitidos && !rolesPermitidos.includes(usuario?.rol)) {
    return <main className='container py-5'><div className='alert alert-danger' role='alert'>
      <h1 className='h3'>Acceso denegado</h1>
      Tu rol no tiene permiso para ingresar a esta sección.
      <div className='mt-3'><Link to='/inicio'>Volver al inicio</Link></div>
    </div></main>
  }
  return children
}
