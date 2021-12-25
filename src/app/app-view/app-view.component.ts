import { Component, OnInit } from '@angular/core';
import {App, Plan} from "../services/app-model";
import {AppService} from "../services/app.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Config} from "../services/config";

@Component({
  selector: 'app-app-view',
  templateUrl: './app-view.component.html',
  styleUrls: ['./app-view.component.scss']
})
export class AppViewComponent implements OnInit {
  app:App;

  constructor(public config:Config,private service:AppService,private router: Router,private route: ActivatedRoute) {
    this.app = this.emptyItem();

  }

  ngOnInit(): void {
    let id = this.route.snapshot.paramMap.get('id');
    if(id){
      this.service.getById(id).subscribe(i=>{
        this.app = i;
      });
    }
  }
  public emptyItem():App{
    return {
      id:null,
      jwkSetUri:'',
      owner:'',
      name:'',
      plans:[],
      roles:[],
    };
  }
}
