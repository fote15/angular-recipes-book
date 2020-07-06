import { appDropdownHere } from './shared/DropdownHere.directive';
import { DropDownDir } from './shared/dropdown.directive';
import { headerComponent } from './header/header.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RecipesComponent } from './recipes/recipes.component';
import { RecipeListComponent } from './recipes/recipe-list/recipe-list.component';
import { RecipeDetailComponent } from './recipes/recipe-detail/recipe-detail.component';
import { RecipeItemComponent } from './recipes/recipe-list/recipe-item/recipe-item.component';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { ShoppingEditComponent } from './shopping-list/shopping-edit/shopping-edit.component';
import {ingrService} from './shopping-list/ingrd.service';
import { RecipeEditComponent } from './recipes/recipe-edit/recipe-edit.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RecipeListService} from './recipes/recipe.service';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {AuthComponent} from './auth/auth.component';
import {LoadingSpinnerComponent} from './shared/loading-spinner/loading-spinner.component';
import {AuthInterceptorService} from './auth/auth-interceptor/auth-interceptor.service';
import {RecipesModule} from './recipes/recipes.module';

@NgModule({
  declarations: [
    AppComponent,
    headerComponent,
    ShoppingListComponent,
    ShoppingEditComponent,
    DropDownDir,
    appDropdownHere,

    AuthComponent,
    LoadingSpinnerComponent,
  ],
    imports: [
      FormsModule,
        BrowserModule,
        AppRoutingModule,
      ReactiveFormsModule,
      HttpClientModule,
    ],
  providers: [ingrService,RecipeListService,
    {provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
