
import { Link } from 'react-router-dom'
import { obtenerUltimaCita } from '../services/citaService'

export default function CitaResultado() {
  const cita = obtenerUltimaCita()

  return (
    <section className="container py-5">
      {cita ? (
        <div className="row justify-content-center">
          <div className="col-12 col-lg-8">
            <div className="card border-success shadow-sm">
              <div className="card-body p-4">
                <div className="alert alert-success">
                  <h1 className="h3">¡Solicitud registrada!</h1>
                  <p className="mb-0">
                    Tu solicitud quedó pendiente de confirmación por parte de la clínica.
                  </p>
                </div>

                <h2 className="h5">Resumen de la solicitud</h2>
                <p><strong>Servicio:</strong> {cita.servicio}</p>
                <p><strong>Mascota:</strong> {cita.nombreMascota}</p>
                <p><strong>Especie:</strong> {cita.especie}</p>
                <p><strong>Fecha:</strong> {cita.fecha}</p>
                <p><strong>Hora:</strong> {cita.hora}</p>
                <p><strong>Estado:</strong> {cita.estado || 'Pendiente'}</p>

                <div className="d-flex flex-wrap gap-2 mt-4">
                  <Link to="/mis-citas" className="btn btn-success">
                    Ver mis citas
                  </Link>
                  <Link to="/inicio" className="btn btn-outline-success">
                    Volver al inicio
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="alert alert-info">
          No hay una solicitud reciente para mostrar.
          <div className="mt-3">
            <Link to="/solicitar-cita" className="btn btn-success">
              Solicitar una cita
            </Link>
          </div>
        </div>
      )}
    </section>
  )
}
