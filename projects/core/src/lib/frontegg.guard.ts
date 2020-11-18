import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanActivateChild,
  CanLoad,
  Route,
  RouterStateSnapshot,
  UrlSegment,
  UrlTree,
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { CoreService } from './core.service';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

@Injectable()
export class FronteggGuard implements CanActivate, CanActivateChild, CanLoad {
  constructor(private coreService: CoreService) {}

  canLoad(route: Route, segments: UrlSegment[]): Promise<boolean> {
    return new Promise((resolve) => {
      this.coreService.loading$
        .subscribe((value) => {
          if (!value) {
            debugger;
            resolve(true);
          }
        });
    });
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
    return new Promise((resolve) => {

      this.coreService.loading$
        .subscribe((value) => {
          if (!value) {
            debugger;
            resolve(true);
          }
        });
      // const subscription = this.coreService.loading$
      //   .pipe(map(value => !value))
      //   .subscribe(value => {
      //     if (!value) {
      //       resolve(true);
      //       if (subscription && !subscription.closed) {
      //         subscription.unsubscribe();
      //       }
      //     }
      //   });
    });
  }

  canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
    return new Promise((resolve) => {
      this.coreService.loading$
        .subscribe((value) => {
          if (!value) {
            debugger;
            resolve(true);
          }
        });
      // .subscribe(value => {
      //   if (!value) {
      //     resolve(true);
      //     if (subscription && !subscription.closed) {
      //       subscription.unsubscribe();
      //     }
      //   }
      // });
    });
  }

}
