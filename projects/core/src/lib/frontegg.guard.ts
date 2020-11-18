import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, of } from 'rxjs';
import { CoreService } from './core.service';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';

@Injectable()
export class FronteggGuard implements CanActivate, CanActivateChild {
  constructor(private coreService: CoreService) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
    Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.coreService.loading$.pipe(tap((loading) => {

      if (loading) {
        return false;
      } else {
        try {
          const ss = !state.url.startsWith('/account');
          debugger;
          return ss;
        } catch (e) {
          console.error(e);
          debugger;
          return true;
        }
      }
    }, e => {
      debugger;
      console
        .error(e);
    }));
    // return this.coreService.loading$;
  }

  canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot):
    Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const canAc = this.coreService.pluginLoaded
    debugger;
    return canAc;
  }

}
