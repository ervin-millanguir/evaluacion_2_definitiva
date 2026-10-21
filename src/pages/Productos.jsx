import { useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import FormularioProducto from '../components/organisms/FormularioProducto'
import ListaProductos from '../components/organisms/ListaProductos'
import { useProductos } from '../context/useProductos'

export default function Productos() {
  const { productos, crear, actualizar, eliminar } = useProductos()
  const [searchParams, setSearchParams] = useSearchParams()
  const [productoEditado, setProductoEditado] = useState(null)
  const [confirmacion, setConfirmacion] = useState(null)
  const textoBuscado = searchParams.get('buscar') || ''
  const categoriaSeleccionada = searchParams.get('categoria') || ''

  const categorias = [
    ...new Set(productos.map((producto) => producto.categoria).filter(Boolean)),
  ].sort((a, b) => a.localeCompare(b, 'es'))

  const productosFiltrados = productos.filter((producto) => {
    const texto = textoBuscado.toLocaleLowerCase('es')
    const coincideTexto =
      !texto ||
      [producto.nombre, producto.principioActivo, producto.especie]
        .filter(Boolean)
        .some((valor) => valor.toLocaleLowerCase('es').includes(texto))
    const coincideCategoria =
      !categoriaSeleccionada || producto.categoria === categoriaSeleccionada

    return coincideTexto && coincideCategoria
  })

  function cambiarFiltro(nombre, valor) {
    const nuevosParametros = new URLSearchParams(searchParams)

    if (valor) {
      nuevosParametros.set(nombre, valor)
    } else {
      nuevosParametros.delete(nombre)
    }

    setSearchParams(nuevosParametros)
  }

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
      <h1 className="mb-2">Productos para mascotas</h1>
      <p className="text-muted mb-4">
        Busca por nombre, principio activo, especie o categoría.
      </p>

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
      <div className="card card-body mb-4">
        <h2 className="h5">Buscar y filtrar catálogo</h2>
        <div className="row g-3 align-items-end">
          <div className="col-12 col-md-7">
            <label className="form-label" htmlFor="buscar-producto">
              Buscar producto
            </label>
            <input
              id="buscar-producto"
              type="search"
              className="form-control"
              placeholder="Ej.: alimento, vacuna o perro"
              value={textoBuscado}
              onChange={(event) => cambiarFiltro('buscar', event.target.value)}
            />
          </div>
          <div className="col-12 col-md-5">
            <label className="form-label" htmlFor="filtro-categoria-producto">
              Categoría
            </label>
            <select
              id="filtro-categoria-producto"
              className="form-select"
              value={categoriaSeleccionada}
              onChange={(event) =>
                cambiarFiltro('categoria', event.target.value)
              }
            >
              <option value="">Todas las categorías</option>
              {categorias.map((categoria) => (
                <option key={categoria} value={categoria}>
                  {categoria}
                </option>
              ))}
            </select>
          </div>
        </div>
        {(textoBuscado || categoriaSeleccionada) && (
          <button
            type="button"
            className="btn btn-link align-self-start px-0 mt-2"
            onClick={() => setSearchParams({})}
          >
            Limpiar filtros
          </button>
        )}
      </div>
      <ListaProductos
        productos={productosFiltrados}
        onEditar={setProductoEditado}
        onEliminar={eliminarProducto}
      />
    </section>
  )
}