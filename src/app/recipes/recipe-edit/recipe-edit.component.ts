import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {RecipeListService} from '../recipe.service';
import {Recipe} from '../recipe.model';
import {Ingredient} from '../../shared/ingredient.model';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {
  id: number;
  editMode: boolean = false;
  recipeForm: FormGroup;
  constructor(private fb: FormBuilder, private route: ActivatedRoute,
              private router: Router,
              private recSer : RecipeListService) { }
  ngOnInit(): void {


    this.route.params.subscribe(
      (params) =>{
        this.editMode = params.id != null;
        this.id = params.id;
      }
    );
    const recipeInitial = this.recSer.getRecipe(this.id);
    console.log('recipeInitial');
    console.log(recipeInitial);

    if (this.editMode){
    this.recipeForm = this.fb.group(
      {
        name : [recipeInitial.name, Validators.required],
        imagePath : [recipeInitial.imagePath, Validators.required],
        description : [recipeInitial.description, Validators.required],
        ingredients : this.fb.array([])
      }
    );
      for (let i of recipeInitial.ingredient){
        this.addressArray.push(this.fb.group({
          name: [i.name, Validators.required],
          amount: [i.amount, [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)]]
        }));

      }
    }else{
      this.recipeForm = this.fb.group(
        {
          name : ['', Validators.required],
          imagePath : ['', Validators.required],
          description : ['', Validators.required],
          ingredients : this.fb.array([this.AddIngrGroup()])
        }
      );
    }

  }


  private initForm(){
    if (this.editMode){

    }
  }
  onSubmit(){
   // console.log(this.recipeForm.value);
   // console.log(this.recipeForm.value.ingredients);
    let copy = this.recipeForm;
    let IndexIt = 0;
    for (let i of this.recipeForm.value.ingredients){
      copy.value.ingredients[IndexIt] = new Ingredient(i.name, i.amount);
      IndexIt++;
    }

    if (this.editMode){
      alert('aaaaaedit')
      console.log('copy');
      console.log(copy);

      this.recSer.updateRecipe(this.id, copy.value);
    }else{
      this.recSer.addRecipe(copy.value);
    }
    this.router.navigate(['../'], { relativeTo: this.route });
  }
  AddIngrGroup(){
     return this.fb.group({
       name: ['', Validators.required],
       amount: ['', [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)]]
     });
  }


  onAddIngr(){
    this.addressArray.push(this.AddIngrGroup());
  }
  onRemoveIngr(index){
    this.addressArray.removeAt(index);
  }

  get addressArray(){
    return <FormArray>this.recipeForm.get('ingredients');
  }
  removeIngr(i){
    console.log(i);
    (<FormArray>this.recipeForm.get('ingredients')).removeAt(i);
  }
}
