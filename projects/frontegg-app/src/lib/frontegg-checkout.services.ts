import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { FronteggAppService } from './frontegg-app.service';

export interface CheckoutDialogState {
  open: boolean;
  confirmed: boolean;
  error: string | null;
}

@Injectable({
  providedIn: 'root',
})
export class FronteggCheckoutService {
  private checkoutStateSubject = new BehaviorSubject<CheckoutDialogState>({
    open: false,
    confirmed: false,
    error: null,
  });

  get checkoutState$(): Observable<CheckoutDialogState> {
    return this.checkoutStateSubject.asObservable();
  }

  constructor(private fronteggAppService: FronteggAppService) {}

  public openCheckout(plan: string): void {
    this.checkoutStateSubject.next({
      open: true,
      confirmed: false,
      error: null,
    });
    this.fronteggAppService.showCheckoutDialog({
      plan,
      onSuccess: () => {
        this.checkoutStateSubject.next({
          open: false,
          confirmed: true,
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
  }

  public hideCheckout(): void {
    this.fronteggAppService.hideCheckoutDialog();
  }
}
