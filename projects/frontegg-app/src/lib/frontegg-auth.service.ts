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
  authStoreName,
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

@Injectable({
  providedIn: 'root',
})
export class FronteggAuthService {
  private authStateSubject = new BehaviorSubject<AuthState>({ isAuthenticated: false, isLoading: true } as AuthState);
  private acceptInvitationStateSubject = new BehaviorSubject<AuthState['acceptInvitationState']>({} as AuthState['acceptInvitationState']);
  private accountSettingsStateSubject = new BehaviorSubject<AuthState['accountSettingsState']>({} as AuthState['accountSettingsState']);
  private activateStateSubject = new BehaviorSubject<AuthState['activateState']>({} as AuthState['activateState']);
  private apiTokensStateSubject = new BehaviorSubject<AuthState['apiTokensState']>({} as AuthState['apiTokensState']);
  private forgotPasswordStateSubject = new BehaviorSubject<AuthState['forgotPasswordState']>({} as AuthState['forgotPasswordState']);
  private loginStateSubject = new BehaviorSubject<AuthState['loginState']>({} as AuthState['loginState']);
  private mfaStateSubject = new BehaviorSubject<AuthState['mfaState']>({} as AuthState['mfaState']);
  private profileStateSubject = new BehaviorSubject<AuthState['profileState']>({} as AuthState['profileState']);
  private rolesStateSubject = new BehaviorSubject<AuthState['rolesState']>({} as AuthState['rolesState']);
  private routesSubject = new BehaviorSubject<AuthState['routes']>({} as AuthState['routes']);
  private securityPolicyStateSubject = new BehaviorSubject<AuthState['securityPolicyState']>({} as AuthState['securityPolicyState']);
  private signUpStateSubject = new BehaviorSubject<AuthState['signUpState']>({} as AuthState['signUpState']);
  private socialLoginStateSubject = new BehaviorSubject<AuthState['socialLoginState']>({} as AuthState['socialLoginState']);
  private ssoStateSubject = new BehaviorSubject<AuthState['ssoState']>({} as AuthState['ssoState']);
  private teamStateSubject = new BehaviorSubject<AuthState['teamState']>({} as AuthState['teamState']);
  private tenantsStateSubject = new BehaviorSubject<AuthState['tenantsState']>({} as AuthState['tenantsState']);
  private userSubject = new BehaviorSubject<AuthState['user']>({} as AuthState['user']);
  private isAuthenticatedSubject = new BehaviorSubject<AuthState['isAuthenticated']>(false);
  private isLoadingSubject = new BehaviorSubject<AuthState['isLoading']>(true);
  private isSSOAuthSubject = new BehaviorSubject<AuthState['isSSOAuth']>(false);
  private ssoACSSubject = new BehaviorSubject<AuthState['ssoACS']>('');


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

  constructor(
    private fronteggAppService: FronteggAppService,
    private router: Router,
    private fronteggUserSubscriptionService: FronteggUserSubscriptionService
  ) {
    const authSubStates: AuthSubStates[] = [
      { field: 'acceptInvitationState', subject: this.acceptInvitationStateSubject },
      { field: 'accountSettingsState', subject: this.accountSettingsStateSubject },
      { field: 'activateState', subject: this.activateStateSubject },
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
    ];

    const state = this.fronteggAppService.fronteggApp.store.getState() as FronteggState;
    this.updateState(state.auth, authSubStates);
    // Memoized Auth State
    this.fronteggAppService.fronteggApp.store.subscribe(() => {
      const newState = this.fronteggAppService.fronteggApp.store.getState() as FronteggState;
      this.updateState(newState.auth, authSubStates);
    });
  }

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
    // @ts-ignore
    store.dispatch({ type: `${authStoreName}/${type}`, payload });
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
      () => { return this.fronteggAppService.fronteggApp.isSteppedUp(options)},
      observer
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
