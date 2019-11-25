import { Component, OnInit } from '@angular/core';
import {AuthGuardService} from '../auth-guard.service';

@Component({
  selector: 'app-orderlist',
  templateUrl: './orderlist.component.html',
  styleUrls: ['./orderlist.component.css']
})
export class OrderlistComponent implements OnInit {

 orders: any = [
    {
      "cusUsername": "joshualescano",
      "prodName": "Adidas Ultra Boost",
      "orderQuantity": 2,
      "totalPrice": 6000,
    },
    {
      "cusUsername": "thearose",
      "prodName": "Adidas Ultra Boost",
      "orderQuantity": 4,
      "totalPrice": 12000,
    },
    {
      "cusUsername": "damasomarilou",
      "prodName": "Adidas Ultra Boost",
      "orderQuantity": 1,
      "totalPrice": 3000,
    }
  ]

  constructor(private authGuardService:AuthGuardService) { }

  ngOnInit() {
  }

}
