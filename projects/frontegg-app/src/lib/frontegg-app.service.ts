import { Inject, Injectable, NgZone } from '@angular/core';
import { Router, RouterEvent } from '@angular/router';
import { initialize } from '@frontegg/admin-portal';
import { FronteggAppInstance, FronteggAppOptions } from '@frontegg/types';
import { BehaviorSubject } from 'rxjs';
import { FE_PROVIDER_CONFIG } from './constants';
import { AuditsState, AuthPageRoutes, AuthState, RootState } from '@frontegg/redux-store';
import { ContextHolder, RedirectOptions } from '@frontegg/rest-api';


interface FronteggState {
  root: RootState;
  auth: AuthState;
  audits: AuditsState;
}

export { AuthState };

type FronteggApp = FronteggAppInstance & {
  showAdminPortal(): void;
  hideAdminPortal(): void;
}

@Injectable({
  providedIn: 'root',
})
export class FronteggAppService {
  fronteggApp: FronteggApp;
  private fronteggAppStateSubject$ = new BehaviorSubject<FronteggState | null>(null);
  private fronteggAppAuthStateSubject$ = new BehaviorSubject<FronteggState['auth'] | null>(null);
  private fronteggAppAuditsStateSubject$ = new BehaviorSubject<FronteggState['audits'] | null>(null);

  private isLoadingSubject$ = new BehaviorSubject<boolean>(true);
  public readonly isAuthRouteSubject$ = new BehaviorSubject<boolean>(false);

  readonly fronteggAppState$ = this.fronteggAppStateSubject$.asObservable();
  readonly fronteggAppAuthState$ = this.fronteggAppAuthStateSubject$.asObservable();
  readonly fronteggAppAuditsState$ = this.fronteggAppAuditsStateSubject$.asObservable();

  readonly isLoading$ = this.isLoadingSubject$.asObservable();
  readonly isAuthRoute$ = this.isAuthRouteSubject$.asObservable();

  constructor(@Inject(FE_PROVIDER_CONFIG) private config: FronteggAppOptions, private router: Router, private ngZone: NgZone) {
    if (!this.config) {
      throw Error('Need to pass config: FronteggConfigOptions in FronteggAppModule.forRoot(config)');
    }

    const onRedirectTo = (path: string, opts?: RedirectOptions) => {
      debugger;
      const baseName = window.location.origin;

      if (path.startsWith(baseName) && baseName !== '/') {
        path = path.substring(baseName.length - 1);
      }

      if (opts?.refresh) {
        window.location.href = path;
      } else {
        this.ngZone.run(() => {
          if (opts?.replace) {
            this.router.navigate([path], { replaceUrl: true });
          } else {
            this.router.navigate([path]);
          }
        });
      }
    };
    ContextHolder.setOnRedirectTo(onRedirectTo);

    this.fronteggApp = initialize({
      onRedirectTo,
      ...this.config,
    });

    // Subscribe on fronteggApp store to change state subjects
    this.fronteggApp.store.subscribe(() => {
      const fronteggStore = this.fronteggApp.store.getState();
      if (this.isLoadingSubject$.getValue() !== fronteggStore?.auth.isLoading) {
        this.isLoadingSubject$.next(fronteggStore?.auth.isLoading);
      }

      this.fronteggAppStateSubject$.next(fronteggStore);
      this.fronteggAppAuthStateSubject$.next(fronteggStore?.auth);
      this.fronteggAppAuditsStateSubject$.next(fronteggStore?.audits);
    });

    // To check auth route
    this.router.events.subscribe((r) => {
      const route = r as RouterEvent;
      const storeState = this.fronteggApp.store.getState();

      if (!!route.url && !!storeState?.auth) {
        const authRoutes = this.getAuthRoutes();
        const prevIsAuthRoute = Boolean(this.isAuthRouteSubject$.getValue());
        if (authRoutes.includes(route.url) && !prevIsAuthRoute) {
          this.isAuthRouteSubject$.next(true);
        } else if (!authRoutes.includes(route.url) && prevIsAuthRoute) {
          this.isAuthRouteSubject$.next(false);
        }
      }
    });

    if (this.getAuthRoutes().includes(this.router.url)) {
      this.isAuthRouteSubject$.next(true);
    }
  }

  // helper method
  public getAuthRoutes(): string[] {
    const authRoutes = this.fronteggApp.store.getState().auth.routes ?? {};
    return Object.keys(authRoutes)
      .filter((key: string) => key !== 'authenticatedUrl')
      .map((key: string) => (authRoutes[key as keyof AuthPageRoutes]) as string);
  }

  public getAuthPageRoutes(): AuthPageRoutes {
    return this.fronteggApp.store.getState().auth.routes;
  }

  // Open admin portal
  showAdminPortal(): void {
    this.fronteggApp.showAdminPortal();
  }

  // Open admin portal
  hideAdminPortal(): void {
    this.fronteggApp?.hideAdminPortal();
  }
}


