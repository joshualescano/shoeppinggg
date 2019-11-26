import { Component } from '@angular/core';
import {ProductService} from '../product.service';
import { Product } from '../product';
import {CustomerService} from '../customer.service';
import { Customer } from '../customer';
import { Router } from '@angular/router';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  title = 'shoepping';

  private products:Product[];
  private name:String;
  private brand:String;
  private price:Number;
  private quantity:Number;
  private image:File;
  private description:String;

  private customers:Customer[];
  private username:String;
  private password:String;
  private cusfName:String;
  private cuslName:String;
  private address:String;
  private birthday:String;
  private phone:Number;


  constructor(
    private productService:ProductService, 
    private customerService:CustomerService,
    private router: Router,
    ){}


  ngOnInit(){
    this.getProducts();
    this.getCustomers();
  }

  getProducts(){
    this.productService.getProducts().subscribe((data)=>{
      this.products = data;
    });
  }

  ////////////////////// CUSTOMER //////////////////////////////////////

getCustomers(){
  this.customerService.getCustomers().subscribe((data)=>{
    this.customers = data;
  });
}


}

