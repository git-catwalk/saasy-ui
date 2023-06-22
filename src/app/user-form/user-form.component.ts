import {Component, Input, OnInit} from '@angular/core';
import {AppModel, User} from "../services/app-model";
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent implements OnInit {

  @Input()
  user:User;

  @Input()
  roleList:Array<String> = [];

  @Input('group')
  userForm:FormGroup;

  constructor(private fb: FormBuilder) {
    this.user = AppModel.emptyUser();
    this.userForm = UserFormComponent.createForm(fb,this.user);
  }

  ngOnInit(): void {
  }

  static createForm(fb: FormBuilder,user:User): FormGroup {
    return  fb.group({
      "username":  [ user.username],
      "name": [ user.name],
      "email": [ user.email],
      "active": [user.active],
      "roles":  [user.roles]
    });
  }
}
