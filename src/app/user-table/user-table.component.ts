import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {AppModel, User} from "../services/app-model";
import {FormBuilder, FormGroup} from "@angular/forms";
import {UserFormComponent} from "../user-form/user-form.component";

@Component({
  selector: 'app-user-table',
  templateUrl: './user-table.component.html',
  styleUrls: ['./user-table.component.scss']
})
export class UserTableComponent implements OnInit {

  @Input()
  dataSource:User[]  = [];

  @Output()
  dataSourceChange:EventEmitter<User[]> = new EventEmitter<User[]>();

  @Input()
  roleList:Array<String> = [];

  user:User;
  userForm:FormGroup;
  editMode:boolean=false;

  constructor(private fb: FormBuilder) {
    this.user = AppModel.emptyUser();
    this.userForm = UserFormComponent.createForm(fb,this.user);
  }

  tableColumns = [
    'name',
    'email',
    'roles',
    'active',
    'action'
  ];

  ngOnInit(): void {
  }

  add() {
    this.user = AppModel.emptyUser();
    this.userForm = UserFormComponent.createForm(this.fb,this.user);
    this.editMode = true;
  }

  rowClicked(element:User) {
    this.userForm = UserFormComponent.createForm(this.fb,element);
    this.editMode = true;
  }

  delete(element:User) {
    this.dataSource = this.dataSource.filter(obj => obj.email !== element.email);
    this.dataSourceChange.emit(this.dataSource);
  }

  back() {
    this.user = AppModel.emptyUser();
    this.editMode = false;
  }

  findIndex(user:User):number{
    return this.dataSource.findIndex(u => u.email === user.email);
  }

  save() {
    const user:User =this.userForm.getRawValue();
    const index:number = this.findIndex(user);
    index < 0 ? this.dataSource.push(user): this.dataSource[index] = user;
    this.editMode = false;
  }
}
