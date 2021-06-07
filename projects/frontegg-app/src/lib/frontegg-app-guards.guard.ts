import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router'; import { Injectable, NgZone } from '@angular/core';
import { take, filter } from 'rxjs/operators';
import { FronteggAppService } from './frontegg-app-services.service';

@Injectable()
export class FronteggAuthGuard implements CanActivate {

  constructor(private fronteggAppService: FronteggAppService, private router: Router, private zone: NgZone) { }

  canActivate(_route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
    return new Promise((resolve) => {
      this.fronteggAppService.isAuthenticated$.pipe(filter(() => !!this.fronteggAppService.fronteggAppLoaded), take(1))
        .subscribe((isAuthenticated) => {
          if (isAuthenticated != null) {
            resolve(isAuthenticated);
            if (!isAuthenticated) {
              this.fronteggAppService.fronteggAppAuthState$.pipe(take(1)).subscribe((authState) => {
                const routes = authState?.routes
                window.localStorage.setItem('FRONTEGG_AFTER_AUTH_REDIRECT_URL', state.url);
                this.zone.run(() => {
                  this.router.navigateByUrl(routes?.loginUrl ?? '/');
                })
              });
            }
          }
        });
    });
  }
}
