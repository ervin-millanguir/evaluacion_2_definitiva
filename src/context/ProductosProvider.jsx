import { useState } from 'react'
import * as productoService from '../services/productoService'
import { ProductosContext } from './ProductosContext.js'

export default function ProductosProvider({ children }) {
  const [productos, setProductos] = useState(() =>
    productoService.listarProductos(),
  )

  function crear(datos) {
    productoService.crearProducto(datos)
    setProductos(productoService.listarProductos())
  }

  function actualizar(id, cambios) {
    productoService.actualizarProducto(id, cambios)
    setProductos(productoService.listarProductos())
  }

  function eliminar(id) {
    productoService.eliminarProducto(id)
    setProductos(productoService.listarProductos())
  }

  function recargar() {
    setProductos(productoService.listarProductos())
  }

  return (
    <ProductosContext.Provider
      value={{ productos, crear, actualizar, eliminar, recargar }}
    >
      {children}
    </ProductosContext.Provider>
  )
}
