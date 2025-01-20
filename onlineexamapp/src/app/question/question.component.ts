import { Component, OnInit } from '@angular/core';
import { Answer, Question, QuestionService } from '../question.service';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Result } from '../admin.service';

@Component({
  selector: 'app-question',
  standalone:true,
  imports: [FormsModule],
  templateUrl: './question.component.html',
  styleUrl: './question.component.css'
})
export class QuestionComponent implements OnInit
{
  index:number=0
  subject: any ="";
  username:any=''
  questions:Question[]=[];
  question:Question= new Question(0,'','','','','','','');
  submittedAnswer:string='';
  allAnswers: Answer[]=[];

  duration:number= 0; //secs
  durationinterval:any='';
  durationmessage='';

  select: boolean | undefined ;
  
  constructor(private questionservice:QuestionService , private router:Router)
  {
    this.subject=sessionStorage.getItem('subject');
    this.username = sessionStorage.getItem("username")
    
    
    this.durationinterval=setInterval(() =>
    {
  
      this.duration=this.duration-1;
  
      var minutes = Math.floor(this.duration/60);
      var seconds = this.duration%60;
  
      this.durationmessage= minutes +":"+ seconds ;
  
      if(this.duration==0)
        this.endexam();
  
    },1000);
  }
  
  async ngOnInit(): Promise<void> 
  {
    let v = false
    this.select= v;
    
    // getAllQuestions has [[]  question array   subscribe()] 
    this.questionservice.getAllQuestions(this.subject).subscribe(array=> { this.questions=array ; this.question=this.questions[this.index]; } );
    
    type ApiResponseItem = {
      id: number;
      name: string;
    };
    

    //below funtion returns dynamic time acording to the no of question 30 sec per question
    async function fetchAndGetLength(this : any) 
    {

      let s: any = sessionStorage.getItem('subject');

      const apiUrl = "http://127.0.0.1:8000/examapi/GetAllQuestions/"+s ; // Replace with your API URL
    
      try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
    
        const data: ApiResponseItem[] = await response.json();
    
        // Check if the response is an array and get its length
        const arrayLength = data.length;
        
        console.log(`The length of the API response array is: ${arrayLength}`);
        return arrayLength ;
      } catch (error) {
        console.error("Error fetching API data:", error);
        return 0;
      }
    }
    fetchAndGetLength().then((a) => {
      this.duration = a * 30; // Use the resolved value
      console.log(this.duration); // Example usage
    });

  
  }

  opColor(option : string)
  {
    for (var i=0;i<this.allAnswers.length ; i++)
    {
      let answer = this.allAnswers[i];

      if(answer.qno == this.question.qno && answer.submittedAnswer.trim()==option.trim())
      {
        return ["aqua" , true] ; // takinf array instead of writing addition function from checked property
      }

    }
    return ["brown",false ] 
  }
  
  
  nextQuestion()
  {
    if(this.index<this.questions.length-1 )
    {
        this.index=this.index+1;
        this.question=this.questions[this.index];
    }
    else 
    {this.question=this.questions[this.questions.length-1]
    }
  
  }
  
  previousQuestion()
  {
    if(this.index>0)
    {
      this.index=this.index-1;
      this.question=this.questions[this.index];
    }
    else
    {
      this.question=this.questions[0];
    }
  }
  
  saveAnswer()
  {
    let answer = new Answer(this.question.qno,this.question.qtext,this.submittedAnswer,this.question.answer)  

    let indexofelement = this.allAnswers.findIndex(answerfromallAnswer => answerfromallAnswer.qno==answer.qno);
    
    if(indexofelement==-1)
    {
      this.allAnswers.push(answer);
    }
    else
    {
      this.allAnswers[indexofelement].submittedAnswer=answer.submittedAnswer
    }
    console.log(JSON.stringify(this.allAnswers))
  
  
  }
  
  endexam()
  {

    clearInterval(this.durationinterval)
    let score=0;

    for  (var i=0;i<this.allAnswers.length;i++)
    {
      var answer=this.allAnswers[i];

      console.log(answer.submittedAnswer + " " + answer.correctAnswer);

      if(answer.submittedAnswer==answer.correctAnswer)
         {
               score=score+1;
         }
    }
    var result = new Result(this.username,this.subject,score)      
    this.questionservice.saveResult(result)
    this.router.navigate(['score'], {queryParams:{'score': score,'allanswers': JSON.stringify(this.allAnswers)}});
  }
  
  

}

 

