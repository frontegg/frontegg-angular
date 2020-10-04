import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { DOMProxy, FronteggProvider } from '@frontegg/react-core';
import { NavigationEnd, Router } from '@angular/router';
import { FronteggBaseComponent } from './frontegg-base.component';


@Component({
  selector: 'frontegg-provider',
  template: `
    <ng-content></ng-content>`,
  styles: [],
})
export class FronteggProviderComponent extends FronteggBaseComponent implements AfterViewInit {
  routeListeners: any[] = [];
  // 1) createElement(RcComponent)
  //   1.1) pass upper props to RcComponent
  //   1.2) create smart children component with unique id to inject ng-content after mount
  // 2) create React Portal to be rendered inside this.elementRef
  // 3) search for parent Rc Component to inject this ReactPortal to it's children
  // 4) after React.Portal did mount, inject ng-container to it's smart children component

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
      plugins: [],
      debugMode: true,
      context: {
        baseUrl: `http://localhost:8080`,
        requestCredentials: 'include',
      },
    });
  }

}
