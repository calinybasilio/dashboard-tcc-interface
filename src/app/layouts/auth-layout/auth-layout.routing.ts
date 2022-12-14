import { Routes } from '@angular/router';
import { LoginGuard } from 'src/app/core/guards/login.guard';

import { LoginComponent } from '../../pages/login/login.component';

export const AuthLayoutRoutes: Routes = [
    { path: 'login', component: LoginComponent, canActivate: [LoginGuard] }
];
