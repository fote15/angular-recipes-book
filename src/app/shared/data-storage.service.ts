import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Recipe} from '../recipes/recipe.model';
import {RecipeListService} from '../recipes/recipe.service';
import {exhaust, exhaustMap, map, take, tap} from 'rxjs/operators';
import {AuthService} from '../auth/auth.service';

@Injectable({providedIn: 'root'})
export class DataStorageService {
  constructor(private http: HttpClient,
              private recipesService: RecipeListService,
  private authService: AuthService) {
  }
  storeRecipes(){
    const recipes = this.recipesService.getRecipes();
    return this.http.put(
      'https://ng-book-89abe.firebaseio.com/recipes.json'
      , recipes).subscribe(response => {
        console.log(response);
    });
  }
  fetchRecipes(){

      return this.http.get<Recipe[]>(
        'https://ng-book-89abe.firebaseio.com/recipes.json').pipe(
    map(recipes => {
      return recipes.map(recipe => {
        // console.log({...recipe});
        return {...recipe, ingredient: recipe.ingredient ? recipe.ingredient: []};
      })
    }),
      tap(recipes =>{
        this.recipesService.setRecipes(recipes);
      }))


  }


}
