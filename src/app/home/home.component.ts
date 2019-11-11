import { Component } from '@angular/core';
import {ProductService} from '../product.service';
import { Product } from '../product';
import {CustomerService} from '../customer.service';
import { Customer } from '../customer';


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
  private image:String;
  private description:String;

  private customers:Customer[];
  private username:String;
  private password:String;
  private cusfName:String;
  private cuslName:String;
  private address:String;
  private birthday:String;
  private phone:Number;


  constructor(private productService:ProductService, private customerService:CustomerService){}


  ngOnInit(){
    this.getProducts();
    this.getCustomers();
  }

  getProducts(){
    this.productService.getProducts().subscribe((data)=>{
      this.products = data;
    });
  }

  addProduct(){
    var product = new Product();
    product.name = this.name;
    product.brand = this.brand;
    product.price = this.price;
    product.quantity = this.quantity;
    product.image = this.image;
    product.description = this.description; 


    this.productService.addProduct(product).subscribe((data)=>{
      console.log(data);
      this.getProducts()
    });
  }

  updateProduct(id){
    var product = new Product();
    product.name = this.name;
    product.brand = this.brand;
    product.price = this.price;
    product.quantity = this.quantity;
    product.image = this.image;
    product.description = this.description; 

    this.productService.updateProduct(product, id).subscribe((data)=>{
      console.log(data);
      this.getProducts()
    });
  }
  
  deleteProduct(id){
    this.productService.deleteProduct(id).subscribe((data)=>{
      console.log(data);
      this.getProducts()
    });
  }

  ////////////////////// CUSTOMER //////////////////////////////////////

getCustomers(){
  this.customerService.getCustomers().subscribe((data)=>{
    this.customers = data;
  });
}
}


