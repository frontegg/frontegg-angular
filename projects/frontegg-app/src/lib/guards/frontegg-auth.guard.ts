import { Injectable, NgZone } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { FronteggBaseGuard } from './frontegg-base-guard';
import { FronteggAppService } from '../frontegg-app.service';
import { take } from 'rxjs/operators';
import { FronteggAuthService } from '../frontegg-auth.service';

@Injectable()
export class FronteggAuthGuard extends FronteggBaseGuard {

  constructor(protected fronteggAppService: FronteggAppService, protected fronteggAuthService: FronteggAuthService,
              protected router: Router, protected ngZone: NgZone) {
    super();
  }

  async navigateToUrl(redirectUrl: string): Promise<boolean> {
    if (this.fronteggAppService.fronteggApp.options.hostedLoginBox) {
      localStorage.setItem('FRONTEGG_AFTER_AUTH_REDIRECT_URL', redirectUrl);
      this.fronteggAuthService.loginWithRedirect();
      return false;
    } else {
      return this.router.navigateByUrl(this.fronteggAppService.authRoutes.loginUrl + '?redirectUrl=' + encodeURIComponent(redirectUrl));
    }
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    const redirectUrl = state.url;
    return new Promise<boolean>((resolve, reject) => {
      const subscription = this.fronteggAppService.isAuthenticated$.pipe(take(1)).subscribe((isAuthenticated: boolean) => {
        if (isAuthenticated) {
          resolve(true);
        } else {
          if (NgZone.isInAngularZone()) {
            this.navigateToUrl(redirectUrl).then(resolve, reject);
          } else {
            this.ngZone.run(() => {
              this.navigateToUrl(redirectUrl).then(resolve, reject);
            });
          }
        }
      });
      subscription.unsubscribe();
    });
  }
}
