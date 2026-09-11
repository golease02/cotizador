# Plan: Pendientes Sección 7 AGENTS.md

## Estado: Esperando aprobación del usuario

---

## Bloque 1 — Cotizador: limpieza de interfaz (depósito, seguro, alineación)

**Items:** Eliminar "Depósito en garantía" de la interfaz · Cambiar seguro de toggle a dropdown · Alinear porcentajes 10% y 2% a la derecha

**Archivos a tocar:**
- `src/app/components/quote-form/quote-form.component.html` (líneas 117–136)
- `src/app/components/quote-form/quote-form.component.ts` (formControl `securityDepositPct`, método `setInsurance`)
- `src/app/components/quote-form/quote-form.component.css`
- `src/app/components/quote-options/` (CSS alineación de porcentajes)
- `src/app/components/quote-breakdown/quote-breakdown.component.css` (CSS alineación 10%/2%)

**Riesgo:** bajo
**¿Requiere migración SQL?:** no

---

## Bloque 2 — Cotizador: renta máxima 50% + comisión del vendedor

**Items:** Renta extraordinaria máxima 50% (código impone 40%) · Mostrar comisión del vendedor en el cotizador (solo interfaz, NO tocar PDF)

**Aclaración del usuario:** La comisión se muestra SOLO en la interfaz del cotizador, abajo del formulario. NO tocar `quote-breakdown.component.html`.

**Archivos a tocar:**
- `src/app/models/leasing.model.ts` (`maxRentAndResidualPct`, `residualOption1Pct`, `advisoryFee`)
- `src/app/components/quote-form/quote-form.component.ts` (`maximumExtraordinaryRentPct`)
- `src/app/services/financial-calculator.service.ts` (cálculo de comisión)
- `src/app/components/cotizador/cotizador.html` (mostrar comisión abajo del formulario)

**Riesgo:** medio (afecta lógica de cálculo; verificar que la fórmula PMT y los límites sigan consistentes)
**¿Requiere migración SQL?:** no

---

## Bloque 3 — Dashboard: renombrar "Urgentes" → "Por caducar"

**Items:** Nomenclatura del dashboard

**Aclaración del usuario:** Confirmar si la migración `20260910000005_socio_scope_rpcs.sql` ya está aplicada en Supabase y si se necesita una migración nueva para renombrar las claves JSONB, o si basta con cambiar el frontend.

**Decisión del usuario:** Pendiente de confirmar si la migración está aplicada. Si NO está aplicada, se necesita una migración nueva para renombrar las claves JSONB en la RPC `get_admin_stats`. Si YA está aplicada, basta con cambiar el frontend.

**Archivos a tocar:**
- `src/app/components/admin/admin-stats/admin-stats.ts` (líneas 21, 31, 52, 61, 64, 69, 71, 72, 110)
- `src/app/components/admin/admin-stats/admin-stats.component.html` (líneas 46, 47, 140, 142, 144, 157)
- `src/app/components/admin/admin-quotes/admin-quotes.ts` (línea 434)
- `src/app/components/admin/admin-quotes/admin-quotes.component.html` (líneas 13, 38)
- `supabase/migrations/20260910000005_socio_scope_rpcs.sql` (líneas 87, 181, 230, 237 — claves `totalUrgentes`/`urgentes`) — solo si la migración NO está aplicada

**Riesgo:** bajo
**¿Requiere migración SQL?:** sí (si la migración actual no está aplicada en Supabase)

---

## Bloque 4 — Admin: permisos granulares en rutas hijas

**Items:** Aplicar `canAccessModule()` en las rutas hijas del admin (actualmente `adminGuard` solo verifica rol)

**Política por defecto recomendada (del usuario):** Si un socio tiene `permisos` en null o vacío, solo permitir los módulos básicos (dashboard, cotizaciones, vendedores) y bloquear los sensibles (admins, parámetros).

**Archivos a tocar:**
- `src/app/guards/admin-guard.ts`
- `src/app/services/auth.service.ts` (`canAccessModule`)
- `src/app/app.routes.ts` (rutas hijas del admin)

**Riesgo:** medio (puede bloquear acceso accidental si hay rutas no cubiertas por el JSONB `permisos`)
**¿Requiere migración SQL?:** no

---

## Bloque 5 — Admin: UI para asignar/cambiar socio de un vendedor

**Items:** Asignar/cambiar socio de un vendedor (super-admin) — falta UI

**Archivos a tocar:**
- `src/app/components/admin/admin-sellers/admin-sellers.ts`
- `src/app/components/admin/admin-sellers/admin-sellers.component.html`

**Riesgo:** medio (el trigger `secure_profiles_row` exige restaurar la sesión del admin antes del `upsert`; ver líneas 577–581 de `admin-sellers.ts`)
**¿Requiere migración SQL?:** no

---

## Bloque 6 — Registro

**Items:** Revisar y corregir el registro de vendedores (email `vendedor_${phone}@golease.com`, asignación de socio, validaciones)

**Archivos a tocar:**
- `src/app/components/auth/register/register.ts`
- `src/app/components/auth/register/register.html`

**Riesgo:** bajo
**¿Requiere migración SQL?:** no

---

## Bloque 7 — Limpieza de archivos de diagnóstico

**Items:** Eliminar `a1_rpcs.txt`, `a2_schema.sql`, `a3_b64.txt`, `a5_rpcs_clean.sql`, `a6_test_rpc_scope.mjs` de la raíz del proyecto (aparecen como no trackeados en `git status`)

**Archivos a tocar:**
- Eliminar archivos de la raíz: `a1_rpcs.txt`, `a2_schema.sql`, `a3_b64.txt`, `a5_rpcs_clean.sql`, `a6_test_rpc_scope.mjs`

**Riesgo:** bajo
**¿Requiere migración SQL?:** no

---

## Dependencias entre bloques

- Bloques 1, 2, 3, 4, 5, 6, 7 son independientes entre sí.
- Bloque 3 puede requerir una migración SQL (confirmar si `20260910000005` está aplicada).
- Bloque 4 define la política por defecto de permisos (null/vacío → solo básicos).

## Validación esperada

- `npm test -- --run` al terminar cada bloque.
- `npm run build` para verificar que no hay errores de compilación.
- Revisar que los guards no bloqueen acceso accidental en Bloque 4.