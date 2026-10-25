
import EtiquetaEstadoCita from '../atoms/EtiquetaEstadoCita'

export default function ListaMisCitas({ citas = [] }) {
  if (citas.length === 0) {
    return (
      <div className="alert alert-info">
        Todavía no tienes citas registradas.
      </div>
    )
  }

  return (
    <div className="row g-3">
      {citas.map((cita) => (
        <div className="col-12 col-lg-6" key={cita.id}>
          <article className="card h-100 shadow-sm">
            <div className="card-body">
              <div className="d-flex justify-content-between gap-2">
                <h2 className="h5">{cita.servicio}</h2>
                <EtiquetaEstadoCita estado={cita.estado} />
              </div>
              <p className="mb-1">
                <strong>Mascota:</strong> {cita.nombreMascota}
              </p>
              <p className="mb-1">
                <strong>Especie:</strong> {cita.especie}
              </p>
              <p className="mb-1">
                <strong>Fecha:</strong> {cita.fecha}
              </p>
              <p className="mb-1">
                <strong>Hora:</strong> {cita.hora}
              </p>
              <p className="mb-0">
                <strong>Motivo:</strong> {cita.motivo}
              </p>
            </div>
          </article>
        </div>
      ))}
    </div>
  )
}
