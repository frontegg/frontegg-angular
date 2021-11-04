import { ActivatedRouteSnapshot, CanActivate, DefaultUrlSerializer, Router, RouterStateSnapshot, UrlSerializer, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { FronteggAppService } from '../frontegg-app.service';

export abstract class FronteggBaseGuard implements UrlSerializer, CanActivate {
  constructor(protected fronteggAppService: FronteggAppService, protected router: Router) {}

  abstract canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot)
    : Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree;

  parse(url: any): UrlTree {
    const dus = new DefaultUrlSerializer();
    return dus.parse(url);
  }

  serialize(tree: UrlTree): any {
    const dus = new DefaultUrlSerializer();

    return dus
      .serialize(tree)
      .replace(/%40/gi, '@')
      .replace(/%3A/gi, ':')
      .replace(/%24/gi, '$')
      .replace(/%2C/gi, ',')
      .replace(/%3B/gi, ';')
      .replace(/%2B/gi, '+')
      .replace(/%3D/gi, '=')
      .replace(/%3F/gi, '?')
      .replace(/%2F/gi, '/')
      .replace(/(https?):\/([\w\d])/gi, '$1://$2');
  }
}
