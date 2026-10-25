# Happy Paws

Aplicación web para una veterinaria y tienda de productos para mascotas.

## Integrantes

- Camilo Alegria
- Ervin Millanguir

## Tecnologías

- React
- Vite
- React Router
- Bootstrap
- Vitest
- React Testing Library

## Requisitos

- Node.js y npm instalados.

## Instalación y ejecución

Desde la carpeta del proyecto:

```bash
npm install
npm run dev
```

La aplicación estará disponible en la dirección que muestre Vite, normalmente
`http://localhost:5173`.

## Comandos disponibles

```bash
npm run dev
npm run build
npm run preview
npm run lint
npm test
npm run test:run
npm run test:coverage
npm run test:cov
```

- `npm run dev`: inicia el servidor de desarrollo.
- `npm run build`: genera la versión de producción.
- `npm run preview`: sirve localmente la compilación de producción.
- `npm run lint`: revisa problemas de estilo y código.
- `npm test` y `npm run test:run`: ejecutan las pruebas unitarias en modo único.
- `npm run test:coverage` y `npm run test:cov`: ejecutan las pruebas y generan el informe HTML en
  `coverage/index.html`.

Antes de abrir un Pull Request, ejecuta `npm run test:run` para comprobar que
la suite completa pase.

## Funcionalidades

### Catálogo de productos

- Listado de productos veterinarios.
- Crear, editar y eliminar productos.
- Confirmación visual antes de agregar, guardar cambios o eliminar.
- Persistencia de datos en `localStorage`.
- Categorías veterinarias mediante selector.
- Búsqueda por nombre, principio activo y especie.
- Filtro por categoría.
- Vista de detalle para cada producto.

### Servicios

- Listado de servicios veterinarios.
- Filtro por categoría.
- Página de categorías.
- Vista de detalle para cada servicio.
- Solicitud de citas con confirmación y resumen.

### Registro y navegación

- Formulario de registro con validaciones y persistencia local.
- Validaciones aisladas en funciones puras para campos obligatorios, correo,
  contraseña y confirmación.
- Inicio de sesión con mensajes de error visibles.
- Sesión persistente mientras exista una cuenta autenticada.
- Protección de la ruta administrativa y cierre de sesión.
- Navegación entre inicio, servicios, categorías, productos y registro.

## Rutas principales

- `/`: registro.
- `/inicio`: página de inicio.
- `/servicios`: catálogo de servicios y filtro por categoría.
- `/servicios/:id`: detalle de un servicio.
- `/cita`: formulario para solicitar una cita.
- `/categorias`: categorías de servicios.
- `/productos`: catálogo, CRUD, búsqueda y filtros.
- `/categoria/:nombre`: catálogo filtrado por una categoría.
- `/buscar/:texto`: resultados del catálogo según un texto.
- `/productos/:id`: detalle de un producto.
- `/login`: inicio de sesión.
- `/admin`: panel protegido de administración del catálogo.

## Pruebas

La suite contiene 14 pruebas y cubre componentes atómicos, componentes
moleculares, autenticación local y las operaciones del servicio CRUD de
productos.

```bash
npm test
npm run test:coverage
```

El informe de cobertura se genera en la carpeta `coverage/`. Esta carpeta es
un resultado generado y está excluida de Git.

## Estructura principal

src/
├── assets/
│   ├── hero.png
│   ├── react.svg
│   └── vite.svg
├── components/
│   ├── atoms/
│   │   ├── Boton.jsx
│   │   ├── CampoTexto.jsx
│   │   ├── CampoTexto.test.jsx
│   │   ├── EtiquetaEspecie.jsx
│   │   ├── EtiquetaEspecie.test.jsx
│   │   ├── EtiquetaEstadoCita.jsx
│   │   ├── Icono.jsx
│   │   └── Selector.jsx
│   ├── molecules/
│   │   ├── BuscadorServicios.jsx
│   │   ├── CampoFormulario.jsx
│   │   ├── CampoFormulario.test.jsx
│   │   ├── FilaCita.jsx
│   │   ├── SelectorFechaHora.jsx
│   │   ├── TarjetaProducto.jsx
│   │   └── TarjetaServicio.jsx
│   ├── organisms/
│   │   ├── Footer.jsx
│   │   ├── FormularioProducto.jsx
│   │   ├── FormularioRegistro.jsx
│   │   ├── FormularioServicio.jsx
│   │   ├── FormularioSolicitudCita.jsx
│   │   ├── ListaMisCitas.jsx
│   │   ├── ListaProductos.jsx
│   │   ├── ListaServicios.jsx
│   │   ├── Navbar.jsx
│   │   ├── RutaProtegida.jsx
│   │   └── TablaCitas.jsx
│   └── templates/
│       ├── PlantillaAdmin.jsx
│       └── PlantillaPublica.jsx
├── context/
│   ├── AuthContext.js
│   ├── AuthProvider.jsx
│   ├── ProductosContext.js
│   ├── ProductosContext.jsx
│   ├── ProductosProvider.jsx
│   ├── useAuth.js
│   └── useProductos.js
├── data/
│   └── productos.json
├── pages/
│   ├── AdminCitas.jsx
│   ├── AdminServicios.jsx
│   ├── Categorias.jsx
│   ├── Cita.jsx
│   ├── CitaResultado.jsx
│   ├── DetalleProducto.jsx
│   ├── DetalleServicio.jsx
│   ├── Inicio.jsx
│   ├── Login.jsx
│   ├── MisCitas.jsx
│   ├── Productos.jsx
│   ├── Registro.jsx
│   ├── Servicios.jsx
│   └── SolicitarCita.jsx
├── services/
│   ├── authService.js
│   ├── authService.test.js
│   ├── citaService.js
│   ├── productoService.js
│   ├── productoService.test.js
│   └── servicioService.js
├── test/
│   └── setup.js
├── utils/
│   ├── adaptarCatalogo.js
│   ├── validaciones.js
│   └── validaciones.test.js
├── App.css
├── App.jsx
├── index.css
└── main.jsx

## Material complementario

- [ERS versión 2](./ERS_VERSION_2.md)
- [Documento de cobertura del testing](./COBERTURA_TESTING.md)
- [Bitácora de desarrollo](./BITACORA.md)

Documentos del semestre:

<https://drive.google.com/drive/folders/1sBZz8nqT04jvfUIeWwUNZRod3w3K-RjQ?usp=sharing>
