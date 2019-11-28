import { Component } from '@angular/core';
import {CustomerService} from '../customer.service';
import { Customer } from '../customer';

import {AuthGuardService} from '../auth-guard.service';

@Component({
  selector: 'app-usermanagements',
  templateUrl: './usermanagement.component.html',
  styleUrls: ['./usermanagement.component.css']
})
export class UsermanagementComponent {
  title = 'shoepping';

  private customers:Customer[];
  private username:String;
  private password:String;
  private cusfName:String;
  private cuslName:String;
  private address:String;
  private birthday:String;
  private phone:Number;

  constructor(private customerService:CustomerService, private authGuardService:AuthGuardService){
  }
  ngOnInit(){
    this.getCustomers();
  }

  getCustomers(){
    this.customerService.getCustomers().subscribe((data)=>{
      this.customers = data;
    });
  }

  async updateCustomer(id,password,cusfName,cuslName,address,birthday,phone){
    var customer = new Customer();
    customer.password = password;
    customer.cusfName = cusfName;
    customer.cuslName = cuslName;
    customer.address = address; 
    customer.birthday = birthday;
    customer.phone = phone;

    if(password==""||cusfName==""||cuslName==""||address==""||birthday==""||phone==""){
      window.alert("Please make sure that credentials are not empty!");
    }
    else{
      if(phone.length!=11){
        window.alert("Please make sure that phone number is valid");
      }
      else{
        var a = window.confirm("Are you sure do you want to update this user?");
        if(a){
          
          this.customerService.updateCustomer(customer, id).subscribe((data)=>{
            console.log(data);
            this.getCustomers()
            window.alert("user updated!");
          });
        }
      }
    }
  }
  
  async deleteCustomer(id){
    var a = window.confirm("Are you sure do you want to remove this user?");
    if(a){
      this.customerService.deleteCustomer(id).subscribe((data)=>{
        console.log(data);
        this.getCustomers();
        window.alert("user deleted!");
      });
    }
    this.getCustomers();
  } 
}
