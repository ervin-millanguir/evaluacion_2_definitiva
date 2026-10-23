import { useState } from 'react'
import AuthContext from './AuthContext'
import {
  cerrarSesion as eliminarSesion,
  iniciarSesion as autenticar,
  obtenerSesion,
  registrarUsuario,
} from '../services/authService'

export default function AuthProvider({ children }) {
  const [usuario, setUsuario] = useState(obtenerSesion)

  function registrar(datos) {
    return registrarUsuario(datos)
  }

  function iniciarSesion(correo, contrasena) {
    const resultado = autenticar(correo, contrasena)
    if (resultado.ok) {
      setUsuario(resultado.usuario)
    }
    return resultado
  }

  function cerrarSesion() {
    eliminarSesion()
    setUsuario(null)
  }

  return (
    <AuthContext.Provider
      value={{
        usuario,
        estaAutenticado: Boolean(usuario),
        registrar,
        iniciarSesion,
        cerrarSesion,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
