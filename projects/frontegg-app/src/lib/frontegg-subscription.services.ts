import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { FronteggAppService } from './frontegg-app.service';
import FastDeepEqual from 'fast-deep-equal';
import {
  EnhancedStore,
  subscriptionsStoreName,
  BillingState,
} from '@frontegg/redux-store';

import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FronteggSubscriptionService {
  private subscriptionStateSubject = new BehaviorSubject<BillingState['subscription']>({} as BillingState['subscription']);

  get subscriptionState$(): Observable<BillingState['subscription']> {
    return this.subscriptionStateSubject.asObservable();
  }

  constructor(private fronteggAppService: FronteggAppService) {
    // Memoized Subscription State
    this.fronteggAppService.subscriptionsState$.subscribe((subscriptionState) => {
      if (subscriptionState != null) {
        const { billing: { subscription } } = subscriptionState;

        if (!FastDeepEqual(this.subscriptionStateSubject.getValue(), subscription)) {
          this.subscriptionStateSubject.next(subscription);
        }
      }
    });
  }

  private dispatchAction(type: string, payload?: any): void {
    const store: EnhancedStore = this.fronteggAppService.fronteggApp.store;
    store.dispatch({ type: `${subscriptionsStoreName}/${type}`, payload });
  }

  public loadSubscription = () => this.dispatchAction('billing/subscription/loadSubscription');
}
