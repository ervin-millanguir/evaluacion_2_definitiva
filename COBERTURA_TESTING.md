# Documento de cobertura del testing

## 1. Objetivo

Este documento registra las pruebas automatizadas de Happy Paws y explica qué
comportamientos se verifican, cómo se ejecuta la cobertura y qué límites tiene
el conjunto actual de pruebas.

## 2. Herramientas y versiones

Las versiones corresponden a las dependencias declaradas en
[`package.json`](./package.json):

| Herramienta | Versión declarada | Uso |
|---|---:|---|
| Vitest | `^5.0.5` | Framework y runner de pruebas |
| React Testing Library | `^16.3.3` | Renderizado e interacción con componentes |
| jsdom | `^30.1.3` | Simulación del navegador |
| `@testing-library/jest-dom` | `^7.0.1` | Matchers para el DOM |
| `@vitest/coverage-v8` | `^5.0.5` | Generación de cobertura mediante V8 |

Vitest funciona como framework y corredor: organiza los casos `describe`/`it`,
ejecuta el código y presenta los resultados.

## 3. Comandos

Para ejecutar las pruebas sin generar cobertura:

```bash
npm run test:run
```

Para ejecutar las pruebas y generar el reporte:

```bash
npm run test:cov
```

El reporte HTML se genera en:

```text
coverage/index.html
```

La carpeta `coverage/` es un resultado generado y está excluida de Git.

## 4. Resultado de la ejecución

Salida validada con `npm run test:cov`:

```text
Test Files  9 passed (9)
Tests       23 passed (23)

Statements   : 99.11% (112/113)
Branches     : 87.01% (67/77)
Functions    : 100% (51/51)
Lines        : 99.03% (103/104)
```

Las ramas no cubiertas corresponden a casos defensivos de persistencia:
`src/utils/adaptarCatalogo.js` (línea 7), `src/services/citaService.js`
(líneas 31-46) y `src/services/servicioService.js` (línea 40). La suite sí
valida los caminos principales de creación, consulta, actualización y
eliminación.

## 5. Casos cubiertos

| Archivo | Casos | Comportamientos |
|---|---:|---|
| `src/components/atoms/CampoTexto.test.jsx` | 1 | Renderizado, valor controlado y cambio |
| `src/components/atoms/EtiquetaEspecie.test.jsx` | 1 | Renderizado de especie |
| `src/components/molecules/CampoFormulario.test.jsx` | 1 | Campo, etiqueta y error visible |
| `src/services/productoService.test.js` | 7 | Listar, obtener, crear, actualizar, eliminar e IDs inexistentes |
| `src/services/authService.test.js` | 4 | Registro, duplicados, login, credenciales inválidas y cierre |
| `src/utils/validaciones.test.js` | 3 | Obligatorios, correo, contraseña y confirmación |
| `src/services/servicioService.test.js` | 2 | Listar, crear, actualizar y eliminar servicios |
| `src/services/citaService.test.js` | 2 | Crear citas, listar y actualizar estados |
| `src/utils/iconosCatalogo.test.js` | 1 | Emojis de categorías conocidas y valor predeterminado |
| **Total** | **23** | **Servicios, validaciones y componentes seleccionados** |

## 6. Métricas

Las métricas se obtienen directamente desde el reporte de Vitest:

- **Statements:** instrucciones ejecutadas.
- **Branches:** ramas condicionales evaluadas.
- **Functions:** funciones ejecutadas.
- **Lines:** líneas ejecutadas.

### Resumen de esta versión

| Métrica | Resultado |
|---|---:|
| Statements | 99.11% (112/113) |
| Branches | 87.01% (67/77) |
| Functions | 100% (51/51) |
| Lines | 99.03% (103/104) |

La evidencia final debe incluir una captura de la salida de la terminal
producida por `npm run test:cov` y, si se requiere mayor detalle, una captura
de `coverage/index.html`.

## 7. Límites de cobertura

La suite actual prioriza:

- Reglas puras de validación.
- Persistencia y operaciones de servicios.
- Componentes atómicos y moleculares.

No se cubren completamente mediante pruebas de interfaz:

- El flujo completo de `Login` con navegación real.
- Todas las interacciones del panel `/admin`.
- El recorrido completo de solicitud de cita.
- Todas las páginas y rutas en un navegador real.
- Integración con un backend, porque la aplicación usa `localStorage`.

Estas áreas pueden incorporarse posteriormente con pruebas de componentes,
`MemoryRouter` y pruebas de integración. Una cobertura alta no garantiza por sí
sola la ausencia de errores: también es necesario revisar la calidad de las
aserciones y los flujos funcionales.
