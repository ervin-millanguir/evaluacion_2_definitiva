
import { useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import FormularioSolicitudCita from '../components/organisms/FormularioSolicitudCita'
import { crearCita } from '../services/citaService'

export default function SolicitarCita() {
  const navegar = useNavigate()
  const [searchParams] = useSearchParams()
  const [errorGuardado, setErrorGuardado] = useState('')

  function guardarSolicitud(solicitud) {
    try {
      crearCita(solicitud)
      navegar('/cita-resultado')
    } catch {
      setErrorGuardado('No se pudo guardar la solicitud. Inténtalo nuevamente.')
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
          {errorGuardado && (
            <div className="alert alert-danger" role="alert">
              {errorGuardado}
            </div>
          )}
          <FormularioSolicitudCita
            onSolicitar={guardarSolicitud}
            servicioInicial={searchParams.get('servicio') || ''}
          />
        </div>
      </div>
    </section>
  )
}
