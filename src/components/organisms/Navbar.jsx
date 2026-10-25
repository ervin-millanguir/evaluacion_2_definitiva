
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
  { ruta: '/admin/servicios', texto: 'Administración' },
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
      className="navbar navbar-expand-lg bg-white border-bottom"
      aria-label="Navegación principal"
    >
      <div className="container">
        <Link
          to="/inicio"
          className="navbar-brand fw-bold text-success"
          onClick={cerrarMenu}
        >
          HAPPY PAWS
        </Link>

        <button
          className="navbar-toggler"
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
          <ul className="navbar-nav ms-auto align-items-lg-center">
            {enlaces
              .filter((enlace) => {
                if (enlace.ruta === '/admin/servicios') {
                  return estaAutenticado
                }
                return true
              })
              .map((enlace) => (
                <li className="nav-item" key={enlace.ruta}>
                  <NavLink
                    to={enlace.ruta}
                    end={enlace.exacto || false}
                    onClick={cerrarMenu}
                    className={({ isActive }) =>
                      `nav-link${isActive ? ' active fw-bold text-success' : ''}`
                    }
                  >
                    {enlace.texto}
                  </NavLink>
                </li>
              ))}

            {estaAutenticado ? (
              <li className="nav-item d-flex align-items-center">
                <span className="nav-link text-muted">
                  Hola, {usuario.nombre}
                </span>
                <button
                  type="button"
                  className="btn btn-link nav-link"
                  onClick={manejarCierreSesion}
                >
                  Cerrar sesión
                </button>
              </li>
            ) : (
              <li className="nav-item">
                <NavLink
                  to="/login"
                  onClick={cerrarMenu}
                  className={({ isActive }) =>
                    `nav-link${isActive ? ' active fw-bold text-success' : ''}`
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
