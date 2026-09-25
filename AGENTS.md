# AGENTS.md — Cotizador GoLease

> **Propósito:** Documento "cerebro compartido" para agentes de IA (Cline, Kilo Code, OpenCode) que trabajen en este repositorio. Cualquier agente debe poder leerlo en 2 minutos y entender el proyecto.

## 1. Descripción del proyecto

**Cotizador de arrendamiento vehicular para GoLease MX** — aplicación web SPA que permite a vendedores generar cotizaciones de arrendamiento puro (leasing) con 3 opciones de valor residual, exportarlas a PDF y gestionar su historial. Incluye un panel de administración para super-admin y socios.

### Stack tecnológico

| Capa            | Tecnología                                                   |
| --------------- | ------------------------------------------------------------ |
| Frontend        | Angular 22 (standalone components, Signals)                  |
| Backend         | Supabase (PostgreSQL + Auth + RLS)                           |
| Base de datos   | PostgreSQL (vía Supabase, con políticas RLS)                 |
| ORM/Client      | `@supabase/supabase-js` (no hay ORM en el cliente)           |
| PDF             | `html2canvas` + `jspdf` (renderizado de HTML → canvas → PDF) |
| Tests           | Vitest (vía `ng test`, Angular TestBed)                      |
| Formateo        | Prettier (singleQuote, 100 chars) + EditorConfig             |
| Build           | `@angular/build:application`                                 |
| Routing         | Hash strategy (`withHashLocation`)                           |
| Package manager | npm 11.17.0 (`package-lock.json`)                            |

### Credenciales de acceso

- **Super Admin:** email `golease02@gmail.com`, password `123456` (celular: `4421220799`)
- El login se realiza **por número de celular** (no por email). La app busca el perfil por `seller_number`, obtiene el email interno guardado en `profiles.email` y autentica con ese email.

### Comandos esenciales

```bash
# Instalar dependencias
npm install

# Servidor de desarrollo
npm start          # ng serve → http://localhost:4200

# Build de producción
npm run build      # output en dist/

# Tests unitarios
npm test           # ejecuta Vitest via ng test

# Migraciones de Supabase local (si se usa CLI local)
npx supabase db push
```

> **Economía de recursos:** ejecuta estos comandos solo cuando son imprescindibles para validar un cambio concreto. Por rutina no corras `npm install`, `npm start`, `npm run build` ni `npx supabase db push` (toca la BD remota y pide password). **Los `git add` / `git commit` / `git push` los hace el usuario**; el agente solo propone el mensaje de commit.

## 2. Estructura del proyecto

```
cotizador/
├── src/
│   ├── app/
│   │   ├── app.ts                     # Root component (Header, RouterOutlet, Toast)
│   │   ├── app.routes.ts              # Rutas (hash, con guards)
│   │   ├── app.config.ts              # Config standalone + Router hash
│   │   ├── main.ts                    # Bootstrap
│   │   ├── styles.css                 # Estilos globales (CSS custom properties, dark mode)
│   │   ├── index.html                 # App shell
│   │   ├── models/
│   │   │   └── leasing.model.ts        # Modelos, constantes, lógica de cálculo (PMT, mínimos, etc.)
│   │   ├── services/
│   │   │   ├── supabase-client.ts      # Cliente Supabase singleton + signals de sesión
│   │   │   ├── auth.service.ts         # Auth, perfiles, roles, saneado de datos
│   │   │   ├── financial-calculator.service.ts  # Motor de cálculo (PMT 3 opciones)
│   │   │   ├── quotes.service.ts       # CRUD de cotizaciones
│   │   │   ├── seguimiento.service.ts  # Proceso de cierre (etapas y upsert de seguimiento)
│   │   │   ├── notes.service.ts         # Notas de cotización/vendedor con autor y propiedad
│   │   │   ├── materiales.service.ts     # Materiales del vendedor (guía + pre solicitudes)
│   │   │   ├── catalog.service.ts      # Catálogo de placas + config del cotizador
│   │   │   ├── admin.service.ts        # RPCs de dashboard + fallbacks
│   │   │   ├── pdf-export.service.ts   # Exportación a PDF (lazy load html2canvas/jspdf)
│   │   │   ├── quote-draft.service.ts  # Borrador en sessionStorage (duplicar/editar)
│   │   │   ├── theme.service.ts        # Tema claro/oscuro (localStorage + prefer-media)
│   │   │   └── toast.service.ts        # Notificaciones toast
│   │   ├── guards/
│   │   │   ├── auth.guard.ts           # Requiere sesión activa
│   │   │   ├── admin-guard.ts          # Requiere super_admin | socio activo
│   │   │   └── super-admin-guard.ts    # Requiere super_admin
│   │   ├── utils/
│   │   │   ├── quote-activity.ts       # Última actividad, semáforo y color de cotización
│   │   │   ├── quote-retention.ts      # Retención/purga basada en la última actividad
│   │   │   └── quote-validity.ts       # Vigencia heredada de cotización (7 días)
│   │   ├── components/
│   │   │   ├── auth/                  # Login (por celular), Registro, Recuperar/Reset
│   │   │   ├── cotizador/             # Pantalla principal del cotizador (form + options + breakdown)
│   │   │   ├── quote-form/            # Formulario de datos del vehículo
│   │   │   ├── quote-options/         # 3 tarjetas de opciones de arrendamiento
│   │   │   ├── quote-breakdown/       # Desglose detallado + PDF (NO MODIFICAR)
│   │   │   ├── vendedor/
│   │   │   │   ├── mis-cotizaciones/      # Lista de cotizaciones del vendedor
│   │   │   │   └── material/              # Vista de material del vendedor (guía / pre solicitudes)
│   │   │   ├── admin/                       # Panel de administración:
│   │   │   │   │   ├── admin-dashboard/          # Layout con sidebar + navegación
│   │   │   │   │   ├── admin-stats/              # Métricas del dashboard
│   │   │   │   │   ├── admin-seller-performance/  # Rendimiento por vendedor
│   │   │   │   │   ├── admin-sellers/            # CRUD de vendedores
│   │   │   │   │   ├── admin-admins/             # CRUD de socios (super-admin only)
│   │   │   │   │   ├── admin-seguimiento/        # Lista operativa del proceso de cierre
│   │   │   │   │   ├── admin-plates/             # CRUD de placas por estado
│   │   │   │   │   ├── admin-parameters/         # Configuración del cotizador
│   │   │   │   │   └── admin-materiales/          # Materiales del vendedor (guía + pre solicitudes)
│   │   │   ├── perfil/                # Perfil de usuario
│   │   │   └── header/                # Header + navegación móvil
│   │   └── environments/
│   │   │   ├── environment.ts         # Dev config (Supabase URL + anon key)
│   │   │   └── environment.prod.ts    # Prod config (mismo URL/key)
│   ├── index.html
│   └── styles.css
├── supabase/
│   ├── migrations/                    # Migraciones SQL (timestamps YYYYMMDDHHMMSS)
│   │   ├── 20260910000005_socio_scope_rpcs.sql  # RPCs con scope por socio
│   │   ├── 20260910000009_drop_vehicles_table.sql  # Drop del catálogo `vehicles`
│   │   └── 20260917000000_quote_seguimiento.sql    # Tabla + RLS del módulo Seguimiento
│   ├── audits/
│   │   └── 02_verify_rls.sql          # Checklist de verificación RLS
│   ├── scripts/
│   │   └── seed_datos_prueba.sql      # Seed manual: 3 socios + 15 vendedores + 60 cotizaciones (conserva al super admin; no toca placas ni parámetros)
│   └── config.toml                    # [gitignored] Config local de Supabase CLI
├── package.json / package-lock.json
├── angular.json
├── .prettierrc / .editorconfig
├── .gitignore
└── AGENTS.md                          # ← este archivo
```

### Asignación de código a responsabilidades

| Responsabilidad                       | Archivo(s) clave                                                                |
| ------------------------------------- | ------------------------------------------------------------------------------- |
| Lógica del cotizador                  | `financial-calculator.service.ts`, `leasing.model.ts`                           |
| Generación de PDF                     | `pdf-export.service.ts` + `quote-breakdown.component.html` (NO MODIFICAR)       |
| Autenticación                         | `auth.service.ts`, `login.ts`, `register.ts`                                    |
| Roles y permisos                      | Guards (`auth`, `admin`, `super-admin`) + `auth.service.ts` (`canAccessModule`) |
| CRUDs de admin                        | `components/admin/admin-*/`                                                     |
| Dashboard                             | `components/admin/admin-stats/`, `admin-dashboard/`                             |
| Registro de vendedor                  | `components/auth/register/register.ts`                                          |
| Catálogo de placas / config cotizador | `catalog.service.ts`, `admin-plates/`, `admin-parameters/`                      |
| Estado/actividad de cotizaciones       | `utils/quote-activity.ts`, `quote-validity.ts`, `quote-retention.ts`                      |
| Seguimiento (proceso de cierre)       | `seguimiento.service.ts`, `admin-seguimiento/`                                  |

