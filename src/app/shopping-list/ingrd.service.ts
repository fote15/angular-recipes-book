import { Ingredient } from './../shared/ingredient.model';
import {Subject} from 'rxjs';
import {NgModule} from '@angular/core';
import {AppComponent} from '../app.component';
import {headerComponent} from '../header/header.component';
import {RecipesComponent} from '../recipes/recipes.component';
import {RecipeListComponent} from '../recipes/recipe-list/recipe-list.component';
import {RecipeDetailComponent} from '../recipes/recipe-detail/recipe-detail.component';
import {RecipeItemComponent} from '../recipes/recipe-list/recipe-item/recipe-item.component';
import {ShoppingListComponent} from './shopping-list.component';
import {ShoppingEditComponent} from './shopping-edit/shopping-edit.component';
import {DropDownDir} from '../shared/dropdown.directive';
import {appDropdownHere} from '../shared/DropdownHere.directive';
import {RecipeEditComponent} from '../recipes/recipe-edit/recipe-edit.component';
import {FormsModule} from '@angular/forms';
import {BrowserModule} from '@angular/platform-browser';
import {AppRoutingModule} from '../app-routing.module';
@NgModule({

  imports: [
    FormsModule,
  ]
})

export class ingrService{
  editingIndex = new Subject<number>();
  ingrChanged = new Subject<Ingredient[]>();
    ingredients: Ingredient[] = [];
    addIngr(e: Ingredient){
      this.ingredients.push(e);
      this.ingrChanged.next(this.ingredients.slice());
      localStorage.setItem('ingredients', JSON.stringify(this.ingredients));
    }
    getIngr(){
      if (localStorage.getItem('ingredients')){
        this.ingredients = JSON.parse(localStorage.getItem('ingredients'));

      }
      return this.ingredients.slice();
    }
    getByIndex(index){
      return  this.ingredients.slice()[index];
    }
    updateIngredient(index, newIngredient){
      this.ingredients[index] = newIngredient;
      this.ingrChanged.next(this.ingredients.slice());
    }
    deleteIngredient(index){
      this.ingredients.splice(index, 1);
      this.ingrChanged.next(this.ingredients.slice());
    }

}
