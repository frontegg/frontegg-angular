import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanActivateChild,
  CanLoad,
  Route,
  RouterStateSnapshot,
  UrlSegment,
} from '@angular/router';
import { Injectable } from '@angular/core';
import { AuditsService } from './audits.service';

@Injectable()
export class AuditsGuard implements CanActivate, CanActivateChild, CanLoad {
  constructor(
    private auditsService: AuditsService,
  ) {
    debugger;
  }

  canLoad(route: Route, segments: UrlSegment[]): boolean {
    return true;
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    return true;
  }

  canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    return true;
  }

}
