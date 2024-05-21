import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RolesRoutes} from './roles-routing.module';
import { EditRoleComponent } from './edit-role/edit-role.component';
import { RoleListComponent } from './role-list/role-list.component';
import {RouterModule} from '@angular/router';
import {InputTextModule} from 'primeng-lts/inputtext';
import {ButtonModule} from 'primeng-lts/button';
import {MessageModule} from 'primeng-lts/message';
import {ReactiveFormsModule} from '@angular/forms';
import {RippleModule} from 'primeng-lts/ripple';
import {CardModule} from 'primeng-lts/card';
import {MatCardModule} from '@angular/material/card';
import {MessagesModule} from 'primeng-lts/messages';
import {ToolbarModule} from 'primeng-lts/toolbar';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import {DialogModule} from 'primeng-lts/dialog';
import {ConfirmDialogModule} from 'primeng-lts/confirmdialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatDialogModule} from '@angular/material/dialog';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {InputTextareaModule} from 'primeng-lts/inputtextarea';
import {MatIconModule} from '@angular/material/icon';
import {MatRadioModule} from '@angular/material/radio';

@NgModule({
  declarations: [ EditRoleComponent, RoleListComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(RolesRoutes),
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
    MatIconModule,
    MatRadioModule,
  ]
})
export class RolesModule { }
