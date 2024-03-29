import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {FormBuilder} from "@angular/forms";
import {MatDialog} from "@angular/material/dialog";
import {IconService} from "../services/icon.service";
import {UserProfileService} from "../services/user-profile.service";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  user:any = {};
  constructor(private userProfileService : UserProfileService,private iconService: IconService,private  dialog:  MatDialog,private router: Router,private fb: FormBuilder) {

  }

  ngOnInit(): void {
    this.userProfileService.getUserInfo().subscribe((u)=>{
      this.user= u;
    });
    this.iconService.registerIcons();
  }
}
