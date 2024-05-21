import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {AddUserComponent} from './add-user/add-user.component';
import {ProfileComponent} from './profile/profile.component';
import {UserListComponent} from './user-list/user-list.component';
import {AuthGuard} from '../authentication/guards/auth.guard';
import {RoleGuard} from "../authentication/guards/role.guard";

export const UsersRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: UserListComponent,
        canActivate: [AuthGuard, RoleGuard],
        data: {
          title: 'User Configuration',
          expectedRoles: ['ADMIN']
        }
      },
      {
        path: 'add-user',
        component: AddUserComponent,
        canActivate: [AuthGuard, RoleGuard],
        data: {
          title: 'Add User',
          expectedRoles: ['ADMIN']
        }
      },
      {
        path: 'profile',
        component: ProfileComponent,
        canActivate: [AuthGuard],
        data: {
          title: 'Profile',
        }
      }
    ]
  }
];


