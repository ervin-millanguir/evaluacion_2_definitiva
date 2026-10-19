import EtiquetaEspecie from '../atoms/EtiquetaEspecie'

const formatoPrecio = new Intl.NumberFormat('es-CL', {
  style: 'currency',
  currency: 'CLP',
  maximumFractionDigits: 0,
})

export default function TarjetaProducto({ producto, onEditar, onEliminar }) {
  return (
    <article className="card h-100">
      <div className="card-body">
        <h2 className="card-title h5">{producto.nombre}</h2>
        <p className="card-text mb-2">
          <strong>Categoría:</strong> {producto.categoria}
        </p>
        <p className="card-text mb-2">
          <strong>Presentación:</strong> {producto.presentacion}
        </p>
        <p className="card-text mb-2">
          <strong>Especie:</strong>{' '}
          <EtiquetaEspecie especie={producto.especie} />
        </p>
        <p className="card-text mb-2">
          <strong>Stock:</strong> {producto.stock}
        </p>
        <p className="card-text">
          <strong>Precio:</strong> {formatoPrecio.format(producto.precio)}
        </p>
        <div className="d-flex gap-2 mt-3">
          <button
            type="button"
            className="btn btn-outline-primary btn-sm"
            onClick={() => onEditar(producto)}
          >
            Editar
          </button>
          <button
            type="button"
            className="btn btn-outline-danger btn-sm"
            onClick={() => onEliminar(producto.id)}
          >
            Eliminar
          </button>
        </div>
      </div>
    </article>
  )
}
