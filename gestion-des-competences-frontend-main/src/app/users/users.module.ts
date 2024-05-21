import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserListComponent } from './user-list/user-list.component';
import { ProfileComponent } from './profile/profile.component';
import { UpdateUserComponent } from './update-user/update-user.component';
import { AddUserComponent } from './add-user/add-user.component';


import {RouterModule} from '@angular/router';
import {UsersRoutes} from './users-routing.module';
import {SharedModule} from 'primeng-lts/api';
import {CardModule} from 'primeng-lts/card';
import {ProgressBarModule} from 'primeng-lts/progressbar';
import {TableModule} from 'primeng-lts/table';
import {InputTextModule} from 'primeng-lts/inputtext';
import {MultiSelectModule} from 'primeng-lts/multiselect';
import {CalendarModule} from 'primeng-lts/calendar';
import {DropdownModule} from 'primeng-lts/dropdown';
import {ToolbarModule} from 'primeng-lts/toolbar';
import {FileUploadModule} from 'primeng-lts/fileupload';
import {RippleModule} from 'primeng-lts/ripple';
import {ReactiveFormsModule} from '@angular/forms';
import {DialogModule} from 'primeng-lts/dialog';
import {MessageModule} from 'primeng-lts/message';
import {FlexModule} from '@angular/flex-layout';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import {MatTabsModule} from '@angular/material/tabs';
import {MatInputModule} from '@angular/material/input';
import {ConfirmDialogModule} from 'primeng-lts/confirmdialog';
import {PaginatorModule} from 'primeng-lts/paginator';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatTableModule} from '@angular/material/table';
import {MatSortModule} from '@angular/material/sort';
import {MatIconModule} from '@angular/material/icon';
import {MatDialogModule} from "@angular/material/dialog";
import {TooltipModule} from "primeng-lts/tooltip";
import {MatSlideToggleModule} from "@angular/material/slide-toggle";
import {MatExpansionModule} from "@angular/material/expansion";
import { ImportUserComponent } from './import-user/import-user.component';




@NgModule({
  declarations: [ AddUserComponent, UpdateUserComponent, ProfileComponent, UserListComponent, ImportUserComponent],
    imports: [
        CommonModule,
        RouterModule.forChild(UsersRoutes),
        SharedModule,
        CardModule,
        ProgressBarModule,
        TableModule,
        InputTextModule,
        MultiSelectModule,
        CalendarModule,
        DropdownModule,
        ToolbarModule,
        FileUploadModule,
        RippleModule,
        ReactiveFormsModule,
        DialogModule,
        MessageModule,
        FlexModule,
        MatCardModule,
        MatButtonModule,
        MatFormFieldModule,
        MatSelectModule,
        MatTabsModule,
        MatInputModule,
        ConfirmDialogModule,
        PaginatorModule,
        MatPaginatorModule,
        MatTableModule,
        MatSortModule,
        MatIconModule,
        MatDialogModule,
        TooltipModule,
        MatSlideToggleModule,
        MatExpansionModule,
    ],

})
export class UsersModule { }
