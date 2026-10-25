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
- El catálogo público es de consulta; la gestión CRUD está disponible solo en
  `/admin/productos`.
- Emojis visuales según la categoría del producto.
- Crear, editar y eliminar productos desde el panel administrativo.
- Confirmación visual antes de agregar, guardar cambios o eliminar.
- Persistencia de datos en `localStorage`.
- Categorías veterinarias mediante selector.
- Búsqueda por nombre, principio activo y especie.
- Filtro por categoría.
- Vista de detalle para cada producto.

### Servicios

- Listado de servicios veterinarios.
- Emojis visuales según la categoría del servicio.
- Filtro por categoría.
- Página de categorías.
- Vista de detalle para cada servicio.
- Solicitud de citas con validación, resultado y resumen.
- Consulta de mis citas.
- Panel protegido para administrar servicios y estados de citas.

### Página de inicio

- Sección de productos destacados obtenida desde `ProductosContext`.
- La sección muestra tres productos del catálogo y enlaza al detalle y al
  catálogo completo.

### Registro y navegación

- Formulario de registro con validaciones y persistencia local.
- Validaciones aisladas en funciones puras para campos obligatorios, correo,
  contraseña y confirmación.
- Inicio de sesión con mensajes de error visibles.
- Sesión persistente mientras exista una cuenta autenticada.
- Protección de la ruta administrativa y cierre de sesión.
- Navegación entre inicio, servicios, categorías, productos y registro.

## Rutas principales

- `/`: inicio de sesión.
- `/registro`: registro de cliente.
- `/inicio`: página de inicio.
- `/servicios`: catálogo de servicios y filtro por categoría.
- `/servicios/:id`: detalle de un servicio.
- `/cita`: redirección compatible al formulario de solicitud.
- `/solicitar-cita`: formulario para solicitar una cita.
- `/cita-resultado`: resultado y resumen de la solicitud.
- `/mis-citas`: citas guardadas en el navegador.
- `/categorias`: categorías de servicios.
- `/productos`: catálogo público, búsqueda, filtros y detalles.
- `/categoria/:nombre`: catálogo filtrado por una categoría.
- `/buscar/:texto`: resultados del catálogo según un texto.
- `/productos/:id`: detalle de un producto.
- `/login`: inicio de sesión.
- `/admin`: dashboard administrativo protegido, con resumen y accesos a los
  módulos.
- `/admin/productos`: CRUD protegido de productos.
- `/admin/servicios`: CRUD administrativo de servicios.
- `/admin/citas`: gestión administrativa de estados de citas.

## Pruebas

La suite contiene 23 pruebas y cubre componentes atómicos, componentes
moleculares, autenticación local, validaciones y las operaciones del servicio
CRUD de productos.

```bash
npm test
npm run test:coverage
```

El informe de cobertura se genera en la carpeta `coverage/`. Esta carpeta es
un resultado generado y está excluida de Git.

## Estructura principal

src/
├── components/
│   ├── atoms/
│   ├── molecules/
│   ├── organisms/
│   └── templates/
├── context/
├── data/
│   └── productos.json
├── pages/
├── services/
│   ├── authService.js
│   ├── citaService.js
│   ├── productoService.js
│   └── servicioService.js
├── test/
├── utils/
├── App.jsx
├── index.css
└── main.jsx

## Material complementario

- [ERS versión 2](./ERS_VERSION_2.md)
- [Documento de cobertura del testing](./COBERTURA_TESTING.md)
- [Bitácora de desarrollo](./BITACORA.md)

Documentos del semestre:

<https://drive.google.com/drive/folders/1sBZz8nqT04jvfUIeWwUNZRod3w3K-RjQ?usp=sharing>

## tabla cobertura

 % Coverage report from v8
----------------------|---------|----------|---------|---------|-------------------
File                  | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s 
----------------------|---------|----------|---------|---------|-------------------
All files             |    97.5 |    77.89 |   96.36 |   97.32 |                   
 components/atoms     |     100 |      100 |     100 |     100 |                   
  CampoTexto.jsx      |     100 |      100 |     100 |     100 |                   
  EtiquetaEspecie.jsx |     100 |      100 |     100 |     100 |                   
 components/molecules |     100 |    68.42 |     100 |     100 |                   
  CampoFormulario.jsx |     100 |      100 |     100 |     100 |                   
  TarjetaServicio.jsx |     100 |    57.14 |     100 |     100 | 8-13,28-57        
 data                 |     100 |      100 |     100 |     100 |                   
  productos.json      |     100 |      100 |     100 |     100 |                   
 services             |   97.87 |       75 |   95.12 |   97.67 |                   
  authService.js      |     100 |      100 |     100 |     100 |                   
  citaService.js      |     100 |    64.28 |     100 |     100 | 31-46             
  productoService.js  |     100 |      100 |     100 |     100 |                   
  servicioService.js  |    91.3 |       50 |   83.33 |    90.9 | 26-29             
 utils                |   94.44 |    83.33 |     100 |   94.44 |                   
  adaptarCatalogo.js  |    87.5 |       70 |     100 |    87.5 | 8                 
  iconosCatalogo.js   |     100 |       75 |     100 |     100 | 28                
  validaciones.js     |     100 |      100 |     100 |     100 |                   
----------------------|---------|----------|---------|---------|-------------------
