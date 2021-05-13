import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { Ingredient } from '../shared/ingredient.model'
import { ShoppingListService } from './shopping-list.service';
import * as fromShoppingList from './store/shopping-list.reducer';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  ingredients: Observable<{ ingredients: Ingredient[] }>;

  //private ingChangesSub: Subscription;

  constructor(private slService: ShoppingListService,
    private store: Store<fromShoppingList.AppState>) { }

  ngOnInit(): void {
    //Ingredients supplied by ngrx Store
    this.ingredients = this.store.select('shoppingList');

    //Ingredients supplied by custom service

    // this.ingredients = this.slService.getIngredients();
    // this.ingChangesSub =  this.slService.ingChanged
    // .subscribe(
    //   (ingredients: Ingredient[]) => {
    //     this.ingredients = ingredients;
    //   }
    // );
  }

  onEditItem(id: number) {
    this.slService.startedEditing.next(id);
  }

  ngOnDestroy() {
    //ngrx subscriptions will be handled by angular
    //this.ingChangesSub.unsubscribe();
  }



}
