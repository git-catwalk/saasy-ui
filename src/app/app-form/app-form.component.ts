import { Component, OnInit } from '@angular/core';
import {FormArray, FormBuilder, FormGroup} from "@angular/forms";
import { ActivatedRoute, Router} from "@angular/router";
import {AppService} from "../services/app.service";
import {App, AppModel, Plan} from "../services/app-model";
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
    this.item = AppModel.emptyApp();
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

  public createForm():FormGroup{
     return this.fb.group({
        "name": [this.item.name],
        "id":[{value: this.item.id, disabled:true}],
        "jwkSetUri": [this.item.jwkSetUri],
        "roles": this.fb.array(this.item.roles?this.item.roles:[]),

     });
  }

  get roleControls(): FormArray {
    return this.form.get('roles') as FormArray;
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

  updateDatasource($event: Plan[]) {
    this.form.get("plans")?.setValue($event);
    this.item.plans = $event;
  }
}
