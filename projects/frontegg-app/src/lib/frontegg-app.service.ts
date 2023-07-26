import { Inject, Injectable, NgZone, Signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Route, Router } from '@angular/router';
import { FronteggApp, initialize } from '@frontegg/js';
import { AuthPageRoutes, FronteggState, isAuthRoute } from '@frontegg/redux-store';
import { FronteggAppOptions, FronteggCheckoutDialogOptions } from '@frontegg/types';
import { BehaviorSubject, Observable } from 'rxjs';
import { FronteggLoadGuard } from './guards/frontegg-load.guard';
import { ContextHolder, RedirectOptions, FronteggFrameworks } from '@frontegg/rest-api';
import { FronteggComponent } from './frontegg.component';
import sdkVersion from '../sdkVersion';

export class FronteggAppOptionsClass implements FronteggAppOptions {
  contextOptions: FronteggAppOptions['contextOptions'] = {
    baseUrl: 'https://sub-domain.frontegg.com',
  };
}

@Injectable({
  providedIn: 'root',
})
export class FronteggAppService {
  fronteggApp: FronteggApp;

  private isLoadingSubject = new BehaviorSubject<boolean>(true);
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  private stateSubject = new BehaviorSubject<FronteggState>({} as FronteggState);
  private authStateSubject = new BehaviorSubject<FronteggState['auth']>({
    isLoading: true,
    isAuthenticated: false,
  } as FronteggState['auth']);
  private auditsStateSubject = new BehaviorSubject<FronteggState['audits']>({} as FronteggState['audits']);
  private connectivityStateSubject = new BehaviorSubject<FronteggState['connectivity']>({} as FronteggState['connectivity']);
  private subscriptionsStateSubject = new BehaviorSubject<FronteggState['subscriptions']>({} as FronteggState['subscriptions']);
  private vendorStateSubject = new BehaviorSubject<FronteggState['vendor']>({} as FronteggState['vendor']);


  get state$(): Observable<FronteggState> {
    return this.stateSubject.asObservable();
  }

  get stateSignal(): Signal<FronteggState | undefined> {
    return toSignal(this.state$);
  }

  get authState$(): Observable<FronteggState['auth']> {
    return this.authStateSubject.asObservable();
  }

  get authStateSignal(): Signal<FronteggState['auth'] | undefined> {
    return toSignal(this.authState$);
  }

  get auditsState$(): Observable<FronteggState['audits']> {
    return this.auditsStateSubject.asObservable();
  }

  get auditsStateSignal(): Signal<FronteggState['audits'] | undefined> {
    return toSignal(this.auditsState$);
  }

  get connectivityState$(): Observable<FronteggState['connectivity']> {
    return this.connectivityStateSubject.asObservable();
  }

  get connectivityStateSignal(): Signal<FronteggState['connectivity'] | undefined> {
    return toSignal(this.connectivityState$);
  }

  get subscriptionsState$(): Observable<FronteggState['subscriptions']> {
    return this.subscriptionsStateSubject.asObservable();
  }

  get subscriptionsStateSignal(): Signal<FronteggState['subscriptions'] | undefined> {
    return toSignal(this.subscriptionsState$);
  }

  get vendorState$(): Observable<FronteggState['vendor']> {
    return this.vendorStateSubject.asObservable();
  }

  get vendorStateSignal(): Signal<FronteggState['vendor'] | undefined> {
    return toSignal(this.vendorState$);
  }

  get isLoading$(): Observable<boolean> {
    return this.isLoadingSubject.asObservable();
  };

  get isLoadingSignal(): Signal<boolean | undefined> {
    return toSignal(this.isLoading$);
  }

  get isAuthenticated$(): Observable<boolean> {
    return this.isAuthenticatedSubject.asObservable();
  };

  get isAuthenticatedSignal(): Signal<boolean | undefined> {
    return toSignal(this.isAuthenticated$);
  }

