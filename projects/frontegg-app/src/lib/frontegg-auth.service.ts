import { Injectable } from '@angular/core';
import { BehaviorSubject, PartialObserver, Subscription } from 'rxjs';
import { FronteggAppService } from './frontegg-app.service';
import FastDeepEqual from 'fast-deep-equal';
import {
  RolesState,
  TenantsState,
  AccountSettingsState,
  SaveSecurityPolicyPasswordHistoryPayload,
  SaveSecurityPolicyLockoutPayload,
  SaveSecurityPolicyMfaPayload,
  PasswordPolicyState,
  PasswordHistoryPolicyState,
  MfaPolicyState,
  CaptchaPolicyState,
  LockoutPolicyState,
  PublicPolicyState,
  GlobalPolicyState,
  SecurityPolicyState,
  AddUserApiTokenPayload,
  AddTenantApiTokenPayload,
  ApiTokenType,
  ApiTokensState,
  ApiStateIndicator,
  ISetDeleteUserDialog,
  ISetAddUserDialog,
  LoadRolesAndPermissionsPayload,
  TeamState,
  TeamStateIndicator,
  MFAState,
  SaveSSOConfigurationPayload,
  SSOState,
  ProfileState,
  SaveSSOConfigurationFilePayload,
  UpdateSSOAuthorizationRolesPayload,
  DeleteSamlGroupPayload,
  CreateSamlGroupPayload,
  SaveProfilePayload,
  SignUpState,
  ForgotPasswordState,
  AcceptInvitationState,
  AuthState,
  User,
  LoginState,
  ActivateAccountStrategyState,
  IsSteppedUpOptions,
  StepUpOptions,
} from '@frontegg/redux-store';
import {
  ILogin,
  ILoginWithMfa,
  IPostLogin,
  IPreLogin,
  IRecoverMFAToken,
  IActivateAccount,
  ILoginViaSocialLogin,
  ISetSocialLoginError,
  IResendActivationEmail,
  IGetActivateAccountStrategy,
  IGetActivateAccountStrategyResponse,
  IAcceptInvitation,
  IForgotPassword,
  IResetPassword,
  IGetUserPasswordConfig,
  ISignUpUser,
  IChangePassword,
  IOidcPostLogin,
  IVerifyMfa,
  IDisableMfa,
  ILoadUsers,
  ITeamUser,
  IAddUser,
  IUpdateUser,
  IDeleteUser,
  IResendActivationLink,
  ISettingsResponse,
  ISwitchTenant,
  ITenantsResponse,
  IAddRole,
  IRole,
  IUpdateRole,
  IDeleteRole,
  IAttachPermissionsToRole,
  IResendInvitationLink,
  IRolePermission,
  RedirectOptions,
} from '@frontegg/rest-api';
import type { FronteggState, ActivateAccountState, SocialLoginState } from '@frontegg/redux-store';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { LoginDirectAction } from '@frontegg/redux-store/auth/LoginState/interfaces';
import { FronteggUserSubscriptionService } from './frontegg-user-subscription.service';

interface AuthSubStates {
  field: Partial<keyof AuthState>;
  subject: BehaviorSubject<any>;
}

export type WithCallback<T = {}, R = boolean> = T & {
  callback?: (data: R | null, error?: string) => void;
};

export type WithSilentLoad<T> = T & {
  silentLoading?: boolean;
};

type Path = (string | symbol)[];
type Op =
  [ op: 'set', path: Path, value: unknown, prevValue: unknown ]
  | [ op: 'delete', path: Path, prevValue: unknown ]
  | [ op: 'resolve', path: Path, value: unknown ]
  | [ op: 'reject', path: Path, error: unknown ];


type SubjectState<T> = {
  [K in keyof T as `${Extract<K, string>}Subject`]: T[K]
}
type AuthStateObservable = {
  [K in keyof AuthState]: BehaviorSubject<AuthState[K]>
}


@Injectable({
  providedIn: 'root',
})
export class FronteggAuthService implements SubjectState<Partial<AuthStateObservable>> {

