import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  

  
  constructor(private httpclient:HttpClient) 
  {

   }

  getResults(subject:string)
  {
    return this.httpclient.get<Result>("http://127.0.0.1:8000/examapi/getResults/"+subject)
  }
}


export class Result 
{

  username:string;
  subject:string;
  score:number;

  constructor(username:string,subject:string,score:number)
  {
    this.username=username;
    this.subject=subject
    this.score=score;
  }
}
