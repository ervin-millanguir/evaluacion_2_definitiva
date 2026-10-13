import { productosIniciales } from '../utils/adaptarCatalogo'
import ListaProductos from '../components/organisms/ListaProductos'

export default function Productos() {
  return (
    <section>
      <h1 className="text-success mb-3">Productos para mascotas</h1>

      <p className="text-muted mb-4">
        Conoce nuestro catálogo de medicamentos y vacunas.
      </p>

      <ListaProductos productos={productosIniciales} />
    </section>
  )
}