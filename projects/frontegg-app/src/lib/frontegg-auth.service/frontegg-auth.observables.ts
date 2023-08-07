import {
  AuthState
} from '@frontegg/redux-store';
import { BehaviorSubject, Observable } from 'rxjs';

export class FronteggAuthObservables {
  authStateSubject = new BehaviorSubject<AuthState>({ isAuthenticated: false, isLoading: true } as AuthState);
  acceptInvitationStateSubject = new BehaviorSubject<AuthState['acceptInvitationState']>({} as AuthState['acceptInvitationState']);
  accountSettingsStateSubject = new BehaviorSubject<AuthState['accountSettingsState']>({} as AuthState['accountSettingsState']);
  activateStateSubject = new BehaviorSubject<AuthState['activateState']>({} as AuthState['activateState']);
  apiTokensStateSubject = new BehaviorSubject<AuthState['apiTokensState']>({} as AuthState['apiTokensState']);
  forgotPasswordStateSubject = new BehaviorSubject<AuthState['forgotPasswordState']>({} as AuthState['forgotPasswordState']);
  loginStateSubject = new BehaviorSubject<AuthState['loginState']>({} as AuthState['loginState']);
  mfaStateSubject = new BehaviorSubject<AuthState['mfaState']>({} as AuthState['mfaState']);
  profileStateSubject = new BehaviorSubject<AuthState['profileState']>({} as AuthState['profileState']);
  rolesStateSubject = new BehaviorSubject<AuthState['rolesState']>({} as AuthState['rolesState']);
  routesSubject = new BehaviorSubject<AuthState['routes']>({} as AuthState['routes']);
  securityPolicyStateSubject = new BehaviorSubject<AuthState['securityPolicyState']>({} as AuthState['securityPolicyState']);
  signUpStateSubject = new BehaviorSubject<AuthState['signUpState']>({} as AuthState['signUpState']);
  socialLoginStateSubject = new BehaviorSubject<AuthState['socialLoginState']>({} as AuthState['socialLoginState']);
  ssoStateSubject = new BehaviorSubject<AuthState['ssoState']>({} as AuthState['ssoState']);
  teamStateSubject = new BehaviorSubject<AuthState['teamState']>({} as AuthState['teamState']);
  tenantsStateSubject = new BehaviorSubject<AuthState['tenantsState']>({} as AuthState['tenantsState']);
  userSubject = new BehaviorSubject<AuthState['user']>({} as AuthState['user']);
  isAuthenticatedSubject = new BehaviorSubject<AuthState['isAuthenticated']>(false);
  isLoadingSubject = new BehaviorSubject<AuthState['isLoading']>(true);
  isSSOAuthSubject = new BehaviorSubject<AuthState['isSSOAuth']>(false);
  ssoACSSubject = new BehaviorSubject<AuthState['ssoACS']>('');

  get authState$(): Observable<AuthState> {
    return this.authStateSubject.asObservable();
  }

  get acceptInvitationState$(): Observable<AuthState['acceptInvitationState']> {
    return this.acceptInvitationStateSubject.asObservable();
  }

  get accountSettingsState$(): Observable<AuthState['accountSettingsState']> {
    return this.accountSettingsStateSubject.asObservable();
  }

  get activateState$(): Observable<AuthState['activateState']> {
    return this.activateStateSubject.asObservable();
  }

  get apiTokensState$(): Observable<AuthState['apiTokensState']> {
    return this.apiTokensStateSubject.asObservable();
  }

  get forgotPasswordState$(): Observable<AuthState['forgotPasswordState']> {
    return this.forgotPasswordStateSubject.asObservable();
  }

  get loginState$(): Observable<AuthState['loginState']> {
    return this.loginStateSubject.asObservable();
  }

  get mfaState$(): Observable<AuthState['mfaState']> {
    return this.mfaStateSubject.asObservable();
  }

  get profileState$(): Observable<AuthState['profileState']> {
    return this.profileStateSubject.asObservable();
  }

  get rolesState$(): Observable<AuthState['rolesState']> {
    return this.rolesStateSubject.asObservable();
  }

  get routesState$(): Observable<AuthState['routes']> {
    return this.routesSubject.asObservable();
  }

  get securityPolicyState$(): Observable<AuthState['securityPolicyState']> {
    return this.securityPolicyStateSubject.asObservable();
  }

  get signUpState$(): Observable<AuthState['signUpState']> {
    return this.signUpStateSubject.asObservable();
  }

  get socialLoginState$(): Observable<AuthState['socialLoginState']> {
    return this.socialLoginStateSubject.asObservable();
  }

  get ssoState$(): Observable<AuthState['ssoState']> {
    return this.ssoStateSubject.asObservable();
  }

  get teamState$(): Observable<AuthState['teamState']> {
    return this.teamStateSubject.asObservable();
  }

  get tenantsState$(): Observable<AuthState['tenantsState']> {
    return this.tenantsStateSubject.asObservable();
  }

  get user$(): Observable<AuthState['user']> {
    return this.userSubject.asObservable();
  }

  get isAuthenticated$(): Observable<AuthState['isAuthenticated']> {
    return this.isAuthenticatedSubject.asObservable();
  }

  get isLoading$(): Observable<AuthState['isLoading']> {
    return this.isLoadingSubject.asObservable();
  }

  get isSSOAuth$(): Observable<AuthState['isSSOAuth']> {
    return this.isSSOAuthSubject.asObservable();
  }

  get ssoACS$(): Observable<AuthState['ssoACS']> {
    return this.ssoACSSubject.asObservable();
  }

}
