import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Ingredient } from '../shared/ingredient.model'
import * as fromApp from '../store/app.reducer';
import * as ShoppingListActions from './store/shopping-list.actions';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  ingredients: Observable<{ ingredients: Ingredient[] }>;

  //private ingChangesSub: Subscription;

  constructor(private store: Store<fromApp.AppState>) { }

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
    //this.slService.startedEditing.next(id);
    
    this.store.dispatch(new ShoppingListActions.StartEditReducer(id));
  }

  ngOnDestroy() {
    //ngrx subscriptions will be handled by angular
    //this.ingChangesSub.unsubscribe();
  }



}
