import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpclient:HttpClient) { }

  validate(user:User)
  {
    return this.httpclient.post<boolean>("http://localhost:8000/examapi/validate/",user);
  }

  adminValidate(admin:Admin)
  {
    return this.httpclient.post<Admin>("http://127.0.0.1:8000/examapi/validateAdmin/",admin)
  }

  getAllSubjects(){
    return this.httpclient.get<string[]>("http://127.0.0.1:8000/examapi/getAllSubjects/")
  }
}

export class Admin
{
  username:string;
  password:string;
  constructor(username:string,password:string)
  {
    this.username=username;
    this.password=password

  }
}

export class User
{
  username:string;
  password:string;
  mobno:number;
  emaiid:string;

  constructor(username:string,password:string,mobno:number,emaiid:string)
  {
    this.username=username;
    this.password=password;
    this.mobno=mobno;
    this.emaiid=emaiid;
    
  }

  
}