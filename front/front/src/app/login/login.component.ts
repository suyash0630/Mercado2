import { Component, OnInit } from '@angular/core';
import { FormControl, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Routes, Router } from '@angular/router';
import { RegisterService } from './register.service';
import { Credentials } from './user';
import { AppComponent } from '../app.component'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  name: any;

  constructor(private fb: FormBuilder, private registerService: RegisterService, private router: Router, private obj: AppComponent) {
    // this.createForm();
   }
  errorMessage: string;
  successMessage: string;
  loginForm: any;

  email = new FormControl('', [Validators.required, Validators.email]);
  password = new FormControl('', [Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{7,20}$/)]);

  register() {
    this.router.navigate(['/register']);
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


  ngOnInit() {
    // this.login();
  }
  login() {
    

    this.loginForm = {
      email: this.email.value,
      password: this.password.value
    };
    console.log(this.email+" "+this.password);
    this.registerService.login(this.loginForm).subscribe(
      (response) => {
        console.log(response);
        // this.obj=new AppComponent();
        console.log(response[0].uCredentials.uEmail)
        sessionStorage.setItem('uEmail', response[0].uCredentials.uEmail);
        sessionStorage.setItem('uName',response[0].uProfile.uName);
        this.name=response[0].uProfile.uName;
        //alert(`You are successfully logged in as ${sessionStorage.getItem('uEmail')}`);
        this.obj.authenticateBySession();
       
      },
      (errorResponse) => {
            this.errorMessage = errorResponse.error.message;
            alert(this.errorMessage);
            this.router.navigate(['/login']);
            sessionStorage.clear();
          }
    );

  }

}
