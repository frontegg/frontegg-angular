import { Component, OnDestroy, OnInit } from '@angular/core';
import { FronteggCheckoutService } from '@frontegg/angular';
import { Subscription } from 'rxjs';

@Component({
  selector: 'checkout-dialog',
  templateUrl: './checkout-dialog.component.html',
})
export class CheckoutDialogComponent implements OnInit, OnDestroy {
  confirmed = false;
  error: string | null = null;
  open = false;

  checkoutStateSubscription: Subscription;

  constructor(private fronteggCheckoutService: FronteggCheckoutService) {
    this.checkoutStateSubscription = fronteggCheckoutService.checkoutState$.subscribe(({ open, confirmed, error }) => {
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
    this.fronteggCheckoutService.openCheckout('awesome-plan');
  }

  closeCheckout() {
    this.fronteggCheckoutService.hideCheckout();
  }
}
