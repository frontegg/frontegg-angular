import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { CoreService } from './core.service';
import { Injectable } from '@angular/core';

@Injectable()
export class FronteggGuard implements CanActivate {
  constructor(private coreService: CoreService) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    console.log('canActivate', this.coreService);
    debugger;
    return this.coreService.loading$;
  }

}
