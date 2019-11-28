import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders } from '@angular/common/http';
import {Product} from './product';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private url:string = "http://localhost:80";
  private headers = new HttpHeaders().set('Content-Type','application/json');
  
  constructor(private http:HttpClient) { }

  getProducts(){
    return this.http.get<any[]>
    (this.url + '/product');
  }

  getProducts2(){
    return this.http.get<any[]>
    (this.url + '/product');
  }

  searchBrand(brand){
    return this.http.get<any[]>
    (this.url + '/search'+brand);
  }

  searchName(name){
    return this.http.get<any[]>
    (this.url + '/search'+name);
  }
  addProduct(product):Observable<any>{
    return this.http.post<any>(
      this.url + "/product",
      product,
      { headers:this.headers}
    );
  } 

  updateProduct(product: Product, id:string):Observable<Product>{
    return this.http.put<Product>(
      this.url + "/product/" + id,
      product,
      { headers:this.headers}
    );
  }

 deleteProduct(id:string){
    return this.http.delete(this.url + '/product/' +id);
  }

  selectItem(id:string){
    return this.http.get<any[]>
    (this.url + '/product'+id);
  }
 }
