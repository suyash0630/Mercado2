import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import {SellerService} from "../seller.service";
import { Routes, Router } from '@angular/router';
import {UriService} from "../uri.service";
@Component({
  selector: 'app-seller',
  templateUrl: './seller.component.html',
  styleUrls: ['./seller.component.css']
})
export class SellerComponent implements OnInit {
  successMsg:string;
  errorMsg:string;
  registerForm:FormGroup;
  show:boolean=true;
  loginForm: any;
  email=new FormControl('', [Validators.required, Validators.email]);
  password= new FormControl('', [Validators.required, Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}')]);
  constructor(private rf:FormBuilder,private ss:SellerService,private router: Router,private us:UriService) { }

  ngOnInit() {
    this.registerForm=this.rf.group({
      sEmail: ['', [Validators.required, emailvalidation]],
      sPass: ['', [Validators.required, Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}'), Validators.minLength(8)]],
      sName: ['', [Validators.required, Validators.pattern('^[a-zA-Z][a-zA-Z" "]*')]],
      sTANNumber:["",[Validators.required,Validators.pattern("[A-Z]{4}[0-9]{5}[A-Z]")]],
      sGSTNumber:["",[Validators.required,Validators.pattern("[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z][0-9][A-Z][0-9]")]],
      sAccountNumber:["",[Validators.required,Validators.pattern("[0-9]{9,18}")]],
      sPhone: ['', [Validators.required, Validators.pattern('[1-9][0-9]{9}')]]
      
    })
  }
  seller()
  {
    console.log("yes");
    this.successMsg="";
    this.errorMsg="";
    this.ss.registerSeller(this.registerForm.value)
    .subscribe( 
      (good) => {
        this.successMsg=good.message;
        this.show=true;
      }, 
      (bad) => {
        this.errorMsg=bad.error.message;
      })
  }
  sellerlogin(){
    console.log("sellerlogin");
    this.successMsg="";
    this.errorMsg="";
    this.loginForm = {
      email: this.email.value,
      password: this.password.value
    };
    this.us.storage1=this.loginForm.email;
    this.ss.sellerlogin(this.loginForm)
    .subscribe( 
      (good) => {
        console.log(good);
        
        this.successMsg=good;
        console.log(this.successMsg);
        this.router.navigate(['/getProducts']);
      }, 
      (bad) => {
        this.errorMsg=bad.error.message;
      })
  }
  fun(){
    this.show=false;
  }
  getErrorMessage(field) {
    if (field === 'email') {
      return this.email.hasError('required') ? 'You must enter a value' :
        this.email.hasError('pattern') ? 'Not a valid email' :
          '';
    } else if (field === 'password') {
      return this.password.hasError('required') ? 'You must enter a value' :
        this.password.hasError('pattern') ? 'Not a valid password' :
          '';
    }
  }
 }



function emailvalidation(c: FormControl)
{
  console.log(c.value)
  if(c.value.match(/^\w+([\.-_]?\w+)*(@seller)$/))
  {
    console.log("Wrong");
    return null;
  }
  else
    return { sEmailError : {message: "Enter a valid email Id"} };
}