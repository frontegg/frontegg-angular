import { Inject, Injectable, Optional } from '@angular/core';
import { FE_AUTH_PLUGIN_CONFIG, FE_PROVIDER_CONFIG, FronteggStoreEvent } from './constants';
import { FronteggService } from './FronteggService';
import { FeProviderProps, PluginConfig } from '@frontegg/react-core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CoreService implements FronteggService {
  private loadingSubject$ = new BehaviorSubject(true);
  public loading$ = this.loadingSubject$.asObservable();

  public pluginLoaded = false;
  public state: any;
  public actions: any;
  public services: { [key in string]: FronteggService | null } = {};


  constructor(@Inject(FE_PROVIDER_CONFIG) private config: Omit<FeProviderProps, 'plugins'>,
              @Optional() @Inject(FE_AUTH_PLUGIN_CONFIG) private authPlugin: PluginConfig) {
    // store registered plugins to check when its loaded

    if (authPlugin) {
      this.services[authPlugin.storeName] = null;
    }
    (window as any).coreService = this;
  }

  public setActions(key: string, actions: any): void {
    this.services[key]?.setActions?.(key, actions);
    this.checkLoadedServices();
  }

  public setState(state: any, action: any): void {
    this.state = state;
    const storeName = action.type.substring(0, action.type.indexOf('/'));
    document.dispatchEvent(new CustomEvent(`${FronteggStoreEvent}/${storeName}`, {
      bubbles: true,
      cancelable: false,
      detail: action,
    }));
  }

  public registerService(key: string, service: any): void {
    this.services[key] = service;
    this.checkLoadedServices();
  }

  public checkLoadedServices(): void {
    if (!this.loadingSubject$.getValue()) {
      return;
    }
    this.pluginLoaded = Object.values(this.services).reduce((p, n) => p && n?.pluginLoaded, true);
    if (this.pluginLoaded) {
      debugger;
      this.loadingSubject$.next(false);
    }
  }
}
