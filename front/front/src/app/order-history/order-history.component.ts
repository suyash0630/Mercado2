import { Component, OnInit } from '@angular/core';
import { UriService } from '../uri.service';
import { ActivatedRoute, Router } from '@angular/router'
import {MatTableModule} from '@angular/material/table';
import {CdkTableModule} from '@angular/cdk/table';
export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
  {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
  {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
  {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
  {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
  {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
  {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
  {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
  {position: 10,name: 'Neon', weight: 20.1797, symbol: 'Ne'}
];

@Component({
  selector: 'app-order-history',
  templateUrl: './order-history.component.html',
  styleUrls: ['./order-history.component.css']
})
export class OrderHistoryComponent implements OnInit {
  flag2=false;

  displayedColumns: string[] = ['position','productname', 'img','name', 'weight', 'symbol'];
  //dataSource = ELEMENT_DATA;
dataSource: any[];
 constructor(private UriService: UriService) { }
 userId:string;
 items: any[];
 successMessage: string;
 errorMessage: string;
  ngOnInit() {
    this.userId = sessionStorage.getItem('uEmail');
    console.log(this.userId);
    this.flag2=false;
    this.viewpastorder();
  }
  viewpastorder()
  {
    this.UriService. orderhistory(this.userId)
    .subscribe( 
      (good) => {
        this.items=good;
        this.flag2=true;
        this.dataSource = this.items;
        console.log("items in order history",this.items);
      }, 
      (bad) => {
        this.errorMessage=bad.error.message;
        console.log("aa");
        console.log(bad);
      })
  }
 
}
