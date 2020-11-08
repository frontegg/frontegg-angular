import { Observable } from 'rxjs';
import { shallowEqual } from '@frontegg/react-core';
import { AuthState, AuthStateMapper } from '@frontegg/react-auth';


export const AuthUserObservable = () => AuthObservable(state => state.user);
export const isAuthenticatedObservable = () => AuthObservable(state => state.isAuthenticated, (state) => state.isLoading);


export const AuthObservable = <T extends object>(selector: AuthStateMapper<T>, waitFor?: (state: AuthState) => boolean) => new Observable<T>((obs) => {
  let lastValue;
  const eventListener = (e: any) => {
    if (waitFor && waitFor(e.detail.auth)) {
      return;
    }
    const value = selector(e.detail.auth);
    if (!shallowEqual(lastValue, value)) {
      lastValue = value;
      obs.next(value);
    }
  };
  document.addEventListener('FronteggStoreEvent', eventListener);
  return () => document.removeEventListener('FronteggStoreEvent', eventListener);
});
