
import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import TarjetaServicio from './TarjetaServicio'

const servicioPrueba = {
  id: 'SV-TEST',
  categoria: 'Consultas',
  nombre: 'Consulta veterinaria',
  especie: 'Perro',
  duracion: '30 min',
  precio: undefined,
}

describe('TarjetaServicio', () => {
  it('muestra un mensaje cuando el servicio no tiene precio', () => {
    render(
      <MemoryRouter>
        <TarjetaServicio servicio={servicioPrueba} />
      </MemoryRouter>,
    )

    expect(screen.getByText('Precio disponible')).toBeInTheDocument()
  })
})
