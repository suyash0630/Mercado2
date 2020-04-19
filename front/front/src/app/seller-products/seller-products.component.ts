import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {SellerService} from "../seller.service";
import {UriService} from "../uri.service";
import { ActivatedRoute, Router, ParamMap } from '@angular/router';

@Component({
  selector: 'app-seller-products',
  templateUrl: './seller-products.component.html',
  styleUrls: ['./seller-products.component.css']
})
export class SellerProductsComponent implements OnInit {

  successMsg:string;
  errorMsg:string;
  productForm:FormGroup;

  constructor(private rf:FormBuilder,private ss:SellerService,private us:UriService,private router: Router) { }

  ngOnInit() {
    this.productForm=this.rf.group({
      pName :["",[Validators.required]],
      pCategory:["",[Validators.required,Validators.pattern("[A-Za-z]+")]],
      price:["",[Validators.required,Validators.min(1)]],
      pQuantity:["",[Validators.required,Validators.min(1)]],
      pDiscount:["",[Validators.required,Validators.min(0.05)]]

    })
  }
  sellerProduct(){
    console.log("yes");
    this.successMsg="";
    this.errorMsg="";
    this.productForm.value["s_Id"]=this.us.storage1;
    console.log(this.productForm)
    this.ss.addProduct(this.productForm.value)
    .subscribe( 
      (good) => {
        this.successMsg=good.message;
        this.router.navigate(['/getProducts'])
      }, 
      (bad) => {
        this.errorMsg=bad.error.message;
      })
  }
}
