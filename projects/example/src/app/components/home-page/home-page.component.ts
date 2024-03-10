import { Component, OnDestroy, OnInit } from '@angular/core';
import { FronteggAppService } from '@frontegg/angular';
import { Subscription } from 'rxjs';

@Component({
  selector: 'home-page',
  templateUrl: 'home-page.component.html',
})
export class HomePage implements OnInit, OnDestroy {
  authenticated = false;
  isAuthenticatedSubscription?: Subscription;

  constructor(private fronteggAppService: FronteggAppService) {}

  ngOnInit(): void {
    this.isAuthenticatedSubscription = this.fronteggAppService.isAuthenticated$.subscribe((isAuthenticated: boolean) => {
      this.authenticated = isAuthenticated;
    });
  }

  ngOnDestroy(): void {
    this.isAuthenticatedSubscription?.unsubscribe();
  }
}
