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

  addOrder(order):Observable<any>{
    return this.http.post<any>(
      this.url + "/order",
      order,
      { headers:this.headers}
    );
  } 

  updateOrder(order: Order, id:string):Observable<Order>{
    return this.http.put<Order>(
      this.url + "/order/" + id,
      order,
      { headers:this.headers}
    );
  }

 deleteOrder(id:string){
    return this.http.delete(this.url + '/order/' +id);
  }
 }
