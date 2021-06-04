import { Inject, Injectable } from '@angular/core';
import { Router, RouterEvent } from '@angular/router';
import { initialize } from "@frontegg/admin-portal";
import { BehaviorSubject } from 'rxjs';
import { FE_PROVIDER_CONFIG } from './constants';
import { FronteggConfigOptions } from './frontegg-app.module';
import { createFronteggStore } from '@frontegg/redux-store';
import { take, filter } from 'rxjs/operators';

type FronteggApp = ReturnType<typeof initialize>;
@Injectable({
  providedIn: 'root'
})
export class FronteggAppService {
  fronteggApp: FronteggApp;
  fronteggAppLoaded: boolean;
  //TODO: types
  private fronteggAppStateSubject$ = new BehaviorSubject<any>(null);
  //TODO: types
  private fronteggAppAuthStateSubject$ = new BehaviorSubject<any>(null);
  //TODO: types
  private fronteggAppAuditsStateSubject$ = new BehaviorSubject<any>(null);

  private isLoadingSubject$ = new BehaviorSubject<boolean>(true);
  private isAuthenticatedSubject$ = new BehaviorSubject<boolean>(false);
  private isAuthRouteSubject$ = new BehaviorSubject<boolean>(false);

  readonly fronteggAppState$ = this.fronteggAppStateSubject$.asObservable();
  readonly fronteggAppAuthState$ = this.fronteggAppAuthStateSubject$.asObservable();
  readonly fronteggAppAuditsState$ = this.fronteggAppAuditsStateSubject$.asObservable();

  readonly isLoading$ = this.isLoadingSubject$.asObservable();
  readonly isAuthenticated$ = this.isAuthenticatedSubject$.asObservable();
  readonly isAuthRoute$ = this.isAuthRouteSubject$.asObservable();

  constructor(@Inject(FE_PROVIDER_CONFIG) private config: FronteggConfigOptions, private router: Router) {
    if (!this.config) {
      throw Error('Need to pass config: FronteggConfigOptions in FronteggAppModule.forRoot(config)')
    }

    const _config = { version: 'latest', ...this.config }
    const fronteggApp = initialize(_config)
    const store = createFronteggStore({
      context: {
        baseUrl: this.config?.contextOptions?.baseUrl,
        requestCredentials: this.config?.contextOptions?.requestCredentials ?? 'include'
      }
    })
    fronteggApp.store = store
    this.fronteggApp = fronteggApp
    this.fronteggAppLoaded = false

    // To know if frontegg app loaded
    this.fronteggApp.onLoad(() => {
      if (this.fronteggAppLoaded !== this.fronteggApp.loaded) {
        this.fronteggAppLoaded = this.fronteggApp.loaded
      }
    })

    // Subscribe on fronteggApp store to change state subjects
    this.fronteggApp.store?.subscribe(() => {
      const fronteggStore = this.fronteggApp.store?.getState()
      if (this.isLoadingSubject$.getValue() !== fronteggStore?.auth.isLoading) {
        this.isLoadingSubject$.next(fronteggStore?.auth.isLoading);
      }
      if (this.isAuthenticatedSubject$.getValue() !== fronteggStore?.auth.isAuthenticated) {
        this.isAuthenticatedSubject$.next(fronteggStore?.auth.isAuthenticated);
      }

      this.fronteggAppStateSubject$.next(fronteggStore)
      this.fronteggAppAuthStateSubject$.next(fronteggStore?.auth)
      this.fronteggAppAuditsStateSubject$.next(fronteggStore?.audits)
    })

    // To check auth route
    this.router.events.subscribe((r) => {
      const route = r as RouterEvent
      const store = this.fronteggAppStateSubject$.getValue() ?? {}

      if (!!route.url && !!store.auth) {
        const authRoutes = Object.values(store.auth.routes).filter((route: any) => route.includes('account'))
        const prevIsAuthRoute = this.isAuthRouteSubject$.getValue()

        if (authRoutes.includes(route.url) && prevIsAuthRoute === false) {
          this.isAuthRouteSubject$.next(true)
        } else if (!authRoutes.includes(route.url) && prevIsAuthRoute === true) {
          this.isAuthRouteSubject$.next(false)
        }
      }
    })

    // Check auth route on first load
    this.fronteggAppAuthState$.pipe(filter((authState) => !!authState?.routes), take(1)).subscribe((authState) => {
      const authRoutes = Object.values(authState.routes).filter((route: any) => route.includes('account'))

      if (authRoutes.includes(this.router.url)) {
        this.isAuthRouteSubject$.next(true)
      }
    })
  }

  // Open admin portal
  showFronteggApp(): void {
    if (!!this.fronteggAppLoaded) {
      this.fronteggApp?.mountAdminPortal()
    }
  }
}
