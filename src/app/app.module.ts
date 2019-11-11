import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SignupComponent } from './signup/signup.component';
import { HomeComponent } from './home/home.component';
import { ItempageComponent } from './itempage/itempage.component';

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import {FormsModule } from '@angular/forms';
import { AdminComponent } from './admin/admin.component';
import { OrderlistComponent } from './orderlist/orderlist.component';
import { ProductlistComponent } from './productlist/productlist.component';
import { UsermanagementComponent } from './usermanagement/usermanagement.component';
import { ProductssComponent } from './productss/productss.component';
import { CushomeComponent } from './cushome/cushome.component';



@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    HomeComponent,
    ItempageComponent,
    AdminComponent,
    OrderlistComponent,
    ProductlistComponent,
    UsermanagementComponent,
    ProductssComponent,
    CushomeComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
