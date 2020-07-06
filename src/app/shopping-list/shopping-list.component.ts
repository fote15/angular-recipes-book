import { ingrService } from './ingrd.service';
import { Ingredient } from './../shared/ingredient.model';
import {Component, OnDestroy, OnInit} from '@angular/core';
import {Recipe} from '../recipes/recipe.model';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-shopping-list',
  template: `
  <div class="row">
    <div class="col-10">
        <app-shopping-edit ></app-shopping-edit>
        <hr>
        <ul>
            <a href="#" class="list-group-item" style="cursor:pointer"
                (click)="onEditItem(i2)" *ngFor="let i of ingredients; let i2 = index">
        {{i.name}} {{i.amount}}
        </a>
        </ul>
    </div>
</div>
`,
  styleUrls: ['./shopping-list.component.css'],
})
export class ShoppingListComponent implements OnInit , OnDestroy{
ingredients: Ingredient[] = this.hm.getIngr();
  private igChangeSub: Subscription;

displayCounter(count) {
  console.log(count);
}

  constructor(private hm: ingrService) { }
  /*dataAdd(e){
    this.hm.addIngr(new Ingredient(e[0], e[1]));
  }
  */
  ngOnInit(): void {
    this.igChangeSub = this.hm.ingrChanged
    .subscribe(
    (ingredient: Ingredient[]) => {
    this.ingredients = ingredient;
    console.log(ingredient);
  });
  }
  ngOnDestroy() {
    this.igChangeSub.unsubscribe();
  }
  onEditItem(index){
  this.hm.editingIndex.next(index);
  return false;
  }
}
