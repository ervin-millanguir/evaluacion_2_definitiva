
import { Link } from 'react-router-dom'
import EtiquetaEspecie from '../atoms/EtiquetaEspecie'
import { emojiServicio } from '../../utils/iconosCatalogo'

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

  const emoji = servicio.emoji || emojiServicio(servicio.categoria)

  return (
    <article className="card servicio-card h-100">
      <div className="card-body p-4 d-flex flex-column">
        <div className="d-flex justify-content-between align-items-start gap-2 mb-3">
          <span className="badge rounded-pill text-bg-success px-3 py-2">
            {emoji} {servicio.categoria || 'Servicio'}
          </span>

          <span className="servicio-id">{servicio.id}</span>
        </div>

        <h2 className="h5 fw-bold servicio-titulo mb-3">
          {servicio.nombre}
        </h2>

        <div className="servicio-dato mb-3">
          <p className="servicio-etiqueta">Especie</p>
          <EtiquetaEspecie especie={servicio.especie} />
        </div>

        <div className="servicio-dato mb-3">
          <p className="servicio-etiqueta">Duración estimada</p>
          <p className="mb-0">
            {servicio.duracion || 'No especificada'}
          </p>
        </div>

        <div className="servicio-precio mb-3">
          <p className="servicio-etiqueta">Precio</p>
          <p className="fs-4 fw-bold text-success mb-0">
            {precioFormateado}
          </p>
        </div>

        {servicio.observaciones && (
          <p className="servicio-observaciones small mb-4">
            {servicio.observaciones}
          </p>
        )}

        <div className="mt-auto pt-2">
          <Link
            to={`/servicios/${encodeURIComponent(servicio.id)}`}
            className="btn btn-success w-100 rounded-pill"
          >
            Ver detalle
          </Link>

          <Link
            to={`/solicitar-cita?servicio=${encodeURIComponent(servicio.id)}`}
            className="btn btn-outline-success w-100 rounded-pill mt-2"
          >
            Solicitar cita
          </Link>
        </div>
      </div>
    </article>
  )
}
