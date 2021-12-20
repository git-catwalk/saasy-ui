import { Component, OnInit } from '@angular/core';
import {FormArray, FormBuilder, FormGroup} from "@angular/forms";
import { ActivatedRoute, Router} from "@angular/router";
import {AppService} from "../services/app.service";
import {App, Plan} from "../services/app-model";
import {MatChipInputEvent} from "@angular/material/chips";
import {COMMA, ENTER} from "@angular/cdk/keycodes";

@Component({
  selector: 'app-app-form',
  templateUrl: './app-form.component.html',
  styleUrls: ['./app-form.component.scss']
})
export class AppFormComponent implements OnInit {
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;

  readonly separatorKeysCodes: number[] = [ENTER, COMMA];

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
        "name": [this.item.name],
        "roles": this.fb.array(this.item.roles?this.item.roles:[]),
        "plans": this.createPlans()
     });
  }

  get plans(){
    return this.form.get('plans') as FormArray
  }

  createPlans(): FormArray {
    let arr = this.fb.array([]);
    this.item.plans?.map((plan)=>{
      arr.push(this.createPlan(plan));
    })
    return arr;
  }

  createPlan(plan:Plan): FormGroup {
    return this.fb.group({
      name:[plan.name],
      planId:[plan.planId],
      monthly:[plan.monthly],
      yearly:[plan.yearly],
      features: this.fb.array(plan.features?plan.features:[]),
    });
  }

  addPlan(): void {
    let items = this.form.get('plans') as FormArray;
    items.push(this.createPlan({name:'',monthly:null,yearly:null,description:'', planId:'',features:[]}));
  }

  removePlan(i: number) {
    let items = this.form.get('plans') as FormArray;
    items.removeAt(i);
  }

  get roleControls(): FormArray {
    return this.form.get('roles') as FormArray;
  }

  getFeatureControls(index:number): FormArray {
    let plans = this.form.get('plans') as FormArray;
    return plans.at(index).get('features') as FormArray;
  }

  removeRole(role: any) {
    const index = this.roleControls.value.indexOf(role);
    if (index >= 0) {
      this.roleControls.removeAt(index);
    }
  }

  addRole(event: MatChipInputEvent) {
    const input = event?.input;
    const value = event?.value;
    if ((value || "").trim()) {
      this.roleControls.push(this.fb.control(value));
    }
    if (input) {
      input.value = "";
    }
  }

  addFeature(index:number, event: MatChipInputEvent) {
    const input = event?.input;
    const value = event?.value;
    let features = this.getFeatureControls(index);
    if ((value || "").trim()) {
      features.push(this.fb.control(value));
    }
    if (input) {
      input.value = "";
    }
  }

  removeFeature(i:number,feature: any){
    const index =  this.getFeatureControls(i).value.indexOf(feature);
    if (index >= 0) {
      this.getFeatureControls(i).removeAt(index);
    }
  }
}
