
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { DemoMaterialModule } from '../demo-material-module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { DashboardsRoutes } from './dashboards.routing';
import { ChartistModule } from 'ng-chartist';
import { ChartsModule } from 'ng2-charts';
import { NgApexchartsModule } from 'ng-apexcharts';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { Dashboard1Component } from './dashboard1/dashboard1.component';

import {
    TopCardComponent,
} from './dashboard-components';
import {ButtonModule} from 'primeng-lts/button';
import {RippleModule} from 'primeng-lts/ripple';
import { CurveDashboardComponent } from './curve-dashboard/curve-dashboard.component';
import { RadarDashboardComponent } from './radar-dashboard/radar-dashboard.component';
import { TopCardCurveComponent } from './dashboard-components/top-card-curve/top-card-curve.component';


@NgModule({
  imports: [
    CommonModule,
    DemoMaterialModule,
    FlexLayoutModule,
    ChartistModule,
    ChartsModule,
    NgApexchartsModule,
    RouterModule.forChild(DashboardsRoutes),
    FormsModule,
    ReactiveFormsModule,
    ButtonModule,
    RippleModule
  ],
    declarations: [
        Dashboard1Component,
        TopCardComponent,
        CurveDashboardComponent,
        RadarDashboardComponent,
        TopCardCurveComponent,
    ],
    exports: [
        TopCardComponent
    ],
    entryComponents: [
    ]
})
export class DashboardsModule { }
