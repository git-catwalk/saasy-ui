import {Component, Input, OnInit} from '@angular/core';
import {User} from "../services/app-model";

@Component({
  selector: 'app-user-table',
  templateUrl: './user-table.component.html',
  styleUrls: ['./user-table.component.scss']
})
export class UserTableComponent implements OnInit {

  @Input()
  dataSource:User[]  = [];

  constructor() { }

  tableColumns = [
    'firstname',
    'lastname',
    'email',
    'roles'
  ];

  ngOnInit(): void {
  }

  add() {

  }

  rowClicked(element:any) {

  }

  delete(element:any) {

  }
}
