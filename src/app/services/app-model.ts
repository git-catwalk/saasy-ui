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
 owner:User;
 users:Array<User>;

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
 monthly:number | null;
 yearly:number | null;
 features:Array<string> | null;
 suggested:boolean | null;
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
    return {name:'',monthly:null,yearly:null,description:'', planId:'',features:[],suggested:false}
  }

  public static emptyUser(): User {
    return {username:'',active:false,name:null,email:'',roles:[]}
  }

  public static emptyTenant(): Tenant {
    return {id:null,displayName:'',app:AppModel.emptyIdName(), owner:AppModel.emptyUser(), users:[], planId: ''}
  }

  public static emptyIdName(): IdName {
    return {id:null, name:''}
  }
}
