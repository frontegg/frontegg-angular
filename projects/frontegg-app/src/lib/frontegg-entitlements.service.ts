import { Subscription, PartialObserver, BehaviorSubject } from 'rxjs';
import { AuthState } from '@frontegg/redux-store';
import { Injectable } from '@angular/core';
import { Entitlement, LoadEntitlementsCallback, EntitledToOptions, CustomAttributes } from '@frontegg/types';

import { FronteggState } from '@frontegg/redux-store';
import { FronteggAppService } from './frontegg-app.service';

type User = FronteggState['auth']['user'];

/**
 * An entitlements service for: 
 *   1. Managing state subscription.
 *   2. Querying about feature and permission entitlements state.
 *   3. Load entitlements on demand.
 */
@Injectable({
  providedIn: 'root',
})
export class FronteggEntitlementsService {
  private userStateSubject = new BehaviorSubject<any>(undefined);
  
  constructor(private fronteggAppService: FronteggAppService) {
    const state = this.fronteggAppService.fronteggApp.store.getState() as FronteggState;
    this.updateUserStateIfNeeded(state.auth);

    // Memoized entitlements State
    this.fronteggAppService.fronteggApp.store.subscribe(() => {
      const newState = this.fronteggAppService.fronteggApp.store.getState() as FronteggState;
      this.updateUserStateIfNeeded(newState.auth);
    });
  }

  /**
   * Trigger entitlements subject change event if the entitlements reference changes
   * No need for deep equal because we already check it internally
   * @param authState
   */
  private updateUserStateIfNeeded(authState: AuthState): void {
    const entitlementsState = authState.user as User;
    if (this.userStateSubject.value === entitlementsState) {
      return;
    }

    this.userStateSubject.next(entitlementsState);
  }

  /**
   * The function gives the ability to return a manipulated data of the user state as a subscription.
   *
   * @param dataManipulator Manipulator function that receives user state and returns a manipulated data
   * @param observer For receiving manipulated data result
   * @returns a subscription to be able to unsubscribe
   */
  private getUserManipulatorSubscription<Result>(
    dataManipulator: (user: User) => Result, 
    observer: PartialObserver<Result>
  ): Subscription {
    // used for computing the entitlements result because we don't return the state itself, but a calculated one
    const userSubject = new BehaviorSubject<Result>(undefined as unknown as Result);
    
    const stateSubscription = this.userStateSubject.subscribe(user => {
      userSubject.next(dataManipulator(user));
    });
    
    // subscribing the consumer observer
    const userResultSubscription = userSubject.asObservable().subscribe(observer)

    // monkey patched to manage both un-subscriptions: state and user manipulated result
    const originalUnsubscribe = userResultSubscription.unsubscribe.bind(userResultSubscription);

    userResultSubscription.unsubscribe = ()=>{
      originalUnsubscribe();
      stateSubscription.unsubscribe();
    };

    return userResultSubscription;
  }

  /**
   * @param feature
   * @param observer For receiving the feature entitlements result including if the user is entitled to the given feature.
   *                 Attaching the justification if not entitled
   * @param customAttributes consumer attributes
   * @returns a subscription to be able to unsubscribe
   * @throws when entitlement is not enabled via frontegg options
   */
  public featureEntitlements$(feature: string, observer: PartialObserver<Entitlement>, customAttributes?: CustomAttributes): Subscription {
    return this.getUserManipulatorSubscription<Entitlement>(
      () => { return this.fronteggAppService.fronteggApp.getFeatureEntitlements(feature, customAttributes)},
      observer
    );
  }

  /**
   * @param permission
   * @param observer For receiving the permission entitlements result including if the user is entitled to the given permission.
   *                 Attaching the justification if not entitled
   * @param customAttributes consumer attributes
   * @returns a subscription to be able to unsubscribe
   */
  public permissionEntitlements$(permission: string, observer: PartialObserver<Entitlement>, customAttributes?: CustomAttributes): Subscription {
    return this.getUserManipulatorSubscription<Entitlement>(
      () => this.fronteggAppService.fronteggApp.getPermissionEntitlements(permission, customAttributes),
      observer
    );
  }

  /**
   * @param options permissionKey or featureKey in an options object
   * @param observer For receiving the permission entitlements result including if the user is entitled to the given permission.
   *                 Attaching the justification if not entitled
   * @param customAttributes consumer attributes
   * @returns a subscription to be able to unsubscribe
   */
  public entitlements$(options: EntitledToOptions, observer: PartialObserver<Entitlement>, customAttributes?: CustomAttributes): Subscription {
    return this.getUserManipulatorSubscription<Entitlement>(
      () => this.fronteggAppService.fronteggApp.getEntitlements(options, customAttributes),
      observer
    );
  }

  /**
   * Load entitlements data on demand
   * @param callback called on request completed with true if succeeded, false if failed
   */
  public loadEntitlements(callback?: LoadEntitlementsCallback): void {
    this.fronteggAppService.fronteggApp.loadEntitlements(callback);
  }
}
