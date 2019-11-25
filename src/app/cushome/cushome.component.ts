import { Component, OnInit } from '@angular/core';
import {CustomerService} from '../customer.service';
import { Customer } from '../customer';
import { HttpHeaders } from '@angular/common/http';
import {AuthGuardService} from '../auth-guard.service';

@Component({
  selector: 'app-cushome',
  templateUrl: './cushome.component.html',
  styleUrls: ['./cushome.component.css']
})
export class CushomeComponent implements OnInit {


 // private customers:Customer[];
 // private username:String;
 // private password:String;
  customer: Object;

  constructor(private customerService:CustomerService, private authGuardService:AuthGuardService) { }

  ngOnInit() {
  //  var customer = new Customer();
  //  customer.username = this.username;

   // this.customerService.getProfile();//.subscribe(data =>{
   //  this.customer = data.customer.username;
  // console.log(data);
    }



}
