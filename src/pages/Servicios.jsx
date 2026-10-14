
import { Link, useSearchParams } from 'react-router-dom'
import { serviciosIniciales } from '../utils/adaptarCatalogo'
import ListaServicios from '../components/organisms/ListaServicios'

export default function Servicios() {
  const [searchParams, setSearchParams] = useSearchParams()
  const categoriaSeleccionada = searchParams.get('categoria') || ''

  const categorias = [
    ...new Set(
      serviciosIniciales
        .map((servicio) => servicio.categoria)
        .filter(Boolean)
    ),
  ].sort((a, b) => a.localeCompare(b, 'es'))

  const serviciosFiltrados = categoriaSeleccionada
    ? serviciosIniciales.filter(
        (servicio) => servicio.categoria === categoriaSeleccionada
      )
    : serviciosIniciales

  function cambiarCategoria(event) {
    const categoria = event.target.value

    if (categoria) {
      setSearchParams({ categoria })
    } else {
      setSearchParams({})
    }
  }

  return (
    <main className="container py-5">
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3 mb-4">
        <div>
          <h1 className="fw-bold text-success">Nuestros servicios</h1>
          <p className="text-muted mb-0">
            Encuentra la atención veterinaria que necesita tu mascota.
          </p>
        </div>

        <Link to="/categorias" className="btn btn-outline-success">
          Ver categorías
        </Link>
      </div>

      <div className="row align-items-end mb-4">
        <div className="col-12 col-md-6 col-lg-4">
          <label htmlFor="filtro-categoria" className="form-label fw-semibold">
            Filtrar por categoría
          </label>

          <select
            id="filtro-categoria"
            className="form-select"
            value={categoriaSeleccionada}
            onChange={cambiarCategoria}
          >
            <option value="">Todas las categorías</option>

            {categorias.map((categoria) => (
              <option value={categoria} key={categoria}>
                {categoria}
              </option>
            ))}
          </select>
        </div>
      </div>

      {serviciosFiltrados.length > 0 ? (
        <ListaServicios servicios={serviciosFiltrados} />
      ) : (
        <div className="alert alert-info">
          No se encontraron servicios para esta categoría.
        </div>
      )}
    </main>
  )
}
