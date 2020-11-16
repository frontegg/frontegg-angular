import { Inject, Injectable } from '@angular/core';
import { FE_PROFIVER_CONFIG, FronteggStoreEvent } from './constants';
import { FronteggService } from './FronteggService';
import { FeProviderProps } from '@frontegg/react-core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CoreService implements FronteggService {
  loading = new Subject<boolean>();
  public loading$ = this.loading.asObservable();
  public loaded = false;
  public state: any;
  public actions: any;
  public services: { [key in string]: FronteggService | null };


  constructor(@Inject(FE_PROFIVER_CONFIG) private config: FeProviderProps) {
    // store registered plugins to check when its loaded
    this.services = this.config.plugins.reduce((p, n) => ({ ...p, [n.storeName]: null }), {});

    (window as any).coreService = this;
  }

  public setActions(key: string, actions: any): void {
    this.services[key]?.setActions(key, actions);
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
  }

  private checkLoadedServices(): void {
    this.loaded = Object.values(this.services).reduce((p, n) => p && n?.loaded, true);
  }
}
