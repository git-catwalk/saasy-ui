export interface App{
 id:string | null;
 owner:string | null;
 name:string | null;
 plans:Array<Plan> | null;
 roles:Array<string> | null;
}

export interface Tenant{
 id:string | null;
 tenant:User | null;
 users:Array<User> | null;
 plan:Plan | null;
}

export interface User{
 username:string | null;
 firstname:string | null;
 lastname:string | null;
 email:string | null;
 roles:Array<string> | null;
}

export interface Plan{
 name:string | null;
 description:string | null;
 planId:string | null;
 monthly:number | null;
 yearly:number | null;
 features:Array<string> | null;
}

