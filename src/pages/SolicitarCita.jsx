
import { useNavigate } from 'react-router-dom'
import FormularioSolicitudCita from '../components/organisms/FormularioSolicitudCita'

export default function SolicitarCita() {
  const navegar = useNavigate()

  function guardarSolicitud(solicitud) {
    try {
      const citas = JSON.parse(localStorage.getItem('misCitas') || '[]')
      const nuevasCitas = [...citas, solicitud]

      localStorage.setItem('misCitas', JSON.stringify(nuevasCitas))
      localStorage.setItem('ultimaCita', JSON.stringify(solicitud))

      navegar('/cita-resultado')
    } catch {
      window.alert('No se pudo guardar la solicitud. Inténtalo nuevamente.')
    }
  }

  return (
    <section className="container py-4">
      <div className="row justify-content-center">
        <div className="col-12 col-lg-8">
          <h1 className="text-success mb-2">Solicitar cita</h1>
          <p className="text-muted mb-4">
            Completa los datos para solicitar atención veterinaria para tu mascota.
          </p>
          <FormularioSolicitudCita onSolicitar={guardarSolicitud} />
        </div>
      </div>
    </section>
  )
}
