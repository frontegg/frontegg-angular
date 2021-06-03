import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router'; import { Injectable, NgZone } from '@angular/core';
import { take } from 'rxjs/operators';
import { FronteggAppService } from './frontegg-app.service';

@Injectable()
export class FronteggAuthGuard implements CanActivate {

  constructor(private fronteggAppService: FronteggAppService, private router: Router, private zone: NgZone) { }

  canActivate(_route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
    return new Promise((resolve) => {
      if (this.fronteggAppService.fronteggAppLoaded) {

        const sub = this.fronteggAppService.isAuthenticated$.subscribe((isAuthenticated) => {
          if (isAuthenticated != null) {
            resolve(isAuthenticated);
            setTimeout(() => sub.unsubscribe(), 0);
            if (!isAuthenticated) {
              this.fronteggAppService.fronteggAppAuthState$.pipe(take(1)).subscribe(({ routes }) => {
                window.localStorage.setItem('FRONTEGG_AFTER_AUTH_REDIRECT_URL', state.url);
                this.zone.run(() => {
                  this.router.navigateByUrl(routes?.loginUrl);
                })
              });
            }
          }
        });
      }
    });
  }
}
