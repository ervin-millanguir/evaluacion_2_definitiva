import { beforeEach, describe, expect, it } from 'vitest'
import {
  actualizarProducto,
  crearProducto,
  eliminarProducto,
  listarProductos,
  obtenerProducto,
} from './productoService'

const producto = {
  nombre: 'Juguete de prueba',
  categoria: 'Juguetes',
  principioActivo: '',
  presentacion: 'Unidad',
  especie: 'Perro',
  stock: 3,
  precio: 4990,
}

describe('productoService', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it('lista los productos iniciales y encuentra uno por id', () => {
    const productos = listarProductos()

    expect(productos.length).toBeGreaterThan(0)
    expect(obtenerProducto(productos[0].id)).toEqual(productos[0])
  })

  it('crea un producto con un id nuevo', () => {
    const creado = crearProducto(producto)

    expect(creado).toMatchObject(producto)
    expect(creado.id).toEqual(expect.any(Number))
    expect(obtenerProducto(creado.id)).toEqual(creado)
  })

  it('actualiza solo el producto solicitado', () => {
    const creado = crearProducto(producto)
    const actualizado = actualizarProducto(creado.id, { stock: 8 })

    expect(actualizado).toMatchObject({ ...producto, id: creado.id, stock: 8 })
    expect(obtenerProducto(creado.id).precio).toBe(producto.precio)
  })

  it('elimina el producto solicitado', () => {
    const creado = crearProducto(producto)

    eliminarProducto(creado.id)

    expect(obtenerProducto(creado.id)).toBeNull()
  })

  it('devuelve null cuando busca un producto inexistente', () => {
    expect(obtenerProducto(999999)).toBeNull()
  })

  it('devuelve null cuando actualiza un producto inexistente', () => {
    expect(actualizarProducto(999999, { stock: 8 })).toBeNull()
  })

  it('mantiene los productos existentes al eliminar un id inexistente', () => {
    const productosIniciales = listarProductos()

    eliminarProducto(999999)

    expect(listarProductos()).toEqual(productosIniciales)
  })
})
