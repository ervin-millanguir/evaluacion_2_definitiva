import { useCallback, useEffect, useState } from 'react'
import PlantillaAdmin from '../components/templates/PlantillaAdmin'
import { listarUsuarios, crearUsuarioAdmin, modificarUsuario, desactivarUsuario } from '../services/authService'
const roles=['administrador','recepcionista','dueno_mascota']
const vacio={nombre:'',apellido:'',correo:'',contrasena:'',rol:'dueno_mascota'}
export default function AdminUsuarios() {
  const [usuarios,setUsuarios]=useState([])
  const [nuevo,setNuevo]=useState(vacio)
  const [edicion,setEdicion]=useState(null)
  const [mensaje,setMensaje]=useState('')
  const [error,setError]=useState('')
  const [cargando,setCargando]=useState(false)
  const cargar=useCallback(async()=>{
    try {setUsuarios(await listarUsuarios());setError('')} catch(e){setError(e.response?.data?.mensaje || 'No se pudo cargar desde PostgreSQL')}
  },[])
  useEffect(()=>{cargar()},[cargar])
  function cambiar(event,setter) {const {name,value}=event.target;setter(ant=>({...ant,[name]:value}))}
  async function accion(fn,mensajeExito) {
    setCargando(true);setError('');setMensaje('')
    try {await fn();setMensaje(mensajeExito);await cargar();return true}
    catch(e){setError(e.response?.data?.mensaje || 'Error de conexión con la API');return false}
    finally {setCargando(false)}
  }
  async function crear(e) {
    e.preventDefault()
    if(await accion(()=>crearUsuarioAdmin(nuevo),'Usuario creado en PostgreSQL')) setNuevo(vacio)
  }
  async function editar(e) {
    e.preventDefault()
    if(await accion(()=>modificarUsuario(edicion.id,{nombre:edicion.nombre,apellido:edicion.apellido,
      correo:edicion.correo,rol:edicion.rol,activo:edicion.activo}),'Usuario actualizado')) setEdicion(null)
  }
  async function desactivar(u) {
    if(!window.confirm(`¿Desactivar la cuenta de ${u.nombre} (${u.correo})?`)) return
    await accion(()=>desactivarUsuario(u.id),'Cuenta desactivada (baja lógica)')
  }
  const campos=(data,setter,esEdicion=false)=><div className='row g-2'>
    {['nombre','apellido','correo'].map(k=><div className='col-12 col-md-4' key={k}>
      <label className='form-label text-capitalize' htmlFor={(esEdicion?'editar-':'nuevo-')+k}>{k}</label>
      <input className='form-control' id={(esEdicion?'editar-':'nuevo-')+k} name={k} type={k==='correo'?'email':'text'} required minLength={k==='correo'?5:2} value={data[k]} onChange={e=>cambiar(e,setter)}/>
    </div>)}
    {!esEdicion && <div className='col-12 col-md-5'>
      <label className='form-label' htmlFor='nuevo-contrasena'>Contraseña inicial (8 caracteres mínimo)</label>
      <input className='form-control' type='password' id='nuevo-contrasena' name='contrasena' required minLength={8} value={data.contrasena} onChange={e=>cambiar(e,setter)}/>
    </div>}
    <div className='col-12 col-md-4'><label className='form-label' htmlFor={(esEdicion?'editar-':'nuevo-')+'rol'}>Rol</label>
      <select className='form-select' id={(esEdicion?'editar-':'nuevo-')+'rol'} name='rol' value={data.rol} onChange={e=>cambiar(e,setter)}>{roles.map(r=><option key={r}>{r}</option>)}</select>
    </div>
    {esEdicion && <div className='col-12 col-md-3'><label className='form-label' htmlFor='editar-activo'>Estado</label>
      <select className='form-select' id='editar-activo' value={String(data.activo)} onChange={e=>setter(a=>({...a,activo:e.target.value==='true'}))}>
        <option value='true'>Activo</option><option value='false'>Inactivo</option>
      </select>
    </div>}
  </div>
  return <PlantillaAdmin>
    <div className='d-flex flex-wrap justify-content-between align-items-center gap-2 mb-3'><div>
      <h1 className='h2'>Administración de usuarios</h1><p className='text-muted'>CRUD real: Node.js, JWT y PostgreSQL. Solo ADMINISTRADOR.</p>
    </div><button type='button' className='btn btn-outline-success' onClick={cargar}>Actualizar lista</button></div>
    {error && <div className='alert alert-danger' role='alert'>{error}</div>}
    {mensaje && <div className='alert alert-success' role='status'>{mensaje}</div>}
    <section className='card card-body mb-4 shadow-sm'><h2 className='h4'>Crear usuario</h2>
      <form onSubmit={crear}>{campos(nuevo,setNuevo)}<button type='submit' disabled={cargando} className='btn btn-success mt-3'>Crear usuario</button></form>
    </section>
    {edicion && <section className='card card-body mb-4 border-primary' aria-label='Editar usuario'>
      <h2 className='h4'>Editar usuario #{edicion.id}</h2><form onSubmit={editar}>{campos(edicion,setEdicion,true)}
        <div className='d-flex gap-2 mt-3'><button disabled={cargando} className='btn btn-primary' type='submit'>Guardar cambios</button>
          <button className='btn btn-outline-secondary' type='button' onClick={()=>setEdicion(null)}>Cancelar</button></div></form>
    </section>}
    <h2 className='h4'>Usuarios de PostgreSQL ({usuarios.length})</h2>
    <div className='table-responsive'><table className='table table-striped table-bordered align-middle'>
      <thead><tr><th>ID</th><th>Nombre</th><th>Correo</th><th>Rol</th><th>Estado</th><th>Acciones</th></tr></thead>
      <tbody>{usuarios.map(u=><tr key={u.id}><td>{u.id}</td><td>{u.nombre} {u.apellido}</td><td>{u.correo}</td>
        <td>{u.rol}</td><td>{u.activo?'Activo':'Inactivo'}</td><td>
          <button type='button' className='btn btn-sm btn-outline-primary me-2' disabled={cargando} onClick={()=>{setEdicion({...u});setMensaje('')}}>Editar</button>
          <button type='button' className='btn btn-sm btn-outline-danger' disabled={cargando || !u.activo} onClick={()=>desactivar(u)}>Desactivar</button>
        </td></tr>)}</tbody>
    </table></div>
  </PlantillaAdmin>
}
