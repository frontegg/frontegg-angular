import { Inject, Injectable, NgZone } from '@angular/core';
import { Router, RouterEvent } from '@angular/router';
import { initialize } from '@frontegg/admin-portal';
import { BehaviorSubject } from 'rxjs';
import { FE_PROVIDER_CONFIG } from './constants';
import { FronteggConfigOptions } from './frontegg-app.module';
import { AuditsState, AuthPageRoutes, AuthState, createFronteggStore, RootState } from '@frontegg/redux-store';
import { ContextHolder, RedirectOptions } from '@frontegg/rest-api';
import { filter, take } from 'rxjs/operators';

type FronteggApp = ReturnType<typeof initialize>;

interface FronteggState {
  root: RootState;
  auth: AuthState;
  audits: AuditsState;
}

export { AuthState };

@Injectable({
  providedIn: 'root',
})
export class FronteggAppService {
  fronteggApp: FronteggApp;
  fronteggAppLoaded: boolean;
  private fronteggAppStateSubject$ = new BehaviorSubject<FronteggState | null>(null);
  private fronteggAppAuthStateSubject$ = new BehaviorSubject<FronteggState['auth'] | null>(null);
  private fronteggAppAuditsStateSubject$ = new BehaviorSubject<FronteggState['audits'] | null>(null);

  private isLoadingSubject$ = new BehaviorSubject<boolean>(true);
  private isAuthRouteSubject$ = new BehaviorSubject<boolean>(false);

  readonly fronteggAppState$ = this.fronteggAppStateSubject$.asObservable();
  readonly fronteggAppAuthState$ = this.fronteggAppAuthStateSubject$.asObservable();
  readonly fronteggAppAuditsState$ = this.fronteggAppAuditsStateSubject$.asObservable();

  readonly isLoading$ = this.isLoadingSubject$.asObservable();
  readonly isAuthRoute$ = this.isAuthRouteSubject$.asObservable();

  constructor(@Inject(FE_PROVIDER_CONFIG) private config: FronteggConfigOptions, private router: Router, private ngZone: NgZone) {
    if (!this.config) {
      throw Error('Need to pass config: FronteggConfigOptions in FronteggAppModule.forRoot(config)');
    }

    const onRedirectTo = (path: string, opts?: RedirectOptions) => {
      const baseName = window.location.origin

      if (path.startsWith(baseName) && baseName !== '/') {
        path = path.substring(baseName.length - 1)
      }

      if (opts?.refresh) {
        window.location.href = path
      } else {
        ngZone.run(() => {
          if (opts?.replace) {
            this.router.navigate([path], { replaceUrl: true });
          } else {
            this.router.navigate([path]);
          }
        })
      }
    };
    ContextHolder.setOnRedirectTo(onRedirectTo);

    // tslint:disable-next-line:variable-name
    const _config = {
      version: 'latest',
      onRedirectTo,
      ...this.config,
    };
    const fronteggApp = initialize(_config);
    fronteggApp.store = createFronteggStore({
      context: {
        baseUrl: this.config?.contextOptions?.baseUrl,
        requestCredentials: this.config?.contextOptions?.requestCredentials ?? 'include',
      },
    });
    this.fronteggApp = fronteggApp;
    this.fronteggAppLoaded = false;

    // To know if frontegg app loaded
    this.fronteggApp.onLoad(() => {
      if (this.fronteggAppLoaded !== this.fronteggApp.loaded) {
        this.fronteggAppLoaded = this.fronteggApp.loaded;
      }
    });

    // Subscribe on fronteggApp store to change state subjects
    this.fronteggApp.store?.subscribe(() => {
      const fronteggStore = this.fronteggApp.store?.getState();
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
      const storeState = this.fronteggAppStateSubject$?.getValue();

      if (!!route.url && !!storeState?.auth) {
        const authRoutes = this.getAuthRoutes(storeState.auth.routes ?? {});
        const prevIsAuthRoute = Boolean(this.isAuthRouteSubject$.getValue());

        if (authRoutes.includes(route.url) && !prevIsAuthRoute) {
          this.isAuthRouteSubject$.next(true);
        } else if (!authRoutes.includes(route.url) && prevIsAuthRoute) {
          this.isAuthRouteSubject$.next(false);
        }
      }
    });

    // Check auth route on first load
    this.fronteggAppAuthState$.pipe(filter((authState) => !!authState?.routes), take(1)).subscribe((authState) => {
      const authRoutes = this.getAuthRoutes(authState?.routes ?? {});
      if (authRoutes.includes(this.router.url)) {
        this.isAuthRouteSubject$.next(true);
      }
    });
  }

  //helper method
  private getAuthRoutes(authRoutes: Partial<AuthPageRoutes>): string[] {
    return Object.keys(authRoutes)
      .filter((key: string) => key !== 'authenticatedUrl')
      .map((key: string) => (authRoutes[key as keyof AuthPageRoutes]) as string);
  }

  // Open admin portal
  showAdminPortal(): void {
    if (this.fronteggAppLoaded) {
      this.fronteggApp?.mountAdminPortal();
    }
  }

  // Open admin portal
  hideAdminPortal(): void {
    if (this.fronteggAppLoaded) {
      this.fronteggApp?.unmountAdminPortal();
    }
  }
}


