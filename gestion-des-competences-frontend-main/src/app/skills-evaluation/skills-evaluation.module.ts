import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {RouterModule} from '@angular/router';
import {skillsEvalRoutes} from './skills-evaluation-routing.module';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { SkillEvaluationDetailsComponent } from './skill-evaluation-details/skill-evaluation-details.component';
import {MatCardModule} from "@angular/material/card";
import {FlexModule} from "@angular/flex-layout";
import {MatIconModule} from "@angular/material/icon";
import {MatDialogModule} from "@angular/material/dialog";
import {MatButtonModule} from "@angular/material/button";
import {MatGridListModule} from "@angular/material/grid-list";
import {ButtonModule} from 'primeng-lts/button';
import {RippleModule} from 'primeng-lts/ripple';
import { EditSkillEvaluationComponent } from './edit-skill-evaluation/edit-skill-evaluation.component';
import {MessagesModule} from 'primeng-lts/messages';
import {InputTextModule} from "primeng-lts/inputtext";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {InputTextareaModule} from 'primeng-lts/inputtextarea';
import {MatRadioModule} from "@angular/material/radio";
import { SkillsListComponent } from './skills-list/skills-list.component';
import {MatTableModule} from "@angular/material/table";
import {MatChipsModule} from "@angular/material/chips";
import {MatSortModule} from "@angular/material/sort";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {TooltipModule} from "primeng-lts/tooltip";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {SkillsEvaluationTableComponent} from "./skills-evaluation-table/skills-evaluation-table.component";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatMenuModule} from "@angular/material/menu";
import {DropdownModule} from "primeng-lts/dropdown";
import { EditUserResumeComponent } from './edit-user-resume/edit-user-resume.component';
import {InputNumberModule} from "primeng-lts/inputnumber";
import {CalendarModule} from "primeng-lts/calendar";
import { SkillsSelectionComponent } from './skills-selection/skills-selection.component';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatListModule} from '@angular/material/list';


@NgModule({
  declarations: [SkillEvaluationDetailsComponent, EditSkillEvaluationComponent, SkillsListComponent, SkillsEvaluationTableComponent, EditUserResumeComponent, SkillsSelectionComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(skillsEvalRoutes),
    NgbModule,
    MatCardModule,
    FlexModule,
    MatIconModule,
    MatDialogModule,
    MatButtonModule,
    MatGridListModule,
    ButtonModule,
    RippleModule,
    MessagesModule,
    InputTextModule,
    ReactiveFormsModule,
    InputTextareaModule,
    MatRadioModule,
    FormsModule,
    MatTableModule,
    MatChipsModule,
    MatSortModule,
    MatCheckboxModule,
    TooltipModule,
    MatFormFieldModule,
    MatInputModule,
    MatPaginatorModule,
    MatMenuModule,
    DropdownModule,
    InputNumberModule,
    CalendarModule,
    MatAutocompleteModule,
    MatListModule
  ]
})
export class SkillsEvaluationModule { }
