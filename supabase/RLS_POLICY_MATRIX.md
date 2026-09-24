# Matriz de Políticas RLS — Cotizador

> **Fecha:** 2026-03-09 | **Migración:** `20260309120000_harden_rls.sql`

## 1. Helper central

| Función | Tipo | Descripción |
|---------|------|-------------|
| `public.is_admin()` | `SECURITY DEFINER`, `STABLE` | Retorna `true` si el usuario autenticado tiene `role = 'admin'` y `active = true` en `profiles`. Usada en todas las políticas para evitar recursión. |

## 2. Matriz por tabla

### `profiles`
| Operación | Rol | Condición |
|-----------|-----|-----------|
| SELECT | authenticated | `id = auth.uid()` OR `is_admin()` |
| INSERT | authenticated | `is_admin()` OR `id = auth.uid` |
| UPDATE | authenticated | `id = auth.uid()` OR `is_admin()` |
| DELETE | authenticated | `is_admin()` |

**Trigger `trg_profiles_secure_row`:** bloquea auto-promoción de `role`, cambio de `id` y auto-activación. Admin exento.

### `quotes`
| Operación | Rol | Condición |
|-----------|-----|-----------|
| SELECT | authenticated | `seller_id = auth.uid()` OR `is_admin()` |
| INSERT | authenticated | `is_admin()` OR `seller_id = auth.uid()` |
| UPDATE | authenticated | `is_admin()` OR `seller_id = auth.uid()` |
| DELETE | authenticated | `is_admin()` |

**Trigger `trg_quotes_secure_row`:** impide transferir `seller_id`, cambiar `revisada`/`fijada`, y restaura `color`/`status_color`/`last_reviewed_at` a sus valores anteriores. Admin exento.

### `state_plates`
> Nota: el catálogo `vehicles` fue **eliminado** (migración `20260910000009_drop_vehicles_table.sql`).

| Operación | Rol | Condición |
|-----------|-----|-----------|
| SELECT | anon, authenticated | `true` (catálogo público) |
| INSERT | authenticated | `is_admin()` |
| UPDATE | authenticated | `is_admin()` |
| DELETE | authenticated | `is_admin()` |

### `notas`
| Operación | Rol | Condición |
|-----------|-----|-----------|
| SELECT | authenticated | `creado_por = auth.uid()` OR `is_admin()` |
| INSERT | authenticated | `creado_por = auth.uid()` |
| UPDATE | authenticated | `creado_por = auth.uid()` OR `is_admin()` |
| DELETE | authenticated | `creado_por = auth.uid()` OR `is_admin()` |

### `quote_seguimiento` (módulo Seguimiento)
> Migración: `20260917000000_quote_seguimiento.sql` · Tabla 1:1 con `quotes` (`quote_id` = PK/FK).

| Operación | Rol | Condición |
|-----------|-----|-----------|
| SELECT | authenticated | `can_access_seguimiento(quote_id)` → super_admin, o socio dueño del vendedor de la cotización |
| INSERT | authenticated | `can_access_seguimiento(quote_id)` |
| UPDATE | authenticated | `can_access_seguimiento(quote_id)` (USING + WITH CHECK) |
| DELETE | authenticated | `is_seguimiento_admin()` (solo super_admin) |

**Helpers (SECURITY DEFINER, `search_path = public`):**
- `is_seguimiento_admin()` → `true` si el usuario actual es `super_admin` activo.
- `can_access_seguimiento(bigint)` → `is_seguimiento_admin()` **OR** el `socio_id` del vendedor de la cotización = `auth.uid()` (socio activo).

**Regla de negocio:** los **vendedores no tienen acceso directo** a esta tabla (ni lectura ni escritura). El `moduleGuard('seguimiento')` + `canAccessModule()` lo reflejan en el frontend.

**Lectura segura para Mis Cotizaciones:** la RPC `get_vendedor_seguimiento()` permite a un vendedor consultar únicamente sus propias cotizaciones y el avance mínimo de seguimiento (`etapas`, `fecha_cierre` y actividad visible). No expone notas ni permite modificar la tabla; las mutaciones continúan reservadas al panel administrativo.

