import { Component, Signal } from '@angular/core';
import { FronteggAppService, FronteggAuthService } from '@frontegg/angular';
import { Router } from '@angular/router';
import { AuthState } from '@frontegg/redux-store';

@Component({
  selector: 'app-home',
  templateUrl: 'home.component.html',
})
export class AppHomeComponent {
  user: Signal<AuthState['user'] | undefined>
  authenticated: Signal<boolean | undefined>
  constructor(private fronteggAppService: FronteggAppService,
    private fronteggAuthService: FronteggAuthService,
    private router: Router) {
    this.user = this.fronteggAuthService.userSignal
    this.authenticated = this.fronteggAppService.isAuthenticatedSignal
  }

  showApp(): void {
    this.fronteggAppService.showAdminPortal();
  }

  doLogout(): void {
    if (this.fronteggAppService.fronteggApp.options.hostedLoginBox) {
      this.fronteggAuthService.logout();
    } else {
      this.router.navigateByUrl(this.fronteggAppService.authRoutes.logoutUrl);
    }
  }

  loginWithRedirect(): void {
    this.fronteggAuthService.loginWithRedirect();
  }

}
