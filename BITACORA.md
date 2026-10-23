# Bitácora de desarrollo - Happy Paws

# ERRORES DE CREACION

Al inicio de este proyecto, tuvimos algunas complicaciones que involucraban
El inicio de sesión al servidor, lanzando errores de puerto y algunos commits
que se asociaban a un usuario aparte del creador de dicho cambio.

## Propósito

Esta es una aplicación React para una
veterinaria y tienda de productos para mascotas.

Este documento registra las implementaciones, validaciones y problemas
encontrados durante el desarrollo de Happy Paws.


## Estado base

- Proyecto construido con React y Vite.
- Navegación implementada con React Router.
- Interfaz basada en componentes atómicos, moléculas, organismos y templates.
- Catálogo adaptado desde `src/data/productos.json`.
- Persistencia local mediante `localStorage`.

## IMPLEMENTACIONES REALIZADAS

### Catálogo y CRUD de productos

- Se creó el service de productos con operaciones listar, obtener, crear,
  actualizar y eliminar.
- Se conectó el service con un Context de React.
- Se agregó formulario para crear y editar productos.
- Se agregó eliminación con confirmación visual.
- Se incorporó un selector de categorías veterinarias.
- Se agregaron búsqueda por nombre, principio activo y especie, además de
  filtro por categoría.
- Se agregó la vista de detalle de producto.

### Servicios y navegación

- Se agregaron páginas de categorías de servicios.
- Se agregó detalle individual de servicios.
- Se incorporó filtro de servicios por categoría.
- Se conectaron las rutas principales de inicio, servicios, categorías,
  productos, detalles y registro.

### Flujo principal de solicitud de cita

- Se creó el formulario de solicitud de cita en `/cita`.
- Se puede seleccionar servicio, mascota, especie, fecha, hora y motivo.
- El formulario valida los datos sin utilizar `alert()`.
- Se agregó una pantalla de confirmación con resumen.
- Se agregó pantalla de éxito después de confirmar.
- Se agregó pantalla de error para problemas de validación o guardado.
- La última solicitud se guarda en `localStorage`.
- Las tarjetas de servicio pueden abrir la cita con el servicio preseleccionado.

### Panel de administración

- Se agregó la ruta `/admin` para identificar explícitamente la gestión interna
  del catálogo.
- El panel reutiliza el Context, service, formulario, confirmaciones y lista de
  productos existentes.
- Permite listar, crear, editar y eliminar productos sin duplicar la lógica CRUD.

### Autenticación y protección administrativa

- Se creó `authService` para registrar usuarios, iniciar sesión y cerrar sesión
  usando `localStorage`.
- Se agregó `AuthProvider` y `useAuth` para mantener la sesión en la aplicación.
- Se implementó la pantalla `/login` con validaciones y mensajes visibles.
- Se conectó el formulario de registro con la persistencia local y la validación
  de correo.
- Se protegió `/admin`; los usuarios no autenticados son enviados a `/login`.
- Se agregó cierre de sesión desde la barra de navegación.
- Esta autenticación es local y educativa; no reemplaza un backend ni almacena
  credenciales de producción de forma segura.

### Revisión según guía de hooks, formularios y navegación

- Se separaron las reglas de validación en `src/utils/validaciones.js`; son
  funciones puras y no utilizan estado ni elementos de la interfaz.
- Los formularios siguen siendo controlados por React, cancelan la recarga con
  `preventDefault()` y muestran los errores junto al campo correspondiente.
- La confirmación de contraseña ya no se persiste como parte de la cuenta.
- Se agregaron las rutas parametrizadas `/categoria/:nombre` y
  `/buscar/:texto`, leídas mediante `useParams`, manteniendo compatibilidad con
  los filtros existentes por query parameters.
- Los detalles de productos y servicios convierten y validan los parámetros
  antes de buscar el registro correspondiente.

### Pruebas y cobertura

- Se configuró Vitest con entorno `jsdom`.
- Se incorporó React Testing Library y `jest-dom`.
- Se agregaron pruebas para átomos, moléculas y el service CRUD.
- Se llegó a 17 pruebas aprobadas.
- Se configuraron los comandos:

  ```bash
  npm run test:run
  npm run test:cov
  ```

- Se mantiene compatibilidad con:

  ```bash
  npm test
  npm run test:coverage
  ```

- El informe de cobertura HTML se genera en `coverage/index.html`.
- La carpeta `coverage` está excluida mediante `.gitignore`.

### Documentación de la Semana 10

- Se creó `ERS_VERSION_2.md` con alcance, usuarios, requisitos funcionales,
  requisitos no funcionales, rutas y criterios de aceptación.
- Se creó `COBERTURA_TESTING.md` con herramientas, comandos, casos cubiertos,
  métricas y límites conocidos de la suite.
- El reporte HTML se genera en `coverage/index.html` y no se versiona.

## ERRORES ENCONTRADOS Y SOLUCIONES

### Advertencia de Fast Refresh

El lint informaba que `ProductosContext.jsx` exportaba en el mismo archivo un
componente, el contexto y un hook. Esto impedía que Fast Refresh aplicara su
regla recomendada.

Solución:

- Se separó el contexto en `ProductosContext.js`.
- Se separó el provider en `ProductosProvider.jsx`.
- Se separó el hook en `useProductos.js`.
- Se actualizaron los imports de las páginas.

### Provider no conectado

Durante la revisión se detectó que `ProductosProvider` no estaba montado en
`main.jsx`, aunque las páginas utilizaban `useProductos`.

Solución:

- Se envolvió `<App />` con `<ProductosProvider>` en `main.jsx`.

### Error de resolución durante el build

Al separar los archivos del Context, Vite resolvió el import sin extensión
hacia `ProductosContext.js` y no encontró `ProductosProvider`.

Solución:

- Se actualizó `main.jsx` para importar explícitamente el provider desde
  `./context/ProductosProvider`.

## Validaciones ejecutadas

Las validaciones realizadas antes de este registro fueron:

```text
npm run test:run       10 pruebas aprobadas
npm run test:cov       cobertura generada correctamente
npm run build          compilación correcta
npm run lint           sin warnings
git diff --check       sin errores de formato
```

## Próximos pasos

- Revisar y completar el flujo de error del caso.
- Mantener la bitácora actualizada en cada cambio relevante.
