import {Injectable} from '@angular/core';
import {ActivatedRoute, ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Recipe} from './recipe.model';
import {DataStorageService} from '../shared/data-storage.service';
import {RecipeListService} from './recipe.service';

@Injectable({providedIn: 'root'})
export class RecipesResolverService implements Resolve<Recipe[]>{
  constructor(private dataStorageService: DataStorageService, private recService: RecipeListService) {

  }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot){
    const rec = this.recService.getRecipes();
    if (rec.length < 1){
      return this.dataStorageService.fetchRecipes();
    }
  }
}
