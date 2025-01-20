import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Result } from './admin.service';


@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  constructor(private httpclient:HttpClient,) { }
  
  addQuestion(question:Question)
  {
    return this.httpclient.post<Question>("http://127.0.0.1:8000/examapi/addQuestion/",question)
  }
  
  getAllQuestions(subject: string)
  {
    return this.httpclient.get<Question[]>("http://127.0.0.1:8000/examapi/GetAllQuestions/"+subject)
  }

  viewQuestion(qno:number,subject:string)
  {
    return this.httpclient.get<Question>("http://127.0.0.1:8000/examapi/viewQuestion/"+qno+"/"+subject)
  }

  updateQuetion(question:Question)
  {
    return this.httpclient.put("http://127.0.0.1:8000/examapi/updateQuestion/",question)
  }

  deleteQuestion(qno:number,subject:string)
  {
    return this.httpclient.delete("http://127.0.0.1:8000/examapi/deleteQuestion/"+qno+"/"+subject)
  }
   
  saveResult(result:Result)
  {
    return this.httpclient.post<Result>("http://127.0.0.1:8000/examapi/saveResult/",result)
  }

}

export class Question
{
   qno :number;
   subject:string;
   qtext:string;
   op1:string;
   op2:string;
   op3 :string;
   op4 :string;
   answer:string;

  constructor(qno :number,qtext:string,subject:string,answer:string,op1:string,op2:string,op3 :string,op4 :string)
  {
    this.qno=qno;
    this.answer=answer;
    this.op1=op1;
    this.op2=op2;
    this.op3=op3;
    this.op4=op4;
    this.subject=subject
    this.qtext=qtext;
    
  
  }
}

  export class Answer
  {
    qno:number;
    qtext:string;
    submittedAnswer:string;
    correctAnswer:string;

    constructor(qno:number,qtext:string,submittedAnswer:string,correctAnswer:string)
    {
      this.qno=qno;
      this.qtext=qtext;
      this.submittedAnswer=submittedAnswer;
      this.correctAnswer=correctAnswer;
    }
  
  
  
  }











