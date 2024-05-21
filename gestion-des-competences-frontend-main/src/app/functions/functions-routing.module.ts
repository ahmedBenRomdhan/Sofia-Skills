import { Routes, RouterModule } from '@angular/router';
import {FunctionListComponent} from './function-list/function-list.component';
import {AuthGuard} from "../authentication/guards/auth.guard";
import {RoleGuard} from "../authentication/guards/role.guard";

export const FunctionsRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: FunctionListComponent,
        canActivate: [AuthGuard, RoleGuard],
        data: {
          title: 'Function Configuration',
          expectedRoles: ['ADMIN']
        }
      },
      ]}
];
