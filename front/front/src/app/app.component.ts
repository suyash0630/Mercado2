import { Component, OnInit } from '@angular/core';
import { Routes, Router, ActivatedRoute, ParamMap } from '@angular/router';
import { User } from './login/user';
import { RegisterService } from './login/register.service';
import { UriService } from './uri.service';
import {Observable} from 'rxjs'
import {FormControl} from '@angular/forms'
import {map, startWith} from 'rxjs/operators';

export interface State {
  flag: string;
  name: string;
  population: string;
}
export interface State1{
  "_id":string,
  "pName":string,
  "pDescription":string,
  "pRating":string,
  "pCategory":string,
  "price":string,
  "color":string,
  "image":string,
  "specification":string,
  "dateFirstAvailable":string,
  "dateLastAvailable":string,
  "pSeller":{
      "s_Id":string,
      "pDiscount":string,
      "pQuantity":string,
      "pShippingCharges":string
  }
}
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  static authenticateBySession() {
    throw new Error("Method not implemented.");
  }
  title = 'Mercado';
  loggedUser: User;
  hide = true;
  show = false;
  display = false;
  flag=false;
  fl=false;
  myobjseller;
  search;
  cart=[];
  cart1;
  stateCtrl = new FormControl();
  filteredStates: Observable<State1[]>;
  name:string;
  states: State1[] = [
    
  ];
  constructor( private router: Router, private registerService: RegisterService,private uriservices:UriService) {
    this.router.navigate(['/dashboard']);
    this.filteredStates = this.stateCtrl.valueChanges
      .pipe(
        startWith(''),
        map(state => state ? this._filterStates(state) : this.states.slice())
      );
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
 this.getelec()


  
    let p;
    console.log("appcomponent");
    this.userId=sessionStorage.getItem('uEmail');
    console.log(this.userId)
   
    this.uriservices.viewcart(this.userId)
    .subscribe(
      (good) => {
       
       
       this.cart=good
       console.log(this.cart.length)
       this.cart1=this.cart.length
      },
      (bad) => {
        
        
      })
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
    this.router.navigate(['/seacrh/'+searchKey])
    // this.slideShow = false;
    // this.productShow = true;
    // this.categorySelected = null;
    // this.prodToBeSearched = searchKey;
  }
  getelec(){
  this.uriservices.view('Electronics')
  .subscribe(
    response => {
      console.log("success");
       let i
      console.log(response);
      for(i=0;i<response.length;i++){
        this.states.push(response[i])
      }
    }, err => {
      console.log("failure");
      console.log(err);
      
    });
    this.uriservices.view('Shoes')
  .subscribe(
    response => {
      console.log("success");
       let i
      console.log(response);
      for(i=0;i<response.length;i++){
        this.states.push(response[i])
      }
    }, err => {
      console.log("failure");
      console.log(err);
      
    });
    this.uriservices.view('Clothing')
  .subscribe(
    response => {
      console.log("success");
       let i
      console.log(response);
      for(i=0;i<response.length;i++){
        this.states.push(response[i])
      }
    }, err => {
      console.log("failure");
      console.log(err);
      
    });
    this.uriservices.view('Furniture')
  .subscribe(
    response => {
      console.log("success");
       let i
      console.log(response);
      for(i=0;i<response.length;i++){
        this.states.push(response[i])
      }
    }, err => {
      console.log("failure");
      console.log(err);
      
    });
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
private _filterStates(value: string): State1[] {
  const filterValue = value.toLowerCase();

  return this.states.filter(state => state.pName.toLowerCase().indexOf(filterValue) === 0);
}
}
