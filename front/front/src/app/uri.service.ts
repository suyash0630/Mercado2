/*
 * This is a service class used across all the components
 * this provides the url for server side applications to all the 
 * http calls in the service classes 
 */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ViewCatalog } from './shared/viewcatalog';
import { Router } from '@angular/router';
import { AppComponent } from './app.component';
@Injectable()
export class UriService {
    public storage: any;
    public storage1:any;
    
    constructor(private http: HttpClient, private router:Router) {
      }
    /** HooplaWebServiceUri  properties */
    hooplaWebServiceUri = {
        protocol: 'http',
        host: "localhost",
        port: '1111',
        applicationName: ''
    };

    view(category): Observable<any[]> {
        console.log("view service called");
        return this.http.get<any[]>("http://localhost:1111/products/"+category);
    }
    deletecartdata(data): Observable<any[]> {
      console.log("delete cart data",data);
      return this.http.post<any[]>("http://localhost:1111/deletecartdata/",data);
    }
    addtocart(data) :  Observable<any> {
        console.log("add to cart called");
        if(sessionStorage.getItem('uEmail')==null)
        {
          console.log("aa");
          this.router.navigate(['/login']);
        }
        else
        {
          data.pQuantity=1;
          data.userId=sessionStorage.getItem('uEmail');
          console.log(data);
          console.log("add to cart data");
          return <Observable<any>>this.http.post("http://localhost:1111/cart/", data);
        }
      }
    viewcart(userId) :  Observable<any[]> {
        console.log("view cart of user called");
        return this.http.get<any[]>("http://localhost:1111/cart/" +userId);
      }
    orderhistory(userId)  :  Observable<any[]> {
        console.log("view orders of user called");
        return this.http.get<any[]>("http://localhost:1111/orderhistory/" +userId);
      }
    checkout(data) :  Observable<any> {
        console.log("checkout of user is called");
        data.userId=sessionStorage.getItem('uEmail');
        console.log(data);
        console.log("the above is data");
        return <Observable<any>>this.http.post("http://localhost:1111/checkout/", data);
      }
      getsellerquantity(data):  Observable<any> {
        console.log("get seller quantity");
        console.log(data.length,data);
        return  <Observable<any>>this.http.post("http://localhost:1111/getsellerquantity/" , data);
        
      }

    buildHooplaWebServiceUri() {
        return this.hooplaWebServiceUri.protocol + 
            "://" + this.hooplaWebServiceUri.host + 
            ":" + this.hooplaWebServiceUri.port + 
            "/" + this.hooplaWebServiceUri.applicationName;
    }


 

    


}