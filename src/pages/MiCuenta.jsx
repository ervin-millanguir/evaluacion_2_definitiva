import { useState } from 'react'
import useAuth from '../context/useAuth'
import { modificarUsuario } from '../services/authService'
export default function MiCuenta() {
 const {usuario,actualizarUsuarioLocal}=useAuth()
 const [datos,setDatos]=useState({nombre:usuario?.nombre||'',apellido:usuario?.apellido||'',correo:usuario?.correo||''})
 const [mensaje,setMensaje]=useState(''), [error,setError]=useState('')
 async function guardar(e) {
   e.preventDefault();setError('');setMensaje('')
   try {const actualizado=await modificarUsuario(usuario.id,datos);actualizarUsuarioLocal(actualizado);setMensaje('Perfil actualizado en PostgreSQL')}
   catch(err){setError(err.response?.data?.mensaje || 'No fue posible guardar')}
 }
 return <div className='card card-body shadow-sm' style={{maxWidth:650}}><h1 className='h3'>Mi cuenta</h1>
   <p>Sesión activa: <strong>{usuario?.rol}</strong></p>
   {error&&<div className='alert alert-danger'>{error}</div>}{mensaje&&<div className='alert alert-success'>{mensaje}</div>}
   <form onSubmit={guardar}>{['nombre','apellido','correo'].map(c=><div className='mb-3' key={c}>
     <label htmlFor={'mi-'+c} className='form-label text-capitalize'>{c}</label>
     <input className='form-control' id={'mi-'+c} type={c==='correo'?'email':'text'} required value={datos[c]} onChange={e=>setDatos(d=>({...d,[c]:e.target.value}))}/>
   </div>)}<button className='btn btn-success'>Actualizar mi cuenta</button></form>
 </div>
}
