import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { FronteggAppService } from '../frontegg-app.service';

@Injectable()
export class FronteggLoadGuard implements CanActivate {
  constructor(protected fronteggAppService: FronteggAppService) {
  }

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
