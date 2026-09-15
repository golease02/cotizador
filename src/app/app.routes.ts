import { Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { adminGuard, moduleGuard, adminHomeGuard } from './guards/admin-guard';
import { superAdminGuard } from './guards/super-admin-guard';

export const routes: Routes = [
    {
        path: 'login',
        loadComponent: () => import('./components/auth/login/login').then(m => m.LoginComponent)
    },
    {
        path: 'register',
        loadComponent: () => import('./components/auth/register/register').then(m => m.RegisterComponent)
    },
    {
        path: 'recuperar-contrasena',
        loadComponent: () => import('./components/auth/password-recovery/password-recovery').then(m => m.PasswordRecoveryComponent)
    },
    {
        path: 'reset-password',
        loadComponent: () => import('./components/auth/reset-password/reset-password').then(m => m.ResetPasswordComponent)
    },
    // ✅ Ruta raíz → Mis Cotizaciones (página principal del vendedor)
    {
        path: '',
        loadComponent: () => import('./components/vendedor/mis-cotizaciones/mis-cotizaciones').then(m => m.MisCotizacionesComponent),
        canActivate: [AuthGuard]
    },
    // ✅ Ruta del Cotizador (accesible desde Mis Cotizaciones)
    {
        path: 'cotizador',
        loadComponent: () => import('./components/cotizador/cotizador').then(m => m.CotizadorComponent),
        canActivate: [AuthGuard]
    },
                                {
        path: 'perfil',
        loadComponent: () => import('./components/perfil/perfil').then(m => m.PerfilComponent),
        canActivate: [AuthGuard]
    },
    // ✅ Ruta alternativa por si alguien escribe /mis-cotizaciones (redirige a raíz)
    {
        path: 'mis-cotizaciones',
        redirectTo: '',
        pathMatch: 'full'
    },
    {
        path: 'admin',
        loadComponent: () => import('./components/admin/admin-dashboard/admin-dashboard').then(m => m.AdminDashboardComponent),
        canActivate: [AuthGuard, adminGuard],
        children: [
            {
                path: '',
                canActivate: [adminHomeGuard],
                loadComponent: () => import('./components/admin/admin-stats/admin-stats').then(m => m.AdminStatsComponent)
            },
            {
                path: 'sellers',
                canActivate: [moduleGuard('sellers')],
                loadComponent: () => import('./components/admin/admin-sellers/admin-sellers').then(m => m.AdminSellersComponent)
            },
            {
                // Rendimiento: panel principal del socio (inherente al rol).
                // Acceso para super_admin y socio activo — lo restringe el adminGuard del padre.
                path: 'rendimiento',
                loadComponent: () => import('./components/admin/admin-seller-performance/admin-seller-performance').then(m => m.AdminSellerPerformanceComponent)
            },
            {
                path: 'admins',
                canActivate: [superAdminGuard],
                loadComponent: () => import('./components/admin/admin-admins/admin-admins').then(m => m.AdminAdminsComponent)
            },
                                                {
                path: 'quotes',
                canActivate: [moduleGuard('quotes')],
                loadComponent: () => import('./components/admin/admin-quotes/admin-quotes').then(m => m.AdminQuotesComponent)
            },
            {
                path: 'plates',
                canActivate: [moduleGuard('plates')],
                loadComponent: () => import('./components/admin/admin-plates/admin-plates').then(m => m.AdminPlatesComponent)
            },
            {
                path: 'parameters',
                canActivate: [moduleGuard('parameters')],
                loadComponent: () => import('./components/admin/admin-parameters/admin-parameters').then(m => m.AdminParametersComponent)
            },
            // ✅ Página "Sin acceso" — no tiene guards; es el destino al que el moduleGuard
            // redirige cuando un socio no tiene permiso para un módulo. Al no tener
            // canActivate, la navegación siempre completa y evita el bucle infinito.
            {
                path: 'sin-acceso',
                loadComponent: () => import('./components/admin/admin-sin-acceso/admin-sin-acceso').then(m => m.AdminSinAccesoComponent)
            }
        ]
    },
    { path: '**', redirectTo: '' }
];