## 3. Roles y permisos

### Modelo de roles (`profiles.role`)

| Rol           | Descripción                                                                                                                                                                                                                                                            |
| ------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `super_admin` | Acceso total. Ve todas las cotizaciones de todos los vendedores. Puede crear/eliminar cualquier usuario, asignar roles, cambiar socio de un vendedor, y otorgar permisos granulares.                                                                                   |
| `socio`       | Ve solo sus vendedores asociados (vía `socio_id`). **Dashboard y Rendimiento son su panel principal** (inherentes al rol, no son permisos JSON). Los demás módulos se controlan vía `permisos` JSONB otorgados por el super-admin. Puede crear vendedores bajo su red. |
| `seller`      | Solo ve y crea sus propias cotizaciones. No accede al panel admin.                                                                                                                                                                                                     |

#### Acceso por pantalla

| Pantalla                                        | Super Admin                    | Socio                                               | Seller |
| ----------------------------------------------- | ------------------------------ | --------------------------------------------------- | ------ |
| `admin-stats` (`/admin`)                        | ✅ Dashboard (panel principal) | ✅ Dashboard (panel principal)                      | ❌     |
| `Rendimiento` (`/admin/rendimiento`)            | ✅ Siempre disponible          | ✅ Siempre disponible (panel principal alternativo) | ❌     |
| Vendedores / Cotizaciones / Placas / Parámetros | Sí                             | Según permiso JSONB                                 | ❌     |
| `Seguimiento` (`/admin/seguimiento`)            | Sí                             | Según permiso `seguimiento`                         | ❌     |
| Notas de seguimiento                            | Sí                             | Según permiso `notas`                               | ❌     |
| Socios (`/admin/admins`)                        | Sí                             | ❌                                                  | ❌     |

#### Catálogo de permisos granulares (`permisos` JSONB del socio)

| Key           | Nombre en UI             | Descripción                                                                                |
| ------------- | ------------------------ | ------------------------------------------------------------------------------------------ |
| `sellers`     | Vendedores               | Ver y administrar los vendedores del socio: crear, editar, activar/desactivar y reasignar. |
| `quotes`      | Cotizaciones             | Ver y gestionar todas las cotizaciones: detalle, estado de revisión y por caducar.         |
| `seguimiento` | Seguimiento              | Tablero Kanban/lista del proceso de cierre: etapas, fechas y datos operativos.              |
| `plates`      | Placas de Estado         | Administrar el catálogo de placas por estado.                                              |
| `parameters`  | Parámetros del cotizador | Configurar IVA, comisión, seguros y valores residuales.                                    |
| `notas`       | Notas de seguimiento     | Agregar, editar y eliminar notas de seguimiento de vendedores y cotizaciones.              |
| `guias`       | Materiales              | Administrar los materiales del vendedor (guía automática y pre solicitudes Física/Moral): modo, contenido, URL y PDF. |

Keys eliminadas: `dashboard` (permiso morto — panel del super admin) y `stats` (no se usaba). `rendimiento` también se eliminó del JSONB: ahora es inherente al rol socio. Default del socio nuevo: **sin permisos marcados** — el super-admin elige cuáles otorgar.

### Dónde está implementada la lógica

**Frontend (Angular):**

- **Guards de ruta** — `src/app/guards/`:
  - `auth.guard.ts` → requiere sesión activa (`AuthGuard`)
  - `admin-guard.ts` → requiere `super_admin` o `socio` activo (`adminGuard`)
  - `super-admin-guard.ts` → requiere `super_admin` (`superAdminGuard`)
- **Lógica de roles** — `src/app/services/auth.service.ts`:
  - `isAdmin()` → true para `super_admin` | `socio`
  - `isSuperAdmin()` → true solo para `super_admin`
  - `isSocio()` → true para `socio`
    - `canAccessModule(module)` → super_admin = todo; seller = false (nunca accede al admin); socio = `dashboard`/`rendimiento` → true (inherentes); `stats` → false (clave muelta); `seguimiento` → permiso JSONB; resto revisa `permisos` JSONB
  - `createUserAsAdmin()` → super_admin crea cualquier rol; socio solo crea `seller`
- **Routing** — `src/app/app.routes.ts`:
  - `/` → Mis Cotizaciones (seller) con `AuthGuard`
  - `/cotizador` → Cotizador con `AuthGuard`
  - `/admin` → AdminDashboard con `AuthGuard` + `adminGuard`
    - `/admin` (child `''`) → `adminHomeGuard`: super_admin y socio activo → AdminStats (Dashboard); seller y demás rechazados por `adminGuard` del padre
  - `/admin/rendimiento` → child sin `moduleGuard`; accede super_admin y socio activo (via parent `adminGuard`)
  - `/admin/admins` → `superAdminGuard`
  - `/admin/seguimiento` → child con `moduleGuard('seguimiento')`; solo super_admin y socios con el permiso JSONB. Los vendedores nunca acceden (`canAccessModule('seguimiento')` devuelve false para `seller`)

**Backend (Supabase RLS + RPCs):**

- Migración `20260910000000_socios_superadmin.sql`:
  - `is_admin()` y `is_super_admin()` → helpers SQL (true solo para super_admin)
  - `socio_id` (UUID FK) → vincula vendedor → socio
  - `permisos` (JSONB) → permisos granulares del socio
  - Policies RLS: `can_view_profile()`, `can_view_quote()`, `is_socio_owner_of()`, `shares_socio_group()`
  - Trigger `secure_profiles_row()` → impide auto-promoción, cambio de rol por no-admin
- Migración `20260910000005_socio_scope_rpcs.sql`:
  - `get_seller_scope_ids()` → super_admin = NULL (todo); socio = sus vendedores; seller = solo él
  - `get_sellers_with_quote_counts()` → RPC con scope por socio
  - `get_admin_stats()` → RPC con scope por socio (estadísticas acotadas)

### Pendientes de permisos

- **Asignar/cambiar socio de un vendedor (super-admin):** implementado en `admin-sellers` (selector de socio en edición) y en `admin-admins` (drawer de detalle con botón "Reasignar"). El trigger `secure_profiles_row` impide que no-socios cambien `socio_id`.
- **Permisos granulares en rutas admin:** implementado vía `adminHomeGuard` (panel principal), `moduleGuard` (permisos JSONB en rutas hijas) y `canAccessModule()` actualizado. `Dashboard` y `Rendimiento` son inherentes al socio; `dashboard`/`stats` son claves que no se usan como permisos JSONB. El toggle global "Todos / Solo mi red" fue eliminado en el Ajuste 11: el alcance se aplica por rol mediante RLS y las RPCs.

## 4. Reglas de negocio del cotizador

### Parámetros actuales (en `DEFAULT_CALCULATOR_CONFIG` → `leasing.model.ts`)

| Parámetro                          | Valor                                         |
| ---------------------------------- | --------------------------------------------- |
| IVA                                | 16%                                           |
| Comisión de asesoría (advisoryFee) | 2%                                            |
| Seguro estimado                    | 3.5%                                          |
| Fee administrativo inicial         | $3,334.50                                     |
| Renta + VR máxima                  | 75%                                           |
| Mínimo renta extraordinaria        | 10% (<$650k), 15% ($650k–$1.5M), 20% (>$1.5M) |
| Renta básica estándar              | $6,000                                        |
| Renta básica híbrido/eléctrico     | $8,550                                        |
| Distribución mensual               | 60% flota / 40% admin                         |
| Residuales (opciones 1/2/3)        | 35% / 20% / 5%                                |
| Plazos disponibles                 | 12, 24, 36, 48 meses                          |

### Reglas vigentes

