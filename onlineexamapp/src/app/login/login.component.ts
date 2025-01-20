import { Component, OnInit } from '@angular/core';
import { Admin, User, UserService } from '../user.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  imports: [CommonModule , FormsModule ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit
{
    user:User=new User("","",0,"");
    message:string="";
    subject:string="";
    admin:Admin= new Admin("","");
    subjects:any[]=[]


    constructor(private userservice:UserService,private router:Router , httpclient:HttpClient)
    {

    }
    ngOnInit(): void {
      
      this.userservice.getAllSubjects().subscribe(array => this.subjects = array)
    }
    
    validate()
    {
      this.userservice.validate(this.user).subscribe(response=>{
        
        if(response)
          {
            
            sessionStorage.setItem('subject',this.subject);
            sessionStorage.setItem('username',this.user.username)
            this.router.navigateByUrl("question")
          }
      // sessionStorage.setitem("message","welcome"+ this.user.username);
      // sessionStorage.setitem("username",this.user.username);
      // sessionStorage.setitem('subject',this.subject);
        else
          {
            console.log("else")
            this.message="invalid credentials";
            this.router.navigateByUrl("login")
          }

      });
    }

    validateAdmin()
    {
      this.admin.username=this.user.username
      this.admin.password=this.user.password

      this.userservice.adminValidate(this.admin).subscribe(response=>{

        if(response)
        {
          

          this.router.navigateByUrl('admindashboard')
          this.message="Wlecome Admin "+this.admin.username
        }
        else
        {
          this.message="invalid credentials";
          this.router.navigateByUrl("login")
        }
      })
    }
}
