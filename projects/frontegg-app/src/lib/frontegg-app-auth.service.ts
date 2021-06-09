import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AuthState } from '@frontegg/redux-store';
import { filter } from 'rxjs/operators';
import { FronteggAppService } from './frontegg-app.service';
import * as equal from 'fast-deep-equal';

interface AuthSubStates {
  field: Partial<keyof AuthState>,
  subject: BehaviorSubject<any>
}
@Injectable({
  providedIn: 'root'
})
export class FronteggAppAuthService {
  private acceptInvitationStateSubject$ = new BehaviorSubject<AuthState['acceptInvitationState'] | null>(null);
  private accountSettingsStateSubject$ = new BehaviorSubject<AuthState['accountSettingsState'] | null>(null);
  private activateStateSubject$ = new BehaviorSubject<AuthState['activateState'] | null>(null);
  private apiTokensStateSubject$ = new BehaviorSubject<AuthState['apiTokensState'] | null>(null);
  private forgotPasswordStateSubject$ = new BehaviorSubject<AuthState['forgotPasswordState'] | null>(null);
  private loginStateSubject$ = new BehaviorSubject<AuthState['loginState'] | null>(null);
  private mfaStateSubject$ = new BehaviorSubject<AuthState['mfaState'] | null>(null);
  private profileStateSubject$ = new BehaviorSubject<AuthState['profileState'] | null>(null);
  private rolesStateSubject$ = new BehaviorSubject<AuthState['rolesState'] | null>(null);
  private routesSubject$ = new BehaviorSubject<AuthState['routes'] | null>(null);
  private securityPolicyStateSubject$ = new BehaviorSubject<AuthState['securityPolicyState'] | null>(null);
  private signUpStateSubject$ = new BehaviorSubject<AuthState['signUpState'] | null>(null);
  private socialLoginStateSubject$ = new BehaviorSubject<AuthState['socialLoginState'] | null>(null);
  private ssoStateSubject$ = new BehaviorSubject<AuthState['ssoState'] | null>(null);
  private teamStateSubject$ = new BehaviorSubject<AuthState['teamState'] | null>(null);
  private tenantsStateSubject$ = new BehaviorSubject<AuthState['tenantsState'] | null>(null);
  private userSubject$ = new BehaviorSubject<AuthState['user'] | null>(null);
  private isAuthenticatedSubject$ = new BehaviorSubject<AuthState['isAuthenticated']>(false);
  private isSSOAuthSubject$ = new BehaviorSubject<AuthState['isSSOAuth']>(false);
  private ssoACSSubject$ = new BehaviorSubject<AuthState['ssoACS']>('');

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
  readonly isAuthenticated$ = this.isAuthenticatedSubject$.asObservable();
  readonly isSSOAuth$ = this.isSSOAuthSubject$.asObservable();
  readonly ssoACS$ = this.ssoACSSubject$.asObservable();


  constructor(private fronteggAppService: FronteggAppService) {
    const authSubStates: AuthSubStates[] = [
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
      { field: 'isAuthenticated', subject: this.isAuthenticatedSubject$ },
      { field: 'isSSOAuth', subject: this.isSSOAuthSubject$ },
      { field: 'ssoACS', subject: this.ssoACSSubject$ },
    ]

    // Memoized Auth State
    this.fronteggAppService.fronteggAppAuthState$.pipe(filter((state) => !!state)).subscribe((authState) => {
      if (authState != null) {
        for (const authSubState of authSubStates) {
          if (!equal(authSubState.subject.getValue(), authState[authSubState.field])) {
            authSubState.subject.next(authState[authSubState.field])
          }
        }
      }
    })
  }
}
