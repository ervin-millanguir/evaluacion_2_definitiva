import { useContext } from 'react'
import { ProductosContext } from './ProductosContext.js'

export function useProductos() {
  const contexto = useContext(ProductosContext)
  if (!contexto) {
    throw new Error('useProductos debe usarse dentro de un ProductosProvider')
  }
  return contexto
}
