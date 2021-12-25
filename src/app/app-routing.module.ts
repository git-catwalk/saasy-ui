import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from "./home/home.component";
import {LoginComponent} from "./login/login.component";
import {CallbackComponent} from "./callback/callback.component";
import {AuthGuard} from "./services/auth.guard";
import {DashboardComponent} from "./dashboard/dashboard.component";
import {AppFormComponent} from "./app-form/app-form.component";
import {TenantFormComponent} from "./tenant-form/tenant-form.component";
import {AppTableComponent} from "./app-table/app-table.component";
import {TenantTableComponent} from "./tenant-table/tenant-table.component";
import { AppViewComponent } from './app-view/app-view.component';


const routes: Routes = [
  {path : 'app',     			    component:AppFormComponent,canActivate: [AuthGuard]},
  {path : 'app/:id',     		  component:AppFormComponent,canActivate: [AuthGuard]},
  {path : 'app-view/:id',     component:AppViewComponent,canActivate: [AuthGuard]},
  {path : 'tenant',     		  component:TenantFormComponent,canActivate: [AuthGuard]},
  {path : 'tenant/:id',       component:TenantFormComponent,canActivate: [AuthGuard]},
  {path : 'apps',     			  component:AppTableComponent,canActivate: [AuthGuard]},
  {path : 'tenants',     		  component:TenantTableComponent,canActivate: [AuthGuard]},
  {path : 'home',             component: HomeComponent},
  {path : 'login',            component: LoginComponent},
  {path : 'callback',         component: CallbackComponent},
  {path : 'dashboard',        component: DashboardComponent,canActivate: [AuthGuard]},
  {path : 'docs',             loadChildren: () => import('./docs/docs.module').then(m => m.DocsModule) },
  {path : '**',               redirectTo: '/home'}
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
