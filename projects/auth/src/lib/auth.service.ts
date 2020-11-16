import { Injectable } from '@angular/core';
import { FronteggService, CoreService } from '@frontegg/ng-core';
import { AuthActions, AuthState } from '@frontegg/react-auth';
import { fromEvent, Subject } from 'rxjs';

const storeName = 'auth';

@Injectable({
  providedIn: 'root',
})
export class AuthService extends FronteggService {
  loading = new Subject<boolean>();
  public loading$ = this.loading.asObservable();
  actions: AuthActions;
  state: AuthState;

  constructor(private coreService: CoreService) {
    super();
    coreService.registerService(storeName, this);
    fromEvent(document, '');

    // TODO: 1. listener to auth store changes event
    // TODO: 1.1. update service state from coreService.state.auth
  }

  public setActions(key: string, actions: AuthActions): void {
    if (key === storeName) {
      this.actions = actions;
    }
  }

  public setState(state: AuthState, action: any): void {
    this.state = state;
  };
}
