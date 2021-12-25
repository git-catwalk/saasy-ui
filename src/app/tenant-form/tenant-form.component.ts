import { Component, OnInit } from '@angular/core';
import {FormArray, FormBuilder, FormGroup} from "@angular/forms";
import { ActivatedRoute, Router} from "@angular/router";
import {TenantService} from "../services/tenant.service";
import {App, AppModel, IdName, Plan, Tenant} from "../services/app-model";
import {UserFormComponent} from "../user-form/user-form.component";
import {AppService} from "../services/app.service";

@Component({
  selector: 'app-tenant-form',
  templateUrl: './tenant-form.component.html',
  styleUrls: ['./tenant-form.component.scss']
})
export class TenantFormComponent implements OnInit {
  tenant:Tenant;
  form:FormGroup;
  apps:Array<App>= [];
  appIds:Array<IdName> =[];
  app:App;

  constructor(private fb: FormBuilder,private appService:AppService,private service:TenantService,private router: Router,private route: ActivatedRoute) {
    this.tenant = AppModel.emptyTenant();
    this.form = TenantFormComponent.createForm(fb,this.tenant);
    this.app = AppModel.emptyApp();
  }

  ngOnInit(): void {
     let id = this.route.snapshot.paramMap.get('id');
     if(id){
         this.service.getById(id).subscribe(i=>{
             this.tenant = i;
             this.form = TenantFormComponent.createForm(this.fb,this.tenant);
             this.getApp();
         });
     }
     //get users apps
    this.appService.search('',0,500).subscribe(apps=>{
      this.apps = apps;
      this.appIds = this.apps.map(a=>  ({ id: a.id, name: a.name }));
    });

  }

  public save() {
    this.service.save(Object.assign({}, this.tenant,this.form.getRawValue())).subscribe(()=>{
        this.back();
    });
  }

  public back(){
     this.router.navigate(['/tenants']).then();
  }

  public static createForm(fb: FormBuilder,tenant:Tenant):FormGroup{
     return  fb.group({
        "app":[tenant.app],
        "displayName": [ tenant.displayName],
        "owner": UserFormComponent.createForm(fb,tenant.owner),
      //  "users": [tenant.users],
        "planId": [tenant.planId]
     });
  }

  getTenantUser():FormGroup {
    return this.form.get('owner') as FormGroup;
  }

  getApp() {
    const appId:any = this.form.get('app')?.value;
    this.appService.getById(appId.id).subscribe(app=>{
      this.app = app;
    });
  }

  public objectComparisonFunction = function( option:any, value:any ) : boolean {
    return option.id === value.id;
  }
}
