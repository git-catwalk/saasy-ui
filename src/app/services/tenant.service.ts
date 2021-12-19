import {Injectable} from "@angular/core";
import {HttpClient, HttpParams} from "@angular/common/http";
import {Config} from "./config";
import {Observable} from "rxjs";
import  {Tenant}  from "./app-model";


@Injectable()
export class TenantService {
    constructor(public http: HttpClient,public config:Config ) { }

    search(term:string = '',page:number = 0,limit:number = 50):Observable<Array<Tenant>> {
        let url:string = this.config.api + "/rest/tenant/search";
        const params = new HttpParams()
        .set('page', String(page))
        .set('term',term)
        .set('limit',limit);
        return this.http.get<Array<Tenant>>(url, {params});
    }

    list():Observable<Array<Tenant>> {
        return this.http.get<Array<Tenant>>(this.config.api + "/rest/tenant");
    }

    save(model: Tenant):Observable<Tenant>{
        return this.http.post<Tenant>(this.config.api + "/rest/tenant", model);
    }

    getById(id: string):Observable<Tenant> {
        return this.http.get<Tenant>(this.config.api + "/rest/tenant/" + id);
    }

    removeById(id: string | null):Observable<any>{
        return this.http.delete<any>(this.config.api + "/rest/tenant/" + id);
    }
}
