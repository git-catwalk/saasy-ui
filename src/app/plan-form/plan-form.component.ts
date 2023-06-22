import {Component, Input, OnInit} from '@angular/core';
import {AppModel, Plan} from "../services/app-model";
import {FormArray, FormBuilder, FormGroup} from "@angular/forms";
import {MatChipInputEvent} from "@angular/material/chips";
import {COMMA, ENTER} from "@angular/cdk/keycodes";

@Component({
  selector: 'app-plan-form',
  templateUrl: './plan-form.component.html',
  styleUrls: ['./plan-form.component.scss']
})
export class PlanFormComponent implements OnInit {
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;

  readonly separatorKeysCodes: number[] = [ENTER, COMMA];

  @Input()
  plan:Plan;

  @Input('group')
  planForm:FormGroup;

  constructor(private fb: FormBuilder) {
    this.plan = AppModel.emptyPlan();
    this.planForm = PlanFormComponent.createForm(fb,this.plan);
  }

  ngOnInit(): void {
  }

  static createForm(fb: FormBuilder,plan:Plan): FormGroup {
    return  fb.group({
      name:[plan.name],
      description:[plan.description],
      planId:[plan.planId],
      monthly:[plan.monthly],
      yearly:[plan.yearly],
      features: fb.array(plan.features?plan.features:[]),
      buttonTitle: [plan.buttonTitle],
      payUrl: [plan.payUrl]
    });
  }

  getFeatureControls(): FormArray {
    return this.planForm.get('features') as FormArray;
  }

  addFeature(event: MatChipInputEvent) {
    const input = event?.input;
    const value = event?.value;
    let features = this.getFeatureControls();
    if ((value || "").trim()) {
      features.push(this.fb.control(value));
    }
    if (input) {
      input.value = "";
    }
  }

  removeFeature(feature: any){
    const index =  this.getFeatureControls().value.indexOf(feature);
    if (index >= 0) {
      this.getFeatureControls().removeAt(index);
    }
  }
}
