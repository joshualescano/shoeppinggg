import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-itempage',
  templateUrl: './itempage.component.html',
  styleUrls: ['./itempage.component.css']
})
export class ItempageComponent implements OnInit {

  items: any = [
    {
      "name": "Adidas Ultra Boost",
      "quantity": 2,
      "price": 3000,
      "description": "lorem ipsum"
    },
    {
      "name": "Sketchers D Lite",
      "quantity": 4,
      "price": 4000,
      "description": "lorem ipsum"
    },
    {
      "name": "Vans Old School",
      "quantity": 1,
      "price": 2500,
      "description": "lorem ipsum"
    }
  ]

  constructor() { }

  ngOnInit() {
  }

}
