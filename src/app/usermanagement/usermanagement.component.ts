import { Component } from '@angular/core';
import {CustomerService} from '../customer.service';
import { Customer } from '../customer';
import  swal  from 'sweetalert';
import {AuthGuardService} from '../auth-guard.service';

///11
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

  async updateCustomer(id){
    var customer = new Customer();
    customer.username = this.username;
    customer.password = this.password;
    customer.cusfName = this.cusfName;
    customer.cuslName = this.cuslName;
    customer.address = this.address; 
    customer.birthday = this.birthday;
    customer.phone = this.phone;

    const willUpdate = await swal({
      title: "Are you sure do you want to Update?",
      text: " Click outside if no",
      icon: "warning",
      dangerMode: true,
    });
     
    if (willUpdate) {
      this.customerService.updateCustomer(customer, id).subscribe((data)=>{
        console.log(data);
        this.getCustomers()
      });
      swal("Updated!", "Item has been updated!", "success");
    } 
  }
  
  async deleteCustomer(id){

    const willDelete = await swal({
      title: "Are you sure do you want to delete?",
      text: " Click outside if no",
      icon: "warning",
      dangerMode: true,
    });
     
    if (willDelete) {
      this.customerService.deleteCustomer(id).subscribe((data)=>{
        console.log(data);
        this.getCustomers()
      });
      swal("Deleted!", "Item has been deleted!", "success");
    } 



  } 
}
