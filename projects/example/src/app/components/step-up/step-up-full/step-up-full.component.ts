import { Component, NgZone, OnDestroy, OnInit } from '@angular/core';
import { FronteggAppService, FronteggAuthService } from '@frontegg/angular';
import { Subscription } from 'rxjs';

@Component({
  selector: 'step-up-full',
  templateUrl: './step-up-full.component.html',
  styleUrls: ['./step-up-full.component.scss']
})
export class StepUpFull implements OnDestroy, OnInit {
  isLoading = true;
  steppedUpSubscription?: Subscription;
  isAuthenticatedSubscription: Subscription;
  isSteppedUp = false;
  authenticated = false;
  maxAge = 5000;

  constructor(
      private fronteggAppService: FronteggAppService,
      private fronteggAuthService: FronteggAuthService,
      private ngZone: NgZone,
  ) {
    this.isAuthenticatedSubscription = this.fronteggAppService.isAuthenticated$.subscribe((isAuthenticated: boolean) => {
      this.authenticated = isAuthenticated;
    });
  }

  ngOnInit(): void {
    this.steppedUpSubscription = this.fronteggAuthService.isSteppedUp$({
      next: (isSteppedUp: boolean) => {
        this.ngZone.run(() => {
          this.isSteppedUp = isSteppedUp;

          if (isSteppedUp) { return; }

          this.fronteggAuthService.stepUp({ maxAge: this.maxAge });
        });
      }
    }, { maxAge: this.maxAge });
  }

  ngOnDestroy(): void {
    this.isAuthenticatedSubscription.unsubscribe();
    this.steppedUpSubscription?.unsubscribe();
  }
}
