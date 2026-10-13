import { serviciosIniciales } from '../utils/adaptarCatalogo'
import ListaServicios from '../components/organisms/ListaServicios'

export default function Servicios() {
  return (
    <section>
      <h1 className="text-success mb-3">Servicios veterinarios</h1>

      <p className="text-muted mb-4">
        Consulta nuestro catálogo de atención para mascotas.
      </p>

      <ListaServicios servicios={serviciosIniciales} />
    </section>
  )
}