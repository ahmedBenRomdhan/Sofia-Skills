import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {FunctionsRoutes} from './functions-routing.module';
import { FunctionListComponent } from './function-list/function-list.component';
import { EditFunctionComponent } from './edit-function/edit-function.component';
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatTableModule} from "@angular/material/table";
import {ToolbarModule} from "primeng-lts/toolbar";
import {MatCardModule} from "@angular/material/card";
import {MessagesModule} from "primeng-lts/messages";
import {ButtonModule} from "primeng-lts/button";
import {SharedModule} from "primeng-lts/api";
import {RippleModule} from "primeng-lts/ripple";
import {ConfirmDialogModule} from "primeng-lts/confirmdialog";
import {InputTextModule} from "primeng-lts/inputtext";
import {MatSortModule} from "@angular/material/sort";
import {RouterModule} from "@angular/router";
import {TooltipModule} from "primeng-lts/tooltip";
import {MatIconModule} from "@angular/material/icon";
import {MatDialogModule} from "@angular/material/dialog";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {DropdownModule} from "primeng-lts/dropdown";
import { AddComponent } from './add/add.component';
import { ImportFunctionComponent } from './import-function/import-function.component';
import { DialogModule } from 'primeng-lts/dialog';
import { DemoMaterialModule } from '../demo-material-module';


@NgModule({
  declarations: [FunctionListComponent,  EditFunctionComponent, AddComponent, ImportFunctionComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(FunctionsRoutes),
    MatPaginatorModule,
    MatTableModule,
    ToolbarModule,
    MatCardModule,
    MessagesModule,
    ButtonModule,
    SharedModule,
    RippleModule,
    ConfirmDialogModule,
    InputTextModule,
    MatSortModule,
    TooltipModule,
    MatIconModule,
    MatDialogModule,
    ReactiveFormsModule,
    DropdownModule,
    FormsModule,
    DialogModule,
    DemoMaterialModule,

  ]
})
export class FunctionsModule { }
