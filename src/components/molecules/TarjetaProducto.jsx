import EtiquetaEspecie from '../atoms/EtiquetaEspecie'

const formatoPrecio = new Intl.NumberFormat('es-CL', {
  style: 'currency',
  currency: 'CLP',
  maximumFractionDigits: 0,
})

export default function TarjetaProducto({ producto }) {
  return (
    <article className="card h-100 shadow-sm">
      <div className="card-body">
        <p className="text-success fw-semibold mb-2">
          {producto.categoria}
        </p>

        <h2 className="h5">{producto.nombre}</h2>

        <EtiquetaEspecie especie={producto.especie} />

        <p className="mt-3 mb-2">
          Presentación: {producto.presentacion}
        </p>

        <p className="mb-2">Stock: {producto.stock}</p>

        <p className="fw-bold mb-0">
          {formatoPrecio.format(producto.precio)}
        </p>
      </div>
    </article>
  )
}