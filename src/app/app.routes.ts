import { Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { adminGuard } from './guards/admin-guard';

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
        loadComponent: () => import('./components/perfil/perfil.component').then(m => m.PerfilComponent),
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
                loadComponent: () => import('./components/admin/admin-stats/admin-stats').then(m => m.AdminStatsComponent)
            },
            {
                path: 'sellers',
                loadComponent: () => import('./components/admin/admin-sellers/admin-sellers').then(m => m.AdminSellersComponent)
            },
            {
                path: 'admins',
                loadComponent: () => import('./components/admin/admin-admins/admin-admins').then(m => m.AdminAdminsComponent)
            },
            {
                path: 'quotes',
                loadComponent: () => import('./components/admin/admin-quotes/admin-quotes').then(m => m.AdminQuotesComponent)
            },
            {
                path: 'vehicles',
                loadComponent: () => import('./components/admin/admin-vehicles/admin-vehicles').then(m => m.AdminVehiclesComponent)
            },
            {
                path: 'plates',
                loadComponent: () => import('./components/admin/admin-plates/admin-plates').then(m => m.AdminPlatesComponent)
            },
            {
                path: 'parameters',
                loadComponent: () => import('./components/admin/admin-parameters/admin-parameters').then(m => m.AdminParametersComponent)
            }
        ]
    },
    { path: '**', redirectTo: '' }
];