1. **Sin pago mínimo por precio de vehículo** — no hay un "fee" adicional basado en el precio; la renta extraordinaria es el enganche deducible.
2. **Sin condición de precio para cotizar** — cualquier precio neto ≥ $10,000 puede cotizarse (`Validators.min(10000)` en `quote-form.component.ts`).
3. **Renta extraordinaria máxima: 50%** — techo absoluto de 50% implementado vía `MAX_EXTRAORDINARY_RENT_PCT = 0.5` en `leasing.model.ts`, aplicada en `calculateOption` **antes** de la regla de suma: la Opción 1 (VR 35%) se topa en 40% y las opciones 2 (VR 20%) y 3 (VR 5%) en 50%. El super-admin ajusta `maxRentAndResidualPct` en `admin-parameters`. **Implementado**.
4. **Depósito en garantía** — **eliminado de la interfaz** (`quote-form.html`). Regla: siempre aplicado por defecto en cálculos; el default del formulario es **0%** (`securityDepositPct: 0.0`) y se suma `0` al desglose. **Implementado**.
5. **Comisión del vendedor** — **se muestra en el cotizador**: banner al pie del formulario (`cotizador.html`, `sellerCommission` en `cotizador.ts`) calculado sobre la Opción 1 (VR 35%). No aparece en el PDF. **Implementado**.
6. **Híbrido** — toggle Sí/No (implementado en `quote-form.component.html`). La renta básica cambia de $6,000 a $8,550.
7. **Seguro** — menú desplegable `<select>` en `quote-form.html` con opciones `Pendiente ($0)` / `Estimado (3.5%)`. **Implementado**.
8. **Porcentajes 10% y 2%** — alineados a la derecha en el PDF vía `.col-pct` (`quote-breakdown.css`: `text-align: right` + `padding-right: 0.4rem`, alineado a `.col-pct-vr`). **Implementado**.
9. **Nomenclatura del dashboard** — usar **"Por caducar"** en lugar de "Urgentes". **Implementado** en la UI de `admin-stats` y `admin-seller-performance`; el módulo `admin-quotes` ya no existe desde el Ajuste 11. Las variables internas y campos RPC conservan `totalUrgentes`/`urgentes` como nombres técnicos.
10. **Estado por última actividad** — el semáforo se calcula desde la actividad más reciente, no solo desde la creación: revisión, cambio de etapa, entrega o nota. Umbrales: **verde/reciente < 8 días**, **amarillo/por caducar 8–15 días**, **rojo/caducada ≥ 16 días**. Una revisión sella `last_reviewed_at` y reinicia el contador; una cotización entregada permanece verde. La fuente canónica es `src/app/utils/quote-activity.ts`.
11. **PDF** — el PDF (componente `quote-breakdown`) **no se toca** salvo indicación explícita. Los cambios de "opciones de arrendamiento" son solo en la interfaz del cotizador.

### Motor de cálculo

- **Archivo:** `src/app/services/financial-calculator.service.ts`
- **Fórmula PMT:** `PMT = -[pv·(1+rate)^nper + fv] / [((1+rate)^nper − 1)/rate]` (equivalente a Excel `PMT(rate/12, nper, -pv, fv)`)
- **3 opciones** con diferentes tasas anuales y valores residuales.
- La validación de mínimos/máximos se aplica en `calculateOption()`:
  - Si la renta es < mínimo → se ajusta al mínimo.
  - Si renta + VR > 75% → se reduce la renta al máximo permitido.

### Tests del cotizador

- `src/app/services/financial-calculator.service.spec.ts` — valida PMT contra Excel, casos VW Crafter, límites de 75%, depósitos.
- `src/app/utils/quote-validity.spec.ts` — vigencia de 7 días, estados "vencida"/"por vencer"/"vigente".

### Módulo de Seguimiento (proceso de cierre)

- **Ruta:** `/admin/seguimiento` (permiso granular `seguimiento`; solo super_admin y socios — los vendedores no acceden).
- **Archivos:** `services/seguimiento.service.ts` (lógica pura + Supabase), `utils/quote-activity.ts` (regla global 8/16 del Dashboard) y `components/admin/admin-seguimiento/` (lista operativa + barra local).
- **Tabla:** `public.quote_seguimiento` (1:1 con `quotes`, PK `quote_id`). Guarda `referenciado`, `financiera` (default `SIMPLE LEASE`), `activo_texto` (editable; por defecto "Marca Modelo Año"), `etapas` (JSONB) y `fecha_cierre`.
- **Etapas (JSONB `etapas`):** `exp`, `analisis`, `pago_ini`, `oc`, `factura`, `contrato`, `gps`, `placas`. El valor es el ISO timestamp en que se completó; ausente = pendiente. La etapa **COT** es implícita: toda cotización entra al tablero.
- **Barra local:** la barra lateral usa `quotes.created_at` mientras no exista actividad: **0–3 días azul, 4–5 amarillo, 6+ rojo**. Abrir o modificar desde Seguimiento sella `last_interacted_at` mediante `mark_quote_interaction()` y reinicia el ciclo: **verde durante las primeras 24 horas**, luego azul/amarillo/rojo. `fecha_cierre` permanece verde. Esta escala es exclusiva de `/admin/seguimiento` y no cambia Dashboard/Rendimiento.
- **Interacciones:** cuentan abrir la fila/visor/notas, guardar o cambiar etapas, editar/eliminar notas, guardar datos y entregar/reabrir. Búsqueda, filtros y hover no cuentan. Cada interacción renueva la ventana de purga de 15 días.
- **Protección permanente:** únicamente `etapas.exp` (**EXPEDIENTE**) protege de forma permanente contra la purga automática mientras esté marcado. Otras etapas y `fecha_cierre` solo renuevan la actividad; `fijada=true` conserva su protección manual preexistente. Desmarcar Expediente restablece el conteo normal de 15 días. **ELIMINAR** es manual y nunca se bloquea.
- **Fila perezosa:** no se crea `quote_seguimiento` hasta el primer cambio operativo; abrir una fila solo actualiza `quotes.last_interacted_at`. El tablero se arma cruzando `quotes` y `quote_seguimiento`. Si la tabla no existe, degrada a modo lectura.
- **UI:** lista operativa estilo Excel con **F. INICIO + NOTAS/VISUALIZAR, ASESOR, VENDEDOR, CLIENTE, ACTIVO, PLAZO, FIN, etapas, ENTREGA** y acciones. No hay columna DÍAS ni botón Marcar revisada. Un vendedor sin socio muestra **Sin asesor**; una cotización creada por socio/superadmin muestra al autor como asesor y **Directa** en vendedor.

## 5. Convenciones de código

### Idioma

| Contexto           | Idioma                                       | Ejemplos                                                              |
| ------------------ | -------------------------------------------- | --------------------------------------------------------------------- |
| Negocio/UI strings | Español                                      | `cotizador`, `vendedor`, `socio`, `cotizaciones`                      |
| Variables TS       | **Inglés** técnico, **español** para negocio | `extraordinaryRentPct`, `minimumRentPct`, `seller_number`             |
| Columnas de BD     | Inglés (lowercase)                           | `seller_id`, `pricenet`, `extraordinaryrentpct`, `securitydepositpct` |
| Nombres de RPC     | Inglés/snake_case                            | `get_admin_stats`, `get_seller_scope_ids`, `create_user`              |
| HTML/CSS           | Español                                      | textos, clases CSS                                                    |

### Estilo

- **Componentes:** standalone (`standalone: true`), Signals API (`signal`, `computed`), `@if`/`@for` nativo
- **Imports:** `CommonModule`, `FormsModule`, `ReactiveFormsModule` según necesidad
- **Quotes:** single quote (Prettier)
- **Indentación:** 2 espacios (EditorConfig)
- **Print width:** 100 caracteres (Prettier)
- **Variables CSS:** tema claro/oscuro vía `data-theme` en `styles.css`

### Migraciones y seeders

