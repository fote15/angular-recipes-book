import { Component, OnInit } from '@angular/core';
import {RecipeListService} from './recipe.service';

@Component({
  selector: 'app-recipes',
  template: `
    <div class="container">
  <div class="row">
    <div class="col-lg-5">
        <app-recipe-list style="padding: 10px"></app-recipe-list>
    </div>
    <div class="col-lg-7 mt-5">
        <router-outlet style="padding: 10px"></router-outlet>
        <p  #nety></p>
        </div>
</div>
    </div>
`,
  styleUrls: ['./recipes.component.css'],

})
export class RecipesComponent implements OnInit {
  constructor() { }

  ngOnInit(): void {
   // this.recipeService.recipeSelected
   //   .subscribe(
   //     (recipe: Recipe) => {
   //       this.detailsAbout = recipe;
   //     }
   //   );

  }


}
