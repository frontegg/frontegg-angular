import { Component, OnDestroy, OnInit } from '@angular/core';
import { FronteggAuthService } from '@frontegg/angular';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit, OnDestroy {
  isLoading = true;
  isAuthenticated = false;
  subscriptions?: Subscription;

  constructor(private authService: FronteggAuthService, private router: Router) {
  }

  ngOnInit(): void {
    this.subscriptions = this.authService.authState$.subscribe(authState => {
      this.isLoading = authState.isLoading;
      this.isAuthenticated = authState.isAuthenticated;
      if (!authState.isLoading && !authState.isAuthenticated) {
        this.authService.loginWithRedirect();
      }
    });
  }

  ngOnDestroy(): void {
    this.subscriptions?.unsubscribe();
  }
}
