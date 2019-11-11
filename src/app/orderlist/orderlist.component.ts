import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-orderlist',
  templateUrl: './orderlist.component.html',
  styleUrls: ['./orderlist.component.css']
})
export class OrderlistComponent implements OnInit {

 orders: any = [
    {
      "customerID": "1",
      "productID": "1",
      "orderQuantity": 2,
      "totalPrice": 6000,
    },
    {
      "customerID": "2",
      "productID": "1",
      "orderQuantity": 4,
      "totalPrice": 12000,
    },
    {
      "customerID": "1",
      "productID": "2",
      "orderQuantity": 3,
      "totalPrice": 12000,
    }
  ]

  constructor() { }

  ngOnInit() {
  }

}
