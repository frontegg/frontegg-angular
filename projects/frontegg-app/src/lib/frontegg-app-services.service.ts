import { Inject, Injectable } from '@angular/core';
import { Router, RouterEvent } from '@angular/router';
import { initialize } from "@frontegg/admin-portal";
import { BehaviorSubject } from 'rxjs';
import { FE_PROVIDER_CONFIG } from './constants';
import { FronteggConfigOptions } from './frontegg-app.module';
import { createFronteggStore } from '@frontegg/redux-store';
import { take, filter } from 'rxjs/operators';
import * as equal from 'fast-deep-equal';

type FronteggApp = ReturnType<typeof initialize>;
@Injectable({
  providedIn: 'root'
})
export class FronteggAppService {
  fronteggApp: FronteggApp;
  fronteggAppLoaded: boolean;
  //TODO: types
  private fronteggAppStateSubject$ = new BehaviorSubject<any>(null);
  private fronteggAppAuthStateSubject$ = new BehaviorSubject<any>(null);
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
  showAdminPortal(): void {
    if (!!this.fronteggAppLoaded) {
      this.fronteggApp?.mountAdminPortal()
    }
  }
}

@Injectable({
  providedIn: 'root'
})
export class FronteggAppAuthService {
  //TODO: types
  private acceptInvitationStateSubject$ = new BehaviorSubject<any>(null);
  private accountSettingsStateSubject$ = new BehaviorSubject<any>(null);
  private activateStateSubject$ = new BehaviorSubject<any>(null);
  private apiTokensStateSubject$ = new BehaviorSubject<any>(null);
  private forgotPasswordStateSubject$ = new BehaviorSubject<any>(null);
  private loginStateSubject$ = new BehaviorSubject<any>(null);
  private mfaStateSubject$ = new BehaviorSubject<any>(null);
  private profileStateSubject$ = new BehaviorSubject<any>(null);
  private rolesStateSubject$ = new BehaviorSubject<any>(null);
  private routesSubject$ = new BehaviorSubject<any>(null);
  private securityPolicyStateSubject$ = new BehaviorSubject<any>(null);
  private signUpStateSubject$ = new BehaviorSubject<any>(null);
  private socialLoginStateSubject$ = new BehaviorSubject<any>(null);
  private ssoStateSubject$ = new BehaviorSubject<any>(null);
  private teamStateSubject$ = new BehaviorSubject<any>(null);
  private tenantsStateSubject$ = new BehaviorSubject<any>(null);
  private userSubject$ = new BehaviorSubject<any>(null);

  readonly acceptInvitationState$ = this.acceptInvitationStateSubject$.asObservable()
  readonly accountSettingsState$ = this.accountSettingsStateSubject$.asObservable()
  readonly activateState$ = this.activateStateSubject$.asObservable()
  readonly apiTokensState$ = this.apiTokensStateSubject$.asObservable()
  readonly forgotPasswordState$ = this.forgotPasswordStateSubject$.asObservable()
  readonly loginState$ = this.loginStateSubject$.asObservable()
  readonly mfaState$ = this.mfaStateSubject$.asObservable()
  readonly profileState$ = this.profileStateSubject$.asObservable()
  readonly rolesState$ = this.rolesStateSubject$.asObservable()
  readonly routesState$ = this.routesSubject$.asObservable()
  readonly securityPolicyState$ = this.securityPolicyStateSubject$.asObservable()
  readonly signUpState$ = this.signUpStateSubject$.asObservable()
  readonly socialLoginState$ = this.socialLoginStateSubject$.asObservable()
  readonly ssoState$ = this.ssoStateSubject$.asObservable()
  readonly teamState$ = this.teamStateSubject$.asObservable()
  readonly tenantsState$ = this.tenantsStateSubject$.asObservable()
  readonly userState$ = this.userSubject$.asObservable()

  constructor(private fronteggAppService: FronteggAppService) {
    const authSubStates = [
      { field: 'acceptInvitationState', subject: this.acceptInvitationStateSubject$ },
      { field: 'accountSettingsState', subject: this.accountSettingsStateSubject$ },
      { field: 'activateState', subject: this.activateStateSubject$ },
      { field: 'apiTokensState', subject: this.apiTokensStateSubject$ },
      { field: 'forgotPasswordState', subject: this.forgotPasswordStateSubject$ },
      { field: 'loginState', subject: this.loginStateSubject$ },
      { field: 'mfaState', subject: this.mfaStateSubject$ },
      { field: 'profileState', subject: this.profileStateSubject$ },
      { field: 'rolesState', subject: this.rolesStateSubject$ },
      { field: 'routes', subject: this.routesSubject$ },
      { field: 'securityPolicyState', subject: this.securityPolicyStateSubject$ },
      { field: 'signUpState', subject: this.signUpStateSubject$ },
      { field: 'socialLoginState', subject: this.socialLoginStateSubject$ },
      { field: 'ssoState', subject: this.ssoStateSubject$ },
      { field: 'teamState', subject: this.teamStateSubject$ },
      { field: 'user', subject: this.userSubject$ },
    ]

    // Memoized Auth State
    this.fronteggAppService.fronteggAppAuthState$.pipe(filter((state) => !!state)).subscribe((authState) => {
      for (const authSubState of authSubStates) {
        if (!equal(authSubState.subject.getValue(), authState[authSubState.field])) {
          authSubState.subject.next(authState[authSubState.field])
        }
      }
    })
  }
}
