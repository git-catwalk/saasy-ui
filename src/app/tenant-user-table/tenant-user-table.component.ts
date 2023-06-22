import {AfterViewInit, Component, Input, OnInit} from '@angular/core';
import {TenantUser} from "../services/app-model";
import {FormBuilder} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {TenantUserService} from "../services/tenant-user.service";
import {PageEvent} from "@angular/material/paginator";

@Component({
  selector: 'app-tenant-user-table',
  templateUrl: './tenant-user-table.component.html',
  styleUrls: ['./tenant-user-table.component.scss']
})
export class TenantUserTableComponent implements OnInit{
  private _currentSearchValue:string ='';
  private _currentPage: number = 1;
  private _pageSize: number = 20;
  public _dataLength: number = 0;

  @Input()
  tenantId:string = '';

  dataSource:TenantUser[]  = [];

  constructor(private fb: FormBuilder,private service:TenantUserService,private router: Router,private route: ActivatedRoute) {

  }

  ngOnInit(): void {

    this.search();
  }

  tableColumns = [
    'name',
    'email',
    'roles',
    'active',
    'action'
  ];

  public filterList(searchParam: string): void {
    this._currentSearchValue = searchParam;
    this._currentPage = 1;
    this.search();
  }

  search() {
    this.service.search(this._currentSearchValue,this.tenantId,this._currentPage -1,this._pageSize).subscribe((p)=>{
      this.dataSource = p;
      this._dataLength = p.length;
    })
  }

  add(){
    this.router.navigate(['/tenant-user/'+ this.tenantId ]);
  }

  rowClicked(row:any){
    let url = '/tenant-user/' + row['tenantId'] + '/' + row['id'];
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
