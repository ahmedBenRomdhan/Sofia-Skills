import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import {
    MatIconModule
} from '@angular/material/icon';
import {
    MatCardModule,
} from '@angular/material/card';
import {
    MatInputModule
} from '@angular/material/input';
import {
    MatCheckboxModule
} from '@angular/material/checkbox';
import {
    MatButtonModule
} from '@angular/material/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';


import { AuthenticationRoutes } from './authentication.routing';
import { ErrorComponent } from './error/error.component';
import { ForgotComponent } from './forgot/forgot.component';
import { LoginComponent } from './login/login.component';
import {InputTextModule} from 'primeng-lts/inputtext';
import {ButtonModule} from 'primeng-lts/button';
import {MessageModule} from 'primeng-lts/message';



@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(AuthenticationRoutes),
        MatIconModule,
        MatCardModule,
        MatInputModule,
        MatCheckboxModule,
        MatButtonModule,
        FlexLayoutModule,
        FormsModule,
        ReactiveFormsModule,
        InputTextModule,
        ButtonModule,
        MessageModule,

    ],
    declarations: [
        ErrorComponent,
        ForgotComponent,
        LoginComponent,
    ]
})
export class AuthenticationModule { }
