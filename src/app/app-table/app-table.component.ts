import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup} from "@angular/forms";
import { ActivatedRoute, Router} from "@angular/router";
import {PageEvent} from "@angular/material/paginator";
import {AppService} from "../services/app.service";
import {App, Plan} from "../services/app-model";

@Component({
  selector: 'app-app-table',
  templateUrl: './app-table.component.html',
  styleUrls: ['./app-table.component.scss']
})
export class AppTableComponent implements OnInit {

  private _currentSearchValue:string ='';
  private _currentPage: number = 1;
  private _pageSize: number = 20;
  public _dataLength: number = 0;

  dataSource:App[]  = [];

  tableColumns = [
    'name',
    'plans',
    'roles',
    'owner',
    'action'
  ];

  constructor(private fb: FormBuilder,private service:AppService,private router: Router,private route: ActivatedRoute) {

  }

  ngOnInit(): void {
    this.search();
  }

  public filterList(searchParam: string): void {
    this._currentSearchValue = searchParam;
    this._currentPage = 1;
    this.search();
  }

  search() {
    this.service.search(this._currentSearchValue,this._currentPage -1,this._pageSize).subscribe((p)=>{
      this.dataSource = p;
      this._dataLength = p.length;
    })
  }

  add(){
    this.router.navigate(['/app']);
  }

  rowClicked(row:any){
      let url = '/app/' + row['id'];
      this.router.navigate([url]);
  }

  delete(element:any) {
      this.service.removeById(element.id).subscribe((t)=>{
        this.search();
      });
  }

  clone(element:any){
      this.service.getById(element.id).subscribe((t)=>{
        t.id = null;
        this.service.save(t).subscribe(t=>{
          this.search();
        })
      });
  }

  handlePage($event: PageEvent) {
    this._currentPage = $event.pageIndex + 1;
    this._pageSize = $event.pageSize;
    return this.search();
  }

  getPlans(plans: Array<Plan>) {
     return plans.map( p => { return ' ' + p.name + '-' + p.monthly;});
  }

  view(element:any) {
    let url = '/app-view/' + element.id;
    this.router.navigate([url]);
  }
}
