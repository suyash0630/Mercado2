import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { UriService } from './uri.service';

import { RegisterService } from './login/register.service';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

// ---------------angular-material--------------------
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatTableModule} from '@angular/material/table';
import { MatTabChangeEvent } from '@angular/material';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule } from '@angular/material/form-field';
import {MatCardModule} from '@angular/material/card';
import {MatInputModule} from '@angular/material';
import {MatIconModule} from '@angular/material/icon';
import { MatCarousel, MatCarouselComponent, MatCarouselModule } from '@ngmodule/material-carousel';
import { MatTabsModule, MatSidenavModule, MatToolbarModule } from '@angular/material';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { NgMatSearchBarModule } from 'ng-mat-search-bar';
import { RegisterComponent } from './register/register.component';
import { ProductpageComponent } from './productpage/productpage.component';
import { SearchComponent } from './search/search.component';
import { AddToCartComponent } from './add-to-cart/add-to-cart.component';

import { OrderHistoryComponent } from './order-history/order-history.component';


import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatSelectModule} from '@angular/material/select';

import {MatBadgeModule} from '@angular/material/badge';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
//import { RegisterComponent } from './register/register.component';


@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    LoginComponent,
    RegisterComponent,
    ProductpageComponent,
    SearchComponent,
    AddToCartComponent,
 
    OrderHistoryComponent,
    
    
  ],
  imports: [
    BrowserModule, MatTabsModule, MatSidenavModule, MatToolbarModule , ReactiveFormsModule, NgMatSearchBarModule,
    AppRoutingModule, MatCardModule, MatInputModule, FormsModule, HttpClientModule, MatIconModule,
    BrowserAnimationsModule, MatButtonModule, MatFormFieldModule, MatCarouselModule,MatTableModule,MatProgressSpinnerModule,
    MatGridListModule,MatBadgeModule,MatAutocompleteModule,MatSelectModule
],
  providers : [UriService, RegisterService],
  bootstrap: [AppComponent]
})
export class AppModule { }
