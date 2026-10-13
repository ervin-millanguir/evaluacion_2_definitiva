import { Link } from 'react-router-dom'

export default function Inicio() {
  return (
    <section className="bg-white rounded-3 shadow-sm p-4 p-md-5">
      <p className="text-success fw-semibold">
        Veterinaria y tienda para mascotas
      </p>

      <h1 className="display-5 fw-bold">Bienvenido a HAPPY PAWS</h1>

      <p className="lead">
        Conoce nuestros servicios veterinarios y descubre productos
        para el cuidado de tus mascotas.
      </p>

      <div className="d-flex flex-wrap gap-3 mt-4">
        <Link to="/servicios" className="btn btn-success">
          Ver servicios
        </Link>

        <Link to="/productos" className="btn btn-outline-success">
          Ver productos
        </Link>
      </div>
    </section>
  )
}