- **Gestor:** Supabase CLI (`npx supabase`)
- **Migraciones:** `supabase/migrations/` — archivos SQL con timestamp `YYYYMMDDHHMMSS_nombre.sql`
- **Convención:** usar `IF NOT EXISTS`, `ON CONFLICT`, `DROP ... IF EXISTS` para idempotencia
- **Orden de aplicación clave:**
  1. `20260309120000/130000_remote_applied.sql` — stubs (ya aplicadas remotamente)
  2. `20260910000000_socios_superadmin.sql` — modelo de roles + RLS
  3. `20260910000001_bootstrap_super_admin.sql` — bootstrap del super-admin
  4. `20260910000002_update_rpcs_roles.sql` — RPCs `create_user`/`delete_user`
  5. `20260910000003_superadmin_credentials.sql` — credenciales del super-admin
  6. `20260910000004_fix_rls_recursion.sql` — fix de recursión RLS
  7. `20260910000005_socio_scope_rpcs.sql` — RPCs con scope por socio
  8. `20260910000006_public_socios_rpc.sql` — RPC pública de socios (registro anónimo)
  9. `20260910000007_rls_scope_indexes.sql` — índices + policies de `quotes` con alcance por socio
  10. `20260910000008_fix_delete_user.sql` — fix de referencia ambigua en RPC `delete_user`
  11. `20260910000009_drop_vehicles_table.sql` — drop del catálogo `vehicles` (CRUD eliminado)
  12. `20260911000000_seller_performance_rpcs.sql` — RPCs de rendimiento por vendedor
  13. `20260911000100_cleanup_permisos_obsoletos.sql` — limpieza idempotente de claves `dashboard`/`stats`/`rendimiento` del JSONB `permisos` de socios (Rendimiento pasa a ser inherente al rol)
  14. `20260917000000_quote_seguimiento.sql` — tabla `quote_seguimiento` (1:1 con `quotes`) + helpers `is_seguimiento_admin()` / `can_access_seguimiento()` + políticas RLS del módulo Seguimiento
  15. `20260923010000_seguimiento_consolidacion.sql` — consolida el módulo y alinea permisos/índices
  16. `20260924000000_quotes_delete_scope.sql` — DELETE de `quotes`/`notas` para super_admin y socio dueño
  17. `20260924010000_quote_activity.sql` — actividad global 8/16 + RPC para Dashboard/Rendimiento
  18. `20260924020000_quote_interaction_tracking.sql` — `last_interacted_at`, RPC de interacción y purga con protección exclusiva de Expediente
  19. `20260924030000_direct_advisor_quote_scope.sql` — clasifica cotizaciones directas de socios/superadmins y amplía scopes RLS
  20. `20260924040000_fix_false_review_timestamp.sql` — elimina el default inválido de `last_reviewed_at` y limpia falsos timestamps de revisión
  21. `20260924050000_followup_granular_permissions.sql` — exige permisos JSONB de Seguimiento/Notas en helpers y policies RLS
  22. `20260924060000_seller_followup_readonly.sql` — RPC de solo lectura para que Mis Cotizaciones muestre las etapas propias sin abrir permisos del panel
  23. `20260925020000_notes_authorship_and_ownership.sql` — autor visible + propiedad estricta de notas (solo el autor edita o borra, en todos los módulos)
  24. `20260926010000_guia_storage.sql` — bucket privado `guias` + políticas de Storage (subir/eliminar solo con permiso `guias`; lectura de metadatos para todo autenticado)
  25. `20260926020000_pre_solicitudes_config.sql` — tabla `pre_solicitudes` (una fila por tipo) con RLS: lectura para autenticados, escritura con permiso `guias`
  26. `20260926030000_materiales_unified.sql` — tabla única `materiales` (guía + pre solicitudes) con RLS; traslada la config de `pre_solicitudes` y elimina esa tabla
- **⚠️ Estado real de `supabase/migrations/`:** el 25/09/2026 el directorio de migraciones fue limpiado en el working tree (Git registra los archivos históricos 1–24 como eliminados). El historial vive en `supabase_migrations.schema_migrations` de la BD remota y **no se restauran esos archivos**. Por eso **toda migración nueva debe ser totalmente autocontenida** (recrear helpers, políticas y RPC que necesite) y se aplica con `npx supabase db push` (pide el password de la BD) o pegándola en el SQL Editor.
- **Aplicar cambios:** `npx supabase db push` (o `supabase db reset` para desarrollo)
- **No hay seeders tradicionales** — los catálogos base se insertan en `000001_bootstrap_super_admin.sql` (placas). El catálogo de **vehículos** (`vehicles`) fue **eliminado** en `20260910000009_drop_vehicles_table.sql`.
- **Seed manual de datos de prueba:** `supabase/scripts/seed_datos_prueba.sql` (no es migración: no se aplica con `db push`). Se ejecuta a mano en el SQL Editor o con `npx supabase db query --linked -f supabase/scripts/seed_datos_prueba.sql`. Es **destructivo**: borra `quotes`, `notas` y todos los usuarios excepto el super admin actual, y crea 3 socios + 15 vendedores + 60 cotizaciones. **No toca** `state_plates` ni `calculator_settings`. Credenciales: socios `4421000001/02/03` y vendedores `44211xxxxx…44213xxxxx`, contraseña `123456` (login por celular). Detalle: publica `request.jwt.claims` del super admin dentro de la transacción para que los triggers `secure_profiles_row`/`secure_quotes_row` tomen la vía exenta (si no, las cotizaciones quedarían sin `seller_id`/`color`).

### Tests

```bash
npm test                    # Vitest vía ng test (watch mode por defecto)
npm test -- --watch=false  # Ejecución única (CI, sin watch)
```

- **Framework:** Vitest globals (`describe`, `it`, `expect`, `vi`)
- **Setup:** Angular `TestBed` con componentes standalone
- **Archivos de test:** `*.spec.ts` al lado del código que testean
- **Test actuales:** `financial-calculator.service.spec.ts`, `quote-validity.spec.ts`, `quote-activity.spec.ts`, `quote-retention.spec.ts`, `seguimiento.service.spec.ts`, `admin-seguimiento.spec.ts`, `admin.service.spec.ts`, `admin-seller-performance.spec.ts`, `login.spec.ts`, `admin-guard.spec.ts` y `app.spec.ts` (entre otros).

### Commits

- **Ejecución:** `git add` / `git commit` / `git push` los realiza **el usuario**, nunca el agente. El agente solo **propone** el mensaje de commit al resumir el trabajo.
- **Formato:** español descriptivo (no Conventional Commits)
- Ejemplos del historial:
  - `Fix crash al abrir drawer Nuevo Socio: catalogos constantes + detectChanges sincrono en zoneless`
  - `Bloque 2: sin mapas, ubicacion por texto libre (registro, vendedores, perfil) + refinamientos permisos/contacto GoLease`
  - `Bloque 1`
- Algunos commits hacen referencia a "Bloque N" → sugiere planificación por bloques/sprints.
  - Los artefactos de debugging de la raíz (`a1_rpcs.txt`, `a2_schema.sql`, `a3_b64.txt`, `a5_rpcs_clean.sql`, `a6_test_rpc_scope.mjs`) han sido **eliminados** del repositorio. El directorio de build `dist-check/` fue **desversionado y eliminado del disco**; `.kilo/` también fue **desversionado y eliminado físicamente del disco** en la limpieza del 22/09/2026 (ver nota 12). Ninguno es parte del build.

## 6. Reglas para los agentes de IA

1. **Inspeccionar antes de modificar** — siempre lee el archivo, entiende el contexto, y verifica queries RPC antes de proponer cambios.
2. **Trabajar en modo Plan antes de Act** — explora, analiza, propone, y confirma con el usuario antes de editar.
3. **No ejecutar git de escritura** — nunca corras `git add`, `git commit`, `git push`, `git reset`, `git checkout` ni similares: los commits y pushes los hace el usuario. Propone el mensaje de commit (español descriptivo, uno por responsabilidad) al resumir. `git status`, `git log` y `git diff` de solo lectura sí, cuando aporten contexto.
4. **No reescribir código existente sin avisar** — propone primero; si hay refactor necesario, sepáralo como cambio independiente en el resumen y propón un mensaje de commit distinto (sin ejecutarlo).
5. **Usar el modo Debug para diagnosticar, no para construir** — lee logs, revisa errores, inspecciona la BD; no uses el debug como justificación para añadir features no solicitadas.
6. **No tocar el PDF salvo requerimiento explícito** — el componente `quote-breakdown` y su HTML son el motor de generación de PDF; no modificar salvo que se pida expresamente.
7. **Validar al cerrar el bloque, no en cada iteración** — si el bloque tocó código, corre `npm test -- --watch=false` una sola vez y verifica que nada rompa; no re-ejecutes la suite sin motivo. No corras `npm install`, `npm start`, `npm run build` ni `npx supabase db push` salvo petición explícita.
8. **Resumir cambios** — al finalizar, lista qué se modificó, por qué, cómo probarlo y el mensaje de commit sugerido (sin ejecutarlo).
9. **Si hay dudas, preguntar antes de asumir** — marca incertidumbres como `[POR CONFIRMAR]` en vez de inventar.
10. **Respeta el stack existente** — no agregues librerías nuevas sin consultar.
11. **Economía de tokens y procesos** — inspecciona con lecturas puntuales (rangos de línea y búsquedas) en vez de releer archivos completos; no repitas exploraciones ya hechas, no regeneres `dist/` ni limpies `.angular/cache/`, no instales dependencias, no levantes el servidor de desarrollo y no apliques migraciones ni seeds sin confirmación. Procesos largos (build, suite completa o `supabase db push`) solo con una razón clara.

## 7. Pendientes conocidos

### Cotizador (interfaz)

