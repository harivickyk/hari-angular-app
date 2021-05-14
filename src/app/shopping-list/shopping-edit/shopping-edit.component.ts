import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';
import  * as ShoppingListActions from '../store/shopping-list.actions';
import * as fromShoppingList from '../store/shopping-list.reducer';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  @ViewChild('f', { static: false })
  slForm: NgForm;
  subscription: Subscription;
  editMode = false;
  editedItem: Ingredient;

  constructor(private slService: ShoppingListService,
    private store: Store<fromShoppingList.AppState>) { }

  ngOnInit(): void {
    //using ngRX
    this.subscription = this.store.select('shoppingList').subscribe(stateData => {
      if(stateData.editedIngredientIndex > -1) {
        this.editMode = true;
        this.editedItem = stateData.editedIngredient;
        this.slForm.setValue({
          name: this.editedItem.name,
          amount: this.editedItem.amount
        });
      }
      else {
        this.editMode = false;
      }
    });

    //using service
    // this.subscription = this.slService.startedEditing.subscribe(
    //   (index: number) => {
    //     this.editedItemIndex = index;
    //     this.editMode = true;
    //     this.editedItem = this.slService.getIngredient(index);
    //     this.slForm.setValue({
    //       name: this.editedItem.name,
    //       amount: this.editedItem.amount
    //     })
    //   }
    // );
  }

  OnAddItem(form: NgForm) {
    const value = form.value;
    const newIng = new Ingredient(value.name, value.amount);
    if(this.editMode) {
      //this.slService.updateIngredient(this.editedItemIndex, newIng);

      this.store.dispatch(new ShoppingListActions.UpdateIngredientReducer(newIng));
    }
    else {
      //using custom service
      //this.slService.addIngredient(newIng);

      //using ngrx
      this.store.dispatch(new ShoppingListActions.AddIngredientReducer(newIng))
    }
    this.editMode=false;
    form.reset();
  }

  onClear() {
    this.slForm.reset();
    this.editMode = false;
    this.store.dispatch(new ShoppingListActions.StopEditReducer());
  }

  onDelete() {
    //this.slService.deleteIngredient(this.editedItemIndex)

    this.store.dispatch(new ShoppingListActions.DeleteIngredientReducer());
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
    this.store.dispatch(new ShoppingListActions.StopEditReducer());
  }

}
