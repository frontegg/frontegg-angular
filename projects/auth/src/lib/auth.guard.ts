import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import { take } from 'rxjs/operators';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
    return new Promise((resolve) => {
      const sub = this.authService.isAuthenticated$.subscribe((value) => {
        if (value !== null) {
          resolve(value);
          setTimeout(() => sub.unsubscribe(), 0);
          if (!value) {
            this.authService.authState$.pipe(take(1)).subscribe((authState) => {
              window.localStorage.setItem('FRONTEGG_AFTER_AUTH_REDIRECT_URL', state.url);
              this.router.navigateByUrl(authState.routes.loginUrl);
            });
          }
        }
      });
    });
  }
}