| Requerimiento                                                         | Estado           | Archivo(s) involucrados                                                   |
| --------------------------------------------------------------------- | ---------------- | ------------------------------------------------------------------------- |
| Eliminar "Depósito en garantía" de la interfaz (mantener en cálculos) | **Implementado** | `quote-form.html` (oculto; default 0% `securityDepositPct`)               |
| Mostrar comisión del vendedor en el cotizador                         | **Implementado** | `cotizador.html` (banner) + `cotizador.ts` (`sellerCommission`)           |
| Cambiar selector de seguro de toggle a menú desplegable               | **Implementado** | `quote-form.html` (`<select>`)                                            |
| Alinear porcentajes 10% y 2% a la derecha                             | **Implementado** | `quote-breakdown.css` (`.col-pct`)                                        |
| Renta extraordinaria máxima: 50% (techo 50% por opción)               | **Implementado** | `leasing.model.ts` (`MAX_EXTRAORDINARY_RENT_PCT = 0.5`) + `quote-form.ts` |

### Dashboard / Admin

| Requerimiento                                                 | Estado           | Archivo(s)                                                                                |
| ------------------------------------------------------------- | ---------------- | ----------------------------------------------------------------------------------------- |
| Renombrar "Urgentes" → "Por caducar" en el dashboard          | **Implementado** | `admin-stats.ts/.html`, `admin-seller-performance.ts/.html`, `admin.service.ts`        |
| Aplicar permisos granulares (`permisos` JSONB) en rutas admin | **Implementado** | `admin-guard.ts` (`adminHomeGuard`, `moduleGuard`), `auth.service.ts` (`canAccessModule`) |

### Registro

| Requerimiento                                             | Estado                                                                                                                                        | Archivo(s)      |
| --------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------- | --------------- |
| El registro crea el email `vendedor_${phone}@golease.com` | Implementado                                                                                                                                  | `register.ts`   |
| Asignación de socio (socio_id) al registrarse             | Implementado (selector de contacto GoLease)                                                                                                   | `register.html` |
| Opcion OTRO en contacto GoLease                           | Implementado: valida texto obligatorio, asigna socio por defecto (super admin 4421086183) y guarda nota en `notas` con la leyenda de registro | `register.ts`   |

### CRUDs

| Requerimiento                                      | Estado       | Archivo(s)                                            |
| -------------------------------------------------- | ------------ | ----------------------------------------------------- |
| Asignar/cambiar socio de un vendedor (super-admin) | Implementado | `admin-sellers.ts/.html`, `admin-admins.ts/.html`     |
| CRUD de notas de seguimiento                       | Implementado | `admin-sellers.ts` (vendedor), `admin-seguimiento.ts` (cotización; tabla `notas`) |

### Despliegue móvil

| Requerimiento                        | Estado                                                                                                    |
| ------------------------------------ | --------------------------------------------------------------------------------------------------------- |
| PWA / instalable en móvil            | [POR CONFIRMAR] — hay navegación móvil (`mobile-bottom-nav`) pero no hay manifiesto PWA ni service worker |
| Optimización para pantallas pequeñas | Implementado (media queries en CSS)                                                                       |

## 8. Notas y decisiones previas

1. **Login por celular, no por email:** El login se realiza con el número de celular (`seller_number`), pero la autenticación de Supabase requiere email. La solución: el email de `profiles.email` actúa como "email espejo" y se usa para `signInWithPassword`. Nunca se construye un email desde el rol/teléfono. Documentado en `login.ts` y testeado en `login.spec.ts`.

2. **Trigger `secure_profiles_row` (SECURITY DEFINER):** Bloquea auto-promoción de rol y cambio de `socio_id` por no-super-admin. Los servicios de creación de usuarios deben **restaurar la sesión del admin** antes de hacer `upsert` en `profiles`, porque el trigger verifica `auth.uid()` del usuario actual (ver `admin-sellers.ts` líneas 577–581 y `admin-admins.ts` línea 485).

3. **Fallbacks en `admin.service.ts`:** Las RPCs `get_admin_stats()` y `get_sellers_with_quote_counts()` pueden no existir en la BD si las migraciones no se aplicaron. El servicio tiene fallbacks con consultas REST + agregaciones locales (`computeQuoteColor`). Si la RPC falla con `PGRST202` o "could not find the function", usa el fallback.

4. **Color de cotización basado en actividad:** la fuente canónica es `src/app/utils/quote-activity.ts` y su espejo SQL `20260924010000_quote_activity.sql`. `admin.service.ts` aplica `aplicarActividadStats()` / `aplicarActividadPerformance()` sobre los resultados de las RPCs: <8 días `reciente/verde`, 8–15 `amarillo`, ≥16 `rojo`; revisar reinicia el contador y una cotización entregada siempre queda verde. Las RPCs históricas que aún colorean por `created_at` son sobrescritas en cliente cuando la RPC de actividad está disponible.

5. **Snapshot vs recálculo:** Cuando se abre el detalle de una cotización, se prefiere el **snapshot guardado en JSONB** (`calculation` column) sobre recalcular. Si no existe, se recalcular con los datos de la fila (`buildInputFromRow`).

6. **Supabase local:** El `config.toml` está en `.gitignore` (no versionado). Las migraciones usan `BEGIN/COMMIT` y funciones SECURITY DEFINER para evitar recursión RLS (migración 004).

7. **Hash routing:** La app usa `withHashLocation()` → todas las rutas usan `#` (ej. `/#/login`). Esto afecta el `redirectTo` en password recovery (`window.location.origin}/#/reset-password`).

8. **No hay backend propio:** Todo el login, validación y autorización se hace en Supabase (RLS + RPCs). No hay servidor Express/Fastify. Los antiguos artefactos de diagnóstico de la raíz (`a1_rpcs.txt`, `a2_schema.sql`, `a3_b64.txt`, `a5_rpcs_clean.sql`, `a6_test_rpc_scope.mjs`) han sido **eliminados**; el SQL canónico de las RPCs vive en `supabase/migrations/20260910000005_socio_scope_rpcs.sql`.

9. **`.kilo/` (eliminado el 22/09/2026):** Carpeta local de herramientas de IA (planes de Kilo Code + referencias de patrones Angular). Está en `.gitignore` y fue **desversionada** del índice; en la limpieza del **22/09/2026** se eliminó **físicamente del disco** (ver nota 12): sólo quedaban worktrees residuales — `worktrees/careful-loan` (sin cambios pendientes y en el mismo commit `e354ca5` que `main`) y el registro *prunable* `luck-fork` — que se quitaron con `git worktree remove` + `git worktree prune`. No afecta el build y ya **no existe** en el working tree.

10. **Commit `d63ddf0` — "Remove build/test/audit logs and update gitignore":** La limpieza de los archivos de diagnóstico de la raíz y de los directorios `dist-check/`/`.kilo/` **se ha completado**: `a*` se borraron físicamente, `dist-check/` y `.kilo/` se remitieron del índice con `git rm --cached`, y se añadió `/dist-check` al `.gitignore`. En una limpieza posterior (Paso 4), el directorio `dist-check/` fue además **eliminado físicamente del disco** (ya no existe en el working tree).

11. **Catálogo de vehículos eliminado (`vehicles`):** El CRUD `admin-vehicles/` (componente TS/HTML/CSS), su ruta, su enlace en el sidebar (`admin-dashboard.html`) y sus métodos en `catalog.service.ts` fueron **eliminados** (commit `dc8944f`); la tabla `public.vehicles` se elimina en la migración `20260910000009_drop_vehicles_table.sql`. El ranking `topVehicles` del dashboard **no** depende de la tabla: se calcula sobre `public.quotes` (RPC `get_admin_stats` + fallback local en `admin.service.ts`). Limpieza **completa** de residuos: sin ruta `/admin/vehicles` (se quitó el stub de redirect), sin reglas CSS `.vehicles-container`/`.vehicle-card` en `styles.css`, sin `INSERT INTO public.vehicles` en la migración `000001` (además se consolidaron los 3 bloques duplicados de catálogos en uno) y sin filas de `vehicles` en `supabase/RLS_POLICY_MATRIX.md`. **Se conserva** `html[data-theme='dark'] .vehicle-name` en CSS porque lo usan `mis-cotizaciones`, `admin-stats` y `admin-seller-performance`, y el tipo `VehicleQuoteInput` de `leasing.model.ts` (es el input del cotizador, no el CRUD).

