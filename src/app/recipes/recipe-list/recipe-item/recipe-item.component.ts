import { RecipeListService } from '../../recipe.service';
import { Recipe } from './../../recipe.model';
import { Component, OnInit, Input,  } from '@angular/core';

@Component({
  selector: 'app-recipe-item',
  template: `
  <a [routerLink]="[this.id]"
     routerLinkActive="activeCard"
     style="cursor: pointer" class="card card-link "  >

    <div class="card" style="overflow: hidden; height: 200px; color: black">
      <div class="row no-gutters">
        <div class="col-md-4" style="overflow: hidden">
          <img style="width: auto; height: 290px" src="{{this.data['imagePath']}}" class="card-img" alt="...">
        </div>
        <div class="col-md-8">
          <div class="card-body">
            <h5 class="card-title">{{this.data['name']}}</h5>
            <p class="card-text">{{this.data['description']}}</p>
            <p class="card-text"><small class="text-muted"></small></p>
          </div>
        </div>
      </div>
    </div>

</a>
`,
  styleUrls: ['./recipe-item.component.css']
})
export class RecipeItemComponent implements OnInit {
 @Input() data: Recipe;
 id: number;
  constructor(private RService: RecipeListService) {


   }
   // passData(){
   //    this.RService.recipeSelected.next(this.data);
   // }
  ngOnInit(): void {
    this.id = this.RService.getIdOf(this.data.name);
    this.RService.recipesChanged.subscribe(
      ()=>{
        this.id = this.RService.getIdOf(this.data.name);
      }
    )
  }

}
