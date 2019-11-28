import { Component, OnInit } from '@angular/core';
import {AuthGuardService} from '../auth-guard.service';

import { OrderService } from '../order.service';
import { Order } from '../order';

@Component({
  selector: 'app-orderlist',
  templateUrl: './orderlist.component.html',
  styleUrls: ['./orderlist.component.css']
})
export class OrderlistComponent implements OnInit {

  private orders:Order[];
  private delivers:Order[];
  private cusUsername:String;
  private prodName:String;
  private orderQuantity:Number;
  private totalPrice:Number;
  private buyNow:Boolean;
  private approve:Boolean;

  constructor(private authGuardService:AuthGuardService, private orderService:OrderService) { }

  ngOnInit() {
    this.getOrders();
    this.deliverOrders();
  }
  
  getOrders(){
    this.orderService.getOrders().subscribe((data)=>{
      this.orders = data;
    });
  }

  deliverOrders(){
    this.orderService.deliverOrders().subscribe((data)=>{
      this.delivers = data;
    });
  }

  async approveOrder(id){
    var order = new Order();
    order.approve=true

    var a = window.confirm("Are you sure do you want to approve this order?");
    if(a){
      this.orderService.approveOrder(order, id).subscribe((data)=>{
        console.log(data);
        this.getOrders();
        this.deliverOrders();
      });
    }

  }

  async deleteOrder(id){
    var a = window.confirm("Are you sure do you want to delete this order?");
    if(a){
        this.orderService.deleteOrder(id).subscribe((data)=>{
          console.log(data);
          this.getOrders()
          this.deliverOrders();
        });
      } 
    } 
}
