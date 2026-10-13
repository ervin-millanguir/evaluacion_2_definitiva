import TarjetaServicio from '../molecules/TarjetaServicio'

export default function ListaServicios({ servicios = [] }) {
  if (servicios.length === 0) {
    return <p>No hay servicios disponibles.</p>
  }

  return (
    <div className="row g-4">
      {servicios.map((servicio) => (
        <div key={servicio.id} className="col-12 col-md-6 col-lg-4">
          <TarjetaServicio servicio={servicio} />
        </div>
      ))}
    </div>
  )
}