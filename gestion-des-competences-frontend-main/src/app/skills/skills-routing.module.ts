import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {RoleListComponent} from "../roles/role-list/role-list.component";
import {SkillListComponent} from "./skill-list/skill-list.component";
import {AuthGuard} from "../authentication/guards/auth.guard";
import {RoleGuard} from '../authentication/guards/role.guard';

export const SkillRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: SkillListComponent,
        canActivate: [AuthGuard, RoleGuard],
        data: {
          title: 'Skills Configuration',
          expectedRoles: ['ADMIN']
        }
      }

    ]
  }
];
