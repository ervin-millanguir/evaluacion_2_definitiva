import EtiquetaEspecie from '../atoms/EtiquetaEspecie'

const formatoPrecio = new Intl.NumberFormat('es-CL', {
  style: 'currency',
  currency: 'CLP',
  maximumFractionDigits: 0,
})

export default function TarjetaServicio({ servicio }) {
  return (
    <article className="card h-100 shadow-sm">
      <div className="card-body">
        <p className="text-success fw-semibold mb-2">
          {servicio.categoria}
        </p>

        <h2 className="h5">{servicio.nombre}</h2>

        <EtiquetaEspecie especie={servicio.especie} />

        <p className="mt-3 mb-2">
          Duración: {servicio.duracion}
        </p>

        <p className="fw-bold">
          {formatoPrecio.format(servicio.precio)}
        </p>

        {servicio.observaciones && (
          <p className="text-muted mb-0">
            {servicio.observaciones}
          </p>
        )}
      </div>
    </article>
  )
}