import { Component, OnDestroy, OnInit } from '@angular/core';
import { FronteggAppService } from '@frontegg/angular';
import { Subscription } from 'rxjs';

@Component({
  selector: 'authorized-content-page',
  templateUrl: 'authorized-content-page.component.html',
  styleUrls: ['authorized-content-page.component.scss'],
})
export class AuthorizedContentPage implements OnInit, OnDestroy {
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
