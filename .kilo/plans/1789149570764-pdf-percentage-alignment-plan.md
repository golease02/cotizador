# Plan: Alinear porcentajes 10% y 2% a la derecha en el PDF

## Contexto
Los porcentajes de "Renta Extraordinaria" (10%) y "Asesoría y gestión" (2%) en el PDF (`quote-breakdown.component.html`) están alineados al centro mediante la clase `.col-pct`. Se deben alinear a la derecha, igual que la fila "Valor residual Neto" que usa `.col-pct-vr`.

## Estado actual
- `.col-pct` (líneas 313-320 del CSS): `text-align: center`, `width: 4%`
- `.col-pct-vr` (líneas 322-328 del CSS): `text-align: right`, `width: 4%`, `padding-right: 0.4rem`

## Cambio propuesto
Editar `src/app/components/quote-breakdown/quote-breakdown.component.css`:
- Cambiar `.col-pct` `text-align: center` → `text-align: right`
- Añadir `padding-right: 0.4rem` a `.col-pct` para que coincida con `.col-pct-vr`

## Archivos a tocar
- `src/app/components/quote-breakdown/quote-breakdown.component.css` (líneas 313-320)

## No tocar
- Los valores de los porcentajes (se calculan en `financial-calculator.service.ts`)
- El HTML de la tabla (estructura no cambia)
- Otros componentes

## Verificación
1. `npm run build` — sin errores
2. `npm test -- --run` — tests pasan
3. Verificar visualmente que los porcentajes 10% y 2% en el PDF quedan alineados a la derecha