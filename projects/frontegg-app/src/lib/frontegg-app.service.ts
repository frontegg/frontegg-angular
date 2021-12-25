import { Inject, Injectable } from '@angular/core';
import { NavigationStart, Route, Router, RoutesRecognized } from '@angular/router';
import { AuthPageRoutes, FronteggState, initialize } from '@frontegg/admin-portal';
import { FronteggAppInstance, FronteggAppOptions } from '@frontegg/types';
import { BehaviorSubject, Observable } from 'rxjs';
import { FronteggLoadGuard } from './guards/frontegg-load.guard';
import { ContextHolder, RedirectOptions } from '@frontegg/rest-api';
import { FronteggComponent } from './frontegg.component';

type FronteggApp = FronteggAppInstance & {
  showAdminPortal(): void;
  hideAdminPortal(): void;
};

export class FronteggAppOptionsClass implements FronteggAppOptions {
  contextOptions: FronteggAppOptions['contextOptions'] = {
    baseUrl: 'https://david.frontegg.com',
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
  private authStateSubject = new BehaviorSubject<FronteggState['auth']>({} as FronteggState['auth']);
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

  constructor(@Inject(FronteggAppOptionsClass) private config: FronteggAppOptions, private router: Router) {
    if (!this.config) {
      throw Error('Need to pass config: FronteggConfigOptions in FronteggAppModule.forRoot(config)');
    }

    const onRedirectTo = (to: string, opts?: RedirectOptions) => {
      const baseName = window.location.origin;
      let path = to;
      if (path.startsWith(baseName) && baseName !== '/') {
        path = path.substring(baseName.length - 1);
      }

      if (opts?.refresh) {
        window.location.href = path;
      } else {
        if (opts?.replace) {
          this.router.navigate([path], { replaceUrl: true });
        } else {
          this.router.navigate([path]);
        }
      }
    };
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

    this.router.events.subscribe((event) => {
      if(event instanceof NavigationStart) {
        const authRoutes = this.mapAuthComponents.map(({path}) => path?.startsWith('/')? path : `/${path}`);
        const curr = authRoutes.find((path) => event.url.split('?')[0] !== path && event.url.startsWith(path));
        if(curr){
          this.router.navigateByUrl(`${curr}${decodeURIComponent(event.url.split(curr)[1])}`);
        }
      }
    });

    // Subscribe on fronteggApp store to change state subjects
    this.fronteggApp.store.subscribe(() => {
      const fronteggStore = this.fronteggApp.store.getState() as FronteggState;
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
    });
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
}
