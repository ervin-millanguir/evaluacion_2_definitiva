
import { Link } from 'react-router-dom'
import { serviciosIniciales } from '../utils/adaptarCatalogo'

export default function Categorias() {
  const categorias = [
    ...new Set(
      serviciosIniciales
        .map((servicio) => servicio.categoria)
        .filter(Boolean)
    ),
  ].sort((a, b) => a.localeCompare(b, 'es'))

  return (
    <main className="container py-5">
      <div className="text-center mb-5">
        <h1 className="fw-bold text-success">Categorías de servicios</h1>
        <p className="text-muted">
          Explora los servicios veterinarios de Happy Paws según su categoría.
        </p>
      </div>

      {categorias.length === 0 ? (
        <div className="alert alert-info text-center">
          No hay categorías disponibles.
        </div>
      ) : (
        <div className="row g-4">
          {categorias.map((categoria) => {
            const cantidad = serviciosIniciales.filter(
              (servicio) => servicio.categoria === categoria
            ).length

            return (
              <div className="col-12 col-sm-6 col-lg-4" key={categoria}>
                <article className="card h-100 shadow-sm border-0">
                  <div className="card-body p-4 d-flex flex-column">
                    <h2 className="h5 fw-bold">{categoria}</h2>

                    <p className="text-muted">
                      {cantidad}{' '}
                      {cantidad === 1 ? 'servicio disponible' : 'servicios disponibles'}
                    </p>

                    <Link
                      to={`/servicios?categoria=${encodeURIComponent(categoria)}`}
                      className="btn btn-success mt-auto"
                    >
                      Ver servicios
                    </Link>
                  </div>
                </article>
              </div>
            )
          })}
        </div>
      )}

      <div className="text-center mt-5">
        <Link to="/inicio" className="btn btn-outline-success">
          Volver al inicio
        </Link>
      </div>
    </main>
  )
}