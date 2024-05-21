import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {DepartmentsRoutes} from './departments-routing.module';
import { AddDapartmentComponent } from './add-dapartment/add-dapartment.component';
import { EditDapartmentComponent } from './edit-dapartment/edit-dapartment.component';
import { DepartmentListComponent } from './dapartment-list/department-list.component';
import {ToolbarModule} from "primeng-lts/toolbar";
import {MessagesModule} from "primeng-lts/messages";
import {ButtonModule} from "primeng-lts/button";
import {SharedModule} from "primeng-lts/api";
import {MatCardModule} from "@angular/material/card";
import {RippleModule} from "primeng-lts/ripple";
import {InputTextModule} from "primeng-lts/inputtext";
import {MatTableModule} from "@angular/material/table";
import {ConfirmDialogModule} from "primeng-lts/confirmdialog";
import {MatPaginatorModule} from "@angular/material/paginator";
import {RouterModule} from "@angular/router";
import {MatSortModule} from "@angular/material/sort";
import {TooltipModule} from "primeng-lts/tooltip";
import {MatDialogModule} from "@angular/material/dialog";
import {MatIconModule} from "@angular/material/icon";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {InputTextareaModule} from "primeng-lts/inputtextarea";
import { ImportDepartmentComponent } from './import-department/import-department.component';
import { DemoMaterialModule } from '../demo-material-module';


@NgModule({
  declarations: [AddDapartmentComponent, EditDapartmentComponent, DepartmentListComponent, ImportDepartmentComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(DepartmentsRoutes),
    ToolbarModule,
    MessagesModule,
    ButtonModule,
    SharedModule,
    MatCardModule,
    RippleModule,
    InputTextModule,
    MatTableModule,
    ConfirmDialogModule,
    MatPaginatorModule,
    MatSortModule,
    TooltipModule,
    MatDialogModule,
    MatIconModule,
    ReactiveFormsModule,
    InputTextareaModule,
    DemoMaterialModule,
    FormsModule
  ]
})
export class DepartmentsModule { }
