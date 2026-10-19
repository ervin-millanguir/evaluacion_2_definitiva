import { useState } from 'react'

const datosVacios = {
  nombre: '',
  categoria: '',
  principioActivo: '',
  presentacion: '',
  especie: '',
  stock: '',
  precio: '',
}

const categorias = [
  'Alimentos',
  'Juguetes',
  'Higiene y cuidado',
  'Medicamentos',
  'Vacunas',
  'Antiparasitarios',
  'Accesorios',
  'Transporte',
  'Otro',
]

function datosDesdeProducto(producto) {
  if (!producto) {
    return datosVacios
  }

  return {
    nombre: producto.nombre ?? '',
    categoria: producto.categoria ?? '',
    principioActivo: producto.principioActivo ?? '',
    presentacion: producto.presentacion ?? '',
    especie: producto.especie ?? '',
    stock: String(producto.stock ?? ''),
    precio: String(producto.precio ?? ''),
  }
}

export default function FormularioProducto({
  productoEditado,
  onSolicitarGuardar,
  onCancelar,
}) {
  const [datos, setDatos] = useState(() => datosDesdeProducto(productoEditado))
  const [error, setError] = useState('')

  function manejarCambio(event) {
    const { name, value } = event.target
    setDatos((anteriores) => ({ ...anteriores, [name]: value }))
    setError('')
  }

  function manejarEnvio(event) {
    event.preventDefault()

    if (
      !datos.nombre.trim() ||
      !datos.categoria.trim() ||
      !datos.presentacion.trim() ||
      !datos.especie.trim()
    ) {
      setError('Completa nombre, categoría, presentación y especie.')
      return
    }

    const stock = Number(datos.stock)
    const precio = Number(datos.precio)
    if (
      !Number.isInteger(stock) ||
      stock < 0 ||
      !Number.isFinite(precio) ||
      precio < 0
    ) {
      setError('El stock debe ser entero y el precio debe ser un número válido.')
      return
    }

    onSolicitarGuardar({
      ...datos,
      nombre: datos.nombre.trim(),
      categoria: datos.categoria.trim(),
      principioActivo: datos.principioActivo.trim(),
      presentacion: datos.presentacion.trim(),
      especie: datos.especie.trim(),
      stock,
      precio,
    })

    if (!productoEditado) {
      setDatos(datosVacios)
    }
  }

  return (
    <form className="card card-body mb-4" onSubmit={manejarEnvio}>
      <h2 className="h4">
        {productoEditado ? 'Editar producto' : 'Agregar producto'}
      </h2>
      <div className="row">
        {[
          ['nombre', 'Nombre'],
          ['principioActivo', 'Principio activo'],
          ['presentacion', 'Presentación'],
          ['especie', 'Especie'],
        ].map(([campo, etiqueta]) => (
          <div className="col-12 col-md-6 mb-3" key={campo}>
            <label className="form-label" htmlFor={`producto-${campo}`}>
              {etiqueta}
            </label>
            <input
              id={`producto-${campo}`}
              name={campo}
              className="form-control"
              value={datos[campo]}
              onChange={manejarCambio}
              required={campo !== 'principioActivo'}
            />
          </div>
        ))}
        <div className="col-12 col-md-6 mb-3">
          <label className="form-label" htmlFor="producto-categoria">
            Categoría
          </label>
          <select
            id="producto-categoria"
            name="categoria"
            className="form-select"
            value={datos.categoria}
            onChange={manejarCambio}
            required
          >
            <option value="">Selecciona una categoría</option>
            {datos.categoria && !categorias.includes(datos.categoria) && (
              <option value={datos.categoria}>{datos.categoria}</option>
            )}
            {categorias.map((categoria) => (
              <option key={categoria} value={categoria}>
                {categoria}
              </option>
            ))}
          </select>
        </div>
        <div className="col-6 mb-3">
          <label className="form-label" htmlFor="producto-stock">
            Stock
          </label>
          <input
            id="producto-stock"
            name="stock"
            type="number"
            min="0"
            step="1"
            className="form-control"
            value={datos.stock}
            onChange={manejarCambio}
            required
          />
        </div>
        <div className="col-6 mb-3">
          <label className="form-label" htmlFor="producto-precio">
            Precio
          </label>
          <input
            id="producto-precio"
            name="precio"
            type="number"
            min="0"
            step="1"
            className="form-control"
            value={datos.precio}
            onChange={manejarCambio}
            required
          />
        </div>
      </div>
      {error && <div className="alert alert-danger">{error}</div>}
      <div className="d-flex gap-2">
        <button type="submit" className="btn btn-success">
          {productoEditado ? 'Guardar cambios' : 'Crear producto'}
        </button>
        {productoEditado && (
          <button type="button" className="btn btn-secondary" onClick={onCancelar}>
            Cancelar
          </button>
        )}
      </div>
    </form>
  )
}
