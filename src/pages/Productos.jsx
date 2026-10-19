import { useState } from 'react'
import FormularioProducto from '../components/organisms/FormularioProducto'
import ListaProductos from '../components/organisms/ListaProductos'
import { useProductos } from '../context/ProductosContext'

export default function Productos() {
  const { productos, crear, actualizar, eliminar } = useProductos()
  const [productoEditado, setProductoEditado] = useState(null)
  const [confirmacion, setConfirmacion] = useState(null)

  function solicitarGuardar(datos) {
    setConfirmacion({
      tipo: productoEditado ? 'editar' : 'agregar',
      datos,
      id: productoEditado?.id,
    })
  }

  function confirmarAccion() {
    if (confirmacion.tipo === 'editar') {
      actualizar(confirmacion.id, confirmacion.datos)
      setProductoEditado(null)
    } else {
      crear(confirmacion.datos)
    }
    setConfirmacion(null)
  }

  function cancelarAccion() {
    setConfirmacion(null)
  }

  function eliminarProducto(id) {
    const producto = productos.find((item) => item.id === id)
    setConfirmacion({
      tipo: 'eliminar',
      productoNombre: producto?.nombre ?? 'este producto',
      id,
    })
  }

  function mensajeConfirmacion() {
    if (confirmacion.tipo === 'eliminar') {
      return `¿Deseas eliminar el artículo "${confirmacion.productoNombre}"?`
    }

    if (confirmacion.tipo === 'editar') {
      return '¿Deseas guardar los cambios de este artículo?'
    }

    return '¿Deseas agregar este artículo al catálogo?'
  }

  function confirmar() {
    if (confirmacion.tipo === 'eliminar') {
      eliminar(confirmacion.id)
      setConfirmacion(null)
      return
    }

    confirmarAccion()
  }

  function cancelarEdicion() {
    setProductoEditado(null)
    setConfirmacion(null)
  }

  return (
    <section className="container py-5">
      <h1 className="mb-4">Productos para mascotas</h1>

      <FormularioProducto
        key={productoEditado?.id ?? 'nuevo'}
        productoEditado={productoEditado}
        onSolicitarGuardar={solicitarGuardar}
        onCancelar={cancelarEdicion}
      />
      {confirmacion && (
        <div
          className="alert alert-warning d-flex flex-column flex-md-row align-items-md-center justify-content-between gap-3"
          role="alert"
        >
          <strong>{mensajeConfirmacion()}</strong>
          <div className="d-flex gap-2">
            <button type="button" className="btn btn-success" onClick={confirmar}>
              Sí, confirmar
            </button>
            <button
              type="button"
              className="btn btn-outline-secondary"
              onClick={cancelarAccion}
            >
              Cancelar
            </button>
          </div>
        </div>
      )}
      <ListaProductos
        productos={productos}
        onEditar={setProductoEditado}
        onEliminar={eliminarProducto}
      />
    </section>
  )
}