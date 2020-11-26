import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanActivateChild,
  CanLoad,
  Route,
  RouterStateSnapshot,
  UrlSegment,
} from '@angular/router';
import { CoreService } from './core.service';
import { Injectable } from '@angular/core';
import { take } from 'rxjs/operators';

@Injectable()
export class FronteggGuard implements CanActivate, CanActivateChild, CanLoad {
  constructor(private coreService: CoreService) {}

  canLoad(route: Route, segments: UrlSegment[]): Promise<boolean> {
    return new Promise((resolve) => {
      this.coreService.loading$.pipe(take(1))
        .subscribe((value) => {
          if (!value) {
            resolve(true);
          }
        });
    });
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
    return new Promise((resolve) => {
      const sub = this.coreService.loading$
        .subscribe((value) => {
          if (!value) {
            resolve(this.coreService.isFronteggRoute(state.url));
            setTimeout(() => sub.unsubscribe(), 0);
          }
        });
    });
  }

  canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
    return new Promise((resolve) => {
      const sub = this.coreService.loading$
        .subscribe((value) => {
          if (!value) {
            resolve(this.coreService.isFronteggRoute(state.url));
            setTimeout(() => sub.unsubscribe(), 0);
          }
        });
    });
  }

}
