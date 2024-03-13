import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FronteggAppService, FronteggAuthService } from '@frontegg/angular';
import { Subscription } from 'rxjs';
import { ROUTE_PATHS } from './links';
import { User } from '@frontegg/redux-store';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  isLoading = true;
  loadingSubscription: Subscription;
  isAuthenticatedSubscription: Subscription;
  userSubscription?: Subscription;
  authenticated = false;
  user?: User;
  ROUTE_PATHS = ROUTE_PATHS;

  constructor(
      public fronteggAppService: FronteggAppService,
      private fronteggAuthService: FronteggAuthService,
      private router: Router,
  ) {
    this.loadingSubscription = fronteggAppService.isLoading$.subscribe((isLoading) => {
      this.isLoading = isLoading;
    });

    this.isAuthenticatedSubscription = this.fronteggAppService.isAuthenticated$.subscribe((isAuthenticated: boolean) => {
      this.authenticated = isAuthenticated;
    });
  }

  showApp(): void {
    this.fronteggAppService.showAdminPortal();
  }

  logout(): void {
    if (this.fronteggAppService.fronteggApp.options.hostedLoginBox) {
      this.fronteggAuthService.logout();
      return;
    }
    
    this.router.navigateByUrl(this.fronteggAppService.authRoutes.logoutUrl);
  }

  loginWithRedirect(): void {
    this.fronteggAuthService.loginWithRedirect();
  }

  ngOnInit(): void {
    this.userSubscription = this.fronteggAuthService.user$.subscribe((user: any) => {
      this.user = user;
    });
  }

  ngOnDestroy(): void {
    this.loadingSubscription.unsubscribe();
    this.isAuthenticatedSubscription.unsubscribe();
    this.userSubscription?.unsubscribe();
  }
}
