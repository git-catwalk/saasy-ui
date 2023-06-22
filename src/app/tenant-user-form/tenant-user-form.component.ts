import { Component, OnInit } from '@angular/core';
import {AppModel, TenantUser} from "../services/app-model";
import {FormBuilder, FormGroup} from "@angular/forms";
import {AppService} from "../services/app.service";
import {ActivatedRoute, Router} from "@angular/router";
import {TenantUserService} from "../services/tenant-user.service";
import {TenantService} from "../services/tenant.service";

@Component({
  selector: 'app-tenant-user-form',
  templateUrl: './tenant-user-form.component.html',
  styleUrls: ['./tenant-user-form.component.scss']
})
export class TenantUserFormComponent implements OnInit {
  tenantUser:TenantUser;
  form:FormGroup;
  roleList:Array<String> = [];

  constructor(private fb: FormBuilder,private appService:AppService,private tenantService:TenantService,private service:TenantUserService,private router: Router,private route: ActivatedRoute) {
    this.tenantUser = AppModel.emptyTenantUser();
    this.tenantUser.tenantId =  this.route.snapshot.paramMap.get('tenantId');
    this.getRoles();
    this.form = TenantUserFormComponent.createForm(fb,this.tenantUser);
  }

  public save() {
    this.service.save(Object.assign({}, this.tenantUser,this.form.getRawValue())).subscribe(()=>{
      this.back();
    },(e)=>{

      alert(e.error.message);
    });
  }

  public back(){
    this.router.navigate(['/tenant/' + this.tenantUser.tenantId ]).then();
  }

  static createForm(fb: FormBuilder,user:TenantUser): FormGroup {
    return  fb.group({
      "id":  [ user.id],
      "tenantId":  [ {value: user.tenantId, disabled:true}],
      "username":  [ user.username],
      "name": [ user.name],
      "email": [ user.email],
      "active": [user.active],
      "roles":  [user.roles]
    });
  }

  ngOnInit(): void {
    let id = this.route.snapshot.paramMap.get('id');
    if(id){
      this.service.getById(id).subscribe(i=>{
        this.tenantUser = i;
        this.getRoles();
        this.form = TenantUserFormComponent.createForm(this.fb,this.tenantUser);
      });
    }
  }

  getRoles() {
    this.tenantService.getById(this.tenantUser.tenantId).subscribe(t=>{
        this.appService.getById(t.app.id).subscribe(a=>{
          this.roleList = a.roles;
        })
    });
  }
}
