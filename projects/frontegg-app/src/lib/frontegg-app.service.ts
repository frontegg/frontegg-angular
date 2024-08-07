import { Injectable, NgZone, Inject } from '@angular/core';
import { Route, Router, ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot } from '@angular/router';
import { FronteggApp, initialize } from '@frontegg/js';
import { AuthPageRoutes, FronteggState, isAuthRoute } from '@frontegg/redux-store';
import { FronteggAppOptions, FronteggCheckoutDialogOptions, ShowAdminPortalOptions } from '@frontegg/types';
import { BehaviorSubject, Observable } from 'rxjs';
import { ContextHolder, RedirectOptions, FronteggFrameworks, MetadataHeaders } from '@frontegg/rest-api';
import { FronteggComponent } from './frontegg.component';
import sdkVersion from '../sdkVersion';
import angularCoreVersion from '@angular/core/package.json';

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

  get authState$(): Observable<FronteggState['auth']> {
    return this.authStateSubject.asObservable();
  }

  get auditsState$(): Observable<FronteggState['audits']> {
    return this.auditsStateSubject.asObservable();
  }

  get connectivityState$(): Observable<FronteggState['connectivity']> {
    return this.connectivityStateSubject.asObservable();
  }

  get subscriptionsState$(): Observable<FronteggState['subscriptions']> {
    return this.subscriptionsStateSubject.asObservable();
  }

  get vendorState$(): Observable<FronteggState['vendor']> {
    return this.vendorStateSubject.asObservable();
  }

  get isLoading$(): Observable<boolean> {
    return this.isLoadingSubject.asObservable();
  };

  get isAuthenticated$(): Observable<boolean> {
    return this.isAuthenticatedSubject.asObservable();
  };

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


    const metadataHeaders: MetadataHeaders = {
      fronteggSdkVersion: `@frontegg/angular@${sdkVersion.version}`,
      // TODO: remove this any type after updating rest-api context options type to accept string.
      // @ts-ignore
      framework: `${FronteggFrameworks.Angular}@${angularCoreVersion.version}`,
    };

    const appName = this.config.appName ?? 'default'
    // prepare config default values
    this.config = {
      ...this.config,
      appName,
      contextOptions: {
        ...this.config.contextOptions,
        metadataHeaders,
      },
      authOptions: {
        ...this.config.authOptions,
        hostedLoginOptions: {
          loadUserOnFirstLoad: true, // set default to load user on first load
          ...this.config.authOptions?.hostedLoginOptions,
        },
        onRedirectTo,
      },
    };

    ContextHolder.for(appName).setOnRedirectTo(onRedirectTo);
    this.fronteggApp = initialize({
      onRedirectTo,
      ...this.config,
    });


    // Add all login box routes to Angular router config
    this.router.resetConfig([
      ...this.mapAuthComponents,
      {
        path: '',
        canActivate: [ FronteggLoadGuard ],
        children: [ ...this.router.config ],
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
  public showAdminPortal(options?: ShowAdminPortalOptions): void {
    this.fronteggApp.showAdminPortal(options);
  }

  /**
   *  Open admin portal hosted mode
   * @param newTab - open in new tab
   * */

  public openHostedAdminPortal(newTab?: boolean): void {
    this.fronteggApp.openHostedAdminPortal(newTab);
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

@Injectable()
export class FronteggLoadGuard implements CanActivate {
  constructor(protected fronteggAppService: FronteggAppService) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return new Observable<boolean>(obs => {
      this.fronteggAppService.isLoading$.subscribe(loading => {
        if (!loading) {
          obs.next(true);
        }
      });
    });
  }
}