12. **Limpieza de artefactos generados (22/09/2026):** Se eliminaron del disco únicamente elementos **generados o residuales**, ninguno versionado: (a) **`.angular/cache/`** — caché de build/tests de Angular (incluye el `.tsbuildinfo` y el `results.json` de Vitest); (b) **`dist/`** — salida de `npm run build`; (c) **`.kilo/`** — worktrees residuales de Kilo Code (ver nota 9). Los puntos (a) y (b) **se regeneran solos** en el siguiente `ng serve`/`ng test` y `npm run build`, así que es normal que vuelvan a aparecer: para verlos ausentes, borrar el caché **después** de correr los tests. Se **conservó** `supabase/.temp/` porque guarda el *link* del proyecto (`linked-project.json`, `project-ref`, `pooler-url`) que necesita `npx supabase db push`; borrarla obliga a re-vincular con `supabase link`. También se conservó el `git worktree` principal y, sobre todo, los archivos **sin seguimiento** que son **trabajo en progreso y no basura**: `src/app/utils/quote-retention.ts` (+ `quote-retention.spec.ts`, importado actualmente por `mis-cotizaciones.ts`), los specs nuevos (`admin-sellers-delete.spec.ts`, `admin-admins-delete.spec.ts`, `register.spec.ts`) y las migraciones `20260922010000_delete_user_cascades.sql`, `20260922020000_quotes_auto_cleanup.sql` y `20260922030000_profiles_socio_reassign_on_delete.sql`. Tras la limpieza se validó con `npm test -- --watch=false`: **20 archivos de test, 168 tests en verde**.

13. **Ajuste 11 (23/09/2026) y AJUSTES 12 (24/09/2026) — módulo Seguimiento:**
    - **Ajuste 11 (HEAD `1718d57`)** eliminó el módulo **`admin-quotes/`** completo (componente, ruta `/admin/quotes`, spec) y el toggle **"Todos / Solo mi red"**: `AdminScopeService` quedó como **no-op** (`scope` fijo en `'todos'`, `sellerIds()` → `undefined`, `isRedMode()`/`isScopeVisible()` → `false`). El drawer de `admin-sellers` ahora enlaza a **`/admin/seguimiento?seller=<id>`**. Consecuencia: **`quotes.service.updateQuoteStatus()` (escribe `status_color` y `last_reviewed_at`) quedó sin llamadas** y el listado de cotizaciones del admin ya no existe como pantalla propia.
    - **AJUSTES 12 (Seguimiento, `/admin/seguimiento`)** — columnas reordenadas/renombradas: **ASESOR** (socio del vendedor), **VENDEDOR** (antes "Referenciado"), **PLAZO** (`termmonths`), **FIN**, **ENTREGA** (checkbox que cierra/reabre el negocio) y **F. INICIO**; el día transcurrido queda representado únicamente por la barra lateral local descrita en la nota 15. Se agregó el **contador de NOTAS** + botón **ojo verde** (`visualizarCotizacion()`) que abre la hoja oficial en modal reutilizando `QuoteBreakdownComponent` (usa el snapshot `calculation` y, si no existe, recalcula con `buildInputFromRow()`), y el botón **ELIMINAR** con modal de confirmación.
    - `SeguimientoItem` gana `asesorId`, `asesorName` y `termMonths`. `buildItem()` resuelve el nombre del asesor por `profiles.socio_id` (RLS: si el perfil está oculto, cae al usuario en sesión); un vendedor sin `socio_id` muestra **Sin asesor** y no se agrupa bajo el usuario actual.
    - `quotes.service.ts`: `getAllQuotesWithSeller()` trae `profiles.socio_id` → `seller_socio_id`; nuevo `deleteQuote()` que borra primero las `notas` (`entidad_tipo='quote'`, sin FK) y luego la cotización.
    - **Migración nueva `20260924000000_quotes_delete_scope.sql`** (autocontenida e idempotente): helpers `seg_quote_owner()` / `seg_note_owner()` (`SECURITY DEFINER`) y políticas **DELETE** para `quotes` y `notas` con alcance `super_admin` + socio dueño de la red (`vendedor.socio_id = auth.uid()`). **Pendiente de aplicar en la BD** (`npx supabase db push`); sin ella el botón ELIMINAR falla por RLS. `quote_seguimiento` cae por `ON DELETE CASCADE`.
    - **Fix de rendimiento/UX:** `ngOnInit` del tablero ahora pinta el listado (`applyFilters()`) **antes** del conteo de notas; antes la tabla quedaba vacía hasta que respondía la consulta de `notas`.
    - **Specs:** se retiraron los tests del toggle "Solo mi red" (feature eliminada) y se corrigieron **7 errores TS preexistentes en HEAD** (`admin-sellers.spec.ts`, `admin-stats.spec.ts`, `admin-scope.service.spec.ts`) que impedían compilar el suite completo. Verificado: `npm test -- --watch=false` → **21 archivos / 171 tests en verde**; `npm run build` → OK (solo warnings CommonJS de `canvg`/`html2canvas`).

14. **Actividad global 8/16 para Dashboard y Rendimiento (24/09/2026):**
    - `src/app/utils/quote-activity.ts` y `20260924010000_quote_activity.sql` conservan la fuente canónica `ultimaActividad = max(created_at, last_reviewed_at, quote_seguimiento.updated_at, etapas completadas, fecha_cierre, última nota)` y los umbrales **8/16**. Esta regla alimenta Dashboard/Rendimiento; **no** controla la barra local de Seguimiento.
    - `admin.service.ts` recolorea las RPCs con `aplicarActividadStats()` / `aplicarActividadPerformance()`. Una revisión sella `last_reviewed_at`; una cotización entregada permanece verde.
    - `SeguimientoService.marcarRevisada()` y `SeguimientoItem.revisada/lastReviewedAt` se conservan para compatibilidad/histórico, pero el drawer ya no ofrece marcar/desmarcar revisada y la tabla no muestra DÍAS.
    - `quote-retention.ts` recibe la cotización completa y `quote_seguimiento` para los avisos de retención de Mis Cotizaciones. La regla definitiva de purga SQL se actualiza en la nota 15.

15. **Barra de interacción de Seguimiento + Expediente como única protección permanente (24/09/2026):**
    - `estadoBarraSeguimiento()` en `seguimiento.service.ts` calcula la barra local: sin actividad usa **0–3 azul, 4–5 amarillo, 6+ rojo** desde `quotes.created_at`; con actividad reinicia el ciclo y muestra **verde durante menos de 24 horas**, luego azul/amarillo/rojo. `fecha_cierre` permanece verde. La función es pura y tiene specs de límites exactos.
    - Abrir la fila, visualizar, abrir/editar/eliminar notas, cambiar etapas, guardar datos o entregar/reabrir llaman `SeguimientoService.registrarInteraccion()` → RPC `mark_quote_interaction(bigint)`. Búsqueda, filtros y hover no cuentan. La marca es compartida y se actualiza con cada interacción.
    - `SeguimientoItem` gana `lastInteractedAt`; `getAllQuotesWithSeller()` selecciona `last_interacted_at` y, si la migración aún no está aplicada, reintenta sin esa columna para no dejar vacío el tablero.
    - Los vendedores sin `socio_id` muestran **Sin asesor**. Ya no existe la columna DÍAS, badge de días ni botón Marcar revisada en el drawer; las columnas **FIN/EXPEDIENTE/ENTREGA/ELIMINAR** de AJUSTES 12 permanecen.
    - **Migración `20260924020000_quote_interaction_tracking.sql`** (autocontenida e idempotente, **pendiente de aplicar** con `npx supabase db push`): agrega `quotes.last_interacted_at`, crea `mark_quote_interaction`, hace backfill de interacciones históricas y define `quote_purge_last_activity()` + `purge_expired_quotes()`. Cada interacción renueva 15 días. `fijada=true` mantiene su protección manual; **solo `etapas.exp` con valor no vacío** protege de forma permanente contra purga automática. Desmarcarlo restablece el conteo; **ELIMINAR** manual nunca se bloquea.
    - La nueva función de purga no modifica `quote_last_activity()`, por lo que Dashboard/Rendimiento mantienen la regla 8/16.
    - **Tests/build:** `npm test -- --watch=false` → **24 archivos / 206 tests en verde**; `npm run build` → OK.
    - **Cómo probarlo:** abrir `/#/admin/seguimiento` y verificar que una cotización sin actividad usa 0–3/4–5/6+ desde su creación; al abrirla o modificarla queda verde durante menos de 24 horas y después vuelve a azul/amarillo/rojo. Los negocios entregados permanecen verdes.

