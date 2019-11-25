import { Component } from '@angular/core';
import {ProductService} from '../product.service';
import { Product } from '../product';
import  swal  from 'sweetalert';
import {AuthGuardService} from '../auth-guard.service';

//import {FileSelectDirective, FileUploader} from 'ng2-file-upload';
//// test 2///////////////
import { FormBuilder, FormGroup } from "@angular/forms";
import { Router } from '@angular/router';
import { HttpEvent, HttpEventType } from '@angular/common/http';



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

  public imagePath;
  imgURL: any;
  public message: string; 

//// test 2 ////////////
/*  preview: string;
  form: FormGroup;
  percentDone: any = 0;
  products = []; */

  constructor(private productService:ProductService, private authGuardService:AuthGuardService){

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
  // product.image = this.image;
    product.description = this.description; 

  //  const formData = new FormData();
   // formData.append('image', this.image);  


    this.productService.addProduct(product).subscribe((data)=>{
      console.log(data);
      this.getProducts()
    });

    swal("Good job!", "Item added!", "success");
    this.name = "";
    this.brand = "";
    this.price = null;
    this.quantity = null;
    this.description = "";
  } 

    // Image Preview
    /*uploadFile(event) {
      const file = (event.target as HTMLInputElement).files[0];
      this.form.patchValue({
        avatar: file
      });
      this.form.get('image').updateValueAndValidity()
  
      // File Preview
      const reader = new FileReader();
      reader.onload = () => {
        this.preview = reader.result as string;
      }
      reader.readAsDataURL(file)
    } */

 /* submitForm() {
    this.productService.addProduct(
      this.form.value.name,
      this.form.value.image
    ).subscribe((event: HttpEvent<any>) => {
      switch (event.type) {
        case HttpEventType.Sent:
          console.log('Request has been made!');
          break;
        case HttpEventType.ResponseHeader:
          console.log('Response header has been received!');
          break;
        /*case HttpEventType.UploadProgress:
          this.percentDone = Math.round(event.loaded / event.total * 100);
          console.log(`Uploaded! ${this.percentDone}%`);
          break; 
        case HttpEventType.Response:
          console.log('User successfully created!', event.body);
          this.percentDone = false;
          this.router.navigate(['product'])
      }
    })
  } */

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
  
  async deleteProduct(id){
      const willDelete = await swal({
        title: "Are you sure do you want to delete?",
        text: " Click outside if no",
        icon: "warning",
        dangerMode: true,
      });
       
      if (willDelete) {
        this.productService.deleteProduct(id).subscribe((data)=>{
          console.log(data);
          this.getProducts()
        });
        swal("Deleted!", "Item has been deleted!", "success");
      } 
    } 



  ///////////////////// IMAGE PREVIEW ///////////////////

   preview(files) {
    if (files.length === 0)
      return;
 
    var mimeType = files[0].type;
    if (mimeType.match(/image\/*/) == null) {
      this.message = "Only images are supported.";
      return;
    }
 
    var reader = new FileReader();
    this.imagePath = files;
    reader.readAsDataURL(files[0]); 
    reader.onload = (_event) => { 
      this.imgURL = reader.result; 
    }
  } 


}
