// src/app/auth/role-guard.service.ts
import { Injectable } from '@angular/core';
import { 
  Router,
  CanActivate,
  ActivatedRouteSnapshot
} from '@angular/router';
import { AuthenticationService } from './authentication.service';
import decode from 'jwt-decode';
import { JwtUtilsService } from './jwt-utils.service';
@Injectable()
export class RoleGuardService implements CanActivate {
  constructor(public auth: AuthenticationService, public router: Router, public jwtUtils: JwtUtilsService) {}
  canActivate(route: ActivatedRouteSnapshot): boolean {
    // this will be passed from the route config
    // on the data property
    const expectedRole = route.data.expectedRole;
    const roles = this.auth.getCurrentUser().roles;
    // decode the token to get its payload
    if (
      !this.auth.isLoggedIn() || 
      roles[0] !== expectedRole
    ) {
      this.router.navigate(['prijava']);
      return false;
    }
    return true;
  }
}