**Trigger `trg_seguimiento_touch`:** actualiza `updated_at` en cada UPDATE.

### `calculator_settings`
| Operación | Rol | Condición |
|-----------|-----|-----------|
| SELECT | authenticated | `true` |
| INSERT | authenticated | `is_admin()` |
| UPDATE | authenticated | `is_admin()` |
| DELETE | authenticated | `is_admin()` |

## 3. Endurecimiento de RPCs SECURITY DEFINER

| Función | Cambio |
|---------|--------|
| `delete_user` | Agregada validación `is_admin()` + prohibido auto-borrado. Grants: `authenticated`, `service_role` |
| `get_profile_by_seller` | Reescribe para excluir columnas sensibles (`recovery_email`, `phone`, `lat/long`). Grants: `anon`, `authenticated`, `service_role` |
| `request_password_recovery` | Validación de formato + bloqueo de account-takeover (enrolamiento inicial requiere coincidencia con `email` espejo). Grants: `anon`, `authenticated`, `service_role` |
| `update_user_password` | Revocado de `PUBLIC`/`anon`. Grants: `authenticated`, `service_role` |
| `handle_new_user` | `search_path` endurecido a `'public'` |
| `update_user_email` | **ELIMINADA** (no referenciada en frontend) |

## 4. Funciones trigger (solo motor)

| Función | Tabla | Grants |
|---------|-------|--------|
| `secure_profiles_row` | `profiles` | Revocado de `PUBLIC`/`anon` |
| `secure_quotes_row` | `quotes` | Revocado de `PUBLIC`/`anon` |

## 5. Rollback

```sql
-- Revertir a políticas anteriores (si es necesario)
DROP POLICY IF EXISTS profiles_select_own_or_admin_v2 ON public.profiles;
DROP POLICY IF EXISTS profiles_insert_own_v2 ON public.profiles;
DROP POLICY IF EXISTS profiles_update_own_or_admin_v2 ON public.profiles;
DROP POLICY IF EXISTS profiles_delete_admin_only_v2 ON public.profiles;
-- ... (aplicar para cada tabla)

-- Restaurar función eliminada (si se requiere)
CREATE OR REPLACE FUNCTION public.update_user_email(uuid, text) ...
```

## 6. Verificación post-aplicación

```bash
supabase db query --linked --file supabase/audits/02_verify_rls.sql
```

Resultado esperado:
- `RLS_CHECK`: PASS (5/5 tablas con RLS)
- 4 políticas por tabla
- 0 funciones expuestas a anon/PUBLIC (excepto las esperadas)
- 0 políticas `USING(true)` en tablas sensibles
- `DROP_CHECK`: PASS
- 4 triggers de seguridad activos
# 📋 Matriz de Políticas RLS — Cotizador (bcsvqvibccfnsmagwkbr)

**Última actualización:** 2026-09-17 (módulo Seguimiento: `quote_seguimiento`)
**Migración de endurecimiento:** `supabase/migrations/20260309120000_harden_rls.sql`

---

## 📋 Matriz Rol × Tabla × Operación

