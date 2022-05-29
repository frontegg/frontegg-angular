import { Component, OnDestroy, OnInit } from '@angular/core';
import { FronteggSubscriptionService } from '@frontegg/angular';
import { Subscription } from 'rxjs';

@Component({
  selector: 'checkout-dialog',
  templateUrl: './checkout-dialog.component.html',
})
export class CheckoutDialogComponent implements OnInit, OnDestroy {
  loading = false;
  confirmed = false;
  error: string | null = null;
  open = false;

  checkoutStateSubscription: Subscription;

  constructor(private fronteggSubscriptionService: FronteggSubscriptionService) {
    this.checkoutStateSubscription = fronteggSubscriptionService.checkoutState$.subscribe(({ loading, open, confirmed, error }) => {
      this.loading = loading;
      this.error = error;
      this.open = open;
      this.confirmed = confirmed;
    });
  }

  ngOnInit(): void {
    console.log('AppComponent', 'ngOnInit');
  }

  ngOnDestroy(): void {
    this.checkoutStateSubscription.unsubscribe();
  }

  openCheckout() {
    this.fronteggSubscriptionService.openCheckout('awesome-plan');
  }

  closeCheckout() {
    this.fronteggSubscriptionService.hideCheckout();
  }
}
