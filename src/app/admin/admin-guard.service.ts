
import {ActivatedRouteSnapshot,
        CanActivate,
        Router,
        RouterStateSnapshot}    from '@angular/router';

import {AuthService}            from '../auth/auth.service';
import {Injectable}             from '@angular/core';
import {Observable}             from 'rxjs/Observable';

@Injectable()
export class AdminGuard implements CanActivate {
  private res = false;
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.checkAdmin();
    // return this.res;
    // return true;
    // return this.authService.isAdmin();
  }

  checkAdmin(): Observable<boolean> {
    return this.authService.getCurrentUser().map(user => {
      // console.log('123123');
      // console.log(user.username);
      // console.log(user.role.name);
      if (user.username != null && user.role.name === 'ADMIN') { this.res = true;
      // console.log('YES');
      return true;
    } else {
        // console.log('NO');
        // this.router.navigate(['/' + user.role.name.toLowerCase()]);
        return false;
      }
    });
    // return false;
  }
}
