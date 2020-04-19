import { Component, OnInit, Input } from '@angular/core';
import { searchService } from './search.service';
import { ActivatedRoute } from '@angular/router';
import { UriService } from '../uri.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  
 // @Input()
  searchKey:string;

  successMsg:string;
  errorMsg:string;
  prods:any[];
  prodlist:any[]=[];

  constructor(private vs:searchService, private router:Router, private route:ActivatedRoute, private UriService: UriService) { }

  ngOnInit() {
    this.searchprod();
    this.searchKey=this.route.snapshot.paramMap.get('searchKey');
   // this.router.params.subscribe(param => this.searchKey = param['searchk']);
    console.log(this.searchKey+" new search");
    
}
  searchprod() {
    this.vs.search(this.searchKey)
    .subscribe( 
      (good) => {
        this.prods=good;
        //console.log(this.prods);
        for(let i=0;i<this.prods.length;i++)
        {
          if(this.prods[i].pName.includes(this.searchKey)==true)
          {
            this.prodlist.push(this.prods[i]);
            console.log(this.prods[i]);
          }
        }
      }, 
      (bad) => {
        this.errorMsg=bad.error.message;
        
      })
  }

  displayproduct(item)
  {
    console.log(item+" got item");
    console.log(typeof(item));
    sessionStorage.setItem('item',item);
    this.UriService.storage = item;
   // sessionStorage.setItem('uName',response[0].uProfile.uName);
    this.router.navigate(['/productdetails']);
  }
  }

