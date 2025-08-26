import {Routes} from '@angular/router';
import {LoginComponent} from "./pages/login/login.component";
import {CommandFormComponent} from "./pages/command-form/command-form.component";
import {AdminDashboardComponent} from "./pages/admin-dashboard/admin-dashboard.component";
import {ClientDashboardComponent} from "./pages/client-dashboard/client-dashboard.component";
import {RegisterComponent} from "./pages/register/register.component";
import {authGuard} from "./services/guard/auth.guard";

export const routes: Routes = [
    {path: 'register', component: RegisterComponent},
    {path: 'login', component: LoginComponent},
    {path: '', redirectTo: 'login', pathMatch: 'full'},
    {path: 'command-form', component: CommandFormComponent},
    {
        path: 'admin-dashboard',
        loadComponent: () => import('./pages/admin-dashboard/admin-dashboard.component')
            .then(m => m.AdminDashboardComponent),
        canActivate: [authGuard]
    },
    // {path: 'client-dashboard', component: ClientDashboardComponent, canActivate: [authGuard], data: {role: 'CLIENT'}},
    {path: 'client-dashboard', component: ClientDashboardComponent, canActivate: [authGuard]},
];
