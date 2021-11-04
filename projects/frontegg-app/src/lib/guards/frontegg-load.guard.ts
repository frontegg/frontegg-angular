import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { FronteggBaseGuard } from './frontegg-base-guard';

@Injectable()
export class FronteggLoadGuard extends FronteggBaseGuard {

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return new Observable<boolean>(obs => {
      this.fronteggAppService.isLoading$.subscribe(loading => {
        if (!loading) {
          obs.next(true);
        }
      });
    });
  }
}
