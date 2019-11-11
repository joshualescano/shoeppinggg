import { Component } from '@angular/core';
import {CustomerService} from '../customer.service';
import { Customer } from '../customer';


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

  constructor(private customerService:CustomerService){

  }
  ngOnInit(){
    this.getCustomers();
  }

  getCustomers(){
    this.customerService.getCustomers().subscribe((data)=>{
      this.customers = data;
    });
  }

  updateCustomer(id){
    var customer = new Customer();
    customer.username = this.username;
    customer.password = this.password;
    customer.cusfName = this.cusfName;
    customer.cuslName = this.cuslName;
    customer.address = this.address; 
    customer.birthday = this.birthday;
    customer.phone = this.phone;

    this.customerService.updateCustomer(customer, id).subscribe((data)=>{
      console.log(data);
      this.getCustomers()
    });
  }
  
  deleteCustomer(id){
    this.customerService.deleteCustomer(id).subscribe((data)=>{
      console.log(data);
      this.getCustomers()
    });
  }
}
