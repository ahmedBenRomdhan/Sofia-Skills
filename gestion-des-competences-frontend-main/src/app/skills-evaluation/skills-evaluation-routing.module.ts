import { Routes, RouterModule } from '@angular/router';
import {SkillsEvaluationTableComponent} from './skills-evaluation-table/skills-evaluation-table.component';
import {SkillsListComponent} from './skills-list/skills-list.component';
import {AuthGuard} from '../authentication/guards/auth.guard';


export const skillsEvalRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: SkillsEvaluationTableComponent,
        canActivate: [AuthGuard],
        data: {
          title: 'Skills Evaluation',
        }
      }

    ]
  }
 ];