  constructor(@Inject(FronteggAppOptionsClass) private config: FronteggAppOptions, public router: Router, private ngZone: NgZone) {
    if (!this.config) {
      throw Error('Need to pass config: FronteggConfigOptions in FronteggAppModule.forRoot(config)');
    }

    if ((window as any).CYPRESS_CONFIG) {
      this.config = (window as any).CYPRESS_CONFIG;
    }
    const onRedirectTo = (to: string, opts?: RedirectOptions) => {
      const baseName = window.location.origin;
      let path = to;
      if (path.startsWith(baseName) && baseName !== '/') {
        path = path.substring(baseName.length - 1);
      }
      if (opts?.preserveQueryParams || isAuthRoute(path, config.authOptions?.routes)) {
        path = `${path}${window.location.search}`;
      }

      if (opts?.refresh) {
        window.location.href = path;
      } else {
        this.ngZone.run(() => {
          if (opts?.replace) {
            this.router.navigateByUrl(path, { replaceUrl: true });
          } else {
            this.router.navigateByUrl(path);
          }
        });
      }
    };

    const { contextOptions } = this.config ?? {};
    contextOptions.metadataHeaders = {
      fronteggSdkVersion: `@frontegg/angular@${sdkVersion.version}`,
      framework: FronteggFrameworks.Angular,
    }
    ContextHolder.setOnRedirectTo(onRedirectTo);
    this.fronteggApp = initialize({
      onRedirectTo,
      ...this.config,
    });


    // Add all login box routes to Angular router config
    this.router.resetConfig([
      ...this.mapAuthComponents,
      {
        path: '',
        canActivate: [FronteggLoadGuard],
        children: [...this.router.config],
      },
    ]);
    const initialFronteggState = this.fronteggApp.store.getState() as FronteggState;
    this.updateState(initialFronteggState);
    // Subscribe on fronteggApp store to change state subjects
    this.fronteggApp.store.subscribe(() => {
      this.updateState(this.fronteggApp.store.getState() as FronteggState);
    });
  }

  private updateState(fronteggStore: FronteggState): void {
    if (this.isLoadingSubject.getValue() !== fronteggStore.auth.isLoading) {
      this.isLoadingSubject.next(fronteggStore.auth.isLoading);
    }
    if (this.isAuthenticatedSubject.getValue() !== fronteggStore.auth.isAuthenticated) {
      this.isAuthenticatedSubject.next(fronteggStore.auth.isAuthenticated);
    }

    this.stateSubject.next(fronteggStore);
    this.authStateSubject.next(fronteggStore.auth);
    this.auditsStateSubject.next(fronteggStore.audits);
    this.connectivityStateSubject.next(fronteggStore.connectivity);
    this.subscriptionsStateSubject.next(fronteggStore.subscriptions);
    this.vendorStateSubject.next(fronteggStore.vendor);
  }

  get mapAuthComponents(): Route[] {
    const authRoutes = this.authRoutes;
    return (Object.keys(authRoutes) as (keyof AuthPageRoutes)[])
      .filter((key: keyof AuthPageRoutes) => key !== 'authenticatedUrl' && key !== 'signUpSuccessUrl' && key != null)
      .map((key: keyof AuthPageRoutes) => ({
        path: authRoutes[key]?.substring(1),
        component: FronteggComponent,
      }));
  }

  get authRoutes(): AuthPageRoutes {
    return this.fronteggApp.store.getState().auth.routes;
  }

  // Open admin portal
  public showAdminPortal(): void {
    this.fronteggApp.showAdminPortal();
  }

  // Open admin portal
  public hideAdminPortal(): void {
    this.fronteggApp?.hideAdminPortal();
  }

  // Open checkout dialog
  public showCheckoutDialog(opts: FronteggCheckoutDialogOptions): void {
    this.fronteggApp.showCheckoutDialog(opts);
  }

  // Open checkout dialog
  public hideCheckoutDialog(): void {
    this.fronteggApp?.hideCheckoutDialog();
  }
}
