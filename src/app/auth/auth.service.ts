import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {catchError, tap} from 'rxjs/operators';
import {BehaviorSubject, Subject, throwError} from 'rxjs';
import {User} from './user.model';
import {Router} from '@angular/router';
import {environment} from '../../environments/environment';

export interface AuthServiceData {
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: number;
  localId: string;
  registered?: boolean
}

@Injectable({providedIn: 'root'})
export class AuthService {
      tokerExpirationTimer: any;
      user = new BehaviorSubject<User>(null);
   //token: string = null;

  constructor(private http: HttpClient, private router: Router) {
  }

  signUp(email: string, password: string){
   return this.http.post<AuthServiceData>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' + environment.firebaseAPIkey,
  {
  email: email,
  password: password,
  returnSecureToken: true
}).pipe(
  catchError(this.handleError),
     tap(resData => {
      this.handleAuthentication(resData.email, resData.localId, resData.idToken, +resData.expiresIn)
     })
   )
  }
  logIn(email: string, password: string){
    return this.http.post<AuthServiceData>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key='+ environment.firebaseAPIkey
      , {
        email: email,
        password: password,
        returnSecureToken: true
      }).pipe(
      catchError(this.handleError),
      tap(resData => {
        this.handleAuthentication(resData.email, resData.localId, resData.idToken, +resData.expiresIn)
      })
    );
  }
    private handleAuthentication(email: string, userId: string, token: string, expiresIn: number){
      const expirationDate = new Date(
        new Date().getTime() + +expiresIn * 1000);
      const user = new User(email, userId, token, expirationDate)
      this.user.next(user);
      localStorage.setItem('userData', JSON.stringify(user));

      this.autoLogOut(expiresIn * 1000);
    }
  autoLogOut(e){
    console.log(e);
    this.tokerExpirationTimer = setTimeout(() => {
      this.user.next(null);
      localStorage.removeItem('userData');
    }, e);
  }
  private handleError(errorRes: HttpErrorResponse){
    let errorMes = 'Unknown error accured';
    if (!errorRes.error || !errorRes.error.error){
      return throwError(errorMes)
    }
    switch (errorRes.error.error.message) {
      case 'EMAIL_EXISTS':
        errorMes = 'This email is already exist';
        break;
      case 'EMAIL_NOT_FOUND':
        errorMes = 'This email is not found';
        break;
      case 'INVALID_PASSWORD':
        errorMes = 'This password is incorrect';
        break;
    }
    return throwError(errorMes);
  }
  autoLogin(){
    const userData: {
       email: string;
       id: string;
       _token: string;
       _tokenExpirationDate: string;
    } = JSON.parse(localStorage.getItem('userData'));
    if (!userData){
      return;
    }
    const loadedUser = new User(
      userData.email,
      userData.id,
      userData._token,
      new Date(userData._tokenExpirationDate)
    )
    if (loadedUser.token){
      this.user.next(loadedUser);
      const expDuration = new Date(userData._tokenExpirationDate).getTime() -
        new Date().getTime();

      this.autoLogOut(expDuration);
    }
  }
  logOut(){
    this.user.next(null);
    this.router.navigate(['/auth']);
    localStorage.removeItem('userData');
    if(this.tokerExpirationTimer){
      clearTimeout(this.tokerExpirationTimer);
    }
  }
}
