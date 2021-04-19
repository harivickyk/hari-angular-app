import { Component, OnInit } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model'

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit {
  ingredients  = [ 
    new Ingredient('Apples', 5),
    new Ingredient('Tomatoe', 15)
  ];

  constructor() { }

  ngOnInit(): void {
  }
  
  onIngAdded(ing : Ingredient) {
    this.ingredients.push(ing);
  }

}
