import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  products: any = [
    {
      "name": "Adidas Ultra Boost",
      "brand": "Adidas",
      "price": 3000,
      "quantity": 50,
      "image": "1.jpg"
    },
    {
      "name": "Sketchers D Lite",
      "brand": "Sketchers",
      "price": 4000,
      "quantity": 100,
      "image": "2.jpg"
    },
    {
      "name": "Vans Old School",
      "brand": "Vans",
      "price": 2500,
      "quantity": 100,
      "image": "2.jpg"
    }
  ]


  constructor() { }

  ngOnInit() {
  }

}
