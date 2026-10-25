
import { Link, useSearchParams } from 'react-router-dom'
import { useState } from 'react'
import { listarServicios } from '../services/servicioService'
import ListaServicios from '../components/organisms/ListaServicios'

export default function Servicios() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [servicios] = useState(() => listarServicios())
  const categoriaSeleccionada = searchParams.get('categoria') || ''

  const categorias = [
    ...new Set(
      servicios
        .map((servicio) => servicio.categoria)
        .filter(Boolean)
    ),
  ].sort((a, b) => a.localeCompare(b, 'es'))

  const serviciosFiltrados = categoriaSeleccionada
    ? servicios.filter(
        (servicio) => servicio.categoria === categoriaSeleccionada
      )
    : servicios

  function cambiarCategoria(event) {
    const categoria = event.target.value

    if (categoria) {
      setSearchParams({ categoria })
    } else {
      setSearchParams({})
    }
  }

  return (
    <section className="servicios-page">
      <div className="servicios-hero rounded-4 p-4 p-md-5 mb-4">
        <div className="row align-items-center g-4">
          <div className="col-12 col-lg-8">
            <span className="badge rounded-pill text-bg-success mb-3">
              Cuidado y bienestar animal
            </span>

            <h1 className="display-5 fw-bold mb-3">
              Nuestros servicios
            </h1>

            <p className="lead mb-0">
              Encuentra la atención veterinaria que tu mascota necesita.
              En Happy Paws nos preocupamos por su salud y bienestar.
            </p>
          </div>

          <div className="col-12 col-lg-4 text-lg-end">
            <Link
              to="/categorias"
              className="btn btn-success btn-lg rounded-pill px-4"
            >
              Explorar categorías
            </Link>
          </div>
        </div>
      </div>

      <div className="servicios-toolbar d-flex flex-column flex-md-row justify-content-between align-items-md-end gap-3 mb-4">
        <div>
          <h2 className="h3 fw-bold mb-1">Atención para tu mascota</h2>
          <p className="text-secondary mb-0">
            Revisa las opciones disponibles y encuentra la más adecuada.
          </p>
        </div>

        <div className="servicios-filtro">
          <label
            htmlFor="filtro-categoria"
            className="form-label fw-semibold"
          >
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
        <>
          <p className="small text-secondary mb-3" aria-live="polite">
            {serviciosFiltrados.length}{' '}
            {serviciosFiltrados.length === 1
              ? 'servicio disponible'
              : 'servicios disponibles'}
          </p>

          <ListaServicios servicios={serviciosFiltrados} />
        </>
      ) : (
        <div className="alert alert-info rounded-4 p-4" role="status">
          <h3 className="h5">No encontramos servicios</h3>
          <p className="mb-3">
            No hay servicios disponibles para esta categoría.
          </p>
          <button
            type="button"
            className="btn btn-outline-success"
            onClick={() => setSearchParams({})}
          >
            Ver todos los servicios
          </button>
        </div>
      )}
    </section>
  )
}
