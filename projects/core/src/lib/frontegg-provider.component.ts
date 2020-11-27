import {
  AfterViewInit,
  Component,
  ElementRef, Inject, NgZone, Optional,
} from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { FronteggBaseComponent } from './frontegg-base.component';
import { FronteggProvider, FeProviderProps, DOMProxy, createBrowserHistory, PluginConfig } from '@frontegg/react-core';
import { uiLibrary } from '@frontegg/react-elements-material-ui';
import { FE_AUDITS_PLUGIN_CONFIG, FE_AUTH_PLUGIN_CONFIG, FE_PROVIDER_CONFIG } from './constants';
import { CoreService } from './core.service';


const history = createBrowserHistory();

@Component({
  selector: 'frontegg-provider',
  template: `
    <ng-content></ng-content>`,
  styles: [],
})
export class FronteggProviderComponent extends FronteggBaseComponent implements AfterViewInit {
  routeListeners: any[] = [];

  constructor(elem: ElementRef,
              private ngZone: NgZone,
              private router: Router,
              public coreService: CoreService,
              @Inject(FE_PROVIDER_CONFIG) private config: FeProviderProps,
              @Optional() @Inject(FE_AUTH_PLUGIN_CONFIG) private authPlugin: PluginConfig,
              @Optional() @Inject(FE_AUDITS_PLUGIN_CONFIG) private auditsPlugin: PluginConfig,
  ) {
    super(elem);
    this.name = 'FronteggProvider';
  }

  navigateTo(url): void {
    this.router.navigateByUrl(url);
  }

  ngAfterViewInit(): void {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        // debugger;
        history.replace(event.urlAfterRedirects);
      }
    });

    const middleware = store => next => action => {
      next(action);
      this.coreService.setState(store.getState(), action);
    };

    const plugins = [this.authPlugin, this.auditsPlugin]
      .map(p => Array.isArray(p) ? p[0] : p)
      .filter(p => p && p.storeName);
    debugger;
    this.mountElement<FeProviderProps>('FronteggProvider', FronteggProvider, {
      _history: history,
      uiLibrary,
      debugMode: true,
      storeMiddlewares: [middleware],
      context: this.config.context,
      onRedirectTo: (path, opts) => {
        if (opts?.refresh) {
          window.location.href = path;
        } else {
          this.ngZone.run(() => this.navigateTo(path));
        }
      },
      plugins,
      _resolveActions: (key, actions) => this.coreService.setActions(key, actions),
    });
  }

}
