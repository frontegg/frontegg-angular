import { Subscription, PartialObserver, BehaviorSubject } from 'rxjs';
import { User, AuthState } from '@frontegg/redux-store';
import { Injectable } from '@angular/core';
import { Entitlement, LoadEntitlementsCallback, EntitledToOptions } from '@frontegg/types';

import {
  FronteggState,
  getPermissionEntitlements,
  getFeatureEntitlements,
  getEntitlements,
} from '@frontegg/redux-store';
import { FronteggAppService } from './frontegg-app.service';

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
  private entitlementsStateSubject = new BehaviorSubject<User['entitlements']>(undefined);
  
  constructor(private fronteggAppService: FronteggAppService) {
    const state = this.fronteggAppService.fronteggApp.store.getState() as FronteggState;
    this.updateEntitlementsStateIfNeeded(state.auth);

    // Memoized entitlements State
    this.fronteggAppService.fronteggApp.store.subscribe(() => {
      const newState = this.fronteggAppService.fronteggApp.store.getState() as FronteggState;
      this.updateEntitlementsStateIfNeeded(newState.auth);
    });
  }

  /**
   * Trigger entitlements subject change event if the entitlements reference changes
   * No need for deep equal because we already check it internally
   * @param authState
   */
  private updateEntitlementsStateIfNeeded(authState: AuthState): void {
    const entitlementsState = authState.user?.entitlements;
    if (this.entitlementsStateSubject.value === entitlementsState) {
      return;
    }

    this.entitlementsStateSubject.next(entitlementsState);
  }

  /**
   * The function gives the ability to return a manipulated data of the entitlements state as a subscription.
   *
   * @param dataManipulator Manipulator function that receives entitlements state and returns a manipulated data
   * @param observer For receiving manipulated data result
   * @returns a subscription to be able to unsubscribe
   */
  private getEntitlementsManipulatorSubscription<Result>(
    dataManipulator: (entitlements: User['entitlements']) => Result, 
    observer: PartialObserver<Result>
  ): Subscription {
    // used for computing the entitlements result because we don't return the state itself, but a calculated one
    const entitlementsSubject = new BehaviorSubject<Result>(undefined as unknown as Result);
    
    const stateSubscription = this.entitlementsStateSubject.subscribe(entitlements => {
      entitlementsSubject.next(dataManipulator(entitlements));
    });
    
    // subscribing the consumer observer
    const entitlementsResultSubscription = entitlementsSubject.asObservable().subscribe(observer)

    // monkey patched to manage both un-subscriptions: state and entitlements manipulated result
    const originalUnsubscribe = entitlementsResultSubscription.unsubscribe.bind(entitlementsResultSubscription);

    entitlementsResultSubscription.unsubscribe = ()=>{
      originalUnsubscribe();
      stateSubscription.unsubscribe();
    };

    return entitlementsResultSubscription;
  }

  /**
   * @param feature
   * @param observer For receiving the feature entitlements result including if the user is entitled to the given feature.
   *                 Attaching the justification if not entitled
   * @returns a subscription to be able to unsubscribe
   * @throws when entitlement is not enabled via frontegg options
   */
  public featureEntitlements$(feature: string, observer: PartialObserver<Entitlement>): Subscription {
    return this.getEntitlementsManipulatorSubscription<Entitlement>(
      (entitlements) => getFeatureEntitlements(entitlements, feature),
      observer
    );
  }

  /**
   * @param permission
   * @param observer For receiving the permission entitlements result including if the user is entitled to the given permission.
   *                 Attaching the justification if not entitled
   * @returns a subscription to be able to unsubscribe
   */
  public permissionEntitlements$(permission: string, observer: PartialObserver<Entitlement>): Subscription {
    return this.getEntitlementsManipulatorSubscription<Entitlement>(
      (entitlements) => getPermissionEntitlements(entitlements, permission),
      observer
    );
  }

  /**
   * @param options permissionKey or featureKey in an options object
   * @param observer For receiving the permission entitlements result including if the user is entitled to the given permission.
   *                 Attaching the justification if not entitled
   * @returns a subscription to be able to unsubscribe
   */
  public entitlements$(options: EntitledToOptions, observer: PartialObserver<Entitlement>): Subscription {
    return this.getEntitlementsManipulatorSubscription<Entitlement>(
      (entitlements) => getEntitlements(entitlements, options),
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
