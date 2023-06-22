import {Injectable} from "@angular/core";
import {HttpClient, HttpParams} from "@angular/common/http";
import {Config} from "./config";
import {Observable} from "rxjs";
import  {App}  from "./app-model";


@Injectable()
export class AppService {
    constructor(public http: HttpClient,public config:Config ) { }

    search(term:string = '',page:number = 0,limit:number = 50):Observable<Array<App>> {
        let url:string = this.config.api + "/rest/app/search";
        const params = new HttpParams()
        .set('page', String(page))
        .set('term',term)
        .set('limit',limit);
        return this.http.get<Array<App>>(url, {params});
    }

    list():Observable<Array<App>> {
        return this.http.get<Array<App>>(this.config.api + "/rest/app");
    }

    save(model: App):Observable<App>{
        return this.http.post<App>(this.config.api + "/rest/app", model);
    }

    getById(id: string | null):Observable<App> {
        return this.http.get<App>(this.config.api + "/rest/app/" + id);
    }

    removeById(id: string | null):Observable<any>{
        return this.http.delete<any>(this.config.api + "/rest/app/" + id);
    }
}