| Tabla \ Rol                    | `anon`     | `authenticated` (seller) | `authenticated` (admin) | `service_role` | `superuser` |
|-------------------------------|------------|--------------------------|-------------------------|----------------|-------------|
| **profiles**                  | ✗ SELECT   | ✓ propia fila            | ✓ todas filas           | ✓              | ✓           |
|                               | ✗ INSERT   | ✓ propia (rol fijado)    | ✓ (via RPC create_user) | ✓              | ✓           |
|                               | ✗ UPDATE   | ✓ propia, campos limitados | ✓ todo                | ✓              | ✓           |
|                               | ✗ DELETE   | ✗                        | ✓                       | ✓              | ✓           |
| **quotes**                    | ✗          | ✓ propias                | ✓ todas                 | ✓              | ✓           |
|                               | ✗          | ✓ INSERT (seller_id auto)| ✓                       | ✓              | ✓           |
|                               | ✗          | ✓ UPDATE propio, cols admin bloqueadas | ✓ todo       | ✓              | ✓           |
|                               | ✗          | ✗ DELETE                 | ✓                       | ✓              | ✓           |
| **notas**                     | ✗          | ✓ propias o admin        | ✓ todas                 | ✓              | ✓           |
|                               | ✗          | ✓ INSERT require admin   | ✓                       | ✓              | ✓           |
|                               | ✗          | ✓ UPDATE propio          | ✓                       | ✓              | ✓           |
|                               | ✗          | ✓ DELETE propio o admin  | ✓                       | ✓              | ✓           |
| **state_plates**              | ✓ SELECT   | ✓ SELECT                 | ✓ SELECT                | ✓ SELECT       | ✓ SELECT    |
|                               | ✗ INSERT   | ✗                        | ✓                       | ✓              | ✓           |
|                               | ✗ UPDATE   | ✗                        | ✓                       | ✓              | ✓           |
|                               | ✗ DELETE   | ✗                        | ✓                       | ✓              | ✓           |
| **calculator_settings**       | ✗          | ✓ SELECT                 | ✓                       | ✓              | ✓           |
|                               | ✗          | ✗ INSERT                 | ✓                       | ✓              | ✓           |
|                               | ✗          | ✗ UPDATE                 | ✓                       | ✓              | ✓           |
|                               | ✗          | ✗ DELETE                 | ✓                       | ✓              | ✓           |

---

## 🔒 RPCs (Funciones SECURITY DEFINER)

| Función                       | Propósito                          | Roles con EXECUTE                          | Restricciones                          |
|-------------------------------|------------------------------------|-------------------------------------------|----------------------------------------|
| `is_admin()`                  | Helper para policies               | `anon`, `authenticated`, `service_role`   | `search_path=''` anti-shadowing        |
| `get_profile_by_seller(text)` | Login por número de celular        | `anon` ✅ (login público)                 | Devuelve SOLO: id, email, full_name, seller_number, active |
| `delete_user(uuid)`           | Eliminar usuario (admin)           | `authenticated`, `service_role`           | Requiere `is_admin()`; bloquea auto-borrado |
| `update_user_password(uuid,text)` | Cambio de password              | `authenticated`, `service_role`           | No expuesto a `anon`                   |
| `request_password_recovery(text,text)` | Enrollar/restablecer email de recuperación | `anon` ✅ | Valida formato de número (10 dígitos) y email; enrolamiento inicial requiere coincidencia con email espejo |
| `handle_new_user()`           | Trigger on sign-up                 | `PUBLIC`                                  | Inserta profile con `role='seller'`    |
| `update_user_email()`         | (Obsoleta)                         | —                                         | ❌ **DROPPEADA**                        |

## 🛡️ Triggers de Defensa en Profundidad

| Tabla   | Trigger                    | Función                  | Bloquea                              |
|---------|----------------------------|--------------------------|--------------------------------------|
| profiles | `trg_profiles_secure_row` | `secure_profiles_row()`  | Auto-promoción a admin, cambio de role, cambio de active, cambio de id |
| quotes   | `trg_quotes_secure_row`    | `secure_quotes_secure_row()` | Transferencia de cotización (seller_id), cambio de revisada/fijada, manipulación de color/status_color/last_reviewed_at |

## 🔄 Rollback

Para revertir los cambios de esta migración:

```sql
-- 1. Borrar triggers y funciones creadas
DROP TRIGGER IF EXISTS trg_profiles_secure_row ON public.profiles;
DROP TRIGGER IF EXISTS trg_quotes_secure_row ON public.quotes;
DROP FUNCTION IF EXISTS public.secure_profiles_row();
DROP FUNCTION IF EXISTS public.secure_quotes_row();
DROP FUNCTION IF EXISTS public.is_admin();

-- 2. Restaurar el dump de esquema previo
-- (ver supabase/audits/ — dump capturado antes de aplicar la migración)
```

