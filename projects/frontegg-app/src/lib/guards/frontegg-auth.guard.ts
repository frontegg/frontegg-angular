import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { FronteggBaseGuard } from './frontegg-base-guard';
import { FronteggAppService } from '../frontegg-app.service';

@Injectable()
export class FronteggAuthGuard extends FronteggBaseGuard {
  constructor(protected fronteggAppService: FronteggAppService, protected router: Router) {
    super();
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return new Observable<boolean>(obs => {
      this.fronteggAppService.isAuthenticated$.subscribe((isAuthenticated: boolean) => {
        if (isAuthenticated) {
          obs.next(true);
        } else {
          this.router.navigate([this.fronteggAppService.authRoutes.loginUrl + '?redirectUrl=' + encodeURIComponent(state.url)], { queryParamsHandling: "merge" });
          obs.next(false);
        }
      });
    });
  }
}
