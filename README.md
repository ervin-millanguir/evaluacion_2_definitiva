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
npm run test:coverage
```

- `npm run dev`: inicia el servidor de desarrollo.
- `npm run build`: genera la versión de producción.
- `npm run preview`: sirve localmente la compilación de producción.
- `npm run lint`: revisa problemas de estilo y código.
- `npm test`: ejecuta las pruebas unitarias.
- `npm run test:coverage`: ejecuta las pruebas y genera el informe HTML en
  `coverage/index.html`.

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

### Registro y navegación

- Formulario de registro con validaciones.
- Navegación entre inicio, servicios, categorías, productos y registro.

## Rutas principales

- `/`: registro.
- `/inicio`: página de inicio.
- `/servicios`: catálogo de servicios y filtro por categoría.
- `/servicios/:id`: detalle de un servicio.
- `/categorias`: categorías de servicios.
- `/productos`: catálogo, CRUD, búsqueda y filtros.
- `/productos/:id`: detalle de un producto.

## Pruebas

Las pruebas cubren componentes atómicos, componentes moleculares y las
operaciones del servicio CRUD de productos.

```bash
npm test
npm run test:coverage
```

El informe de cobertura se genera en la carpeta `coverage/`. Esta carpeta es
un resultado generado y está excluida de Git.

## Estructura principal

```text
src/
├── components/
│   ├── atoms/
│   ├── molecules/
│   ├── organisms/
│   └── templates/
├── context/
├── data/
├── pages/
├── services/
├── test/
└── utils/
```

## Material complementario

Documentos del semestre:

<https://drive.google.com/drive/folders/1sBZz8nqT04jvfUIeWwUNZRod3w3K-RjQ?usp=sharing>
