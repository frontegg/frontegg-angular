import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Injectable, NgZone } from '@angular/core';
import { take, filter } from 'rxjs/operators';
import { FronteggAppService } from './frontegg-app.service';
import { FronteggAppAuthService } from './frontegg-app-auth.service';

@Injectable()
export class FronteggAuthGuard implements CanActivate {

  constructor(private fronteggAppService: FronteggAppService, private fronteggAppAuthService: FronteggAppAuthService, private router: Router, private zone: NgZone) { }

  canActivate(_route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
    return new Promise((resolve) => {
      this.fronteggAppAuthService.isLoading$.pipe(filter(() => this.fronteggAppService.fronteggAppLoaded))
        .subscribe((isLoading) => {
          if (isLoading) {
            return;
          }

          this.fronteggAppAuthService.isAuthenticated$.pipe(take(1))
          .subscribe((isAuthenticated) => {
            if (isAuthenticated != null) {
              resolve(isAuthenticated);
              if (!isAuthenticated) {
                this.fronteggAppService.fronteggAppAuthState$.pipe(take(1)).subscribe((authState) => {
                  if (authState == null){
                    return;
                  }

                  const routes = authState.routes;
                  this.zone.run(() => {
                    const loginUrl = routes.loginUrl || '/';
                    this.router.navigateByUrl(`${loginUrl}?redirectUrl=${encodeURIComponent(state.url)}`);
                  });
                });
              }
            }
          });
        });
    });
  }
}
