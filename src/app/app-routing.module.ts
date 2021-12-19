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

const routes: Routes = [
		{path : 'app',     			component:AppFormComponent},
		{path : 'app/:id',     			component:AppFormComponent},
		{path : 'tenant',     			component:TenantFormComponent},
		{path : 'tenant/:id',     			component:TenantFormComponent},
		{path : 'apps',     			component:AppTableComponent},
		{path : 'tenants',     			component:TenantTableComponent},

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
