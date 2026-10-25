# Especificación de Requisitos de Software - Versión 2

## 1. Identificación

**Sistema:** Happy Paws  
**Tipo:** Aplicación web para veterinaria y tienda de productos para mascotas  
**Versión:** 2.0  
**Tecnologías:** React, Vite, React Router, Bootstrap y Vitest

## 2. Objetivo

Happy Paws permite a clientes consultar servicios veterinarios, revisar
productos para mascotas, solicitar citas y crear una cuenta. También entrega
un panel administrativo para gestionar el catálogo mediante operaciones CRUD.

## 3. Alcance

La versión 2 incluye:

- Navegación entre páginas sin recarga completa.
- Registro e inicio de sesión con validaciones en React.
- Solicitud de citas con confirmación, resumen y resultado.
- Catálogo de productos con búsqueda y filtros.
- Panel administrativo para crear, consultar, editar y eliminar productos.
- Persistencia local para usuarios, sesión, productos y última cita.
- Pruebas unitarias y reporte de cobertura.

La autenticación actual es local y educativa. No reemplaza un backend, una
base de datos ni un mecanismo seguro para producción.

## 4. Usuarios

### Cliente

Puede:

- Registrarse.
- Iniciar y cerrar sesión.
- Consultar servicios y productos.
- Filtrar productos.
- Revisar detalles.
- Solicitar una cita.

### Administrador

Puede acceder al panel administrativo después de iniciar sesión y:

- Listar productos.
- Crear productos.
- Editar productos.
- Eliminar productos con confirmación.

## 5. Requisitos funcionales

### RF-01: Registro

El sistema debe permitir registrar nombre, apellido, RUT, correo, teléfono,
contraseña y confirmación de contraseña.

Reglas:

- Los campos obligatorios no pueden estar vacíos.
- El correo debe tener un formato válido.
- La contraseña debe tener al menos seis caracteres.
- La confirmación debe coincidir con la contraseña.
- No se permite registrar un correo duplicado.
- La confirmación de contraseña no se debe guardar como credencial.

### RF-02: Inicio de sesión

El sistema debe permitir iniciar sesión con correo y contraseña registrados.

- Las credenciales inválidas deben mostrar un mensaje visible.
- El sistema no debe utilizar `alert()`.
- La sesión se debe conservar en `localStorage`.
- La sesión debe excluir la contraseña.

### RF-03: Cierre de sesión

El usuario autenticado debe poder cerrar sesión desde la navegación principal.
Al cerrar sesión, se debe eliminar la sesión almacenada.

### RF-04: Protección administrativa

La ruta `/admin` debe redirigir a `/login` cuando no existe una sesión
autenticada. Después de iniciar sesión, el usuario debe volver a la ruta que
intentaba visitar.

### RF-05: Catálogo público

El sistema debe mostrar productos veterinarios y permitir:

- Buscar por nombre, principio activo o especie.
- Filtrar por categoría.
- Consultar el detalle de un producto.
- Utilizar las rutas `/categoria/:nombre` y `/buscar/:texto`.

### RF-06: Gestión administrativa de productos

El módulo `/admin/productos` debe permitir:

- Crear un producto.
- Editar un producto existente.
- Eliminar un producto.
- Confirmar visualmente las operaciones de escritura y eliminación.
- Mantener los datos mediante el service y el Context de productos.

### RF-07: Servicios veterinarios

El sistema debe mostrar servicios, permitir filtrarlos por categoría y
consultar el detalle de un servicio.

### RF-08: Solicitud de cita

El sistema debe permitir ingresar:

- Servicio.
- Nombre de la mascota.
- Especie.
- Fecha.
- Hora.
- Motivo de la consulta.

El flujo debe incluir:

1. Formulario controlado.
2. Validación de datos.
3. Pantalla de confirmación.
4. Resumen de la solicitud.
5. Pantalla de éxito.
6. Pantalla de error cuando la solicitud no se puede guardar.

La última solicitud se guarda en `localStorage`.

## 6. Requisitos no funcionales

### RNF-01: Usabilidad

Los errores deben aparecer junto al campo correspondiente y ser comprensibles
para el usuario.

### RNF-02: Accesibilidad básica

Los campos deben tener etiquetas asociadas, estados inválidos y mensajes
identificables mediante atributos de accesibilidad.

### RNF-03: Navegación

React Router debe cambiar las vistas sin recargar la página completa. Los
parámetros de las rutas deben leerse con `useParams`.

### RNF-04: Arquitectura

Los componentes deben respetar la separación por átomos, moléculas,
organismos, templates y páginas. Los hooks deben declararse en el nivel
superior de componentes o de otros hooks.

### RNF-05: Calidad

El proyecto debe pasar:

```bash
npm run test:run
npm run build
npm run lint
git diff --check
```

## 7. Rutas principales

| Ruta | Descripción |
|---|---|
| `/` | Inicio de sesión |
| `/registro` | Registro de cliente |
| `/login` | Inicio de sesión |
| `/inicio` | Página principal |
| `/servicios` | Catálogo de servicios |
| `/servicios/:id` | Detalle de servicio |
| `/cita` | Solicitud de cita |
| `/categorias` | Categorías de servicios |
| `/productos` | Catálogo público |
| `/productos/:id` | Detalle de producto |
| `/categoria/:nombre` | Productos de una categoría |
| `/buscar/:texto` | Resultados de búsqueda |
| `/admin` | Dashboard protegido de administración |
| `/admin/productos` | Gestión protegida de productos |
| `/admin/servicios` | Gestión protegida de servicios |
| `/admin/citas` | Gestión protegida de citas |

## 8. Persistencia local

| Clave | Contenido |
|---|---|
| `usuarios` | Usuarios registrados |
| `sesionActual` | Usuario autenticado sin contraseña |
| `productos` | Productos creados o modificados |
| `ultimaCita` | Última solicitud de cita |

## 9. Criterios de aceptación

- El registro válido muestra confirmación y permite iniciar sesión.
- El registro inválido muestra errores sin recargar la página.
- Un correo duplicado es rechazado.
- El login válido crea una sesión y permite acceder a `/admin`.
- El login inválido muestra un error visible.
- Un usuario no autenticado no puede permanecer en `/admin`.
- El CRUD modifica el catálogo y conserva los cambios.
- La solicitud de cita permite confirmar y guardar los datos.
- Las pruebas automatizadas pasan antes de entregar la versión.
