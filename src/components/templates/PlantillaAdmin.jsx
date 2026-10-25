
import { NavLink, Link } from 'react-router-dom'

export default function PlantillaAdmin({ children }) {
  const enlaces = [
    { to: '/admin/servicios', texto: 'Servicios' },
    { to: '/admin/productos', texto: 'Productos' },
    { to: '/admin/citas', texto: 'Citas' },
  ]

  return (
    <div className="min-vh-100 d-flex flex-column bg-light">
      <header className="bg-dark text-white py-3">
        <div className="container d-flex flex-wrap justify-content-between align-items-center gap-3">
          <Link to="/admin/servicios" className="text-white text-decoration-none fw-bold fs-4">
            HAPPY PAWS | Administración
          </Link>

          <nav className="d-flex flex-wrap gap-3" aria-label="Administración">
            {enlaces.map((enlace) => (
              <NavLink
                key={enlace.to}
                to={enlace.to}
                className={({ isActive }) =>
                  `text-decoration-none ${isActive ? 'text-warning fw-bold' : 'text-white'}`
                }
              >
                {enlace.texto}
              </NavLink>
            ))}

            <Link to="/inicio" className="text-white text-decoration-none">
              Volver al sitio
            </Link>
          </nav>
        </div>
      </header>

      <main className="container py-4 flex-grow-1">
        {children}
      </main>

      <footer className="bg-white border-top py-3">
        <div className="container text-muted small">
          Happy Paws · Panel de administración
        </div>
      </footer>
    </div>
  )
}
