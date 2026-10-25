
import { Link, Navigate, Route, Routes } from 'react-router-dom'

import PlantillaPublica from './components/templates/PlantillaPublica'
import RutaProtegida from './components/organisms/RutaProtegida'

import Registro from './pages/Registro'
import Login from './pages/Login'
import Inicio from './pages/Inicio'
import Servicios from './pages/Servicios'
import Productos from './pages/Productos'
import Categorias from './pages/Categorias'
import DetalleServicio from './pages/DetalleServicio'
import DetalleProducto from './pages/DetalleProducto'

import SolicitarCita from './pages/SolicitarCita'
import CitaResultado from './pages/CitaResultado'
import MisCitas from './pages/MisCitas'
import AdminServicios from './pages/AdminServicios'
import AdminCitas from './pages/AdminCitas'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Registro />} />
      <Route path="/login" element={<Login />} />

      <Route
        path="/inicio"
        element={
          <PlantillaPublica>
            <Inicio />
          </PlantillaPublica>
        }
      />

      <Route
        path="/servicios"
        element={
          <PlantillaPublica>
            <Servicios />
          </PlantillaPublica>
        }
      />

      <Route
        path="/servicios/:id"
        element={
          <PlantillaPublica>
            <DetalleServicio />
          </PlantillaPublica>
        }
      />

      <Route
        path="/categorias"
        element={
          <PlantillaPublica>
            <Categorias />
          </PlantillaPublica>
        }
      />

      <Route
        path="/productos"
        element={
          <PlantillaPublica>
            <Productos />
          </PlantillaPublica>
        }
      />

      <Route
        path="/productos/:id"
        element={
          <PlantillaPublica>
            <DetalleProducto />
          </PlantillaPublica>
        }
      />

      <Route
        path="/categoria/:nombre"
        element={
          <PlantillaPublica>
            <Productos />
          </PlantillaPublica>
        }
      />

      <Route
        path="/buscar/:texto"
        element={
          <PlantillaPublica>
            <Productos />
          </PlantillaPublica>
        }
      />

      <Route
        path="/cita"
        element={<Navigate to="/solicitar-cita" replace />}
      />

      <Route
        path="/solicitar-cita"
        element={
          <PlantillaPublica>
            <SolicitarCita />
          </PlantillaPublica>
        }
      />

      <Route
        path="/cita-resultado"
        element={
          <PlantillaPublica>
            <CitaResultado />
          </PlantillaPublica>
        }
      />

      <Route
        path="/mis-citas"
        element={
          <PlantillaPublica>
            <MisCitas />
          </PlantillaPublica>
        }
      />

      <Route
        path="/admin"
        element={<Navigate to="/admin/servicios" replace />}
      />

      <Route
        path="/admin/servicios"
        element={
          <RutaProtegida>
            <AdminServicios />
          </RutaProtegida>
        }
      />

      <Route
        path="/admin/citas"
        element={
          <RutaProtegida>
            <AdminCitas />
          </RutaProtegida>
        }
      />

      <Route
        path="*"
        element={
          <main className="container py-5 text-center">
            <h1>Página no encontrada</h1>
            <Link to="/inicio" className="btn btn-success mt-3">
              Volver al inicio
            </Link>
          </main>
        }
      />
    </Routes>
  )
}
