import { Component, OnInit } from '@angular/core';
import {CustomerService} from '../customer.service';
import { Customer } from '../customer';
import { HttpHeaders } from '@angular/common/http';
import {AuthGuardService} from '../auth-guard.service';
import {ProductService} from '../product.service';
import {OrderService} from '../order.service';
import { Product } from '../product';
import { Order } from '../order';
import  swal  from 'sweetalert';

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

  constructor(
     private customerService:CustomerService,
     private authGuardService:AuthGuardService,
     private productService:ProductService,
     private orderService:OrderService) {  }

  ngOnInit() {
    this.getProducts();
    const customer= this.authGuardService.getToken();
    this.username = this.authGuardService.getUsername();
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

    addtoCart(){
      var order = new Order();
      order.cusUsername = this.cusUsername;
      order.prodName = this.prodName;
      order.orderQuantity = this.orderQuantity;
      order.totalPrice = this.totalPrice;
      order.buyNow = false; 

      this.orderService.addOrder(order).subscribe(res =>{
      //  localStorage.setItem('token',res.token)
      },
      err => console.log(err)      
      ) 
  
        swal("Congratulations!", "Thank you for trusting us!", "success");
  
        this.orderQuantity = 1;


    }

}
