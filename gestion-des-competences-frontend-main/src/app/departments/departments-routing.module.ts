import { Routes, RouterModule } from '@angular/router';
import {DepartmentListComponent} from "./dapartment-list/department-list.component";
import {AuthGuard} from "../authentication/guards/auth.guard";
import {RoleGuard} from "../authentication/guards/role.guard";

export const DepartmentsRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: DepartmentListComponent,
        canActivate: [AuthGuard, RoleGuard],
        data: {
          title: 'Department Configuration',
          expectedRoles: ['ADMIN']
        }
      },
    ]}
];
