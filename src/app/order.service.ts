import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders } from '@angular/common/http';
import {Order} from './order';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private url:string = "http://localhost:80";
  private headers = new HttpHeaders().set('Content-Type','application/json');

  constructor(private http:HttpClient) { }

  getOrders():Observable<Order[]>{
    return this.http.get<Order[]>
    (this.url + '/order');
  }

  deliverOrders():Observable<Order[]>{
    return this.http.get<Order[]>
    (this.url + '/deliver');
  }

  addOrder(order):Observable<any>{
    return this.http.post<any>(
      this.url + "/order",
      order,
      { headers:this.headers}
    );
  } 

  addToCart(cart):Observable<any>{
    return this.http.post<any>(
      this.url + "/order",
      cart,
      { headers:this.headers}
    );
  } 

  viewCart(username){
    return this.http.get<any[]>(
      this.url+'/order/'+username,      
    );
  }

  removeToCart(id:string){
    return this.http.delete(this.url + '/order/' +id);
  }

  approveOrder(order: Order, id:string):Observable<Order>{
    return this.http.put<Order>(
      this.url + "/approve/" + id,
      order,
      { headers:this.headers}
    );
  }

  buyNowProducts(order: Order, username:string):Observable<Order>{
    return this.http.put<Order>(
      this.url + "/order/" + username,
      order,
      { headers:this.headers}
    );
  }

 deleteOrder(id:string){
    return this.http.delete(this.url + '/order/' +id);
  }
 }
