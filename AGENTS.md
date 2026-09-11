# AGENTS.md — Cotizador GoLease

> **Propósito:** Documento "cerebro compartido" para agentes de IA (Cline, Kilo Code, OpenCode) que trabajen en este repositorio. Cualquier agente debe poder leerlo en 2 minutos y entender el proyecto.

## 1. Descripción del proyecto

**Cotizador de arrendamiento vehicular para GoLease MX** — aplicación web SPA que permite a vendedores generar cotizaciones de arrendamiento puro (leasing) con 3 opciones de valor residual, exportarlas a PDF y gestionar su historial. Incluye un panel de administración para super-admin y socios.

### Stack tecnológico

| Capa        | Tecnología                                      |
|------------|-------------------------------------------------|
| Frontend    | Angular 22 (standalone components, Signals)     |
| Backend     | Supabase (PostgreSQL + Auth + RLS)              |
| Base de datos | PostgreSQL (vía Supabase, con políticas RLS)  |
| ORM/Client  | `@supabase/supabase-js` (no hay ORM en el cliente) |
| PDF         | `html2canvas` + `jspdf` (renderizado de HTML → canvas → PDF) |
| Tests       | Vitest (vía `ng test`, Angular TestBed)        |
| Formateo    | Prettier (singleQuote, 100 chars) + EditorConfig |
| Build       | `@angular/build:application`                   |
| Routing     | Hash strategy (`withHashLocation`)             |
| Package manager | npm 11.17.0 (`package-lock.json`)            |

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
│   │   │   ├── catalog.service.ts      # Catálogo vehículos/placas + config del cotizador
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
│   │   │   └── quote-validity.ts       # Lógica de vigencia (7 días, "Por vencer")
│   │   ├── components/
│   │   │   ├── auth/                  # Login (por celular), Registro, Recuperar/Reset
│   │   │   ├── cotizador/             # Pantalla principal del cotizador (form + options + breakdown)
│   │   │   ├── quote-form/            # Formulario de datos del vehículo
│   │   │   ├── quote-options/         # 3 tarjetas de opciones de arrendamiento
│   │   │   ├── quote-breakdown/       # Desglose detallado + PDF (NO MODIFICAR)
│   │   │   ├── vendedor/
│   │   │   │   └── mis-cotizaciones/  # Lista de cotizaciones del vendedor
│   │   │   ├── admin/                 # Panel de administración:
│   │   │   │   ├── admin-dashboard/   # Layout con sidebar + navegación
│   │   │   │   ├── admin-stats/       # Métricas del dashboard
│   │   │   │   ├── admin-sellers/     # CRUD de vendedores
│   │   │   │   ├── admin-admins/      # CRUD de socios (super-admin only)
│   │   │   │   ├── admin-quotes/      # Lista y gestión de todas las cotizaciones
│   │   │   │   ├── admin-vehicles/    # CRUD de catálogo de vehículos
│   │   │   │   ├── admin-plates/      # CRUD de placas por estado
│   │   │   │   └── admin-parameters/  # Configuración del cotizador (porcentajes, etc.)
│   │   │   ├── perfil/                # Perfil de usuario
│   │   │   └── header/                # Header + navegación móvil
│   │   └── environments/
│   │       ├── environment.ts         # Dev config (Supabase URL + anon key)
│   │       └── environment.prod.ts    # Prod config (mismo URL/key)
│   ├── index.html
│   └── styles.css
├── supabase/
│   ├── migrations/                    # Migraciones SQL (timestamps 20260309 + 20260910)
│   │   └── 20260910000005_socio_scope_rpcs.sql  # RPCs con scope por socio
│   └── config.toml                    # [gitignored] Config local de Supabase CLI
├── package.json / package-lock.json
├── angular.json
├── .prettierrc / .editorconfig
├── .gitignore
└── AGENTS.md                          # ← este archivo
```

### Asignación de código a responsabilidades

| Responsabilidad              | Archivo(s) clave                                        |
|-----------------------------|---------------------------------------------------------|
| Lógica del cotizador        | `financial-calculator.service.ts`, `leasing.model.ts`   |
| Generación de PDF           | `pdf-export.service.ts` + `quote-breakdown.component.html` (NO MODIFICAR) |
| Autenticación               | `auth.service.ts`, `login.ts`, `register.ts`            |
| Roles y permisos            | Guards (`auth`, `admin`, `super-admin`) + `auth.service.ts` (`canAccessModule`) |
| CRUDs de admin              | `components/admin/admin-*/`                             |
| Dashboard                   | `components/admin/admin-stats/`, `admin-dashboard/`    |
| Registro de vendedor        | `components/auth/register/register.ts`                 |
| Catálogo de vehículos/placas| `catalog.service.ts`, `admin-vehicles/`, `admin-plates/` |
| Estado de cotizaciones      | `utils/quote-validity.ts`                               |

## 3. Roles y permisos

### Modelo de roles (`profiles.role`)

| Rol          | Descripción                                                                 |
|-------------|------------------------------------------------------------------------------|
| `super_admin` | Acceso total. Ve todas las cotizaciones de todos los vendedores. Puede crear/eliminar cualquier usuario, asignar roles, cambiar socio de un vendedor, y otorgar permisos granulares. |
| `socio`    | (antes llamado `admin`) Ve solo sus vendedores asociados (vía `socio_id`). Tiene los permisos que el super-admin le otorgue (`permisos` JSONB). Puede crear vendedores bajo su red. |
| `seller`   | Solo ve y crea sus propias cotizaciones. No accede al panel admin.           |

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
  - `canManageProfile(targetUserId)` → propietario, super_admin, o socio del mismo grupo
  - `canAccessModule(module)` → super_admin = todo; seller = todo; socio = revisa `permisos` JSONB
  - `createUserAsAdmin()` → super_admin crea cualquier rol; socio solo crea `seller`
- **Routing** — `src/app/app.routes.ts`:
  - `/` → Mis Cotizaciones (seller) con `AuthGuard`
  - `/cotizador` → Cotizador con `AuthGuard`
  - `/admin` → AdminDashboard con `AuthGuard` + `adminGuard`, hijos con `superAdminGuard` en `/admin/admins`

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

- El super-admin debe poder **asignar/cambiar el socio de un vendedor** — el trigger `secure_profiles_row` impide que no-socios cambien `socio_id`, pero **falta la UI en `admin-sellers`** para que el super-admin seleccione el socio.(Aun no existe)
- Los permisos granulares (`permisos` JSONB) están modelados en BD y en `AdminAdminsComponent`, pero **falta aplicar `canAccessModule()` en las rutas hijas del admin** (actualmente `adminGuard` solo verifica rol, no permisos específicos).

## 4. Reglas de negocio del cotizador

### Parámetros actuales (en `DEFAULT_CALCULATOR_CONFIG` → `leasing.model.ts`)

| Parámetro                         | Valor        |
|-----------------------------------|-------------|
| IVA                               | 16%         |
| Comisión de asesoría (advisoryFee)| 2%          |
| Seguro estimado                   | 3.5%        |
| Fee administrativo inicial        | $3,334.50   |
| Renta + VR máxima                 | 75%         |
| Mínimo renta extraordinaria       | 10% (<$650k), 15% ($650k–$1.5M), 20% (>$1.5M) |
| Renta básica estándar             | $6,000      |
| Renta básica híbrido/eléctrico    | $8,550      |
| Distribución mensual              | 60% flota / 40% admin |
| Residuales (opciones 1/2/3)       | 35% / 20% / 5% |
| Plazos disponibles                | 12, 24, 36, 48 meses |

### Reglas vigentes

1. **Sin pago mínimo por precio de vehículo** — no hay un "fee" adicional basado en el precio; la renta extraordinaria es el enganche deducible.
2. **Sin condición de precio para cotizar** — cualquier precio neto ≥ $10,000 puede cotizarse (`Validators.min(10000)` en `quote-form.component.ts`).
3. **Renta extraordinaria máxima: 50%** — el slider se limita a `maxRentAndResidualPct − residualOption1Pct` = 75% − 35% = **40%** (opción 1). El super-admin puede ajustar `maxRentAndResidualPct` en `admin-parameters`. **Pendiente:** el negocio indica 50% como techo absoluto; el código actual lo impone a 40%.
4. **Depósito en garantía** — **sigue visible en la interfaz** (`quote-form.component.html` líneas 117–124). Regla: **eliminar de la interfaz**, siempre aplicado por defecto en cálculos. [NO IMPLEMENTADO — ver Pendientes]
5. **Comisión del vendedor** — **no se muestra en el cotizador**. [NO IMPLEMENTADO — ver Pendientes]
6. **Híbrido** — toggle Sí/No (implementado en `quote-form.component.html`). La renta básica cambia de $6,000 a $8,550.
7. **Seguro** — actualmente es un toggle (Pendiente $0 / Estimado 3.5%). Regla: **cambiar a menú desplegable**. [NO IMPLEMENTADO]
8. **Porcentajes 10% y 2%** — deben alinearse a la derecha. [NO IMPLEMENTADO — ver Pendientes]
9. **Nomenclatura del dashboard** — usar **"Por caducar"** en lugar de "Urgentes". Actualmente se usa "Urgentes"/"Urgente" en `admin-quotes`, `admin-stats`, y los RPCs (`totalUrgentes`, `urgentes`). [NO IMPLEMENTADO — ver Pendientes]
10. **PDF** — el PDF (componente `quote-breakdown`) **no se toca** salvo indicación explícita. Los cambios de "opciones de arrendamiento" son solo en la interfaz del cotizador.

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

## 5. Convenciones de código

### Idioma

| Contexto          | Idioma      | Ejemplos                                           |
|-------------------|------------|----------------------------------------------------|
| Negocio/UI strings| Español    | `cotizador`, `vendedor`, `socio`, `cotizaciones`   |
| Variables TS      | **Inglés** técnico, **español** para negocio | `extraordinaryRentPct`, `minimumRentPct`, `seller_number` |
| Columnas de BD    | Inglés (lowercase) | `seller_id`, `pricenet`, `extraordinaryrentpct`, `securitydepositpct` |
| Nombres de RPC    | Inglés/snake_case | `get_admin_stats`, `get_seller_scope_ids`, `create_user` |
| HTML/CSS          | Español    | textos, clases CSS                                 |

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
- **Aplicar cambios:** `npx supabase db push` (o `supabase db reset` para desarrollo)
- **No hay seeders tradicionales** — los catálogos base se insertan en `000001_bootstrap_super_admin.sql` (vehículos, placas)

### Tests

```bash
npm test                    # Vitest vía ng test (watch mode por defecto)
npm test -- --run           # Ejecución única (CI)
```

- **Framework:** Vitest globals (`describe`, `it`, `expect`, `vi`)
- **Setup:** Angular `TestBed` con componentes standalone
- **Archivos de test:** `*.spec.ts` al lado del código que testean
- **Test actuales:** `financial-calculator.service.spec.ts`, `quote-validity.spec.ts`, `login.spec.ts`, `admin-guard.spec.ts`

### Commits

- **Formato:** español descriptivo (no Conventional Commits)
- Ejemplos del historial:
  - `Fix crash al abrir drawer Nuevo Socio: catalogos constantes + detectChanges sincrono en zoneless`
  - `Bloque 2: sin mapas, ubicacion por texto libre (registro, vendedores, perfil) + refinamientos permisos/contacto GoLease`
  - `Bloque 1`
- Algunos commits hacen referencia a "Bloque N" → sugiere planificación por bloques/sprints.
- Los archivos `a1_rpcs.txt`, `a5_rpcs_clean.sql`, `a6_test_rpc_scope.mjs` en la raíz son artefactos de debugging, no parte del build.

## 6. Reglas para los agentes de IA

1. **Inspeccionar antes de modificar** — siempre lee el archivo, entiende el contexto, y verifica queries RPC antes de proponer cambios.
2. **Trabajar en modo Plan antes de Act** — explora, analiza, propone, y confirma con el usuario antes de editar.
3. **Commits pequeños y frecuentes** — un cambio de responsabilidad por commit. Usa mensajes descriptivos en español.
4. **No reescribir código existente sin avisar** — propone primero; si hay refactor necesario, hazlo en un commit separado.
5. **Usar el modo Debug para diagnosticar, no para construir** — lee logs, revisa errores, inspecciona la BD; no uses el debug como justificación para añadir features no solicitadas.
6. **No tocar el PDF salvo requerimiento explícito** — el componente `quote-breakdown` y su HTML son el motor de generación de PDF; no modificar salvo que se pida expresamente.
7. **Al terminar un bloque, correr pruebas** — `npm test -- --run` y verificar que nada rompa.
8. **Resumir cambios** — al finalizar, lista qué se modificó, por qué, y cómo probarlo.
9. **Si hay dudas, preguntar antes de asumir** — marca incertidumbres como `[POR CONFIRMAR]` en vez de inventar.
10. **Respeta el stack existente** — no agregues librerías nuevas sin consultar.

## 7. Pendientes conocidos

### Cotizador (interfaz)

| Requerimiento | Estado | Archivo(s) involucrados |
|--------------|--------|------------------------|
| Eliminar "Depósito en garantía" de la interfaz (mantener en cálculos) | **Pendiente** | `quote-form.component.html` (líneas 117–124), `quote-form.component.ts` (formControl `securityDepositPct`) |
| Mostrar comisión del vendedor en el cotizador | **Pendiente** | `quote-breakdown.component.html`, `financial-calculator.service.ts` |
| Cambiar selector de seguro de toggle a menú desplegable | **Pendiente** | `quote-form.component.html` (líneas 126–136), `quote-form.component.ts` (`setInsurance`) |
| Alinear porcentajes 10% y 2% a la derecha | **Pendiente** | CSS de `quote-form` / `quote-options` / `quote-breakdown` |
| Renta extraordinaria máxima: 50% (código impone 40%) | **Pendiente** | `quote-form.component.ts` (`maximumExtraordinaryRentPct`), `leasing.model.ts` |

### Dashboard / Admin

| Requerimiento | Estado | Archivo(s) |
|--------------|--------|-----------|
| Renombrar "Urgentes" → "Por caducar" en el dashboard | **Pendiente** | `admin-stats.ts` (línea 72, 110), `admin-stats.component.html` (línea 46), `admin-quotes.ts` (línea 110), `admin-quotes.component.html` (líneas 13, 38) |
| Aplicar permisos granulares (`permisos` JSONB) en rutas admin | **Pendiente** | `admin-guard.ts`, `auth.service.ts` (`canAccessModule`) |

### Registro

| Requerimiento | Estado | Archivo(s) |
|--------------|--------|-----------|
| El registro crea el email `vendedor_${phone}@golease.com` | Implementado | `register.ts` |
| Asignación de socio (socio_id) al registrarse | Implementado (selector de contacto GoLease) | `register.html` |

### CRUDs

| Requerimiento | Estado | Archivo(s) |
|--------------|--------|-----------|
| Asignar/cambiar socio de un vendedor (super-admin) | Parcial (BD lo permite, falta la UI) | `admin-sellers.ts/.html` |
| CRUD de notas de seguimiento | Implementado | `admin-sellers.ts`, `admin-quotes.ts` (tabla `notas`) |

### Despliegue móvil

| Requerimiento | Estado |
|--------------|--------|
| PWA / instalable en móvil | [POR CONFIRMAR] — hay navegación móvil (`mobile-bottom-nav`) pero no hay manifiesto PWA ni service worker |
| Optimización para pantallas pequeñas | Implementado (media queries en CSS) |

## 8. Notas y decisiones previas

1. **Login por celular, no por email:** El login se realiza con el número de celular (`seller_number`), pero la autenticación de Supabase requiere email. La solución: el email de `profiles.email` actúa como "email espejo" y se usa para `signInWithPassword`. Nunca se construye un email desde el rol/teléfono. Documentado en `login.ts` y testeado en `login.spec.ts`.

2. **Trigger `secure_profiles_row` (SECURITY DEFINER):** Bloquea auto-promoción de rol y cambio de `socio_id` por no-super-admin. Los servicios de creación de usuarios deben **restaurar la sesión del admin** antes de hacer `upsert` en `profiles`, porque el trigger verifica `auth.uid()` del usuario actual (ver `admin-sellers.ts` líneas 577–581 y `admin-admins.ts` línea 485).

3. **Fallbacks en `admin.service.ts`:** Las RPCs `get_admin_stats()` y `get_sellers_with_quote_counts()` pueden no existir en la BD si las migraciones no se aplicaron. El servicio tiene fallbacks con consultas REST + agregaciones locales (`computeQuoteColor`). Si la RPC falla con `PGRST202` o "could not find the function", usa el fallback.

4. **Color de cotización recalculado:** El color (`rojo`/`amarillo`/`reciente`/`verde`) se recalcula en cliente (`admin.service.ts` `computeQuoteColor`) y en RPC (`a5_rpcs_clean.sql`). Regla: revisada=verde, >7 días=rojo, >2 días=amarillo, resto=reciente.

5. **Snapshot vs recálculo:** Cuando se abre el detalle de una cotización, se prefiere el **snapshot guardado en JSONB** (`calculation` column) sobre recalcular. Si no existe, se recalcular con los datos de la fila (`buildInputFromRow`).

6. **Supabase local:** El `config.toml` está en `.gitignore` (no versionado). Las migraciones usan `BEGIN/COMMIT` y funciones SECURITY DEFINER para evitar recursión RLS (migración 004).

7. **Hash routing:** La app usa `withHashLocation()` → todas las rutas usan `#` (ej. `/#/login`). Esto afecta el `redirectTo` en password recovery (`window.location.origin}/#/reset-password`).

8. **No hay backend propio:** Todo el login, validación y autorización se hace en Supabase (RLS + RPCs). No hay servidor Express/Fastify. Los archivos `a1_rpcs.txt`, `a5_rpcs_clean.sql`, `a6_test_rpc_scope.mjs` en la raíz son artefactos de diagnóstico, no parte del build.

9. **`.kilo/skills/`:** Contiene referencias de patrones Angular de Kilo Code (`component-patterns.md`). No afecta el build; es documentación de estilo.

10. **Commit `d63ddf0` — "Remove build/test/audit logs and update gitignore":** Los archivos `.txt`, `.sql`, `.mjs` de diagnóstico están pendientes de ser limpiados del repositorio (aparecen como no trackeados en `git status`).
```
