import { Recipe } from './recipe.model';
import {Ingredient} from '../shared/ingredient.model';
import {Subject} from 'rxjs';
import {Injectable} from '@angular/core';
export class RecipeListService{

  recipesChanged = new Subject<Recipe[]>();

  // private recipes: Recipe[] = [
  //       new Recipe('A test recipe12',
  //         'DEscr1',
  //       'https://cdn.pixabay.com/photo/2020/02/02/15/07/meat-4813261_960_720.jpg',
  //         [
  //           new Ingredient('Meat', 1),
  //           new Ingredient('French fries', 20)
  //         ]),
  //
  //       new Recipe('A test recipe22',
  //         'DEscr12',
  //         'https://cdn.pixabay.com/photo/2020/02/02/15/07/meat-4813261_960_720.jpg',[
  //           new Ingredient('Meat22', 1),
  //           new Ingredient('French fries22', 20)
  //         ]),
  //       new Recipe('A test recipe33', 'DEscr13',
  //       'https://cdn.pixabay.com/photo/2020/02/02/15/07/meat-4813261_960_720.jpg',[
  //           new Ingredient('Meat33', 1),
  //           new Ingredient('French fries33', 20)
  //         ]),
  //       new Recipe('A test recipe44', 'DEscr14',
  //       'https://cdn.pixabay.com/photo/2020/02/02/15/07/meat-4813261_960_720.jpg',
  //         [
  //           new Ingredient('Buns', 2),
  //           new Ingredient('meal', 1)
  //         ]),
  //     ];
  private recipes: Recipe[] = [];
  getRecipe(e){
    return this.recipes.slice()[e];
  }
      getRecipes(){
          return this.recipes.slice();
      }
      getIdOf(name){
        return this.recipes.indexOf(this.recipes.find((e) => e.name === name));
      }

  addRecipe(recipe){
    this.recipes.push(new Recipe(recipe.name, recipe.description, recipe.imagePath, recipe.ingredients));
    this.recipesChanged.next(this.recipes.slice());
  }
  updateRecipe(index, newRecipe){
   /* let newOne = newRecipe;
    let newOne.ingredients = [];
    for (let i of newOne.ingredients){
      console.log(i);
      newOne.ingredients.p = new Ingredient(i.name,i.amount);
    }*/
   // console.log(newOne.ingredients[0].name);
    this.recipes[index] = new Recipe(newRecipe.name,newRecipe.description,newRecipe.imagePath,newRecipe.ingredients);
    this.recipesChanged.next(this.recipes.slice())

  }
  deleteRecipe(index){
    this.recipes.splice(index, 1);
    this.recipesChanged.next(this.recipes.slice());
  }
  setRecipes(recipes: Recipe[]){
    this.recipes = recipes;
    this.recipesChanged.next(this.recipes.slice());
  }
}
