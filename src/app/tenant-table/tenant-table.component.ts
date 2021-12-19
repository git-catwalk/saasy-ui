import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup} from "@angular/forms";
import { ActivatedRoute, Router} from "@angular/router";
import {PageEvent} from "@angular/material/paginator";
import {TenantService} from "../services/tenant.service";
import {Tenant} from "../services/app-model";

@Component({
  selector: 'app-tenant-table',
  templateUrl: './tenant-table.component.html',
  styleUrls: ['./tenant-table.component.scss']
})
export class TenantTableComponent implements OnInit {

  private _currentSearchValue:string ='';
  private _currentPage: number = 1;
  private _pageSize: number = 20;
  public _dataLength: number = 0;

  dataSource:Tenant[]  = [];

  tableColumns = [
    'id',
    'tenant',
    'users',
    'plan',
    'action'
  ];

  constructor(private fb: FormBuilder,private service:TenantService,private router: Router,private route: ActivatedRoute) {

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
    this.router.navigate(['/tenant']);
  }

  rowClicked(row:any){
      let url = '/tenant/' + row['id'];
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
}
