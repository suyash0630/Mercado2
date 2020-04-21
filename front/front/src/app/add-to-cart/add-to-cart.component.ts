import { Component, OnInit } from '@angular/core';
import { UriService } from '../uri.service';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';

@Component({
  selector: 'app-add-to-cart',
  templateUrl: './add-to-cart.component.html',
  styleUrls: ['./add-to-cart.component.css']
})
export class AddToCartComponent implements OnInit {
  userId: string;
  items: any[] = [];
  errorMsg: string;
  amount: number = 0;
  tax = 0;
  totalamount = 0;
  successMessage = '';
  errorMessage = '';
  flag = true;
  cartlen;
  ii;
  flag2 = false;
  matching : boolean = false;
  obj = { 'productId': '', 's_Id': '','maxQ': ''};
  myobjseller: any[] = [];
  constructor(private uriservices: UriService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    console.log('on add to cart');
    this.matching = false;
    this.flag2 = false;
    this.viewitems();
  }

  viewitems() {

    this.userId = sessionStorage.getItem('uEmail');
    console.log(this.userId);
    this.uriservices.viewcart(this.userId)
      .subscribe(
        (good) => {
          this.items = good;
          console.log('Aaa')
          console.log('itemssss', this.items);
          this.flag = true;
          this.flag2 = true;
          if (this.items == null)
            {this.flag = true;}
          else {
            this.calculateamount();
            this.getmaxquantity();
          }
         
        },
        (bad) => {
          
          this.errorMsg = bad.error.message;
        })
  }
  getmaxquantity() {
    console.log('A - This items: ', this.items);
    this.myobjseller = [];
    let myobj = ['', ''];
    console.log('B: ', this.myobjseller, myobj);
    for (let i = 0; i < this.items.length; i++) {
      let obj = { 'productId': '', 's_Id': '', 'maxQ': '' };
      console.log('C: ', this.myobjseller);
      obj.productId = this.items[i].productId;
      obj.s_Id = this.items[i].s_Id;
      console.log(obj);
      this.myobjseller.push(obj);
      console.log("\\\\\\\\\\\\\\\\\\\\\\\\\\\\");
    }
    console.log(this.myobjseller);
    console.log("\\\\\\\\\\\\\\\\\\\\\\\\\\\\");

    this.uriservices.getsellerquantity(this.myobjseller).subscribe(
      (good) => {
        // this.myobjseller[i].maxQ=good;
        console.log("here are we")
        console.log(good);
       for(let i=0;i<this.myobjseller.length;i++)
       {
        this.myobjseller[i].maxQ = good[i];
        this.items[i].maxQ = good[i];
       }
       this.flag=false;
       console.log(this.myobjseller);

      },
      (bad) => {
       
        console.log(bad);
      }
    )
  }

  deletetest(data) {
    console.log("Delete button is working");
    console.log(data);
    this.uriservices.deletecartdata(data)
      .subscribe(
        (good) => {
          console.log("checked out");
          this.successMessage = "Deleted SuccessFully";
          console.log(good);
          this.ngOnInit();
        },
        (bad) => {
          this.errorMessage = "Could not Perform Your Request";
          this.ngOnInit();
        })

  }

  checkout() {
    this.flag = true;
    // console.log(this.items);
    //  console.log(typeof this.items);
    this.uriservices.checkout(this.items)
      .subscribe(
        (good) => {
          console.log("checked out");
          this.successMessage = good.message;
          console.log(good);
          this.router.navigate(['/order-history'])
        },
        (bad) => {
          this.errorMessage = bad.error.message;
        })
  }

  calculateamount() {
    this.amount = 0;
    this.tax = 0;
    this.totalamount = 0;
    this.matching = false;
    if (this.items != null) {

      this.items.forEach((i) => {
        this.amount += (i.price * i.pQuantity);
        if(i.pQuantity>i.maxQ)
        this.matching = true;
      });
    }
    this.tax = this.amount * 0.17;
    this.totalamount = this.amount + this.tax;
    console.log(this.amount, this.tax, this.totalamount);
  }
  checking(value) {

    // console.log(this.myobjseller);
    console.log(this.items);
    this.calculateamount();
    

  }

}
