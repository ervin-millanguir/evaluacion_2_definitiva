import TarjetaProducto from '../molecules/TarjetaProducto'

export default function ListaProductos({ productos = [] }) {
  if (productos.length === 0) {
    return <p>No hay productos disponibles.</p>
  }

  return (
    <div className="row g-4">
      {productos.map((producto) => (
        <div key={producto.id} className="col-12 col-md-6 col-lg-4">
          <TarjetaProducto producto={producto} />
        </div>
      ))}
    </div>
  )
}