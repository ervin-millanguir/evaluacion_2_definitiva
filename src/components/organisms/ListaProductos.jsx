import TarjetaProducto from '../molecules/TarjetaProducto'

export default function ListaProductos({ productos, onEditar, onEliminar }) {
  if (productos.length === 0) {
    return <p>No hay productos disponibles.</p>
  }

  return (
    <div className="row g-4">
      {productos.map((producto) => (
        <div className="col-12 col-md-6 col-lg-4" key={producto.id}>
          <TarjetaProducto
            producto={producto}
            onEditar={onEditar}
            onEliminar={onEliminar}
            mostrarAcciones={Boolean(onEditar && onEliminar)}
          />
        </div>
      ))}
    </div>
  )
}
