import { Component, NgZone, OnDestroy, OnInit } from '@angular/core';
import { FronteggAppService, FronteggAuthService } from '@frontegg/angular';
import { StepUpOptions } from '@frontegg/types';
import { Subscription } from 'rxjs';

@Component({
  selector: 'base-step-up',
  templateUrl: './base-step-up.component.html',
  styleUrls: ['./base-step-up.component.scss']
})
export class BaseStepUp implements OnDestroy, OnInit {
  isLoading = true;
  steppedUpSubscription?: Subscription;
  isAuthenticatedSubscription: Subscription;
  isSteppedUp = false;
  authenticated = false;
  maxAge: number | undefined;

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
        });
      }
    }, { maxAge: this.maxAge });
  }

  stepUp(options?: StepUpOptions) {
    this.fronteggAuthService.stepUp(options);
  }

  ngOnDestroy(): void {
    this.isAuthenticatedSubscription.unsubscribe();
    this.steppedUpSubscription?.unsubscribe();
  }
}
