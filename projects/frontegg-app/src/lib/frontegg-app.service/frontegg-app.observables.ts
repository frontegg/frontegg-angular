import { FronteggState } from '@frontegg/redux-store';
import { BehaviorSubject, Observable } from 'rxjs';

export class FronteggAppObservables {
  isLoadingSubject = new BehaviorSubject<boolean>(true);
  isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  stateSubject = new BehaviorSubject<FronteggState>({} as FronteggState);
  authStateSubject = new BehaviorSubject<FronteggState['auth']>({
    isLoading: true,
    isAuthenticated: false,
  } as FronteggState['auth']);
  auditsStateSubject = new BehaviorSubject<FronteggState['audits']>({} as FronteggState['audits']);
  connectivityStateSubject = new BehaviorSubject<FronteggState['connectivity']>({} as FronteggState['connectivity']);
  subscriptionsStateSubject = new BehaviorSubject<FronteggState['subscriptions']>({} as FronteggState['subscriptions']);
  vendorStateSubject = new BehaviorSubject<FronteggState['vendor']>({} as FronteggState['vendor']);


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

}
