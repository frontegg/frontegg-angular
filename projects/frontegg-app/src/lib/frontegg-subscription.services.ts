import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { FronteggAppService } from './frontegg-app.service';
import FastDeepEqual from 'fast-deep-equal';
import { SubscriptionsState, SubscriptionState } from '@frontegg/redux-store';

export interface CheckoutDialogState {
  loading: boolean;
  open: boolean;
  success: boolean;
  error: string | null;
}

@Injectable({
  providedIn: 'root',
})
export class FronteggSubscriptionService {
  private subscriptionStateSubject = new BehaviorSubject<SubscriptionState>({} as SubscriptionState);

  private checkoutStateSubject = new BehaviorSubject<CheckoutDialogState>({
    loading: false,
    open: false,
    success: false,
    error: null,
  });

  get subscriptionState$(): Observable<SubscriptionState> {
    return this.subscriptionStateSubject.asObservable();
  }

  get checkoutState$(): Observable<CheckoutDialogState> {
    return this.checkoutStateSubject.asObservable();
  }

  constructor(private fronteggAppService: FronteggAppService) {
    // Memoized Subscription State
    this.fronteggAppService.subscriptionsState$.subscribe((subscriptionState: SubscriptionsState) => {
      if (subscriptionState != null) {
        const { billing: { subscription }, checkout: checkoutState } = subscriptionState;

        if (!FastDeepEqual(this.subscriptionStateSubject.getValue(), subscription)) {
          this.subscriptionStateSubject.next(subscription);
        }

        const checkoutSubjectState = this.checkoutStateSubject.getValue();
        if (checkoutSubjectState.loading !== checkoutState.loading) {
          this.checkoutStateSubject.next({
            ...checkoutSubjectState,
            loading: checkoutState.loading,
          });
        }
      }
    });
  }

  private dispatchAction(type: string, payload?: any): void {
    const store = this.fronteggAppService.fronteggApp.store;
    // @ts-ignore
    store.dispatch({ type: `${subscriptionsStoreName}/${type}`, payload });
  }

  public loadSubscription = () => this.dispatchAction('billing/subscription/loadSubscription');

  public openCheckout = (plan: string): void => {
    this.checkoutStateSubject.next({
      loading: false,
      open: true,
      success: false,
      error: null,
    });
    this.fronteggAppService.showCheckoutDialog({
      plan,
      onSuccess: () => {
        this.checkoutStateSubject.next({
          loading: false,
          open: false,
          success: true,
          error: null,
        });
      },
      onError: (error) => {
        const checkoutState = this.checkoutStateSubject.value;
        this.checkoutStateSubject.next({
          ...checkoutState,
          error,
        });
      },
      onClose: () => {
        const checkoutState = this.checkoutStateSubject.value;
        this.checkoutStateSubject.next({
          ...checkoutState,
          open: false,
        });
      },
    });
  };

  public hideCheckout = (): void => {
    this.fronteggAppService.hideCheckoutDialog();
  };
}
