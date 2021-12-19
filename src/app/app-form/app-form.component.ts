import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup} from "@angular/forms";
import { ActivatedRoute, Router} from "@angular/router";
import {AppService} from "../services/app.service";
import {App} from "../services/app-model";

@Component({
  selector: 'app-app-form',
  templateUrl: './app-form.component.html',
  styleUrls: ['./app-form.component.scss']
})
export class AppFormComponent implements OnInit {
  item:App;
  form:FormGroup;

  constructor(private fb: FormBuilder,private service:AppService,private router: Router,private route: ActivatedRoute) {
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
     this.router.navigate(['/apps']).then();
  }

  public emptyItem():App{
    return {
			id:null,
			owner:'',
			name:'',
			plans:[],
			roles:[],
		};
  }

  public createForm():FormGroup{
     return this.fb.group({
        "owner": [this.item.owner],
        "name": [this.item.name],
        "plans": [this.item.plans],
     });
  }
}