16. **Cotizaciones directas de socios/superadmins (24/09/2026):**
    - `seller_id` conserva al creador real para ownership/RLS. `getAllQuotesWithSeller()` añade `profiles.role`; `SeguimientoService.buildItem()` clasifica dinámicamente: `socio`/`super_admin` → ASESOR=autor y VENDEDOR=**Directa**; `seller` → usa su `socio_id` actual.
    - Las cotizaciones existentes se reclasifican al recargar; un cambio de rol o de socio actualiza la clasificación sin backfill. El filtro de asesores incluye al autor directo; el de vendedores excluye `esVentaDirecta`.
    - **Migración `20260924030000_direct_advisor_quote_scope.sql`** (autocontenida e idempotente, **pendiente de aplicar**): redefine `can_access_seguimiento`, `seg_quote_owner`, `seg_note_owner` y `mark_quote_interaction`; permite al socio leer/editar su quote directa, operar etapas/notas y eliminarla, sin modificar `profiles.socio_id`.
    - La clasificación es exclusiva de `/admin/seguimiento`; no cambia Dashboard, Rendimiento ni Mis Cotizaciones.

17. **Corrección de revisión por default (24/09/2026):**
    - `quotes.last_reviewed_at` tenía `DEFAULT now()`, por lo que una cotización nueva nacía con timestamp de revisión aunque `revisada=false`. La migración `20260924040000_fix_false_review_timestamp.sql` elimina ese default, limpia timestamps inválidos y redefine los helpers SQL para ignorar review timestamps cuando `revisada` no es true.
    - `quote-activity.ts`, `quote-retention.ts` y `estadoBarraSeguimiento()` aplican la misma guarda defensiva. Una cotización nueva sin interacción comienza azul; abrirla/modificarla la hace verde solo durante las primeras 24 horas.

18. **RLS granular de Seguimiento/Notas (24/09/2026):**
    - `can_access_seguimiento()` y `seg_quote_owner()` exigen `permisos.seguimiento=true`; `seg_note_owner()` exige `permisos.notas=true` para socios. El guard Angular ya aplicaba esta regla, pero ahora también la BD para impedir acceso directo por REST.
    - `mark_quote_interaction`, etapas, eliminación y notas de cotizaciones directas respetan los mismos permisos. Superadmin conserva bypass total.

19. **Mis Cotizaciones como seguimiento de solo lectura (24/09/2026):**
    - Se eliminaron todos los filtros de la pantalla del vendedor: buscador, últimos 7 días y últimos 30 días.
    - Las cotizaciones se muestran en una lista tabular con fecha, cliente, activo, precio, plazo y las ocho etapas en modo lectura. No hay edición, duplicado, cambio de etapa, entrega ni eliminación de la cotización.
    - `get_vendedor_seguimiento()` (`20260924060000_seller_followup_readonly.sql`) limita la consulta a `seller_id = auth.uid()` y expone solo el estado mínimo de la cotización. El frontend mantiene fallback a `getVendedorQuotes()` si la RPC aún no está disponible.
    - Los filtros y acciones de Admin → Seguimiento permanecen sin cambios.

20. **Acciones y notas compartidas en Mis Cotizaciones (25/09/2026 — Ajuste 15):**
    - La columna **F. Inicio** muestra solo la fecha (sin hora) y, debajo, las acciones compactas y alineadas: ícono de **Ver cotización** seguido del ícono de notas con contador (`2 notas`). El pie replica la leyenda con **Ver cotización**, **0 notas**, `Pon y revisa notas de seguimiento` y, a la derecha, `* Las etapas se actualizan por GoLease`.
    - La columna **Activo** muestra el nombre completo del vehículo capturado como `marca + modelo + año`; si no cabe en una línea, ajusta palabras en varias líneas sin puntos suspensivos y la fila crece lo necesario. `quote_seguimiento.activo_texto` es solo el respaldo cuando la cotización no tiene marca ni modelo.
    - El modal de notas es compartido por cotización. Cada nota muestra el **nombre real de su autor** a la derecha de la fecha. El vendedor puede agregar, editar y borrar solo sus propias notas; las de su asesor son de solo lectura.
    - `20260925020000_notes_authorship_and_ownership.sql` centraliza la lectura/escritura de notas de todos los módulos: devuelve `autor_nombre` y solo permite UPDATE/DELETE cuando `creado_por = auth.uid()` (también para superadmin). `delete_notes_for_quote` mantiene la limpieza de notas al eliminar una cotización.
    - Las etapas, el detalle de cotización y el PDF permanecen intactos.

21. **Autoría y propiedad de notas en todos los módulos (25/09/2026 — Ajuste 16):**
    - Alcance: **Mis Cotizaciones**, **Admin → Seguimiento**, **Admin → Vendedores** y el tooltip de notas de Vendedores.
    - La tarjeta de nota muestra `fecha` a la izquierda y `autor_nombre` a la derecha; los botones editar/borrar viven en la esquina superior derecha y **solo aparecen en notas propias**.
    - `src/app/services/notes.service.ts` es el único punto de acceso a `notas` en el frontend (`getNotes`, `createNote`, `updateOwnNote`, `deleteOwnNote`). Los tres componentes lo usan y bloquean también las acciones en código, no solo en la plantilla.
    - El superadmin queda sujeto a la misma regla: solo administra notas que él mismo escribió. Para la limpieza operativa al eliminar una cotización existe la RPC `delete_notes_for_quote`.
    - **Layout de la tarjeta:** `fecha → autor → acciones` en una sola línea inferior (`.nota-meta` con `gap` uniforme y `.nota-acciones { margin-left: auto }`). Los botones ya no son `position: absolute`, por lo que `.nota-item` no reserva padding extra a la derecha.

22. **Materiales del vendedor: guía automática y pre solicitudes (26/09/2026 — Ajuste 17, unificado):**
    - **Un solo módulo:** los tres materiales (`guia`, `pre_fisica`, `pre_moral`) se administran desde **un único panel** `/admin/materiales` (ruta hija de `/admin` con `moduleGuard('guias')`) y se ven en el vendedor desde **una única ruta** `/material/:clave` (`AuthGuard`). Componentes: `components/admin/admin-materiales/` y `components/vendedor/material/`.
    - **Tabla única `public.materiales`** (`clave` PK, `modo`, `titulo`, `descripcion`, `contenido`, `url`, `actualizado_at`) leída y escrita por `services/materiales.service.ts`. La migración `20260926030000_materiales_unified.sql` traslada la configuración previa de `pre_solicitudes` y **elimina esa tabla**.
    - **Tres modos para los tres materiales:** `pdf` (sube el PDF al bucket privado `guias`), `contenido` (texto editable que se muestra con `white-space: pre-wrap`) y `url` (enlace externo validado con `http(s)://`). Cambiar de modo no borra los demás campos. Cada modo tiene su estado vacío cuando falta el recurso.
    - **Solo para el perfil `seller`:** Mis Cotizaciones muestra 3 botones en el encabezado verde, antes de «Nueva Cotización», con `esVendedor = computed(() => auth.currentProfile()?.role === 'seller')`.
    - **Comportamiento de los botones (conservado del diseño previo):** `abrirGuia()` abre el PDF directamente en una pestaña nueva con URL firmada de 120 s si el modo es `pdf`; si el administrador configuró `contenido`/`url`, navega a `/material/guia`. `abrirMaterial(clave)` siempre navega a `/material/<clave>` para las dos pre solicitudes.
    - **Almacenamiento:** bucket privado `guias` con rutas fijas por clave (`MATERIAL_PDF_PATH`): `guia-autometrica.pdf`, `pre-solicitud-persona-fisica.pdf`, `pre-solicitud-persona-moral.pdf`. Límite 15 MB, validación de `application/pdf` y `upsert`. Las rutas NO cambiaron al unificar, por lo que los archivos ya subidos siguen sirviéndose.
    - **Permiso `guias` (clave conservada, no renombrada):** superadmin siempre; socios solo con `permisos.guias === true` (helper SQL `has_guias_permission()` y `MaterialesService.canManage()`). Los vendedores solo leen la configuración y ven el PDF por URL firmada; no pueden escribir.
    - **Rutas antiguas conservadas como alias:** `/admin/guias` y `/admin/pre-solicitudes` redirigen a `materiales`; `/pre-solicitud/fisica` y `/pre-solicitud/moral` redirigen a `material/pre_fisica` y `material/pre_moral`. El menú lateral y la navegación móvil tienen una sola entrada **Materiales**.

