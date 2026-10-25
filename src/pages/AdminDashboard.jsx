import { Link } from 'react-router-dom'
import PlantillaAdmin from '../components/templates/PlantillaAdmin'
import { listarUsuarios } from '../services/authService'
import { listarCitas } from '../services/citaService'
import { listarServicios } from '../services/servicioService'
import { useProductos } from '../context/useProductos'

const resumen = [
  {
    clave: 'productos',
    titulo: 'Productos',
    ruta: '/admin/productos',
    descripcion: 'Gestiona el catálogo de productos.',
  },
  {
    clave: 'servicios',
    titulo: 'Servicios',
    ruta: '/admin/servicios',
    descripcion: 'Gestiona los servicios veterinarios.',
  },
  {
    clave: 'citas',
    titulo: 'Solicitudes',
    ruta: '/admin/citas',
    descripcion: 'Revisa y actualiza las citas recibidas.',
  },
  {
    clave: 'usuarios',
    titulo: 'Usuarios',
    ruta: '/admin',
    descripcion: 'Consulta las cuentas registradas.',
  },
]

export default function AdminDashboard() {
  const { productos } = useProductos()
  const cantidades = {
    productos: productos.length,
    servicios: listarServicios().length,
    citas: listarCitas().length,
    usuarios: listarUsuarios().length,
  }
  const citasRecientes = listarCitas().slice(-3).reverse()

  return (
    <PlantillaAdmin>
      <div className="d-flex flex-wrap justify-content-between align-items-center gap-3 mb-4">
        <div>
          <h1 className="mb-2">Dashboard</h1>
          <p className="text-muted mb-0">
            Resumen general de Happy Paws y accesos a cada módulo.
          </p>
        </div>
      </div>

      <div className="row g-4 mb-5">
        {resumen.map((item) => (
          <div className="col-12 col-sm-6 col-xl-3" key={item.clave}>
            <article className="card h-100 shadow-sm border-0">
              <div className="card-body d-flex flex-column">
                <p className="text-muted mb-2">{item.titulo}</p>
                <p className="display-6 fw-bold text-success mb-3">
                  {cantidades[item.clave]}
                </p>
                <p className="small text-muted">{item.descripcion}</p>
                {item.clave !== 'usuarios' && (
                  <Link to={item.ruta} className="btn btn-outline-success mt-auto">
                    Ir al módulo
                  </Link>
                )}
              </div>
            </article>
          </div>
        ))}
      </div>

      <section className="card shadow-sm border-0" aria-labelledby="solicitudes-recientes">
        <div className="card-body">
          <div className="d-flex flex-wrap justify-content-between align-items-center gap-3 mb-3">
            <h2 id="solicitudes-recientes" className="h4 mb-0">
              Solicitudes recientes
            </h2>
            <Link to="/admin/citas" className="btn btn-sm btn-outline-primary">
              Ver todas
            </Link>
          </div>

          {citasRecientes.length === 0 ? (
            <p className="text-muted mb-0">Todavía no hay solicitudes registradas.</p>
          ) : (
            <div className="table-responsive">
              <table className="table table-striped align-middle mb-0">
                <thead>
                  <tr>
                    <th>Mascota</th>
                    <th>Servicio</th>
                    <th>Fecha</th>
                    <th>Estado</th>
                  </tr>
                </thead>
                <tbody>
                  {citasRecientes.map((cita) => (
                    <tr key={cita.id}>
                      <td>{cita.nombreMascota}</td>
                      <td>{cita.servicio}</td>
                      <td>{cita.fecha}</td>
                      <td>{cita.estado}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </section>
    </PlantillaAdmin>
  )
}
