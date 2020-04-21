import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormControl, FormGroup } from '@angular/forms';
import { registerService } from './Register.service';
import { Route, Router } from '../../../node_modules/@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  successMsg:string;
  errorMsg:string;
  registrationForm:FormGroup;

  constructor(private rf:FormBuilder, private rs:registerService,private route: Router) { }

  ngOnInit() {
    this.registrationForm=this.rf.group({
      uName: ['', [Validators.required, Validators.minLength(4)]],
      uPhone: ['', [Validators.required, Validators.pattern(/^[1-9]{1}[0-9]{9}$/)]],
      uEmail: ['', [Validators.required, emailvalidation]],
      uPass: ['', [Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{7,20}$/), Validators.minLength(8)]],
      uDOB:['',[Validators.required]]
    })
  }

  register()
  {
    console.log("yes");
    this.successMsg="";
    this.errorMsg="";
    this.rs.registerUser(this.registrationForm.value)
    .subscribe( 
      (good) => {
        if(good.message=="the email Id is registered: Already exists")
        {
          this.successMsg="Account with this email already exist"
        }
        else
        this.successMsg=good.message;
       
      }, 
      (bad) => {
        this.errorMsg=bad.error.message;
      })
  }
 }


function emailvalidation(c: FormControl)
{
  console.log(c.value)
  if(c.value.match(/^\w+([\.-_]?\w+)*@\w+[.][(com)|(co.in)]+$/))
  {
    console.log("Wrong");
    return null;
  }
  else{
 
    return { emailidError : {message: "Enter a valid email id"} };
  }
}

