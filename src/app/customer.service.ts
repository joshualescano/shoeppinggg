import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders } from '@angular/common/http';
import {Customer} from './customer';
import {Observable} from 'rxjs';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  private url:string = "http://localhost:80";
  private headers = new HttpHeaders().set('Content-Type','application/json');


  authToken;
  customer;
  options;

  constructor(private http:HttpClient) { }

  getCustomers():Observable<Customer[]>{
    return this.http.get<Customer[]>
    (this.url + '/customer');
  }

  addCustomer(customer):Observable<any>{
    return this.http.post<any>(
      this.url + "/customer",
      customer,
      { headers:this.headers}
    );
  }

  updateCustomer(customer: Customer, id:string):Observable<Customer>{
    return this.http.put<Customer>(
      this.url + "/customer/" + id,
      customer,
      { headers:this.headers}
    );
  }

 deleteCustomer(id:string){
    return this.http.delete(this.url + '/customer/' +id);
  }


  login(customer):Observable<any[]>{
    return this.http.get<any[]>(
      this.url+'/customer/'+customer.username+'/'+customer.password,      
    );
  } 

}
