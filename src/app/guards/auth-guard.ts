import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(
    private readonly authService: AuthService,
    private readonly router: Router,
  ) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): Observable<boolean> | Promise<boolean> | boolean {
    if (this.authService.isLogged()) {
      const requiredRoles = next.data['roles'] as Array<string>;
      if (requiredRoles) {
        if (this.authService.hasRole(requiredRoles)) {
          return true;
        } else {
          this.router.navigate(['forbbiden']);
          return false;
        }
      } else {
        return true;
      }
    }
    this.router.navigate(['auth/signin']);
    return false;
  }
}
