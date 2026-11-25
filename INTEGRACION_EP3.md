# Happy Paws · Frontend integrado para EP3

## Funcionalidades incorporadas

- Navbar cambia según inicio de sesión y rol; clientes no ven administración.
- Usuario autenticado ve nombre, rol, «Mi cuenta» y «Cerrar sesión».
- Las rutas `/admin`, `/admin/usuarios`, `/admin/servicios`, `/admin/productos` y `/admin/citas` requieren rol `administrador`.
- Un usuario sin sesión es enviado al login; uno con rol incorrecto recibe «Acceso denegado».
- Registro, login, JWT y sesión persistente al recargar. Se revalida contra `/api/auth/me`.
- Página `/admin/usuarios` de CRUD real PostgreSQL (listar, crear, editar, desactivar).
- Página `/mi-cuenta` para actualizar el perfil propio.

## Configurar y ejecutar (Vite)

```powershell
npm ci
Copy-Item .env.example .env.local
# Editar .env.local y colocar VITE_API_URL=http://HOST_BACKEND:3000/api
npm run dev
```

El backend debe estar arrancado con CORS_ORIGINS que incluya **exactamente** el origen del navegador, por ejemplo `http://localhost:5173` para Vite local. Si Vite cambia al puerto 5174, también se debe autorizar ese origen.

**Importante:** las pantallas de catálogo, servicios y citas recibidas están basadas en datos de la EP2 y almacenamiento local. Esta integración NO convierte automáticamente esos módulos en persistencia PostgreSQL; para la entrega integral aún falta conectarlos con sus endpoints reales y desarrollar reglas de reserva de citas (409).

## Seguridad de sesión

El JWT está en `localStorage` para cumplir persistencia tras recargar, lo que lo expone al riesgo XSS. Usar HTTPS real y una política CSP apropiada en producción; una cookie HttpOnly segura requiere cambios coordinados de backend/frontend. Nunca añadir JWT al repositorio.