23. **Ajuste 18 — Pantalla Admin → Vendedores (26/09/2026):**
    - **Tarjetas de resumen eliminadas:** se retiraron las 4 tarjetas estadísticas (Vendedores / Activos / Inactivos / Cotizaciones generadas) que además actuaban como filtro de estado.
    - **Barra de herramientas eliminada por completo:** buscador, chips Todos/Activos/Inactivos, selector de agencias, selector de orden y contador de resultados. `AdminSellersComponent` ya **no tiene filtros**: se borraron `searchTerm`, `statusFilter`, `brandFilter`, `sortBy`, los getters `stats` / `brandsList` y los métodos `onSearch()`, `clearSearch()`, `clearFilters()`, `setStatusFilter()`, `setBrandFilter()`, `setSortBy()`. El orden lo garantiza la propia RPC (`ORDER BY p.created_at DESC`).
    - **Semáforo eliminado (columna + lógica):** se borraron el `<th>`/`<td>` Semáforo, el signal `sellersQuoteColors`, `loadSellersQuoteColors()`, `getQuoteColors()` y la consulta extra a `quotes`. `loadSellers()` ya no recibe el parámetro `refreshColors`.
    - **Nueva columna ASESOR** como primera de la tabla, antes de AGENCIA. Muestra el `full_name` del socio asignado; si el vendedor no tiene `socio_id` o el nombre no resuelve, muestra **"Sin asesor"** (igual que Seguimiento).
    - **Resolución sin migración:** `socio_id` ya viaja en cada vendedor porque `get_sellers_with_quote_counts()` devuelve la fila completa del perfil (`to_jsonb(p)`) y el fallback legacy de `admin.service.ts` usa `select('*')`. El mapa `socio_id → nombre` lo arma `AdminService.getAsesorNames(sellers)` con **una sola** consulta a `profiles`, incluyendo el usuario en sesión (leído de `currentUserSignal()`, igual que `SeguimientoService.resolverAsesores()`) porque la RLS puede ocultarle al socio su propio perfil.
    - **Rótulos en mayúsculas sin acentos:** el `<thead>` queda `Asesor · Agencia · Nombre · Whatsapp · Ubicacion · Acciones`. `Teléfono` pasó a `Whatsapp` y `Ubicación` a `Ubicacion`; los `data-label` de cada `<td>` (etiquetas del modo tarjeta en móvil) se actualizaron igual. El CSS ya aplica `text-transform: uppercase` a los `th` y a `td::before`.
    - **Estado vacío simplificado:** al no haber filtros, solo queda la rama "Aún no hay vendedores registrados"; se eliminó el botón "Limpiar filtros".
    - **CSS:** se borraron del `admin-sellers.css` las reglas de `.stats-grid`, `.stat-card`, `.stat-icon`, `.stat-body`, `.tone-*`, `.toolbar`, `.search-*`, `.chip*`, `.toolbar-select`, `.results-count`, `.semaforo-cell` y `.dot*` (base y media queries). El bloque `FOCUS VISIBLE` se conservó sin los selectores `.chip`. Se agregó `.asesor-cell`. La regla global `styles.css` de `html[data-theme='dark'] .stat-card.is-active` **se deja** porque `admin-admins` la sigue usando.
    - **Ajuste 19 — barra de filtros reducida:** la barra volvió a existir pero **solo con dos controles**: el buscador de texto y un `<select>` de orden. Se conservan únicamente las tres opciones **Asesor A-Z**, **Agencia A-Z** y **Ubicacion A-Z**. No volvió el filtro por estatus (chips), ni el de agencias, ni el contador de resultados, ni las opciones "Más recientes" / "Más cotizaciones" / "Antiguos" / "Nombre A–Z".
    - **Búsqueda ampliada:** `applyFilters()` compara el término en minúsculas contra `full_name`, `seller_number`, `agency_brand`, `agency_location` **y el nombre del asesor** (`getAsesorName(s)`). El placeholder quedó como "Buscar por nombre, número, marca, sucursal o asesor...".
    - **Orden por defecto `asesor`.** El comparador es `clave(a).localeCompare(clave(b), 'es', { sensitivity: 'base' })` para que mayúsculas y acentos no rompan el orden ("AGENCIA" junto a "Agencia", "Querétaro" junto a "Queretaro"). Los vendedores sin asesor se agrupan bajo la clave "Sin asesor".
    - **Orden de carga crítico:** `loadSellers()` hace `sellers.set()` → `await loadAsesores()` → `applyFilters()`. El orden por asesor necesita el mapa `socio_id → nombre` ya resuelto; invertir estos pasos hace que todo caiga en "Sin asesor".
    - **Estado vacío con dos ramas:** "Aún no hay vendedores registrados" (sin vendedores) y "Sin resultados / Ajusta tu búsqueda" con botón **Limpiar búsqueda** → `clearFilters()`, que reinicia `searchTerm` y `sortBy = 'asesor'`.
    - **CSS:** se recuperaron del historial las reglas `.toolbar`, `.search-wrapper`, `.search-icon`, `.search-input`, `.search-clear` y `.toolbar-select` (base y media query de 768px). Siguen eliminadas `.results-count`, `.chip*`, `.stats-grid`, `.stat-*`, `.tone-*`, `.semaforo-cell` y `.dot*`. El `margin-bottom` de `.page-header` volvió a `1.15rem` porque la barra volvió a separar el encabezado de la tabla.

24. **Cierre de los ajustes 15-19 — correcciones, robustez y limpieza (26/09/2026):**
    - **Errores visibles en vez de silenciosos.** `AdminService.getAsesorNames()` ahora devuelve `{ mapa, error }` en lugar de tragarse el fallo: si la consulta a `profiles` falla, la columna ASESOR se degrada entera a "Sin asesor" y eso **debe** verse. `AdminSellersComponent.avisoAsesores` muestra un banner con botón **Reintentar** (`reintentarAsesores()`).
    - **`actualizado_at` volvió a ser real.** `MaterialesService.save()` manda `actualizado_at: new Date().toISOString()` en el upsert; antes la columna se quedaba congelada en la fecha de creación porque la tabla `materiales` no tiene trigger. *Opción si algún día se muestra la fecha: agregar un trigger `BEFORE UPDATE` en una migración nueva en lugar de mandar el timestamp desde el cliente.*
    - **Búsqueda sin falsos positivos.** `SIN_ASESOR` ('Sin asesor') es una constante exportada. El nombre del asesor entra al comparador **solo si no es `SIN_ASESOR`**: escribir "sin asesor" ya no lista a todos los vendedores que no lo tienen. El orden por asesor **sí** lo usa como clave de agrupación.
    - **Guardas de concurrencia.** `AdminSellersComponent.loadSellers()` verifica `sellersRequest` **después** del `await loadAsesores()`: `loadAsesores()` devuelve el mapa en vez de escribirlo, y la escritura solo ocurre si esa carga sigue vigente. `AdminMaterialesComponent` hace lo propio con `pdfRequest` en `refrescarPdf(clave)`, para que la vista previa de una pestaña que ya no está activa no pueda pisar la actual. `MaterialComponent` y `AdminMaterialesComponent` **limpian el estado anterior** (`pdfUrl` / `pdfPreviewUrl`) al empezar una carga.
    - **`MaterialComponent` es reactivo al parámetro de ruta.** `ngOnInit` no se re-dispara al cambiar el parámetro de la misma ruta (Angular reutiliza el componente), así que el contenido se congelaba. Ahora un `effect()` en el constructor depende de `clave` y llama a `cargar(clave)` dentro de `untracked()`, con su propio token de request. El componente ya **no implementa `OnInit`**.
    - **Notas — regla y excepción.** El resumen previo a eliminar un vendedor en `admin-sellers.ts` pasó de una consulta directa a `notas` a `NotesService.getNotes('seller', id)`. **Los conteos agregados siguen consultando `notas` directo** (`admin-seguimiento.ts` y `admin.service.ts`) porque migrarlos al servicio sería N+1 llamadas RPC: es una excepción deliberada, no un descuido.
    - **Código muerto eliminado** (todo preexisting salvo donde se indica): `admin-sellers.ts` → `selectSeller()`, `getSellerQuoteCount()`, `confirmAction` (se escribía en 4 sitios y nunca se leía), y **todo el tooltip de notas de Vendedores** (`mostrarNotasTooltip()`, `ocultarNotasTooltip()`, `showSellerTooltip`, `sellerTooltipContent`, `sellerTooltipPosition`, el bloque `.seller-notes-tooltip` del HTML y sus 4 reglas CSS). Ese tooltip **ya estaba muerto en la UI** desde antes del Ajuste 18: nada en la plantilla lo disparaba. También `claves` en `admin-materiales.ts`, el campo `ruta` del catálogo `MATERIALES` y las clases sin regla `mat-headings` / `mat-modes`.


