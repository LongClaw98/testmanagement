import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { QuestionComponent } from './question/question.component';
import { ScoreComponent } from './score/score.component';
import { QuestionmanagementComponent } from './questionmanagement/questionmanagement.component';
import { AdmindashboardComponent } from './admindashboard/admindashboard.component';
import { ManageresultComponent } from './manageresult/manageresult.component';

export const routes: Routes = [

    {path:'login',component:LoginComponent},
    {path:'question',component:QuestionComponent},
    {path:'score',component:ScoreComponent},
    {path:'questionmanagement',component:QuestionmanagementComponent},
    {path:'admindashboard',component:AdmindashboardComponent},
    {path:'manageresult',component:ManageresultComponent},



];
