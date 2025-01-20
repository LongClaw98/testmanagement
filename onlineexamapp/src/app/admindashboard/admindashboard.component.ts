import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {  Router } from '@angular/router';

@Component({
  selector: 'app-admindashboard',
  imports: [FormsModule],
  templateUrl: './admindashboard.component.html',
  styleUrl: './admindashboard.component.css'
})
export class AdmindashboardComponent {

  constructor(private router:Router)
  { 

  }

  showResult()
  {
    this.router.navigateByUrl("manageresult")
  }

  showQuestion()
  {
    this.router.navigateByUrl("questionmanagement")
  }
}
