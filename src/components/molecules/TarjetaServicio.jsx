
import { Link } from 'react-router-dom'
import EtiquetaEspecie from '../atoms/EtiquetaEspecie'

export default function TarjetaServicio({ servicio }) {
  const precioValido =
    servicio.precio !== null &&
    servicio.precio !== undefined &&
    servicio.precio !== '' &&
    Number.isFinite(Number(servicio.precio))

  const precioFormateado = precioValido
    ? Number(servicio.precio).toLocaleString('es-CL', {
        style: 'currency',
        currency: 'CLP',
        maximumFractionDigits: 0,
      })
    : 'Precio no disponible'

  return (
    <article className="card h-100 border-0 shadow-sm">
      <div className="card-body p-4 d-flex flex-column">
        <div className="d-flex justify-content-between align-items-start gap-2 mb-3">
          <span className="badge bg-success">
            {servicio.categoria || 'Servicio'}
          </span>

          <span className="small text-muted">
            {servicio.id}
          </span>
        </div>

        <h2 className="h5 fw-bold">{servicio.nombre}</h2>

        <div className="mb-3">
          <p className="text-muted small mb-1">Especie</p>
          <EtiquetaEspecie especie={servicio.especie} />
        </div>

        <div className="mb-3">
          <p className="text-muted small mb-1">Duración</p>
          <p className="mb-0">
            {servicio.duracion || 'No especificada'}
          </p>
        </div>

        <div className="mb-3">
          <p className="text-muted small mb-1">Precio</p>
          <p className="fs-5 fw-bold text-success mb-0">
            {precioFormateado}
          </p>
        </div>

        {servicio.observaciones && (
          <p className="text-muted small">
            {servicio.observaciones}
          </p>
        )}

        <Link
          to={`/servicios/${encodeURIComponent(servicio.id)}`}
          className="btn btn-success w-100 mt-auto"
        >
          Ver detalle
        </Link>
        <Link
          to={`/solicitar-cita?servicio=${encodeURIComponent(servicio.id)}`}
          className="btn btn-outline-success w-100 mt-2"
        >
          Solicitar cita
        </Link>
      </div>
    </article>
  )
}
