import { Component, OnInit } from '@angular/core';
import { Routes, Router, ActivatedRoute, ParamMap } from '@angular/router';
import { User } from './login/user';
import { RegisterService } from './login/register.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  static authenticateBySession() {
    throw new Error("Method not implemented.");
  }
  title = 'hoopla';
  loggedUser: User;
  hide = true;
  show = false;
  display = false;
  flag=false;
  fl=false;
  name:string;
  constructor( private router: Router, private registerService: RegisterService) {
    this.router.navigate(['/dashboard']);
}
  userId;
  ngOnInit() {
    // this.authenticateBySession();
    // console.log(sessionStorage.key(0)+"sess");
    // if(sessionStorage.key(0)!=null)
    // {
    //   this.fl=true;
    //   this.name=sessionStorage.getItem('uName');
    // }
    console.log("appcomponent");
    this.userId=sessionStorage.getItem('uEmail');
    console.log("hereee")
  }
  call()
  {
    console.log("dash called");
    this.router.navigate(['home']);
  }
  sellerfun(){
    this.router.navigate(['Seller']);
  }
logout() {
  sessionStorage.clear();
  this.loggedUser = null;
  this.userId='';
  this.router.navigate(['home']);
  console.log("ayush");
  this.fl=false;
}

  ngDoCheck(): void {
  this.loggedUser = new User();
  this.loggedUser.uCredentials.uEmail = sessionStorage.getItem('uEmail');
  this.loggedUser.uCart = JSON.parse(sessionStorage.getItem('uCart'));
  }

  hideContent() {
    this.hide = false;
    this.show = true;
  //  this.authenticateBySession();
  }

  showContent() {
    this.hide = true;
    this.show = false;
  }

  searchProducts(searchKey) {
    console.log(searchKey+"app");
    this.flag=true;
    // this.slideShow = false;
    // this.productShow = true;
    // this.categorySelected = null;
    // this.prodToBeSearched = searchKey;
  }
authenticateBySession() {
  const  loggedEmail = sessionStorage.getItem('uEmail');
  this.fl=true;
  console.log(loggedEmail+"useremail");
  console.log(sessionStorage);
  this.name=sessionStorage.getItem('uName');
  console.log(sessionStorage.getItem('uCart'));
  if (loggedEmail) {
    this.registerService.getUserDetail(loggedEmail).subscribe(
      res => {
        this.loggedUser = res;
      },
      err => {this.loggedUser = null; }
    );

  } else {
    this.loggedUser = null;
  }
  console.log("aa");
  this.userId=sessionStorage.getItem('uEmail');
  this.router.navigate(['/home']);


}
}
