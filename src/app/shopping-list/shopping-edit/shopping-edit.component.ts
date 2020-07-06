import {Component, OnInit, ViewChild} from '@angular/core';
import {ingrService} from '../ingrd.service';
import {Ingredient} from '../../shared/ingredient.model';
import {FormControl, FormGroup, NgForm} from '@angular/forms';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-shopping-edit',
  template: `
  <div class="row">
    <div class="col-xs-12">
        <form  (ngSubmit)="onSubmit(f)" #f="ngForm">
            <div class="row">
                <div class="col-sm-5 form-group">
                    <label for="name">Название</label>
                    <input type="text" id="name"
                    class='form-control' ngModel name="name" required>
                </div>
                <div class="col-sm-5 form-group">
                    <label for="amount">Количество</label>
                    <input type="number"
                           ngModel
                           name="amount"
                           required
                           pattern="^[1-9]+[0-9]*$"
                    id="amount" class="form-control" >
                </div>
            </div>
            <div class="row">
                <div class="col-xs-12">
                    <button class="btn btn-success"  type="submit" [disabled]="f.invalid"> {{editMode? 'Изменить':'Дабавить'}}</button>
                    <button *ngIf="editMode" class="btn btn-danger" type="button" (click)="onDelete()"> Удалить</button>
                    <button class="btn btn-primary" type="button" (click)="onClear()"> Очистить</button>
                </div>
            </div>
        </form>
    </div>
</div>
`,
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit {
  @ViewChild('f') lsForm: NgForm;
  constructor(private hm: ingrService) { }
  subscr: Subscription;
   editMode = false;
  editingIndex: number;
  editingItem;

  ngOnInit(): void {
  this.subscr = this.hm.editingIndex.subscribe(
    (index) =>{
      this.editMode = true;
      this.editingIndex = index;
      this.editingItem = this.hm.getByIndex(index);
      this.lsForm.setValue({
        name: this.editingItem.name,
        amount: this.editingItem.amount,
      })
    }
  )

  }
  onClear(){
    this.lsForm.reset();
    this.editMode = false;
  }
  onDelete(){
  this.hm.deleteIngredient(this.editingIndex);
  this.onClear();
  }
  onSubmit(val){
    console.log(val);
   // alert(a.value+b.value);
    //this.data.emit([a.value,b.value])
if (!this.editMode){
  this.hm.addIngr(new Ingredient(val.value.name, val.value.amount));
}else{
  this.hm.updateIngredient(this.editingIndex, new Ingredient(val.value.name, val.value.amount));
};

  //form.reset();
  this.editMode = false;

return false;

  }
}
