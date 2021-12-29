import {Injectable} from "@angular/core";
import {HttpClient, HttpParams} from "@angular/common/http";
import {Config} from "./config";
import {Observable} from "rxjs";
import {TenantUser} from "./app-model";


@Injectable()
export class TenantUserService {
  constructor(public http: HttpClient,public config:Config ) { }

  search(term:string = '',tenantId:string ,page:number = 0,limit:number = 50):Observable<Array<TenantUser>> {
    let url:string = this.config.api + "/rest/tenant-user/search";
    const params = new HttpParams()
      .set('tenantId',tenantId)
      .set('page', String(page))
      .set('term',term)
      .set('limit',limit);
    return this.http.get<Array<TenantUser>>(url, {params});
  }

  list():Observable<Array<TenantUser>> {
    return this.http.get<Array<TenantUser>>(this.config.api + "/rest/tenant-user");
  }

  save(model: TenantUser):Observable<TenantUser>{
    return this.http.post<TenantUser>(this.config.api + "/rest/tenant-user", model);
  }

  getById(id: string):Observable<TenantUser> {
    return this.http.get<TenantUser>(this.config.api + "/rest/tenant-user/" + id);
  }

  removeById(id: string | null):Observable<any>{
    return this.http.delete<any>(this.config.api + "/rest/tenant-user/" + id);
  }
}
