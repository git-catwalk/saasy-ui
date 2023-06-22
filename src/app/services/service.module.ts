import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {Config} from "./config";
import {UserProfileService} from "./user-profile.service";
import {ThemeService} from "./theme.service";
import {AppService} from "./app.service";
import {TenantService} from "./tenant.service";
import {TenantUserService} from "./tenant-user.service";

@NgModule({
  providers: [
    UserProfileService,
    ThemeService,
		AppService,
		TenantService,
    TenantUserService

  ],
  imports: [
    CommonModule
  ]
})
export class ServiceModule {
  public static forRoot(environment: any): Config{
    return new Config(environment);
  }
}
