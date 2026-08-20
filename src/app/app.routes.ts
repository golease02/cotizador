import { Routes } from '@angular/router';
import { AuthGuard } from '../app/guards/auth.guard';

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
        path: '',
        loadComponent: () => import('./components/cotizador/cotizador').then(m => m.CotizadorComponent),
        canActivate: [AuthGuard]
    },
    { path: '**', redirectTo: '' }
];