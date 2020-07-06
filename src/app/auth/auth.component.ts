import {Component} from '@angular/core';
import {NgForm} from '@angular/forms';
import {AuthService, AuthServiceData} from './auth.service';
import {Observable} from 'rxjs';
import {Router} from '@angular/router';

@Component({
  selector: 'app-auth',
  template: `
    <div class="row">
      <div class="col-12 col-md-6 m-auto">
        <div *ngIf="error" class="alert alert-danger">

          <p>{{error}}</p>
        </div>
        <div *ngIf="isLoading" style="text-align: center">
          <app-loading-spinner></app-loading-spinner>
        </div>
        <form #authForm ="ngForm" (ngSubmit)="onSubmit(authForm)" *ngIf="!isLoading">
          <div class="form-group">
            <label for="email">E mail</label>
            <input type="email" id="email" class="form-control"
            ngModel name="email" required email>
          </div>
          <div class="form-group">
            <label for="pass">Password</label>
            <input type="password" id="pass" class="form-control"
            ngModel required name="pass"
            minlength="6"
            >
          </div>
          <button type="submit" class="btn btn-primary" [disabled]="authForm.invalid">
            {{isLoginMode ? 'Войти' : 'Регистрация'}}
          </button> |
          <button type="button" class="btn btn-primary" (click)="onSwitchMode()">
            Сменить на  {{isLoginMode ? 'регистрацию' : 'вход'}}
          </button>
        </form>
      </div>
    </div>
  `
})

export class AuthComponent{
  isLoginMode = true;
  isLoading = false;
  error: string  = null;

  constructor(private authService: AuthService, private router: Router) {
  }

  onSwitchMode(){
    this.isLoginMode = !this.isLoginMode;
  }
  onSubmit(form: NgForm){
    if (!form.value){
      return;
    }
    const email = form.value.email;
    const password = form.value.pass;

    let authObs: Observable<AuthServiceData>

    this.isLoading = true;
      if (this.isLoginMode){
        authObs = this.authService.logIn(email, password);
      }else{
        authObs =  this.authService.signUp(email, password);
      }

    authObs.subscribe(
      response => {
        console.log(response);
        this.isLoading = false;
        this.router.navigate(['/recipes'])
      }, errorMes => {
        console.log(errorMes);
        this.error = errorMes;
        this.isLoading = false;
      }
    );
    form.reset();
  }
}
