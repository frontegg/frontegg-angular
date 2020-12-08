import { Injectable, OnDestroy } from '@angular/core';
import { FronteggService, CoreService, FronteggStoreEvent } from '@frontegg/ng-core';
import { IConnectivityState } from '@frontegg/react-connectivity/interfaces';
import { connectivityActions } from '@frontegg/react-connectivity/reducer';

import { BehaviorSubject, fromEvent, Subscription } from 'rxjs';

type ConnectivityActions = typeof connectivityActions;

const storeName = 'connectivity';

@Injectable({
  providedIn: 'root',
})
export class ConnectivityService extends FronteggService implements OnDestroy {
  public pluginLoaded = false;
  private isLoadingSubject$ = new BehaviorSubject<boolean>(true);
  private connectivityStateSubject$ = new BehaviorSubject<IConnectivityState>(null);

  private storeListener$: Subscription;
  readonly connectivityState$ = this.connectivityStateSubject$.asObservable();

  actions: ConnectivityActions;

  constructor(private coreService: CoreService) {
    super();
    this.storeListener$ = fromEvent(document, `${FronteggStoreEvent}/${storeName}`).subscribe(() => {
      console.log('Connectivity subscribe');
      const connectivityState = this.coreService.state[storeName] as IConnectivityState;
      this.connectivityStateSubject$.next(connectivityState);
      if (this.isLoadingSubject$.getValue() !== connectivityState.isLoading) {
        this.isLoadingSubject$.next(connectivityState.isLoading);
      }
    });

    // register services in coreService
    coreService.registerService(storeName, this);
  }

  ngOnDestroy(): void {
    this.storeListener$.unsubscribe();
  }

  updateStateIfRequired(): void {
    if (!this.connectivityStateSubject$.getValue()) {
      const connectivityState = this.coreService.state[storeName] as IConnectivityState;
      this.connectivityStateSubject$.next(connectivityState);
    }
  }

  public setActions(key: string, actions: ConnectivityActions): void {
    if (key === storeName && actions != null) {
      this.actions = actions;
      if (!this.pluginLoaded) {
        console.log('Connectivity is load');
        this.pluginLoaded = true;
        this.coreService.checkLoadedServices();
        this.updateStateIfRequired();
      }
    }
  }
}
