import { Routes, RouterModule } from '@angular/router';
import { RoleListComponent } from './role-list/role-list.component';
import {AuthGuard} from "../authentication/guards/auth.guard";
import {RoleGuard} from "../authentication/guards/role.guard";

export const RolesRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: RoleListComponent,
        canActivate: [AuthGuard, RoleGuard],
        data: {
          title: 'Role Configuration',
          expectedRoles: ['ADMIN']
        }
      }

    ]
  }
];
