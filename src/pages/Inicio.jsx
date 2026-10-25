import { Link } from 'react-router-dom'
import { useProductos } from '../context/useProductos'
import TarjetaProducto from '../components/molecules/TarjetaProducto'

export default function Inicio() {
  const { productos } = useProductos()
  const productosDestacados = productos.slice(0, 3)

  return (
    <div className="py-2">
      <section className="bg-white rounded-3 shadow-sm p-4 p-md-5">
        <p className="text-success fw-semibold">
          Veterinaria y tienda para mascotas
        </p>

        <h1 className="display-5 fw-bold">Bienvenido a HAPPY PAWS</h1>

        <p className="lead">
          Conoce nuestros servicios veterinarios y descubre productos
          para el cuidado de tus mascotas.
        </p>

        <div className="d-flex flex-wrap gap-3 mt-4">
          <Link to="/servicios" className="btn btn-success">
            Ver servicios
          </Link>

          <Link to="/solicitar-cita" className="btn btn-outline-primary">
            Solicitar una cita
          </Link>

          <Link to="/productos" className="btn btn-outline-success">
            Ver productos
          </Link>
        </div>
      </section>

      <section className="mt-5" aria-labelledby="productos-destacados">
        <div className="d-flex flex-wrap justify-content-between align-items-center gap-3 mb-4">
          <div>
            <p className="text-success fw-semibold mb-1">Lo que ofrecemos</p>
            <h2 id="productos-destacados" className="h3 mb-0">
              Productos destacados
            </h2>
          </div>
          <Link to="/productos" className="btn btn-outline-success">
            Ver catálogo completo
          </Link>
        </div>

        <div className="row g-4">
          {productosDestacados.map((producto) => (
            <div className="col-12 col-md-6 col-lg-4" key={producto.id}>
              <TarjetaProducto producto={producto} />
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}