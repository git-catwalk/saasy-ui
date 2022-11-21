import {Injectable} from "@angular/core";

export interface App{
 id:string | null;
 owner:string | null;
 name:string | null;
 jwkSetUri:string | null;
 plans:Array<Plan>;
 roles:Array<string>;
}

export interface Tenant{
 app: IdName;
 planId:string;
 id:string | null;
 displayName:string;
 customer:User;
 users:Array<User>;
}

export interface TenantUser {
  id:string | null;
  tenantId:string | null;
  username:string | null;
  name:string | null;
  email:string | null;
  active:boolean;
  roles:Array<string> | null;
}

export interface User{
 username:string | null;
 name:string | null;
 email:string | null;
 active:boolean;
 roles:Array<string> | null;
}

export interface Plan{
 name:string | null;
 description:string | null;
 planId:string | null;
 monthly:number  ;
 yearly:number  ;
 features:Array<string> | null;
 suggested:boolean | null;
 buttonTitle:string | null;
 payUrl: string | null;
}

export interface IdName{
  id:string | null;
  name:string | null;
}

@Injectable({
  providedIn: 'root'
})
export class AppModel {

  public static emptyApp(): App {
    return {id:null, jwkSetUri:'', owner:'', name:'', plans:[], roles:[]}
  }

  public static emptyPlan(): Plan {
    return {name:'',monthly:19,yearly:98,description:'', planId:'',features:[],suggested:false,buttonTitle:'',payUrl:''}
  }

  public static emptyUser(): User {
    return {username:'',active:false,name:null,email:'',roles:[]}
  }

  public static emptyTenantUser(): TenantUser {
    return {id:null,tenantId:null,username:'',active:false,name:null,email:'',roles:[]}
  }

  public static emptyTenant(): Tenant {
    return {id:null,displayName:'',app:AppModel.emptyIdName(), customer:AppModel.emptyUser(), users:[], planId: ''}
  }

  public static emptyIdName(): IdName {
    return {id:null, name:''}
  }
}
