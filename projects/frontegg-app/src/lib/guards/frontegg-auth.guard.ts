import { Injectable, NgZone } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { FronteggBaseGuard } from './frontegg-base-guard';
import { FronteggAppService } from '../frontegg-app.service';
import { take } from 'rxjs/operators';

@Injectable()
export class FronteggAuthGuard extends FronteggBaseGuard {

  constructor(protected fronteggAppService: FronteggAppService, protected router: Router, protected ngZone: NgZone) {
    super();
  }

  navigateToUrl(redirectUrl: string): void {
    this.router.navigateByUrl(this.fronteggAppService.authRoutes.loginUrl + '?redirectUrl=' + encodeURIComponent(redirectUrl));
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    const redirectUrl = state.url;
    return new Promise<boolean>((resolve, reject) => {
      const subscription = this.fronteggAppService.isAuthenticated$.pipe(take(1)).subscribe((isAuthenticated: boolean) => {
        if (isAuthenticated) {
          resolve(true);
        } else {
          if (NgZone.isInAngularZone()) {
            this.navigateToUrl(redirectUrl);
          } else {
            this.ngZone.run(() => {
              this.navigateToUrl(redirectUrl);
            });
          }
          reject('unauthorized');
        }
      });
      subscription.unsubscribe();
    });
  }
}
