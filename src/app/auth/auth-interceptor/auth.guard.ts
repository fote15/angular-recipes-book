import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {AuthService} from '../auth.service';
import {map, take, tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard  implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot, router: RouterStateSnapshot)
    : boolean| UrlTree | Promise<boolean| UrlTree> | Observable<boolean | UrlTree> {
    return this.authService.user.pipe(take(1), map(user => {
      const auth = !!user;
      if (auth) {
        return true;
      } else {
        return this.router.createUrlTree(['/auth']);
      }

    }))

  }
}
