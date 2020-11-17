import {
  AfterViewInit,
  Component,
  ElementRef, Inject, Optional,
} from '@angular/core';
import { Router } from '@angular/router';
import { FronteggBaseComponent } from './frontegg-base.component';
import { FronteggProvider, FeProviderProps, DOMProxy, PluginConfig } from '@frontegg/react-core';
import { uiLibrary } from '@frontegg/react-elements-material-ui';
import { FE_AUTH_PLUGIN_CONFIG, FE_PROVIDER_CONFIG } from './constants';
import { CoreService } from './core.service';

@Component({
  selector: 'frontegg-provider',
  template: `
    <ng-content></ng-content>`,
  styles: [],
})
export class FronteggProviderComponent extends FronteggBaseComponent implements AfterViewInit {
  routeListeners: any[] = [];

  constructor(elem: ElementRef,
              private router: Router,
              private coreService: CoreService,
              @Inject(FE_PROVIDER_CONFIG) private config: Omit<FeProviderProps, 'plugins'>,
              @Optional() @Inject(FE_AUTH_PLUGIN_CONFIG) private authPlugin: PluginConfig) {
    super(elem);
    this.name = 'FronteggProvider';
  }

  ngAfterViewInit(): void {
    // @ts-ignore
    // const pl = this.router.location._platformLocation;
    // pl._history.listen = (e) => {
    //   console.log('add listener', e);
    //   this.routeListeners.push(e);
    //   return () => this.routeListeners = this.routeListeners.filter(l => l !== e);
    // };
    // pl._history.createHref = (e) => e.pathname;
    // pl._history.push = (path, data) => {
    //   console.log('push', path);
    //   this.router.navigate([typeof path === 'string' ? path : path.pathname], { state: data, replaceUrl: false });
    // };
    // pl._history.replace = (path, data) => {
    //   if (typeof path !== 'string') {
    //     return;
    //   }
    //   console.log('replace', path, pl);
    //   this.router.navigate([path], { state: data, replaceUrl: true });
    // };
    // pl._history.goBack = () => {
    //   console.log('goBack');
    //   window.history.back();
    // };
    // pl._history.location = pl.location;
    // this.router.events.subscribe((event) => {
    //   if (event instanceof NavigationEnd) {
    //     console.log('subscribe', pl.location);
    //     this.routeListeners.forEach(l => l(pl.location));
    //   }
    // });

    const middleware = store => next => action => {
      next(action);
      this.coreService.setState(store.getState(), action);
    };

    const plugins = [];
    if (this.authPlugin) {
      plugins.push(this.authPlugin);
    }
    debugger;
    this.mountElement<FeProviderProps>('FronteggProvider', FronteggProvider, {
      // _history: pl._history,
      uiLibrary,
      debugMode: true,
      storeMiddlewares: [middleware],
      context: this.config.context,
      plugins,
    });
  }

}
