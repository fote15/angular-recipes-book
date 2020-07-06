import { Recipe } from './../recipe.model';
import { Component, OnInit, Input, OnChanges } from '@angular/core';
import {RecipeListService} from '../recipe.service';
import {ingrService} from '../../shopping-list/ingrd.service';
import {Ingredient} from '../../shared/ingredient.model';
import {ActivatedRoute, Router} from '@angular/router';
import { createPopper } from '@popperjs/core';
@Component({
  selector: 'app-recipe-detail',
  template: `

    <div class="row">
      <div class="col-12">
        <img src="{{data['imagePath']}}" class="img-responsive" alt="">
      </div>
    </div>
    <div class="row">
      <div class="col-12">
        <h1>{{data['name']}}</h1>
      </div>
    </div>
    <div class="row">
      <div class="col-12">
        <div class="dropdown">
          <button  class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" >
            Действия
          </button>
          <div style="margin-top: -5px;"     class="dropdown-menu

      "  aria-labelledby="dropdownMenuButton">
            <a (click)="toShopping()" class="dropdown-item" style="cursor: pointer" >Отправить в список покупок</a>
            <a class="dropdown-item" [routerLink]="['edit']" style="cursor: pointer">Редактировать</a>
            <a class="dropdown-item" (click)="onDeleteRecipe()" style="cursor: pointer">Удалить</a>
          </div>
        </div>

      </div>
    </div>
    <div class="row">
      <div class="col-12">
        {{data['description']}}
      </div>
    </div>
    <div class="row">
      <div class="col-12">
        <ul class ='list-group'>
          <li class ='list-group-item' *ngFor="let i of data.ingredient ">
            {{i.name}} - {{i.amount}}
          </li>
        </ul>
      </div>
    </div>
  ` ,
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit, OnChanges {
  data: Recipe;
  showDa = false;
  id: number;
  constructor(private router: Router,
    private hm: RecipeListService,private shList: ingrService,
              private route: ActivatedRoute, private recService: RecipeListService) {}
  showDaFun(e){
        this.showDa = e;
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.params.id;
    this.data = this.hm.getRecipe(+this.id);
    console.log('this.data');
    console.log(this.data);


    this.route.params.subscribe(
      (e) => {
        this.data = this.hm.getRecipe(e.id);
      }
    )
  }
  ngOnChanges(){
  }
  onDeleteRecipe(){
    this.recService.deleteRecipe(this.id);
    this.router.navigate(['../'], {relativeTo: this.route});

  }
  toShopping() {
    this.data.ingredient.map((e) => {
      this.shList.addIngr(new Ingredient(e.name, e.amount));
    });
  }
  showKak(){
    return this.showDa;
  }


}
