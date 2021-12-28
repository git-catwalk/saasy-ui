import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {DashboardComponent} from "./dashboard/dashboard.component";
import {SearchInputComponent} from "./search-input/search-input.component";
import {LoginComponent} from "./login/login.component";
import {HomeComponent} from "./home/home.component";
import {CallbackComponent} from "./callback/callback.component";
import {HttpClientModule} from "@angular/common/http";
import {AppRoutingModule} from "./app-routing.module";
import {MaterialModule} from "./material-module";
import {FlexLayoutModule} from "@angular/flex-layout";

import {ServiceModule} from "./services/service.module";
import {environment} from "../environments/environment";
import {Config} from "./services/config";

import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {ServiceWorkerModule} from "@angular/service-worker";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {CommonModule} from "@angular/common";
import {MatCarouselModule} from "./carousel/carousel.module";
import {OAuthModule} from "angular-oauth2-oidc";
import {AppFormComponent} from "./app-form/app-form.component";
import {TenantFormComponent} from "./tenant-form/tenant-form.component";
import {AppTableComponent} from "./app-table/app-table.component";
import {TenantTableComponent} from "./tenant-table/tenant-table.component";
import { AppViewComponent } from './app-view/app-view.component';
import { PricingViewComponent } from './pricing-view/pricing-view.component';
import { UserFormComponent } from './user-form/user-form.component';
import { UserTableComponent } from './user-table/user-table.component';
import { PlanFormComponent } from './plan-form/plan-form.component';
import { PlanTableComponent } from './plan-table/plan-table.component';


@NgModule({
  declarations: [
    SearchInputComponent,
    AppComponent,
    DashboardComponent,
    LoginComponent,
    CallbackComponent,
    HomeComponent,
		AppFormComponent,
		TenantFormComponent,
		AppTableComponent,
		TenantTableComponent,
  AppViewComponent,
  PricingViewComponent,
  UserFormComponent,
  UserTableComponent,
  PlanFormComponent,
  PlanTableComponent,

  ],
  imports: [
    HttpClientModule,
    ServiceModule,
    CommonModule ,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    MaterialModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    MatCarouselModule,
    OAuthModule.forRoot({
      resourceServer: {
        allowedUrls: ['http://localhost:9096/rest/','https://saasy-service.bluntsoftware.com/rest/'],
        sendAccessToken: true
      }
    }),
    ServiceWorkerModule.register('ngsw-worker.js', {enabled: environment.production})
  ],
  providers: [
    {provide: Config, useValue: ServiceModule.forRoot(environment)}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
