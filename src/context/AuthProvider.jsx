import { useEffect, useState } from 'react'
import AuthContext from './AuthContext'
import {
  cerrarSesion as eliminarSesion, iniciarSesion as autenticar, obtenerSesion,
  registrarUsuario, validarSesionRemota
} from '../services/authService'

export default function AuthProvider({children}) {
  const [usuario, setUsuario] = useState(obtenerSesion)
  useEffect(() => {
    function limpiar() { setUsuario(null) }
    window.addEventListener('happy-paws-sesion-vencida', limpiar)
    // Revalidar rol y estado ante la API tras una recarga. Una caída de red no elimina el token.
    if (obtenerSesion()) validarSesionRemota().then(setUsuario).catch(() => {})
    const intervalo = window.setInterval(() => { if (!obtenerSesion()) setUsuario(null) }, 30000)
    return () => { window.removeEventListener('happy-paws-sesion-vencida', limpiar);window.clearInterval(intervalo) }
  }, [])
  async function registrar(datos) { return registrarUsuario(datos) }
  async function iniciarSesion(correo, contrasena) {
    const r = await autenticar(correo, contrasena)
    if (r.ok) setUsuario(r.usuario)
    return r
  }
  function cerrarSesion() { eliminarSesion();setUsuario(null) }
  function actualizarUsuarioLocal(datos) {
    localStorage.setItem('sesionActual',JSON.stringify(datos))
    setUsuario(datos)
  }
  return <AuthContext.Provider value={{
    usuario, estaAutenticado: Boolean(usuario) && Boolean(obtenerSesion()),
    esAdministrador: Boolean(usuario) && Boolean(obtenerSesion()) && usuario?.rol === 'administrador', registrar,
    iniciarSesion, cerrarSesion, actualizarUsuarioLocal
  }}>{children}</AuthContext.Provider>
}
