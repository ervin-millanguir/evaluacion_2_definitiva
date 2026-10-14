
import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'

const enlaces = [
  { ruta: '/inicio', texto: 'Inicio' },
  { ruta: '/servicios', texto: 'Servicios' },
  { ruta: '/categorias', texto: 'Categorías' },
  { ruta: '/productos', texto: 'Productos' },
  { ruta: '/', texto: 'Registro', exacto: true },
]

export default function Navbar() {
  const [abierto, setAbierto] = useState(false)

  function cerrarMenu() {
    setAbierto(false)
  }

  return (
    <nav
      className="navbar navbar-expand-md bg-white border-bottom"
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
          <ul className="navbar-nav ms-auto">
            {enlaces.map((enlace) => (
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
          </ul>
        </div>
      </div>
    </nav>
  )
}
