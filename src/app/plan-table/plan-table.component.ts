import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {AppModel, Plan} from "../services/app-model";
import {FormBuilder, FormGroup} from "@angular/forms";
import {PlanFormComponent} from "../plan-form/plan-form.component";
import {compareNumbers} from "@angular/compiler-cli/src/diagnostics/typescript_version";

@Component({
  selector: 'app-plan-table',
  templateUrl: './plan-table.component.html',
  styleUrls: ['./plan-table.component.scss']
})
export class PlanTableComponent implements OnInit {

  @Input()
  dataSource:Plan[]  = [];

  @Output()
  dataSourceChange:EventEmitter<Plan[]> = new EventEmitter<Plan[]>();

  user:Plan;
  userForm:FormGroup;
  editMode:boolean=false;

  constructor(private fb: FormBuilder) {
    this.user = AppModel.emptyPlan();
    this.userForm = PlanFormComponent.createForm(fb,this.user);
  }

  tableColumns = [
    'name',
    'planId',
    'monthly',
    'yearly',
    'features',
    'action'
  ];

  ngOnInit(): void {
  }

  add() {
    this.user = AppModel.emptyPlan();
    this.userForm = PlanFormComponent.createForm(this.fb,this.user);
    this.editMode = true;
  }

  rowClicked(element:Plan) {
    this.userForm = PlanFormComponent.createForm(this.fb,element);
    this.editMode = true;
  }

  delete(element:Plan) {
    this.dataSource = this.dataSource.filter(obj => obj.planId !== element.planId);
    this.dataSourceChange.emit(this.dataSource);
  }

  back() {
    this.user = AppModel.emptyPlan();
    this.editMode = false;
  }

  findIndex(user:Plan):number{
    return this.dataSource.findIndex(u => u.planId === user.planId);
  }

  save() {
    const user:Plan =this.userForm.getRawValue();
    const index:number = this.findIndex(user);
    index < 0 ? this.dataSource.push(user): this.dataSource[index] = user;
    this.editMode = false;
    this.sort();
  }

  sort(){
    this.dataSource = this.dataSource.sort((a,b)=> compareNumbers([a.monthly], [b.monthly]));
    this.dataSourceChange.emit(this.dataSource);
  }
}
