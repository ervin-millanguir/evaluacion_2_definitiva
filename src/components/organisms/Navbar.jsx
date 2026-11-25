import { useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import useAuth from '../../context/useAuth'
const enlaces = [
  {ruta:'/inicio',texto:'Inicio'},
  {ruta:'/servicios',texto:'Servicios'},
  {ruta:'/categorias',texto:'Categorías'},
  {ruta:'/productos',texto:'Productos'},
  {ruta:'/solicitar-cita',texto:'Solicitar cita',sesion:true},
  {ruta:'/mis-citas',texto:'Mis citas',sesion:true},
  {ruta:'/mi-cuenta',texto:'Mi cuenta',sesion:true},
  {ruta:'/admin',texto:'Administración',admin:true},
  {ruta:'/admin/usuarios',texto:'Usuarios',admin:true},
]
export default function Navbar() {
  const [abierto,setAbierto]=useState(false)
  const {usuario,estaAutenticado,esAdministrador,cerrarSesion}=useAuth()
  const navegar=useNavigate()
  function salir() { cerrarSesion();setAbierto(false);navegar('/login',{replace:true}) }
  return <nav className='navbar navbar-expand-xl navbar-happy-paws sticky-top' aria-label='Navegación principal'>
    <div className='container-fluid px-3 px-xl-4'>
      <Link to='/inicio' className='navbar-brand navbar-marca' onClick={()=>setAbierto(false)}><span className='brand-icon me-2'>🐾</span><span>HAPPY PAWS</span></Link>
      <button className='navbar-toggler navbar-toggler-happy' type='button' aria-label='Abrir o cerrar menú' aria-expanded={abierto} aria-controls='menu-principal' onClick={()=>setAbierto(!abierto)}><span className='navbar-toggler-icon'/></button>
      <div id='menu-principal' className={`collapse navbar-collapse${abierto?' show':''}`}>
        <ul className='navbar-nav ms-xl-auto align-items-xl-center gap-1 py-3 py-xl-0'>
          {enlaces.filter(e=>(!e.sesion || estaAutenticado) && (!e.admin || esAdministrador)).map(e=>
            <li className='nav-item' key={e.ruta}><NavLink className={({isActive})=>`nav-link navbar-enlace${isActive?' active':''}`} to={e.ruta} end onClick={()=>setAbierto(false)}>{e.texto}</NavLink></li>
          )}
          {estaAutenticado ? <>
            <li className='nav-item ms-xl-2'><span className='navbar-saludo'>Hola, {usuario?.nombre} <span className='badge text-bg-secondary ms-1'>{usuario?.rol}</span></span></li>
            <li className='nav-item'><button type='button' className='btn navbar-btn-salir' onClick={salir}>Cerrar sesión</button></li>
          </> : <>
            <li className='nav-item'><NavLink className='nav-link navbar-enlace' to='/registro' onClick={()=>setAbierto(false)}>Registrarse</NavLink></li>
            <li className='nav-item ms-xl-2'><NavLink className='btn navbar-btn-login' to='/login' onClick={()=>setAbierto(false)}>Iniciar sesión</NavLink></li>
          </>}
        </ul>
      </div>
    </div>
  </nav>
}
