import { Component } from '@angular/core';
import {ProductService} from '../product.service';
import { Product } from '../product';


@Component({
  selector: 'app-productss',
  templateUrl: './productss.component.html',
  styleUrls: ['./productss.component.css']
})
export class ProductssComponent {
  title = 'shoepping';

  private products:Product[];
  private name:String;
  private brand:String;
  private price:Number;
  private quantity:Number;
  private image:String;
  private description:String;


  constructor(private productService:ProductService){

  }
  ngOnInit(){
    this.getProducts();
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
}
