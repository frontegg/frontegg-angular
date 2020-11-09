import { Observable } from 'rxjs';
import { shallowEqual } from '@frontegg/react-core';
import { AuthState, AuthStateMapper } from '@frontegg/react-auth';


export const AuthUserObservable = () => AuthObservable(state => state.user, (state) => state.isLoading);
export const isAuthenticatedObservable = () => AuthObservable((state: AuthState) => ({ isAuthenticated: state.isAuthenticated }), (state) => state.isLoading);

export const AuthObservable = <T extends object>(selector: AuthStateMapper<T>, waitFor?: (state: AuthState) => boolean) => new Observable<T>((obs) => {
  let lastValue;
  const preloadState = (window as any).fronteggStore;
  const eventListener = (e: any) => {
    const store = (window as any).fronteggStore;
    if (waitFor && waitFor(store.auth)) {
      return;
    }
    const value = selector(store.auth);
    if (!shallowEqual(lastValue, value)) {
      lastValue = value;
      obs.next(value);
    }
  };
  document.addEventListener('FronteggStoreEvent/auth', eventListener);
  if (waitFor && waitFor(preloadState.auth)) {
    return () => document.removeEventListener('FronteggStoreEvent/auth', eventListener);
  }
  obs.next(selector(preloadState.auth));
  return () => document.removeEventListener('FronteggStoreEvent/auth', eventListener);
});
