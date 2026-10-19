import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import CampoTexto from './CampoTexto'

describe('CampoTexto', () => {
  it('actualiza el valor mediante el evento de cambio', () => {
    const onChange = vi.fn()

    render(
      <CampoTexto
        id="correo"
        name="correo"
        tipo="email"
        valor=""
        onChange={onChange}
      />,
    )

    const campo = screen.getByRole('textbox')
    fireEvent.change(campo, { target: { value: 'cliente@correo.cl' } })

    expect(onChange).toHaveBeenCalledTimes(1)
    expect(campo).toHaveAttribute('type', 'email')
  })
})
