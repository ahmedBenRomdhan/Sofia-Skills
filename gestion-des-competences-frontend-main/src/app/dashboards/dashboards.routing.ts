import { Routes } from '@angular/router';

import { Dashboard1Component } from './dashboard1/dashboard1.component';
import {AuthGuard} from '../authentication/guards/auth.guard';
import {RoleGuard} from '../authentication/guards/role.guard';
import { CurveDashboardComponent } from './curve-dashboard/curve-dashboard.component';
import { RadarDashboardComponent } from './radar-dashboard/radar-dashboard.component';

export const DashboardsRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'overview',
        component: Dashboard1Component,
        canActivate: [AuthGuard, RoleGuard],
        data: {
          title: 'Reporting ',
          expectedRoles: ['ADMIN', 'DIRECTOR', 'MANAGER']

        }
      },
      {
        path: 'curve',
        component: CurveDashboardComponent,
        canActivate: [AuthGuard, RoleGuard],
        data: {
          title: 'Reporting ',
          expectedRoles: ['ADMIN', 'DIRECTOR', 'MANAGER']

        }
      },
      {
        path: 'radar',
        component: RadarDashboardComponent,
        canActivate: [AuthGuard, RoleGuard],
        data: {
          title: 'Reporting ',
          expectedRoles: ['ADMIN', 'DIRECTOR', 'MANAGER']

        }
      }
    ]
  }
];
