import { Component } from '@angular/core';
import {CustomerService} from '../customer.service';
import { Customer } from '../customer';
import  swal  from 'sweetalert';
import { Router } from '@angular/router';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  title = 'shoepping';

  private customers:Customer[];
  private username:String;
  private password:String;
  private confirm:String;
  private cusfName:String;
  private cuslName:String;
  private address:String;
  private birthday:String;
  private phone:Number;

  constructor(private customerService:CustomerService,private router: Router){

  }
  ngOnInit(){
    this.getCustomers();
  }

  getCustomers(){
    this.customerService.getCustomers().subscribe((data)=>{
      this.customers = data;
    });
  }

  addCustomer(){
    var customer = new Customer();
    customer.username = this.username;
    customer.password = this.password;
    customer.cusfName = this.cusfName;
    customer.cuslName = this.cuslName;
    customer.address = this.address; 
    customer.birthday = this.birthday;
    customer.phone = this.phone;

    if(this.password != this.confirm){
      swal("Error!", "password not match!", "error");
    }
    else{
      this.customerService.addCustomer(customer).subscribe(res =>{
        localStorage.setItem('token',res.token)
      },
      err => console.log(err)      
      ) 

      swal("Congratulations!", "Welcome to shoepping family!", "success");

      this.username = "";
      this.password = "";
      this.confirm = "";
      this.cusfName = "";
      this.cuslName = "";
      this.address = "";
      this.birthday = "";
      this.phone = null;

      setTimeout(() =>{
        this.router.navigate(['/cushome']);
       }, 2000);
    }
  }
}
