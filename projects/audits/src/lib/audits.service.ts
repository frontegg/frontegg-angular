import { Injectable, OnDestroy } from '@angular/core';
import { FronteggService, CoreService } from '@frontegg/ng-core';
import { AuditsActions, AuditsState } from '@frontegg/react-audits';

import { BehaviorSubject, fromEvent, Subscription } from 'rxjs';
import { FronteggStoreEvent } from '@frontegg/ng-core';

const storeName = 'audits';

@Injectable({
  providedIn: 'root',
})
export class AuditsService extends FronteggService implements OnDestroy {

  public pluginLoaded = false;
  private isLoadingSubject$ = new BehaviorSubject<boolean>(true);
  private auditsStateSubject$ = new BehaviorSubject<AuditsState>(null);

  private storeListener$: Subscription;
  readonly auditsState$ = this.auditsStateSubject$.asObservable();

  actions: AuditsActions;


  constructor(private coreService: CoreService) {
    super();
    this.storeListener$ = fromEvent(document, `${FronteggStoreEvent}/${storeName}`)
      .subscribe((() => {

        const auditsState = this.coreService.state[storeName] as AuditsState;
        this.auditsStateSubject$.next(auditsState);
        if (this.isLoadingSubject$.getValue() !== auditsState.isLoading) {
          this.isLoadingSubject$.next(auditsState.isLoading);
        }

        if (!this.pluginLoaded) {
          this.pluginLoaded = true;
          this.coreService.checkLoadedServices();
        }
      }));

    // register services in coreService
    coreService.registerService(storeName, this);
  }

  ngOnDestroy(): void {
    this.storeListener$.unsubscribe();
  }

  public setActions(key: string, actions: AuditsActions): void {
    if (key === storeName && actions != null) {
      this.actions = actions;
    }
  }
}
