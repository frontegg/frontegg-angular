import { Injectable, NgZone } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { FronteggBaseGuard } from './frontegg-base-guard';
import { FronteggAppService } from '../frontegg-app.service';

@Injectable()
export class FronteggAuthGuard extends FronteggBaseGuard {
  private readonly authObservable: Observable<boolean>;

  constructor(protected fronteggAppService: FronteggAppService, protected router: Router, protected ngZone: NgZone) {
    super();
    this.authObservable = new Observable<boolean>(obs => {
      this.fronteggAppService.isAuthenticated$.subscribe((isAuthenticated: boolean) => {
        if (isAuthenticated) {
          obs.next(true);
        } else {
          if (NgZone.isInAngularZone()) {
            this.navigateToUrl();
          } else {
            this.ngZone.run(() => {
              this.navigateToUrl();
            });
          }
          obs.next(false);
        }
      });
    });
  }

  navigateToUrl(): void {
    const redirectUrl = this.router.routerState.snapshot.url;
    this.router.navigateByUrl(this.fronteggAppService.authRoutes.loginUrl + '?redirectUrl=' + encodeURIComponent(redirectUrl));
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return this.authObservable;
  }
}
