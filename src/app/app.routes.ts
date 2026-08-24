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
                path: 'sellers/new',
                loadComponent: () => import('./components/admin/admin-seller-form/admin-seller-form').then(m => m.AdminSellerFormComponent)
            },
            {
                path: 'sellers/edit/:id',
                loadComponent: () => import('./components/admin/admin-seller-form/admin-seller-form').then(m => m.AdminSellerFormComponent)
            },
            {
                path: 'admins/new',
                loadComponent: () => import('./components/admin/admin-admin-form/admin-admin-form').then(m => m.AdminAdminFormComponent)
            },
            {
                path: 'admins/edit/:id',
                loadComponent: () => import('./components/admin/admin-admin-form/admin-admin-form').then(m => m.AdminAdminFormComponent)
            }
        ]
    },
    { path: '**', redirectTo: '' }
];