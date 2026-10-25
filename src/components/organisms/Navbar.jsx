
import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import useAuth from '../../context/useAuth'

const enlaces = [
  { ruta: '/inicio', texto: 'Inicio' },
  { ruta: '/servicios', texto: 'Servicios' },
  { ruta: '/categorias', texto: 'Categorías' },
  { ruta: '/productos', texto: 'Productos' },
  { ruta: '/solicitar-cita', texto: 'Solicitar cita' },
  { ruta: '/mis-citas', texto: 'Mis citas' },
  { ruta: '/admin', texto: 'Administración', admin: true },
  { ruta: '/admin/servicios', texto: 'Admin: servicios', admin: true },
  { ruta: '/admin/citas', texto: 'Admin: citas', admin: true },
  { ruta: '/', texto: 'Registro', exacto: true },
]

export default function Navbar() {
  const [abierto, setAbierto] = useState(false)
  const { usuario, estaAutenticado, cerrarSesion } = useAuth()

  function cerrarMenu() {
    setAbierto(false)
  }

  function manejarCierreSesion() {
    cerrarSesion()
    cerrarMenu()
  }

  return (
    <nav
      className="navbar navbar-expand-xl navbar-happy-paws sticky-top"
      aria-label="Navegación principal"
    >
      <div className="container-fluid px-3 px-xl-4">
        <Link
          to="/inicio"
          className="navbar-brand navbar-marca"
          onClick={cerrarMenu}
        >
          <span className="brand-icon me-2" aria-hidden="true">
            🐾
          </span>
          <span>HAPPY PAWS</span>
        </Link>

        <button
          className="navbar-toggler navbar-toggler-happy"
          type="button"
          aria-label="Abrir o cerrar menú"
          aria-controls="menu-principal"
          aria-expanded={abierto}
          onClick={() => setAbierto((anterior) => !anterior)}
        >
          <span className="navbar-toggler-icon" />
        </button>

        <div
          id="menu-principal"
          className={`collapse navbar-collapse${abierto ? ' show' : ''}`}
        >
          <ul className="navbar-nav ms-xl-auto align-items-xl-center gap-1 py-3 py-xl-0">
            {enlaces
              .filter((enlace) => !enlace.admin || estaAutenticado)
              .map((enlace) => (
                <li className="nav-item" key={enlace.ruta}>
                  <NavLink
                    to={enlace.ruta}
                    end={enlace.exacto || false}
                    onClick={cerrarMenu}
                    className={({ isActive }) =>
                      `nav-link navbar-enlace${isActive ? ' active' : ''}`
                    }
                  >
                    {enlace.texto}
                  </NavLink>
                </li>
              ))}

            {estaAutenticado ? (
              <>
                <li className="nav-item ms-xl-2">
                  <span className="navbar-saludo">
                    Hola, {usuario.nombre}
                  </span>
                </li>

                <li className="nav-item">
                  <button
                    type="button"
                    className="btn navbar-btn-salir"
                    onClick={manejarCierreSesion}
                  >
                    Cerrar sesión
                  </button>
                </li>
              </>
            ) : (
              <li className="nav-item ms-xl-2">
                <NavLink
                  to="/login"
                  onClick={cerrarMenu}
                  className={({ isActive }) =>
                    `btn navbar-btn-login${isActive ? ' active' : ''}`
                  }
                >
                  Iniciar sesión
                </NavLink>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  )
}
