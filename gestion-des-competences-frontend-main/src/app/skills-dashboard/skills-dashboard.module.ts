import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {skillsDashboardRoutes} from './skills-dashboard-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import {RouterModule} from "@angular/router";
import {MatTreeModule} from "@angular/material/tree";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {MultiSelectModule} from "primeng-lts/multiselect";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatChipsModule} from "@angular/material/chips";
import {MatAutocompleteModule} from "@angular/material/autocomplete";
import {MatTableModule} from "@angular/material/table";
import {ToolbarModule} from "primeng-lts/toolbar";
import {MatCardModule} from "@angular/material/card";
import {MessagesModule} from "primeng-lts/messages";
import {ButtonModule} from "primeng-lts/button";
import {RippleModule} from "primeng-lts/ripple";
import {InputTextModule} from "primeng-lts/inputtext";
import {MatSortModule} from "@angular/material/sort";
import {ConfirmDialogModule} from "primeng-lts/confirmdialog";
import {MatPaginatorModule} from "@angular/material/paginator";
import {TooltipModule} from "primeng-lts/tooltip";
import {NgbRatingModule} from "@ng-bootstrap/ng-bootstrap";
import {DropdownModule} from "primeng-lts/dropdown";
import {FlexModule} from "@angular/flex-layout";
import {MatSelectModule} from "@angular/material/select";
import { FilterCardComponent } from './filter-card/filter-card.component';



@NgModule({
  declarations: [DashboardComponent, FilterCardComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(skillsDashboardRoutes),
    MatTreeModule,
    MatButtonModule,
    MatIconModule,
    MultiSelectModule,
    FormsModule,
    MatFormFieldModule,
    MatChipsModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
    MatTableModule,
    ToolbarModule,
    MatCardModule,
    MessagesModule,
    ButtonModule,
    RippleModule,
    InputTextModule,
    MatSortModule,
    ConfirmDialogModule,
    MatPaginatorModule,
    TooltipModule,
    NgbRatingModule,
    DropdownModule,
    FlexModule,
    MatSelectModule,
  ]
})
export class SkillsDashboardModule { }
