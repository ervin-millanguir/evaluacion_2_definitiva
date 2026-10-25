
import TarjetaServicio from '../molecules/TarjetaServicio'

export default function ListaServicios({ servicios = [] }) {
  if (servicios.length === 0) {
    return (
      <div className="alert alert-light border rounded-4">
        No hay servicios disponibles.
      </div>
    )
  }

  return (
    <div className="row g-4 servicios-lista">
      {servicios.map((servicio) => (
        <div
          key={servicio.id}
          className="col-12 col-md-6 col-xl-4"
        >
          <TarjetaServicio servicio={servicio} />
        </div>
      ))}
    </div>
  )
}
