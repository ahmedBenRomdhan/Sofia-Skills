import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import {HttpClientModule, HttpClient, HTTP_INTERCEPTORS} from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { AppRoutes } from './app.routing';
import { AppComponent } from './app.component';

import { FlexLayoutModule } from '@angular/flex-layout';
import { FullComponent } from './layouts/full/full.component';
import { AppBlankComponent } from './layouts/blank/blank.component';


import { VerticalAppHeaderComponent } from './layouts/full/vertical-header/vertical-header.component';
import { VerticalAppSidebarComponent } from './layouts/full/vertical-sidebar/vertical-sidebar.component';
import { HorizontalAppHeaderComponent } from './layouts/full/horizontal-header/horizontal-header.component';
import { HorizontalAppSidebarComponent } from './layouts/full/horizontal-sidebar/horizontal-sidebar.component';

import { AppBreadcrumbComponent } from './layouts/full/breadcrumb/breadcrumb.component';


import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DemoMaterialModule } from './demo-material-module';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';

import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { SharedModule } from './shared/shared.module';
import { SpinnerComponent } from './shared/spinner.component';

import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {ButtonModule} from "primeng-lts/button";
import {RippleModule} from "primeng-lts/ripple";
import {TooltipModule} from "primeng-lts/tooltip";
import {ToolbarModule} from "primeng-lts/toolbar";
import {MessagesModule} from 'primeng-lts/messages';
import {TokenInterceptor} from "./shared/interceptors/token.interceptor";


export function HttpLoaderFactory(http: HttpClient): any {
    return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}


const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
    suppressScrollX: true,
    wheelSpeed: 2,
    wheelPropagation: true
};


@NgModule({
    declarations: [
        AppComponent,
        FullComponent,
        VerticalAppHeaderComponent,
        SpinnerComponent,
        AppBlankComponent,
        VerticalAppSidebarComponent,
        AppBreadcrumbComponent,
        HorizontalAppHeaderComponent,
        HorizontalAppSidebarComponent,
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        DemoMaterialModule,
        FormsModule,
        FlexLayoutModule,
        HttpClientModule,
        PerfectScrollbarModule,
        SharedModule,
        NgMultiSelectDropDownModule.forRoot(),
        RouterModule.forRoot(AppRoutes, {relativeLinkResolution: 'legacy'}),
        HttpClientModule,
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: HttpLoaderFactory,
                deps: [HttpClient]
            }
        }),
        NgbModule,
        ButtonModule,
        RippleModule,
        TooltipModule,
        ToolbarModule,
        MessagesModule,
    ],
    providers: [
        {
            provide: PERFECT_SCROLLBAR_CONFIG,
            useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
        },
        DatePipe,
      {
        provide: HTTP_INTERCEPTORS,
        useClass: TokenInterceptor,
        multi: true,
      },
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
