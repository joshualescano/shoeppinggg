import { Component } from '@angular/core';
import {CustomerService} from '../customer.service';
import { Customer } from '../customer';
import { Router } from '@angular/router';
import  swal  from 'sweetalert';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  title = 'shoepping';

  private customers:Customer[];
  private username:String;
  private password:String;
  private cusfName:String;
  private cuslName:String;
  private address:String;
  private birthday:String;
  private phone:Number;


  constructor(
    private customerService:CustomerService,
    private router: Router,
    ){}


  ngOnInit(){
    this.getCustomers();
  }


getCustomers(){
  this.customerService.getCustomers().subscribe((data)=>{
    this.customers = data;
  });
}


///////////////////// LOGIN ////////////////////////////////////////////

  doLogin(){
    var customer = new Customer();
      customer.username = this.username;
      customer.password = this.password;

    var user_ = "admin";
    var pass_= "admin123";

  //  this.token = data['token'];
  //  this.storage.set('token', this.token);

    this.customerService.login(customer).subscribe((res:any)=>{

    if(res.msg == user_ ){
      localStorage.setItem('token',res.token)
       swal("Welcome Back!", "You can now update the inventory", "success");

        setTimeout(() =>{
          this.router.navigate(['/products']);  
         }, 2000);
      } 

     if(res.msg=='err'){
      swal("Error!", "username or password not correct!", "error");
     }
      else if(res.length!=0 && res.msg == "customer"){
        localStorage.setItem('token',res.token);
        localStorage.setItem('username',res.customer.username);
        swal("Welcome!", "username and password match!", "success");

        setTimeout(() =>{
          this.router.navigate(['/cushome']);
         }, 2000);
      } 
    });  
}

}

