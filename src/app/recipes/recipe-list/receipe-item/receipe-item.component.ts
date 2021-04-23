import { Component, Input, OnInit } from '@angular/core';
import { Recipe } from '../../recipe.model';

@Component({
  selector: 'app-receipe-item',
  templateUrl: './receipe-item.component.html',
  styleUrls: ['./receipe-item.component.css']
})

export class ReceipeItemComponent implements OnInit { 
  @Input() 
  recipe!: Recipe;
  @Input()
  index!: number;
  
  ngOnInit() : void {
    
  }

}
