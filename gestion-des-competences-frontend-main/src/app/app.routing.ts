import {Routes} from '@angular/router';

import {FullComponent} from './layouts/full/full.component';
import {AppBlankComponent} from './layouts/blank/blank.component';

export const AppRoutes: Routes = [
  {
    path: '',
    component: FullComponent,
    children: [
      {
        path: '',
        redirectTo: '/login',
        pathMatch: 'full'
      },
      {
        path: 'reporting',
        loadChildren: () => import('./dashboards/dashboards.module').then(m => m.DashboardsModule)
      },
      {
        path: 'users',
        loadChildren: () => import('./users/users.module').then(m => m.UsersModule)
      },
      {
        path: 'roles',
        loadChildren: () => import('./roles/roles.module').then(m => m.RolesModule)
      },
      {
        path: 'functions',
        loadChildren: () => import('./functions/functions.module').then(m => m.FunctionsModule)
      },
      {
        path: 'skills',
        loadChildren: () => import('./skills/skills.module').then(m => m.SkillsModule)
      },
      {
        path: 'skillsEvaluation',
        loadChildren: () => import('./skills-evaluation/skills-evaluation.module').then(m => m.SkillsEvaluationModule)
      },
      {
        path: 'departments',
        loadChildren: () => import('./departments/departments.module').then(m => m.DepartmentsModule)
      },
      {
        path: 'skillsDashboard',
        loadChildren: () => import('./skills-dashboard/skills-dashboard.module').then(m => m.SkillsDashboardModule)
      },
    ]
  },    {
    path: '',
    component: AppBlankComponent,
    children: [
      {
        path: '',
        loadChildren:
          () => import('./authentication/authentication.module').then(m => m.AuthenticationModule)
      }
    ]
  },
  {
    path: '**',
    redirectTo: 'authentication/404'
  }
];
