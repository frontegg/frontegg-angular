import {
  AfterViewInit,
  Component,
  ElementRef,
} from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { FronteggBaseComponent } from './frontegg-base.component';
import { FronteggProvider } from '@frontegg/react-core';
import { AuthPlugin } from '@frontegg/react-auth';
import { uiLibrary } from '@frontegg/react-elements-material-ui';

// declare namespace JSX { interface ElementAttributesProperty {} }

@Component({
  selector: 'frontegg-provider',
  template: `
    <ng-content></ng-content>`,
  styles: [],
})
export class FronteggProviderComponent extends FronteggBaseComponent implements AfterViewInit {
  routeListeners: any[] = [];

  constructor(elem: ElementRef, private router: Router) {
    super(elem);
  }

  ngAfterViewInit(): void {
    // @ts-ignore
    const pl = this.router.location._platformLocation;
    pl._history.listen = (e) => {
      this.routeListeners.push(e);
      return () => this.routeListeners = this.routeListeners.filter(l => l !== e);
    };
    pl._history.createHref = (e) => e.pathname;
    pl._history.push = (path, data) => this.router.navigate([path], { state: data, replaceUrl: false });
    pl._history.replace = (path, data) => this.router.navigate([path], { state: data, replaceUrl: true });
    pl._history.location = pl.location;

    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.routeListeners.forEach(l => l(pl.location));
      }
    });

    this.mountElement(FronteggProvider, {
      _history: pl._history,
      plugins: [AuthPlugin()],
      uiLibrary,
      debugMode: true,
      context: {
        baseUrl: `http://localhost:8080`,
        requestCredentials: 'include',
      },
    });
  }

}