  authStateSubject = new BehaviorSubject<AuthState>({ isAuthenticated: false, isLoading: true } as AuthState);
  acceptInvitationStateSubject = new BehaviorSubject<AuthState['acceptInvitationState']>({} as AuthState['acceptInvitationState']);
  accountSettingsStateSubject = new BehaviorSubject<AuthState['accountSettingsState']>({} as AuthState['accountSettingsState']);
  activateAccountStateSubject = new BehaviorSubject<AuthState['activateAccountState']>({} as AuthState['activateAccountState']);
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
  customLoginStateSubject = new BehaviorSubject<AuthState['customLoginState']>({} as AuthState['customLoginState']);
  groupsStateSubject = new BehaviorSubject<AuthState['groupsState']>({} as AuthState['groupsState']);
  groupsDialogsStateSubject = new BehaviorSubject<AuthState['groupsDialogsState']>({} as AuthState['groupsDialogsState']);
  impersonateStateSubject = new BehaviorSubject<AuthState['impersonateState']>({} as AuthState['impersonateState']);
  allAccountsStateSubject = new BehaviorSubject<AuthState['allAccountsState']>({} as AuthState['allAccountsState']);
  allAccountsDialogsStateSubject = new BehaviorSubject<AuthState['allAccountsDialogsState']>({} as AuthState['allAccountsDialogsState']);
  passkeysStateSubject = new BehaviorSubject<AuthState['passkeysState']>({} as AuthState['passkeysState']);
  provisioningStateSubject = new BehaviorSubject<AuthState['provisioningState']>({} as AuthState['provisioningState']);
  resetPhoneNumberStateSubject = new BehaviorSubject<AuthState['resetPhoneNumberState']>({} as AuthState['resetPhoneNumberState']);
  restrictionsStateSubject = new BehaviorSubject<AuthState['restrictionsState']>({} as AuthState['restrictionsState']);
  securityCenterStateSubject = new BehaviorSubject<AuthState['securityCenterState']>({} as AuthState['securityCenterState']);
  sessionsPolicyStateSubject = new BehaviorSubject<AuthState['sessionsPolicyState']>({} as AuthState['sessionsPolicyState']);
  sessionsStateSubject = new BehaviorSubject<AuthState['sessionsState']>({} as AuthState['sessionsState']);
  smsStateSubject = new BehaviorSubject<AuthState['smsState']>({} as AuthState['smsState']);
  stepUpStateSubject = new BehaviorSubject<AuthState['stepUpState']>({} as AuthState['stepUpState']);
  applicationsStateSubject = new BehaviorSubject<AuthState['applicationsState']>({} as AuthState['applicationsState']);
  userIpSubject = new BehaviorSubject<AuthState['userIp']>(undefined);
  keepSessionAliveSubject = new BehaviorSubject<AuthState['keepSessionAlive']>(undefined);
  socialLoginOptionsSubject = new BehaviorSubject<AuthState['socialLoginOptions']>(undefined);
  includeQueryParamSubject = new BehaviorSubject<AuthState['includeQueryParam']>(undefined);
  hostedLoginBoxSubject = new BehaviorSubject<AuthState['hostedLoginBox']>(undefined);
  disableSilentRefreshSubject = new BehaviorSubject<AuthState['disableSilentRefresh']>(undefined);
  enforceRedirectToSameSiteSubject = new BehaviorSubject<AuthState['enforceRedirectToSameSite']>(undefined);
  allowedRedirectOriginsSubject = new BehaviorSubject<AuthState['allowedRedirectOrigins']>(undefined);


  getAuthState(): AuthState {
    return this.fronteggAppService.fronteggApp.store.getState().auth;
  }

  get authState$(): Observable<AuthState> {
    return this.authStateSubject.asObservable();
  }

  get acceptInvitationState$(): Observable<AuthState['acceptInvitationState']> {
    return this.acceptInvitationStateSubject.asObservable();
  }

  get accountSettingsState$(): Observable<AuthState['accountSettingsState']> {
    return this.accountSettingsStateSubject.asObservable();
  }

