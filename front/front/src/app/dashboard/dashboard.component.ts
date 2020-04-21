import { Component, OnInit } from '@angular/core';
import { NgModule } from '@angular/core';
import { MatTabChangeEvent } from '@angular/material';
import { ViewCatalog } from '../shared/ViewCatalog';
import { UriService } from '../uri.service';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  prodToBeSearched: string;
  categorySelected: string;
  errorMessage: string;
  slideShow: boolean;
  productShow: boolean;
  ViewCatalogs: any;
  successMessage: String;
  show: boolean;
  prod:any[];
  constructor(private UriService: UriService,private route: ActivatedRoute,
    private router: Router) { 
      console.log("const called");
    }
  userId;
  categories = ['Electronics', 'Shoes', 'Clothing', 'Furniture'];
  ngOnInit() {
    this.slideShow = true;
    this.productShow =false;;
    
    console.log(this.slideShow);
    console.log(this.productShow)
    console.log("ngonit");
  }


  viewProductByCategory(event: MatTabChangeEvent) {

    console.log(event.tab.textLabel);
    this.categorySelected = event.tab.textLabel;
    console.log("A");
    this.ViewCatalogs =null;
    console.log(this.categorySelected);
    this.slideShow = false;
    this.productShow = true;
    this.successMessage = null;
    this.errorMessage = null;

    this.UriService.view(this.categorySelected)
      .subscribe(
        response => {
          console.log("success");
          this.ViewCatalogs = response;
          console.log(this.ViewCatalogs);
        }, err => {
          console.log("failure");
          console.log(err);
          this.errorMessage = err.error.message
        });
  }
  viewProductBy(category)
  {
    console.log(category);
    this.slideShow = false;
    this.productShow = true;
    this.ViewCatalogs =null;
    this.successMessage = null;
    this.errorMessage = null;
    this.UriService.view(category)
    .subscribe(
      response => {
        console.log("success");
        this.ViewCatalogs = response;
        console.log(this.ViewCatalogs);
      }, err => {
        console.log("failure");
        console.log(err);
        this.errorMessage = err.error.message
      });
  }



  routepage(value) {
    this.UriService.storage = value;
    this.router.navigate(['/productdetails'])
  }
}
