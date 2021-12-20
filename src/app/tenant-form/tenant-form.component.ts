import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup} from "@angular/forms";
import { ActivatedRoute, Router} from "@angular/router";
import {TenantService} from "../services/tenant.service";
import {Tenant} from "../services/app-model";

@Component({
  selector: 'app-tenant-form',
  templateUrl: './tenant-form.component.html',
  styleUrls: ['./tenant-form.component.scss']
})
export class TenantFormComponent implements OnInit {
  item:Tenant;
  form:FormGroup;

  constructor(private fb: FormBuilder,private service:TenantService,private router: Router,private route: ActivatedRoute) {
    this.item = this.emptyItem();
    this.form = this.createForm();
  }

  ngOnInit(): void {
     let id = this.route.snapshot.paramMap.get('id');
     if(id){
         this.service.getById(id).subscribe(i=>{
             this.item = i;
             this.form = this.createForm();
         });
     }
  }

  public save() {
    this.service.save(Object.assign({}, this.item,this.form.getRawValue())).subscribe(()=>{
        this.back();
    });
  }

  public back(){
     this.router.navigate(['/tenants']).then();
  }

  public emptyItem():Tenant{
    return {
			id:null,
			tenant:{
				username:'',
				firstname:'',
				lastname:'',
				email:'',
				roles:[],
			},
			users:[],
			plan:{
				name:'',
				monthly:0,
				yearly:0,
        description:'',
        planId:'',
        features:[]
			},
		};
  }

  public createForm():FormGroup{
     return this.fb.group({
        "tenant": [this.item.tenant],
        "users": [this.item.users],
        "plan": [this.item.plan],
     });
  }
}