  get activateState$(): Observable<AuthState['activateAccountState']> {
    return this.activateAccountStateSubject.asObservable();
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

  get user(): AuthState['user'] {
    return this.fronteggAppService.fronteggApp.store.getState().auth.user;
  }


  get isAuthenticated$(): Observable<AuthState['isAuthenticated']> {
    return this.isAuthenticatedSubject.asObservable();
  }

  get isAuthenticated(): AuthState['isAuthenticated'] {
    return this.fronteggAppService.fronteggApp.store.getState().auth.isAuthenticated;
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

  get customLoginStateSubject$(): Observable<AuthState['customLoginState']> {
    return this.customLoginStateSubject.asObservable();
  }

  get groupsStateSubject$(): Observable<AuthState['groupsState']> {
    return this.groupsStateSubject.asObservable();
  }

  get groupsDialogsStateSubject$(): Observable<AuthState['groupsDialogsState']> {
    return this.groupsDialogsStateSubject.asObservable();
  }

  get impersonateStateSubject$(): Observable<AuthState['impersonateState']> {
    return this.impersonateStateSubject.asObservable();
  }

  get allAccountsStateSubject$(): Observable<AuthState['allAccountsState']> {
    return this.allAccountsStateSubject.asObservable();
  }

  get allAccountsDialogsStateSubject$(): Observable<AuthState['allAccountsDialogsState']> {
    return this.allAccountsDialogsStateSubject.asObservable();
  }

  get passkeysStateSubject$(): Observable<AuthState['passkeysState']> {
    return this.passkeysStateSubject.asObservable();
  }

  get provisioningStateSubject$(): Observable<AuthState['provisioningState']> {
    return this.provisioningStateSubject.asObservable();
  }

  get resetPhoneNumberStateSubject$(): Observable<AuthState['resetPhoneNumberState']> {
    return this.resetPhoneNumberStateSubject.asObservable();
  }

  get restrictionsStateSubject$(): Observable<AuthState['restrictionsState']> {
    return this.restrictionsStateSubject.asObservable();
  }

  get securityCenterStateSubject$(): Observable<AuthState['securityCenterState']> {
    return this.securityCenterStateSubject.asObservable();
  }

  get sessionsPolicyStateSubject$(): Observable<AuthState['sessionsPolicyState']> {
    return this.sessionsPolicyStateSubject.asObservable();
  }

  get sessionsStateSubject$(): Observable<AuthState['sessionsState']> {
    return this.sessionsStateSubject.asObservable();
  }

  get smsStateSubject$(): Observable<AuthState['smsState']> {
    return this.smsStateSubject.asObservable();
  }

  get stepUpStateSubject$(): Observable<AuthState['stepUpState']> {
    return this.stepUpStateSubject.asObservable();
  }

  get applicationsStateSubject$(): Observable<AuthState['applicationsState']> {
    return this.applicationsStateSubject.asObservable();
  }

  get userIpSubject$(): Observable<AuthState['userIp']> {
    return this.userIpSubject.asObservable();
  }

  get keepSessionAliveSubject$(): Observable<AuthState['keepSessionAlive']> {
    return this.keepSessionAliveSubject.asObservable();
  }

  get socialLoginOptionsSubject$(): Observable<AuthState['socialLoginOptions']> {
    return this.socialLoginOptionsSubject.asObservable();
  }

  get includeQueryParamSubject$(): Observable<AuthState['includeQueryParam']> {
    return this.includeQueryParamSubject.asObservable();
  }

  get hostedLoginBoxSubject$(): Observable<AuthState['hostedLoginBox']> {
    return this.hostedLoginBoxSubject.asObservable();
  }

  get disableSilentRefreshSubject$(): Observable<AuthState['disableSilentRefresh']> {
    return this.disableSilentRefreshSubject.asObservable();
  }

  get enforceRedirectToSameSiteSubject$(): Observable<AuthState['enforceRedirectToSameSite']> {
    return this.enforceRedirectToSameSiteSubject.asObservable();
  }

  get allowedRedirectOriginsSubject$(): Observable<AuthState['allowedRedirectOrigins']> {
    return this.allowedRedirectOriginsSubject.asObservable();
  }

  constructor(
    private fronteggAppService: FronteggAppService,
    private router: Router,
    private fronteggUserSubscriptionService: FronteggUserSubscriptionService,
  ) {
    const authSubStates: AuthSubStates[] = [
      { field: 'acceptInvitationState', subject: this.acceptInvitationStateSubject },
      { field: 'accountSettingsState', subject: this.accountSettingsStateSubject },
      { field: 'activateAccountState', subject: this.activateAccountStateSubject },
      { field: 'apiTokensState', subject: this.apiTokensStateSubject },
      { field: 'forgotPasswordState', subject: this.forgotPasswordStateSubject },
      { field: 'tenantsState', subject: this.tenantsStateSubject },
      { field: 'loginState', subject: this.loginStateSubject },
      { field: 'mfaState', subject: this.mfaStateSubject },
      { field: 'profileState', subject: this.profileStateSubject },
      { field: 'rolesState', subject: this.rolesStateSubject },
      { field: 'routes', subject: this.routesSubject },
      { field: 'securityPolicyState', subject: this.securityPolicyStateSubject },
      { field: 'signUpState', subject: this.signUpStateSubject },
      { field: 'socialLoginState', subject: this.socialLoginStateSubject },
      { field: 'ssoState', subject: this.ssoStateSubject },
      { field: 'teamState', subject: this.teamStateSubject },
      { field: 'user', subject: this.userSubject },
      { field: 'isSSOAuth', subject: this.isSSOAuthSubject },
      { field: 'ssoACS', subject: this.ssoACSSubject },
      { field: 'customLoginState', subject: this.customLoginStateSubject },
      { field: 'groupsState', subject: this.groupsStateSubject },
      { field: 'groupsDialogsState', subject: this.groupsDialogsStateSubject },
      { field: 'impersonateState', subject: this.impersonateStateSubject },
      { field: 'allAccountsState', subject: this.allAccountsStateSubject },
      { field: 'allAccountsDialogsState', subject: this.allAccountsDialogsStateSubject },
      { field: 'passkeysState', subject: this.passkeysStateSubject },
      { field: 'provisioningState', subject: this.provisioningStateSubject },
      { field: 'resetPhoneNumberState', subject: this.resetPhoneNumberStateSubject },
      { field: 'restrictionsState', subject: this.restrictionsStateSubject },
      { field: 'securityCenterState', subject: this.securityCenterStateSubject },
      { field: 'sessionsPolicyState', subject: this.sessionsPolicyStateSubject },
      { field: 'sessionsState', subject: this.sessionsStateSubject },
      { field: 'smsState', subject: this.smsStateSubject },
      { field: 'stepUpState', subject: this.stepUpStateSubject },
      { field: 'applicationsState', subject: this.applicationsStateSubject },
      { field: 'userIp', subject: this.userIpSubject },
      { field: 'keepSessionAlive', subject: this.keepSessionAliveSubject },
      { field: 'socialLoginOptions', subject: this.socialLoginOptionsSubject },
      { field: 'includeQueryParam', subject: this.includeQueryParamSubject },
      { field: 'hostedLoginBox', subject: this.hostedLoginBoxSubject },
      { field: 'disableSilentRefresh', subject: this.disableSilentRefreshSubject },
      { field: 'enforceRedirectToSameSite', subject: this.enforceRedirectToSameSiteSubject },
      { field: 'allowedRedirectOrigins', subject: this.allowedRedirectOriginsSubject },
    ];

    const state = this.fronteggAppService.fronteggApp.store.getState() as FronteggState;
    this.updateState(state.auth, authSubStates);

    const callback: any = (op: Op[]) => {

      const newState = this.fronteggAppService.fronteggApp.store.getState() as FronteggState;
      this.updateState(newState.auth, authSubStates);

      // this.updateDeepState(op);
    };
    this.fronteggAppService.fronteggApp.store.subscribe(callback);
  }


  // // tslint:disable-next-line:typedef
  // private updateDeepState(ops: Op[]) {
  //   ops.filter(op => op[0] === 'set').forEach((op) => {
  //     const [ action, path, value ] = op;
  //     const state = path[0];
  //     const subState = path[1];
  //     const deepPath = path.slice(2);
  //     console.log(state, subState, deepPath, value);
  //     switch (state) {
  //       case 'auth':
  //         if(this.authStateSubject.value )
  //         break;
  //     }
  //   });
  // }


  private updateState(authState: AuthState, authSubStates: AuthSubStates[]): void {

    if (this.authStateSubject.value !== authState) {
      this.authStateSubject.next(authState);
    }
    for (const authSubState of authSubStates) {
      if (!FastDeepEqual(authSubState.subject.value, authState[authSubState.field])) {
        authSubState.subject.next(authState[authSubState.field]);
      }
    }
    if (this.isAuthenticatedSubject.value !== authState.isAuthenticated) {
      this.isAuthenticatedSubject.next(authState.isAuthenticated);
    }
    if (this.isLoadingSubject.value !== authState.isLoading) {
      this.isLoadingSubject.next(authState.isLoading);
    }
  }

  private dispatchAction(type: string, payload?: any): void {
    const store = this.fronteggAppService.fronteggApp.store;
    store.dispatch({ type: `auth/${type}`, payload });
  }


  public isHostedLoginCallbackRoute(): boolean {
    const path = this.fronteggAppService.router.url;
    const hostedLoginRedirectUrl = this.fronteggAppService.authRoutes.hostedLoginRedirectUrl;
    return path.startsWith(hostedLoginRedirectUrl ?? '/oauth/callback');
  }

  /**
   * @param options.maxAge optional max age
   * @returns A subscription for step up state - true when user is stepped up, false otherwise
   */
  public isSteppedUp$(observer: PartialObserver<boolean>, options?: IsSteppedUpOptions): Subscription {
    return this.fronteggUserSubscriptionService.getUserManipulatorSubscription<boolean>(
      () => this.fronteggAppService.fronteggApp.isSteppedUp(options),
      observer,
    );
  }

  /**
   * Triggers step up flow
   * @param options.maxAge optional max age
   */
  public stepUp = (options?: StepUpOptions) => this.fronteggAppService.fronteggApp.stepUp(options);


  // Root Actions
  setState = (state: Partial<AuthState>) => this.dispatchAction('setState', state);
  resetState = () => this.dispatchAction('resetState');
  setUser = (user: User) => this.dispatchAction('setUser', user);

  // Login Actions
  setLoginState = (state: Partial<LoginState>) => this.dispatchAction('setLoginState', state);
  resetLoginState = () => this.dispatchAction('resetLoginState');
  requestAuthorize = (firstTime?: boolean) => this.dispatchAction('requestAuthorize', firstTime);

  loginWithRedirect = (params?: Record<string, string>,
                       shouldRedirectToLogin?: boolean,
                       firstTime?: boolean,
                       loginDirectAction?: LoginDirectAction) => {
    if (this.isHostedLoginCallbackRoute()) {
      return;
    }
    this.dispatchAction('requestHostedLoginAuthorizeV2', {
      additionalParams: params,
      shouldRedirectToLogin: shouldRedirectToLogin ?? true,
      firstTime: firstTime ?? false,
      loginDirectAction,
    });
    this.setState({ isLoading: true });
  };
  preLogin = (payload: IPreLogin) => this.dispatchAction('preLogin', payload);
  postLogin = (payload: IPostLogin) => this.dispatchAction('postLogin', payload);
  login = (payload: ILogin) => this.dispatchAction('login', payload);
  loginWithMfa = (payload: WithCallback<ILoginWithMfa>) => this.dispatchAction('loginWithMfa', payload);
  recoverMfa = (payload: IRecoverMFAToken) => this.dispatchAction('recoverMfa', payload);
  logout = (callback?: () => void) => this.dispatchAction('logout', callback);
  silentLogout = (callback?: () => void) => this.dispatchAction('silentLogout', callback);
  checkIfAllowToRememberMfaDevice = (payload: { mfaToken: string }) =>
    this.dispatchAction('checkIfAllowToRememberMfaDevice', payload);

  // Social Logins Actions
  setSocialLoginsState = (state: Partial<SocialLoginState>) => this.dispatchAction('setSocialLoginsState', state);
  resetSocialLoginsState = () => this.dispatchAction('resetSocialLoginsState');
  loadSocialLoginsConfiguration = () => this.dispatchAction('loadSocialLoginsConfiguration');
  loginViaSocialLogin = (payload: ILoginViaSocialLogin) => this.dispatchAction('loginViaSocialLogin', payload);
  setSocialLoginError = (payload: ISetSocialLoginError) => this.dispatchAction('setSocialLoginError', payload);

  // Activate Account Actions
  setActivateState = (state: Partial<ActivateAccountState>) => this.dispatchAction('setActivateState', state);
  resetActivateState = () => this.dispatchAction('resetActivateState');
  setActivateStrategyState = (state: Partial<ActivateAccountStrategyState>) =>
    this.dispatchAction('setActivateStrategyState', state);
  activateAccount = (payload: IActivateAccount) => this.dispatchAction('activateAccount', payload);
  resendActivationEmail = (payload: IResendActivationEmail) => this.dispatchAction('resendActivationEmail', payload);
  getActivateAccountStrategy = (
    payload: WithCallback<IGetActivateAccountStrategy, IGetActivateAccountStrategyResponse>,
  ) => this.dispatchAction('getActivateAccountStrategy', payload);

  // Accept Invitation Actions
  setAcceptInvitationState = (state: Partial<AcceptInvitationState>) =>
    this.dispatchAction('setAcceptInvitationState', state);
  resetAcceptInvitationState = () => this.dispatchAction('resetAcceptInvitationState');
  acceptInvitation = (payload: IAcceptInvitation) => this.dispatchAction('acceptInvitation', payload);

  // Forgot Password Actions
  setForgotPasswordState = (state: Partial<ForgotPasswordState>) =>
    this.dispatchAction('setForgotPasswordState', state);
  resetForgotPasswordState = () => this.dispatchAction('resetForgotPasswordState');
  forgotPassword = (payload: IForgotPassword) => this.dispatchAction('forgotPassword', payload);
  resetPassword = (payload: IResetPassword) => this.dispatchAction('resetPassword', payload);
  loadPasswordConfig = (payload?: IGetUserPasswordConfig) => this.dispatchAction('loadPasswordConfig', payload);

  // Sign Up Actions
  setSignUpState = (state: Partial<SignUpState>) => this.dispatchAction('setSignUpState', state);
  resetSignUpState = () => this.dispatchAction('resetSignUpState');
  signUpUser = (payload: ISignUpUser) => this.dispatchAction('signUpUser', payload);
  resetSignUpStateSoft = () => this.dispatchAction('resetSignUpStateSoft');

  // Profile Actions
  setProfileState = (state: Partial<ProfileState>) => this.dispatchAction('setProfileState', state);
  resetProfileState = () => this.dispatchAction('resetProfileState');
  loadProfile = () => this.dispatchAction('loadProfile');
  saveProfile = (payload: SaveProfilePayload) => this.dispatchAction('saveProfile', payload);
  changePassword = (payload: WithCallback<IChangePassword>) => this.dispatchAction('changePassword', payload);

  // SSO actions
  setSSOState = (state: Partial<SSOState>) => this.dispatchAction('setSSOState', state);
  resetSSOState = () => this.dispatchAction('resetSSOState');
  loadSSOConfigurations = () => this.dispatchAction('loadSSOConfigurations');
  loadSSOAuthorizationRoles = () => this.dispatchAction('loadSSOAuthorizationRoles');
  saveSSOConfigurations = (payload: SaveSSOConfigurationPayload) =>
    this.dispatchAction('saveSSOConfigurations', payload);
  saveSSOConfigurationsFile = (payload: File[]) => this.dispatchAction('saveSSOConfigurationsFile', payload);
  saveSSOConfigurationsFileWithCallback = (payload: SaveSSOConfigurationFilePayload) =>
    this.dispatchAction('saveSSOConfigurationsFileWithCallback', payload);
  validateSSODomain = (payload?: WithCallback) => this.dispatchAction('validateSSODomain', payload);
  updateSSOAuthorizationRoles = (payload: UpdateSSOAuthorizationRolesPayload) =>
    this.dispatchAction('updateSSOAuthorizationRoles', payload);
  deleteSamlGroup = (payload: DeleteSamlGroupPayload) => this.dispatchAction('deleteSamlGroup', payload);
  createSamlGroup = (payload: CreateSamlGroupPayload) => this.dispatchAction('createSamlGroup', payload);
  oidcPostlogin = (payload: IOidcPostLogin) => this.dispatchAction('oidcPostlogin', payload);

  // Mfa actions
  setMfaState = (state: Partial<MFAState>) => this.dispatchAction('setMfaState', state);
  resetMfaState = () => this.dispatchAction('resetMfaState');
  enrollMfa = () => this.dispatchAction('enrollMfa');
  verifyMfa = (payload: WithCallback<IVerifyMfa, string | undefined>) => this.dispatchAction('verifyMfa', payload);
  verifyMfaAfterForce = (payload: WithCallback<ILoginWithMfa, string | undefined>) =>
    this.dispatchAction('verifyMfaAfterForce', payload);
  disableMfa = (payload: WithCallback<IDisableMfa>) => this.dispatchAction('disableMfa', payload);

  // Team actions
  setTeamLoader = (payload: TeamStateIndicator) => this.dispatchAction('setTeamLoader', payload);
  setTeamError = (payload: TeamStateIndicator) => this.dispatchAction('setTeamError', payload);
  setTeamState = (payload: Partial<TeamState>) => this.dispatchAction('setTeamState', payload);
  resetTeamState = () => this.dispatchAction('resetTeamState');
  loadUsers = (payload: WithCallback<WithSilentLoad<ILoadUsers>, ITeamUser[]>) =>
    this.dispatchAction('loadUsers', payload);
  loadRoles = (payload?: LoadRolesAndPermissionsPayload) => this.dispatchAction('loadRoles', payload);
  addUser = (payload: WithCallback<IAddUser, ITeamUser>) => this.dispatchAction('addUser', payload);
  updateUser = (payload: WithCallback<IUpdateUser, ITeamUser>) => this.dispatchAction('updateUser', payload);
  deleteUser = (payload: WithCallback<IDeleteUser>) => this.dispatchAction('deleteUser', payload);
  resendActivationLink = (payload: WithCallback<IResendActivationLink>) =>
    this.dispatchAction('resendActivationLink', payload);
  resendInvitationLink = (payload: WithCallback<IResendInvitationLink>) =>
    this.dispatchAction('resendInvitationLink', payload);
  openAddUserDialog = (payload?: ISetAddUserDialog) => this.dispatchAction('openAddUserDialog', payload);
  closeAddUserDialog = (payload?: any) => this.dispatchAction('closeAddUserDialog', payload);
  openDeleteUserDialog = (payload?: ISetDeleteUserDialog) => this.dispatchAction('openDeleteUserDialog', payload);
  closeDeleteUserDialog = (payload?: any) => this.dispatchAction('closeDeleteUserDialog', payload);

  // API Token Actions
  setApiTokensLoader = (payload: ApiStateIndicator) => this.dispatchAction('setApiTokensLoader', payload);
  setApiTokensError = (payload: ApiStateIndicator) => this.dispatchAction('setApiTokensError', payload);
  setApiTokensState = (state: Partial<ApiTokensState>) => this.dispatchAction('setApiTokensState', state);
  resetApiTokensState = () => this.dispatchAction('resetApiTokensState');
  loadApiTokens = (payload?: WithSilentLoad<WithCallback>) => this.dispatchAction('loadApiTokens', payload);
  initApiTokensData = (payload: ApiTokenType) => this.dispatchAction('initApiTokensData', payload);
  addTenantApiToken = (payload: AddTenantApiTokenPayload) => this.dispatchAction('addTenantApiToken', payload);
  addUserApiToken = (payload: AddUserApiTokenPayload) => this.dispatchAction('addUserApiToken', payload);
  deleteUserApiToken = (payload: string) => this.dispatchAction('deleteUserApiToken', payload);
  deleteTenantApiToken = (payload: string) => this.dispatchAction('deleteTenantApiToken', payload);

  // Security Policy Actions
  setSecurityPolicyState = (state: Partial<SecurityPolicyState>) =>
    this.dispatchAction('setSecurityPolicyState', state);
  setSecurityPolicyGlobalState = (state: Partial<GlobalPolicyState>) =>
    this.dispatchAction('setSecurityPolicyGlobalState', state);
  setSecurityPolicyPublicState = (state: Partial<PublicPolicyState>) =>
    this.dispatchAction('setSecurityPolicyPublicState', state);
  setSecurityPolicyMfaState = (state: Partial<MfaPolicyState>) =>
    this.dispatchAction('setSecurityPolicyMfaState', state);
  setSecurityPolicyLockoutState = (state: Partial<LockoutPolicyState>) =>
    this.dispatchAction('setSecurityPolicyLockoutState', state);
  setSecurityPolicyCaptchaState = (state: Partial<CaptchaPolicyState>) =>
    this.dispatchAction('setSecurityPolicyCaptchaState', state);
  setSecurityPolicyPasswordHistoryState = (state: Partial<PasswordHistoryPolicyState>) =>
    this.dispatchAction('setSecurityPolicyPasswordHistoryState', state);
  resetSecurityPolicyState = () => this.dispatchAction('resetSecurityPolicyState');
  setSecurityPolicyPasswordState = (state: Partial<PasswordPolicyState>) =>
    this.dispatchAction('setSecurityPolicyPasswordState', state);
  loadSecurityPolicy = () => this.dispatchAction('loadSecurityPolicy');
  loadPublicSecurityPolicy = () => this.dispatchAction('loadPublicSecurityPolicy');
  loadVendorPasswordConfig = () => this.dispatchAction('loadVendorPasswordConfig');
  loadSecurityPolicyMfa = () => this.dispatchAction('loadSecurityPolicyMfa');
  saveSecurityPolicyMfa = (payload: SaveSecurityPolicyMfaPayload) =>
    this.dispatchAction('saveSecurityPolicyMfa', payload);
  loadSecurityPolicyLockout = () => this.dispatchAction('loadSecurityPolicyLockout');
  saveSecurityPolicyLockout = (payload: SaveSecurityPolicyLockoutPayload) =>
    this.dispatchAction('saveSecurityPolicyLockout', payload);
  loadSecurityPolicyCaptcha = () => this.dispatchAction('loadSecurityPolicyCaptcha');
  loadSecurityPolicyPasswordHistory = () => this.dispatchAction('loadSecurityPolicyPasswordHistory');
  saveSecurityPolicyPasswordHistory = (payload: SaveSecurityPolicyPasswordHistoryPayload) =>
    this.dispatchAction('saveSecurityPolicyPasswordHistory', payload);

  // Account Settings Actions
  setAccountSettingsState = (state: Partial<AccountSettingsState>) =>
    this.dispatchAction('setAccountSettingsState', state);
  resetAccountSettingsState = () => this.dispatchAction('resetAccountSettingsState');
  loadAccountSettings = (payload?: WithCallback<WithSilentLoad<{}>>) =>
    this.dispatchAction('loadAccountSettings', payload);
  saveAccountSettings = (payload: WithCallback<ISettingsResponse, ISettingsResponse>) =>
    this.dispatchAction('saveAccountSettings', payload);

  // Tenants Actions
  setTenantsState = (state: Partial<TenantsState>) => this.dispatchAction('setTenantsState', state);
  resetTenantsState = () => this.dispatchAction('resetTenantsState');
  switchTenant = (payload: WithCallback<ISwitchTenant>) => this.dispatchAction('switchTenant', payload);
  loadTenants = (payload?: WithCallback<{}, ITenantsResponse[]>) => this.dispatchAction('loadTenants', payload);

  // Roles Actions
  setRolesState = (state: RolesState) => this.dispatchAction('setRolesState', state);
  resetRolesState = () => this.dispatchAction('resetRolesState');
  loadRolesAndPermissions = (payload?: WithSilentLoad<{}>) => this.dispatchAction('loadRolesAndPermissions', payload);
  addRole = (payload: WithCallback<IAddRole, IRole>) => this.dispatchAction('addRole', payload);
  updateRole = (payload: WithCallback<IUpdateRole, IRole>) => this.dispatchAction('updateRole', payload);
  deleteRole = (payload: WithCallback<IDeleteRole>) => this.dispatchAction('deleteRole', payload);
  attachPermissionsToRole = (payload: WithCallback<IAttachPermissionsToRole, IRole>) =>
    this.dispatchAction('attachPermissionsToRole', payload);

  attachPermissionToRoles = (
    payload: WithCallback<{
      permissionId: string;
      roleIds: string[];
    },
      IRolePermission>,
  ) => this.dispatchAction('attachPermissionToRoles', payload);
}
