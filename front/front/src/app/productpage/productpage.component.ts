import { Component, OnInit, Input } from '@angular/core';
import { UriService } from '../uri.service';
import { ActivatedRoute, Router } from '@angular/router'
@Component({
  selector: 'app-productpage',
  templateUrl: './productpage.component.html',
  styleUrls: ['./productpage.component.css']
})
export class ProductpageComponent implements OnInit {
item:any[];
  constructor(private UriService: UriService,private route: ActivatedRoute,private router:Router) {
    console.log("done"); 
    console.log(this.UriService.storage);
   this.item = this.UriService.storage;
   console.log(this.item['_id']);
   this.finalprice=this.item["price"]-(this.item["price"]*this.item["pSeller"]["pDiscount"]);
  }
  // @Input()
  // item:any[];

  finalprice:number=0;
  sample: string;
  errorMessage :string;
  sub: any;
  ngOnInit() {
    // this.fina`lprice=this.item["price"]-(this.item["price"]*this.item["pSeller"]["pDiscount"]);
  }
  proceedtocart(item1){
    console.log(item1);
    console.log(item1.length+" item length");
    this.UriService.addtocart(item1)
      .subscribe(
        response => {
          console.log("success");
          this.sample = response.message;
          alert("Added to cart")
          console.log(response)
        }, err => {
          console.log("failure");
          console.log(err);
          this.errorMessage = err.error.message
        });
        

  }
  book(item1){
    console.log(item1);
    
    this.UriService.checkout(item1)
      .subscribe(
        response => {
          console.log("success");
          this.sample = response.message;
          console.log(response)
        }, err => {
          console.log("failure");
          console.log(err);
          this.errorMessage = err.error.message
        });
        

  }
  goback(){
    this.router.navigate(['/dashboard']);
    console.log("goback");
  }


}
