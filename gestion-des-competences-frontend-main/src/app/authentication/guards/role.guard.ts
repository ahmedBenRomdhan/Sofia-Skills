import {Injectable} from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router} from '@angular/router';
import {AuthenticationService} from '../services/authentication.service';
import decode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {
  constructor(public auth: AuthenticationService, public router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot): boolean {
    let tokenPayload: any;
    const expectedRoles = route.data.expectedRoles;
    const token = localStorage.getItem('token');
    if (token) {
      tokenPayload = decode(token);
      if (expectedRoles.includes(tokenPayload.role)) {
        return true;
      }
    }
    this.router.navigate(['404']);
    return false;
  }

}
