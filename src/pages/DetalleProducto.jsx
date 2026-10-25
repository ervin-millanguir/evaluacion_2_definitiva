import { Link, useParams } from 'react-router-dom'
import { useProductos } from '../context/useProductos'
import { emojiProducto } from '../utils/iconosCatalogo'

const formatoPrecio = new Intl.NumberFormat('es-CL', {
  style: 'currency',
  currency: 'CLP',
  maximumFractionDigits: 0,
})

export default function DetalleProducto() {
  const { id } = useParams()
  const { productos } = useProductos()
  const producto = productos.find((item) => String(item.id) === String(id))

  if (!producto) {
    return (
      <section className="container py-5 text-center">
        <h1>Producto no encontrado</h1>
        <p className="text-muted">
          No encontramos el producto que estás buscando.
        </p>
        <Link to="/productos" className="btn btn-success">
          Volver al catálogo
        </Link>
      </section>
    )
  }

  return (
    <section className="container py-5">
      <div className="row justify-content-center">
        <div className="col-12 col-lg-8">
          <nav aria-label="Ruta de navegación" className="mb-4">
            <Link to="/inicio" className="text-success text-decoration-none">
              Inicio
            </Link>
            {' / '}
            <Link
              to="/productos"
              className="text-success text-decoration-none"
            >
              Productos
            </Link>
            {' / '}
            <span aria-current="page">{producto.nombre}</span>
          </nav>

          <article className="card border-0 shadow-sm">
            <div className="card-body p-4 p-md-5">
              <span className="badge bg-success mb-3">
                {producto.emoji || emojiProducto(producto.categoria)} {producto.categoria}
              </span>
              <h1 className="fw-bold mb-4">{producto.nombre}</h1>

              <dl className="row">
                <dt className="col-sm-5">Principio activo</dt>
                <dd className="col-sm-7">
                  {producto.principioActivo || 'No especificado'}
                </dd>
                <dt className="col-sm-5">Presentación</dt>
                <dd className="col-sm-7">{producto.presentacion}</dd>
                <dt className="col-sm-5">Especie</dt>
                <dd className="col-sm-7">{producto.especie}</dd>
                <dt className="col-sm-5">Stock disponible</dt>
                <dd className="col-sm-7">{producto.stock}</dd>
                <dt className="col-sm-5">Precio</dt>
                <dd className="col-sm-7 fw-bold text-success">
                  {formatoPrecio.format(producto.precio)}
                </dd>
              </dl>

              <Link to="/productos" className="btn btn-outline-success mt-3">
                Volver al catálogo
              </Link>
            </div>
          </article>
        </div>
      </div>
    </section>
  )
}
