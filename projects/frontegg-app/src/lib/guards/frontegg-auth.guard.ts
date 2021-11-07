import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { FronteggBaseGuard } from './frontegg-base-guard';

@Injectable()
export class FronteggAuthGuard extends FronteggBaseGuard {

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return new Observable<boolean>(obs => {
      this.fronteggAppService.isAuthenticated$.subscribe((isAuthenticated: boolean) => {
        if (isAuthenticated) {
          obs.next(true);
        } else {
          this.router.navigateByUrl(this.fronteggAppService.authRoutes.loginUrl + '?redirectUrl=' + encodeURIComponent(state.url));
          obs.next(false);
        }
      });
    });
  }
}
