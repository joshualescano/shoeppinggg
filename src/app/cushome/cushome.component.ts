import { Component, OnInit } from '@angular/core';
import {CustomerService} from '../customer.service';
import { Customer } from '../customer';
import { HttpHeaders } from '@angular/common/http';
import {AuthGuardService} from '../auth-guard.service';
import {ProductService} from '../product.service';
import {OrderService} from '../order.service';
import { Product } from '../product';
import { Order } from '../order';

@Component({
  selector: 'app-cushome',
  templateUrl: './cushome.component.html',
  styleUrls: ['./cushome.component.css']
})
export class CushomeComponent implements OnInit {

  private products:Product[];
  private name:String;
  private brand:String;
  private price:Number;
  private quantity:Number;
  private image:File;
  private description:String;

  private products2:Product[];
  private username: string;

  private orders:Order[];
  private cusUsername:String;
  private prodName:String;
  private orderQuantity:Number;
  private totalPrice:Number;
  private buyNow:Boolean;

  private carts:Order[];

  constructor(
     private customerService:CustomerService,
     private authGuardService:AuthGuardService,
     private productService:ProductService,
     private orderService:OrderService) {  }

  ngOnInit() {
    this.getProducts();
    const customer= this.authGuardService.getToken();
    this.username = this.authGuardService.getUsername();
    this.viewCart(this.username);
    }
    
    getProducts(){
      this.productService.getProducts().subscribe((data)=>{
        this.products = data;
      });
    }
    
    
    selectItem(id){
      this.productService.selectItem(id).subscribe((data)=>{
        this.products2 = data;
      });
    } 

    addtoCart(cusUsername, prodName, orderQuantity, totalPrice){
      var order = {
        cusUsername:cusUsername,
        prodName:prodName,
        orderQuantity:orderQuantity,
        totalPrice:totalPrice,
        buyNow:false,
        approve:false
      }
      this.orderService.addToCart(order).subscribe(res =>{
      },
      err => console.log(err)      
      ) 
  
      this.orderQuantity = 1;
      this.viewCart(cusUsername);
    }

    viewCart(username){
      this.orderService.viewCart(username).subscribe((data)=>{
      this.carts = data; 
      });
    }

    buyNowProducts(username){
      var order = new Order();
      order.buyNow=true
      
      var a = window.confirm("Are you sure do you want this items?");
      if(a){
      this.orderService.buyNowProducts(order,username).subscribe((data)=>{
        console.log(data);
        window.alert("Thank you for trusting us!");
        this.viewCart(username);
        });
      }
    } 

    async removeToCart(id){
      var a = window.confirm("Are you sure do you want to remove this item?");
      if(a){
        this.orderService.removeToCart(id).subscribe((data)=>{
        });
        this.viewCart(this.username);
      }
      this.viewCart(this.username);

    } 

    async deleteOrder(id){
      var a = window.confirm("Are you sure do you want to remove this order?");
      if(a){
          this.orderService.deleteOrder(id).subscribe((data)=>{
            console.log(data);
          });

        } 
      }

      searchAdidas(){
        var brand = "adidas";
        this.productService.searchBrand(brand).subscribe((data)=>{
          this.products = data;
        });
      }
      
      searchNike(){
        var brand = "nike";
        this.productService.searchBrand(brand).subscribe((data)=>{
          this.products = data;
        });
      }
      
      searchVans(){
        var brand = "vans";
        this.productService.searchBrand(brand).subscribe((data)=>{
          this.products = data;
        });
      }
      
      searchSketchers(){
        var brand = "sketchers";
        this.productService.searchBrand(brand).subscribe((data)=>{
          this.products = data;
        });
      }
      
      searchSperry(){
        var brand = "sperry";
        this.productService.searchBrand(brand).subscribe((data)=>{
          this.products = data;
        });
      }
      searchByName(name){
        this.productService.searchName(name).subscribe((data)=>{
          this.products = data;
        });
      }
}