## ✅ Verificación

Ejecutar:
```bash
supabase db query --linked --file supabase/audits/02_verify_rls.sql
```

Todos los checks deben reportar `PASS`. Verificación post-aplicación:
- ✅ CHECK 1: RLS enabled en tablas críticas — PASS
- ✅ CHECK 2: No USING(true) en tabs. sensibles — PASS
- ✅ CHECK 3: delete_user restringido — PASS
- ✅ CHECK 4: Helper is_admin() seguro — PASS
- ✅ CHECK 5: anon sin acceso a profiles — PASS
- ✅ CHECK 6: get_profile_by_seller no expone columna sensible — PASS
- ✅ CHECK 7: DELETE en quotes solo admins — PASS

## 📝 Notas de Implementación

- El helper `is_admin()` usa `STABLE` (no `VOLATILE`) y `SECURITY DEFINER` con `SET search_path = ''` para evitar ataques de shadowing.
- Los triggers usan `BEFORE` para modificar/rechazar operaciones antes de que RLS procese — defensa en capas.
- `get_profile_by_seller` fue redefinida (DROP + CREATE) para cambiar el esquema de columnas de retorno — no devuelve `recovery_email`.
- Las políticas usan nombres con sufijo `_v2` para diferenciar de las políticas originales y facilitar el rollback.
|                               | ✗          | ✗ DELETE                 | ✓                       | ✓              | ✓           |
**Estado:** ✅ Aplicada y verificada en producción

## 📋 Estado de grants — Endurecimiento 2026-09-18
> Migraciones: `20260918000000_harden_rpc_grants_search_path.sql` y
> `20260918001000_fix_grants_public.sql` (autocontenidas, idempotentes, aplicadas con `npx supabase db push`).
> Auditoría reproducible: `supabase/audits/03_harden_audit.sql` — `npx supabase db query --linked --file supabase/audits/03_harden_audit.sql --output csv`.

| Función | `anon` | `authenticated` | `service_role` | Nota |
|------------|--------|-----------------|----------------|------|
| `touch_seguimiento_updated_at`, `set_quotes_valid_until`, `secure_quotes_row`, `secure_profiles_row`, `handle_new_user` | ✗ | ✗ | ✓ | Triggers: `EXECUTE` revocado de `PUBLIC`/`anon`/`authenticated`; el motor de triggers no verifica grants, por lo que no se afecta. `search_path` fijado (`secure_quotes_row`/`touch_seguimiento_updated_at` con `''`; `set_quotes_valid_until` con `'public'`). |
| Helpers RLS (`is_admin`, `is_super_admin`, `can_view_profile`, `can_view_quote`, `is_socio_owner_of`, `shares_socio_group`, `is_seguimiento_admin`, `can_access_seguimiento`) | ✗ | ✓ | ✓ | Políticas RLS son `TO authenticated`; revocado `anon`/`PUBLIC`. |
| `delete_user(uuid)`, `get_seller_scope_ids()` | ✗ | ✓ | ✓ | El frontend las llama autenticado; cerrada exposición previa a `anon` (el grant original era a `PUBLIC`). |
| `purge_expired_quotes(integer)` | Purga automática de cotizaciones a los 15 días (excepto fijadas o con seguimiento real) | `service_role` ✅ (job pg_cron) | No expuesta al frontend |
| `get_profile_by_seller`, `get_public_socios`, `request_password_recovery` | ✓ | ✓ | ✓ | Intencionales: login/registro pre-auth. |

**Linter de Supabase resultante:** `function_search_path_mutable` → **0**; `anon_security_definer_function_executable` → 3 (login público, por diseño); `authenticated_security_definer_function_executable` → inherentes al patrón (defensa interna por `is_admin()`). Pendiente manual: activar **Leaked password protection** en Dashboard → Authentication (no es SQL ni código).