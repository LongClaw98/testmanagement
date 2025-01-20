import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Answer } from '../question.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-score',
  imports: [CommonModule],
  templateUrl: './score.component.html',
  styleUrl: './score.component.css'
})
export class ScoreComponent implements OnInit
{
  score:any=0;
  allanswers:Answer[] = []
  data:any='';

  constructor(private activatedRout:ActivatedRoute)
  {

  }
  ngOnInit(): void
  {
    this.activatedRout.queryParamMap.subscribe(queryparameters => this.score=queryparameters.get('score'))
    this.activatedRout.queryParamMap.subscribe(queryparameters => { this.data = queryparameters.get('allanswers');this.allanswers=JSON.parse(this.data);})

  }

  compare(submittedAnswer:string,correctAnswer:string)
  {
    if(submittedAnswer==correctAnswer)
      return "green";
    else
    return "red";
  }
}
