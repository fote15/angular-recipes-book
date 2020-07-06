import {Component, OnDestroy, OnInit} from '@angular/core';
import {DataStorageService} from '../shared/data-storage.service';
import {AuthService} from '../auth/auth.service';
import {Subscription} from 'rxjs';
import {Route, Router} from '@angular/router';

@Component({
    selector: 'app-header',
    template: `

    <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <a class="navbar-brand" href="#" style="text-align: center"><img style="width: 40px" src="../../assets/img/Capture.png" alt=""></a>
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
      <ul class=" nav navbar-nav">
        <li class="nav-item " routerLinkActive="active">
          <a class="nav-item nav-link " href="#" [routerLink]="['recipes']">Все рецепты <span class="sr-only">(current)</span></a></li>
        <li class="nav-item" routerLinkActive="active">
          <a class="nav-item nav-link" href="#" [routerLink]="['shopping-list']">Список покупок</a> </li>
        <li class="nav-item" routerLinkActive="active" *ngIf="!isAuthenticated">
          <a class="nav-item nav-link"  [routerLink]="['auth']">Log in</a> </li>

      </ul>

    </div>
      <div  *ngIf="isAuthenticated">
      <ul class="nav navbar-nav navbar-right">
        <li class="nav-item" style="cursor: pointer">
          <div class="dropdown">
            <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              Действия
            </button>
            <div style="margin-left: -133px;" class="dropdown-menu" aria-labelledby="dropdownMenuButton">
              <a class="dropdown-item" type="button"  (click)="onSaveData()">Сохранить рецепты в базу</a>
              <a class="dropdown-item" (click)="onFetchRecipes()">Получить рецепты из базы</a>
            </div>
          </div>
        </li>

        <li class="nav-item" style="cursor: pointer">
          <a class="nav-item nav-link" (click)="logOut()" >Выйти </a> </li>

      </ul>

      </div>

  </nav>

  `

})

export class headerComponent implements OnInit, OnDestroy{
  isAuthenticated = false;
  private userSub: Subscription;
  constructor(private dataSer: DataStorageService, private authService: AuthService, private router: Router) {
  }
  onSaveData(){
    this.dataSer.storeRecipes();
  }
  onFetchRecipes(){
      this.dataSer.fetchRecipes().subscribe();
  }
  ngOnInit() {
    this.userSub = this.authService.user.subscribe(user => {
    this.isAuthenticated = !!user ;
    });
    this.onFetchRecipes();
  }
  ngOnDestroy() {
    this.userSub.unsubscribe();
  }
  logOut(){
    this.authService.logOut();
  }
}
