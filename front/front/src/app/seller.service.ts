import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {UriService} from './uri.service';
@Injectable({
  providedIn: 'root'
})
export class SellerService {

  urlregister = "http://localhost:1111/seller";
  url = "http://localhost:1111/sellerlogin";
  urlproduct="http://localhost:1111/addproducts";
  urlgetproduct="http://localhost:1111/productSeller/"
  constructor(private http: HttpClient, private us:UriService) { }
  registerSeller(seller:any): Observable<any> { 
    console.log(typeof(seller))
    return this.http.post<any>(this.urlregister, seller);
  }
  sellerlogin(login:any):Observable<any>{
    console.log(typeof(login));
    console.log(this.http.post<any>(this.url,login));
    
    return this.http.post<any>(this.url,login);
  }
  addProduct(product:any):Observable<any>{
    return this.http.post<any>(this.urlproduct,product);
  }
  getProducts():Observable<any>{
    return this.http.get<any>(this.urlgetproduct+this.us.storage1);
  }
}
