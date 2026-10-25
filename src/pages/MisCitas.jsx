
import { Link } from 'react-router-dom'
import ListaMisCitas from '../components/organisms/ListaMisCitas'
import { listarCitas } from '../services/citaService'

export default function MisCitas() {
  const citas = listarCitas()

  return (
    <section className="container py-4">
      <div className="d-flex flex-wrap justify-content-between align-items-center gap-3 mb-4">
        <div>
          <h1 className="text-success">Mis citas</h1>
          <p className="text-muted mb-0">
            Revisa las solicitudes de atención veterinaria registradas en este navegador.
          </p>
        </div>
        <Link to="/solicitar-cita" className="btn btn-success">
          Solicitar otra cita
        </Link>
      </div>

      <ListaMisCitas citas={citas} />
    </section>
  )
}
