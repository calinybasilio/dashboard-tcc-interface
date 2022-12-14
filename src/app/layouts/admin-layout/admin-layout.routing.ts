import { Routes } from '@angular/router';

import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import { IconsComponent } from '../../pages/icons/icons.component';
import { MapsComponent } from '../../pages/maps/maps.component';
import { UserProfileComponent } from '../../pages/user-profile/user-profile.component';
import { TablesComponent } from '../../pages/tables/tables.component';
import { AuthenticatedGuard } from 'src/app/core/guards/authenticated.guard';

export const AdminLayoutRoutes: Routes = [
    { path: 'dashboard',      component: DashboardComponent, canActivate: [AuthenticatedGuard] },
    { path: 'user-profile',   component: UserProfileComponent, canActivate: [AuthenticatedGuard] },
    { path: 'tables',         component: TablesComponent, canActivate: [AuthenticatedGuard] },
    { path: 'icons',          component: IconsComponent, canActivate: [AuthenticatedGuard] },
    { path: 'maps',           component: MapsComponent, canActivate: [AuthenticatedGuard] }
];
