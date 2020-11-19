import { Injectable, OnDestroy } from '@angular/core';
import { FronteggService, CoreService } from '@frontegg/ng-core';
import { AuthActions, AuthState } from '@frontegg/react-auth';
import { BehaviorSubject, fromEvent, Subscription } from 'rxjs';
import { FronteggStoreEvent } from '@frontegg/ng-core';
import { concatMap, distinctUntilChanged, filter } from 'rxjs/operators';
import { User } from '@frontegg/react-auth/Api/interfaces';

const storeName = 'auth';

@Injectable({
  providedIn: 'root',
})
export class AuthService extends FronteggService implements OnDestroy {
  public pluginLoaded = false;
  private isLoadingSubject$ = new BehaviorSubject<boolean>(true);
  private isAuthenticatedSubject$ = new BehaviorSubject<boolean>(null);
  private userSubject$ = new BehaviorSubject<User | null>(null);
  private authStateSubject$ = new BehaviorSubject<AuthState>(null);
  private storeListener$: Subscription;

  readonly isLoading$ = this.isLoadingSubject$.asObservable();
  readonly isAuthenticated$ = this.isLoading$.pipe(
    filter((loading) => !loading),
    distinctUntilChanged(),
    concatMap(() => this.isAuthenticatedSubject$),
  );
  readonly user$ = this.isLoading$.pipe(
    filter((loading) => !loading),
    distinctUntilChanged(),
    concatMap(() => this.userSubject$),
  );

  readonly authState$ = this.authStateSubject$.asObservable();

  actions: AuthActions;

  constructor(private coreService: CoreService) {
    super();
    // TODO: 1. listener to auth store changes event
    this.storeListener$ = fromEvent(document, `${FronteggStoreEvent}/${storeName}`)
      .subscribe((() => {
        const authState = this.coreService.state[storeName] as AuthState;
        this.authStateSubject$.next(authState);
        if (this.isLoadingSubject$.getValue() !== authState.isLoading) {
          this.isLoadingSubject$.next(authState.isLoading);
        }
        if (this.isAuthenticatedSubject$.getValue() !== authState.isAuthenticated) {
          this.isAuthenticatedSubject$.next(authState.isAuthenticated);
        }
        this.userSubject$.next(authState.user);
        if (!this.pluginLoaded) {
          this.pluginLoaded = !authState.isLoading;
          this.coreService.checkLoadedServices();
        }
      }));

    // TODO: 2. register services in coreService
    coreService.registerService(storeName, this);
  }

  ngOnDestroy(): void {
    this.storeListener$.unsubscribe();
  }

  public setActions(key: string, actions: AuthActions): void {
    if (key === storeName && actions != null) {
      this.actions = actions;
    }
  }
}
