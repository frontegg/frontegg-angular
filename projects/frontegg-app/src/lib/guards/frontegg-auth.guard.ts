import { Injectable, NgZone } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { FronteggBaseGuard } from './frontegg-base-guard';
import { FronteggAppService } from '../frontegg-app.service';
import { FronteggAuthService } from '../frontegg-auth.service';

@Injectable()
export class FronteggAuthGuard extends FronteggBaseGuard {

  constructor(protected fronteggAppService: FronteggAppService, protected fronteggAuthService: FronteggAuthService,
              protected router: Router, protected ngZone: NgZone) {
    super();
  }


  /**
   * Wait for loader to finish
   * @private
   */
  private waitForLoader(): Promise<boolean> {
    return new Promise((resolve) => {
      const subscription = this.fronteggAppService.isLoading$.subscribe((isLoading) => {
        if (!isLoading) {
          resolve(true);
          subscription.unsubscribe();
        }
      });
    });
  }

  /**
   * Navigate to login page if user is not authenticated
   * @private
   */
  private async navigateToLoginIfNeeded(redirectUrl: string): Promise<boolean> {
    const { isAuthenticated } = this.fronteggAuthService.getAuthState();
    if (!isAuthenticated) {
      if (this.fronteggAppService.fronteggApp.options.hostedLoginBox) {
        localStorage.setItem('FRONTEGG_AFTER_AUTH_REDIRECT_URL', redirectUrl);
        this.fronteggAuthService.loginWithRedirect({ prompt: 'login' });
        return false;
      } else {
        return this.router.navigateByUrl(this.fronteggAppService.authRoutes.loginUrl + '?redirectUrl=' + encodeURIComponent(redirectUrl));
      }
      return false; // prevent navigation
    }
    return true; // activate navigation
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    const redirectUrl = state.url;
    const { isLoading } = this.fronteggAuthService.getAuthState();

    if (!isLoading) {
      // if showLoader false
      // check if user is authenticated
      return this.navigateToLoginIfNeeded(redirectUrl);
    }

    // wait for loader to finish and then check if user is authenticated
    return new Promise<boolean>(async (resolve, reject) => {
      await this.waitForLoader();

      if (NgZone.isInAngularZone()) {
        this.navigateToLoginIfNeeded(redirectUrl).then(resolve).catch(reject);
      } else {
        this.ngZone.run(() => {
          this.navigateToLoginIfNeeded(redirectUrl).then(resolve).catch(reject);
        });
      }
    });
  }
}
