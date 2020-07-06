import { RecipeListService } from '../recipe.service';
import { Recipe } from './../recipe.model';
import { Component, OnInit} from '@angular/core';


@Component({
  selector: 'app-recipe-list',
  template: `
  <div class="row">
    <div class="col-xs-12">
        <button class="btn btn-success" routerLink="new">Дабавить рецепт</button>
    </div>
</div>
<hr>
<div class="row">
    <div class="col-xs-12 " >
        <app-recipe-item class="m-2"
          *ngFor="let i of recipes" [data] = 'i' ></app-recipe-item>
    </div>
</div>
`,
  styleUrls: ['./recipe-list.component.css'],
})
export class RecipeListComponent implements OnInit {


  aaa = 'aaa';
  recipes: Recipe[];


  constructor(private hm: RecipeListService) {
   }

  ngOnInit(): void {
    this.recipes = this.hm.getRecipes();
    this.hm.recipesChanged.subscribe(
      (val) =>{
        this.recipes = val;
      }
    )



  }

}
