import {
  AfterViewInit,
  Component,
  ElementRef,
} from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { FronteggBaseComponent } from './frontegg-base.component';
import { FronteggProvider, shallowEqual } from '@frontegg/react-core';
import { AuthPlugin, AuthState, AuthStateMapper } from '@frontegg/react-auth';
import { uiLibrary } from '@frontegg/react-elements-material-ui';
import { FeProviderProps } from '@frontegg/react-core/FronteggProvider';
import { fromEvent, Observable } from 'rxjs';
import { loginState } from '@frontegg/react-auth/Api/LoginState';

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
    pl._history.push = (path, data) => {
      console.log('push', path);
      this.router.navigate([path], { state: data, replaceUrl: false });
    };
    pl._history.replace = (path, data) => {
      console.log('replace', path, pl);
      this.router.navigate([path], { state: data, replaceUrl: true });
    };
    pl._history.goBack = () => {
      console.log('goBack');
      window.history.back();
    };
    pl._history.location = pl.location;

    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.routeListeners.forEach(l => l(pl.location));
      }
    });

    const middleware = store => next => action => {
      next(action); // continue the default action in redux store
      const storeName = action.type.substring(0, action.type.indexOf('/'));
      // detail action
      (window as any).fronteggStore = store.getState();
      const middlewareEvent = new CustomEvent(`FronteggStoreEvent/${storeName}`, {
        bubbles: true,
        cancelable: false,
        detail: action,
      });
      document.dispatchEvent(middlewareEvent);
    };

    this.mountElement<FeProviderProps>(FronteggProvider, {
      _history: pl._history,
      plugins: [AuthPlugin()],
      uiLibrary,
      debugMode: true,
      storeMiddlewares: [middleware],
      context: {
        baseUrl: `http://localhost:8080`,
        requestCredentials: 'include',
      },
    });
  }

}
