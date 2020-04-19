import { Component, OnInit } from '@angular/core';
import { SellerService } from '../seller.service';
import { Router } from '@angular/router';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}
@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {
  displayedColumns: string[] = ['position', 'name', 'img','weight', 'symbol'];

  constructor(private ss:SellerService,private router: Router) { }
productsDetails:any;
errorMsg:String;
dataSource: any[];
  ngOnInit() {
this.fun();
  }
fun(){
 this.ss.getProducts().subscribe((good)=>{
  this.productsDetails=good;
  console.log(good);
  this.dataSource = good;
 },
 (bad)=>{
   this.errorMsg="No Products is sold By User";
 });
}
add(){
this.router.navigate(['/sellerProduct']);
}

}
