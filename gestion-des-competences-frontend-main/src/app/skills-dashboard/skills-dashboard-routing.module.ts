import { Routes, RouterModule } from '@angular/router';
import {DashboardComponent} from "./dashboard/dashboard.component";
import {AuthGuard} from "../authentication/guards/auth.guard";
import {RoleGuard} from "../authentication/guards/role.guard";

export const skillsDashboardRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: DashboardComponent,
        canActivate: [AuthGuard, RoleGuard],
        data: {
          title: 'Skills Dashboard',
          expectedRoles: ['ADMIN', 'DIRECTOR', 'MANAGER']
        }
      },
    ]
  }
];
