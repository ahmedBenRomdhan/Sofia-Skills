import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {SkillRoutes} from './skills-routing.module';
import { SkillListComponent } from './skill-list/skill-list.component';
import {RouterModule} from "@angular/router";
import {InputTextModule} from "primeng-lts/inputtext";
import {ButtonModule} from "primeng-lts/button";
import {MessageModule} from "primeng-lts/message";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {RippleModule} from "primeng-lts/ripple";
import {CardModule} from "primeng-lts/card";
import {MatCardModule} from "@angular/material/card";
import {MessagesModule} from "primeng-lts/messages";
import {ToolbarModule} from "primeng-lts/toolbar";
import {MatTableModule} from "@angular/material/table";
import {MatPaginatorModule} from "@angular/material/paginator";
import {DialogModule} from "primeng-lts/dialog";
import {ConfirmDialogModule} from "primeng-lts/confirmdialog";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatDialogModule} from "@angular/material/dialog";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import {InputTextareaModule} from "primeng-lts/inputtextarea";
import { EditSkillComponent } from './edit-skill/edit-skill.component';
import { AddSkillComponent } from './add-skill/add-skill.component';
import {DropdownModule} from "primeng-lts/dropdown";
import {MatTabsModule} from "@angular/material/tabs";
import {CategoryModule} from "../category/category.module";
import {MatIconModule} from "@angular/material/icon";
import { MatSelectModule } from '@angular/material/select';
import { MatSortModule } from '@angular/material/sort';
import { ImportSkillComponent } from './import-skill/import-skill.component';


@NgModule({
  declarations: [SkillListComponent, EditSkillComponent, AddSkillComponent, ImportSkillComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(SkillRoutes),
    InputTextModule,
    ButtonModule,
    MessageModule,
    ReactiveFormsModule,
    RippleModule,
    CardModule,
    MatCardModule,
    MessagesModule,
    ToolbarModule,
    MatTableModule,
    MatPaginatorModule,
    DialogModule,
    ConfirmDialogModule,
    MatFormFieldModule,
    MatDialogModule,
    MatInputModule,
    MatButtonModule,
    InputTextareaModule,
    DropdownModule,
    MatTabsModule,
    CategoryModule,
    MatIconModule,
    MatSelectModule,
    MatSortModule,
    FormsModule
  ]
})
export class SkillsModule { }
