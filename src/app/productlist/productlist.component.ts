import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-productlist',
  templateUrl: './productlist.component.html',
  styleUrls: ['./productlist.component.css']
})
export class ProductlistComponent implements OnInit {
  
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
