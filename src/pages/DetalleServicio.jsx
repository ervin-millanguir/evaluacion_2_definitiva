
import { Link, useParams } from 'react-router-dom'
import { serviciosIniciales } from '../utils/adaptarCatalogo'
import { emojiServicio } from '../utils/iconosCatalogo'

export default function DetalleServicio() {
  const { id } = useParams()

  const servicio = serviciosIniciales.find(
    (item) => String(item.id) === String(id)
  )

  if (!servicio) {
    return (
      <main className="container py-5 text-center">
        <h1 className="fw-bold">Servicio no encontrado</h1>
        <p className="text-muted">
          No encontramos el servicio que estás buscando.
        </p>
        <Link to="/servicios" className="btn btn-success">
          Volver a los servicios
        </Link>
      </main>
    )
  }

  return (
    <main className="container py-5">
      <div className="row justify-content-center">
        <div className="col-12 col-lg-8">
          <nav aria-label="Ruta de navegación" className="mb-4">
            <Link to="/inicio" className="text-success text-decoration-none">
              Inicio
            </Link>
            {' / '}
            <Link to="/servicios" className="text-success text-decoration-none">
              Servicios
            </Link>
            {' / '}
            <span aria-current="page">{servicio.nombre}</span>
          </nav>

          <article className="card border-0 shadow-sm">
            <div className="card-body p-4 p-md-5">
              <span className="badge bg-success mb-3">
              {servicio.emoji || emojiServicio(servicio.categoria)} {servicio.categoria}
              </span>

              <h1 className="fw-bold mb-4">{servicio.nombre}</h1>

              <div className="mb-4">
                <h2 className="h6 text-muted">Código del servicio</h2>
                <p>{servicio.id}</p>
              </div>

              <div className="mb-4">
                <h2 className="h6 text-muted">Especie</h2>
                <p>{servicio.especie || 'No especificada'}</p>
              </div>

              <div className="mb-4">
                <h2 className="h6 text-muted">Duración estimada</h2>
                <p>{servicio.duracion || 'No especificada'}</p>
              </div>

              <div className="mb-4">
                <h2 className="h6 text-muted">Precio</h2>
                <p className="fs-4 fw-bold text-success">
                  {Number.isFinite(Number(servicio.precio))
                    ? Number(servicio.precio).toLocaleString('es-CL', {
                        style: 'currency',
                        currency: 'CLP',
                        maximumFractionDigits: 0,
                      })
                    : 'Precio no disponible'}
                </p>
              </div>

              <div className="mb-4">
                <h2 className="h6 text-muted">Observaciones</h2>
                <p>
                  {servicio.observaciones || 'Sin observaciones adicionales.'}
                </p>
              </div>

              <div className="d-flex flex-wrap gap-2 mt-4">
                <Link
                  to="/servicios"
                  className="btn btn-outline-success"
                >
                  Volver a servicios
                </Link>

                <Link to="/productos" className="btn btn-success">
                  Ver productos
                </Link>
              </div>
            </div>
          </article>
        </div>
      </div>
    </main>
  )
}