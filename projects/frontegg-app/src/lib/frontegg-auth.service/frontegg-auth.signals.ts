import {
  AuthState
} from '@frontegg/redux-store';
import { Signal, toSignal } from '../v16';
import { FronteggAuthObservables } from './frontegg-auth.observables';

export class FronteggAuthSignals extends FronteggAuthObservables {
  get authStateSignal(): Signal<AuthState | undefined> {
    return toSignal(this.authState$);
  }

  get accountSettingsStateSignal(): Signal<AuthState['accountSettingsState'] | undefined> {
    return toSignal(this.accountSettingsState$);
  }

  get activateStateSignal(): Signal<AuthState['activateState'] | undefined> {
    return toSignal(this.activateState$);
  }

  get apiTokensStateSignal(): Signal<AuthState['apiTokensState'] | undefined> {
    return toSignal(this.apiTokensState$);
  }

  get forgotPasswordStateSignal(): Signal<AuthState['forgotPasswordState'] | undefined> {
    return toSignal(this.forgotPasswordState$);
  }

  get loginStateSignal(): Signal<AuthState['loginState'] | undefined> {
    return toSignal(this.loginState$);
  }

  get mfaStateSignal(): Signal<AuthState['mfaState'] | undefined> {
    return toSignal(this.mfaState$);
  }

  get profileStateSignal(): Signal<AuthState['profileState'] | undefined> {
    return toSignal(this.profileState$);
  }

  get rolesStateSignal(): Signal<AuthState['rolesState'] | undefined> {
    return toSignal(this.rolesState$);
  }

  get routesStateSignal(): Signal<AuthState['routes'] | undefined> {
    return toSignal(this.routesState$);
  }

  get securityPolicyStateSignal(): Signal<AuthState['securityPolicyState'] | undefined> {
    return toSignal(this.securityPolicyState$);
  }

  get signUpStateSignal(): Signal<AuthState['signUpState'] | undefined> {
    return toSignal(this.signUpState$);
  }

  get socialLoginStateSignal(): Signal<AuthState['socialLoginState'] | undefined> {
    return toSignal(this.socialLoginState$);
  }

  get ssoStateSignal(): Signal<AuthState['ssoState'] | undefined> {
    return toSignal(this.ssoState$);
  }

  get teamStateSignal(): Signal<AuthState['teamState'] | undefined> {
    return toSignal(this.teamState$);
  }

  get tenantsStateSignal(): Signal<AuthState['tenantsState'] | undefined> {
    return toSignal(this.tenantsState$);
  }


  get userSignal(): Signal<AuthState['user'] | undefined> {
    return toSignal(this.user$);
  }

  get isAuthenticatedSignal(): Signal<AuthState['isAuthenticated'] | undefined> {
    return toSignal(this.isAuthenticated$);
  }

  get isLoadingSignal(): Signal<AuthState['isLoading'] | undefined> {
    return toSignal(this.isLoading$);
  }

  get isSSOAuthSignal(): Signal<AuthState['isSSOAuth'] | undefined> {
    return toSignal(this.isSSOAuth$);
  }

  get ssoACSSignal(): Signal<AuthState['ssoACS'] | undefined> {
    return toSignal(this.ssoACS$);
  }

}
