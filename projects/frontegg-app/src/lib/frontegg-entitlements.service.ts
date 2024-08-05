import { Subscription, PartialObserver } from 'rxjs';
import { Injectable } from '@angular/core';
import { Entitlement, CustomAttributes, EntitledToOptions, LoadEntitlementsCallback } from '@frontegg/types';
import { NotEntitledJustification } from '@frontegg/rest-api';
import { FronteggAppService } from './frontegg-app.service';
import { FronteggUserSubscriptionService, User } from './frontegg-user-subscription.service';

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
  constructor(private fronteggAppService: FronteggAppService, private fronteggUserSubscriptionService: FronteggUserSubscriptionService) {
  }

  /**
   * @param feature featureKey
   * @param observer For receiving the feature entitlements result including if the user is entitled to the given feature.
   *                 Attaching the justification if not entitled
   * @param customAttributes consumer attributes
   * @returns a subscription to be able to unsubscribe
   * @throws when entitlement is not enabled via frontegg options
   */
  public featureEntitlements$(feature: string, observer: PartialObserver<Entitlement>, customAttributes?: CustomAttributes): Subscription {
    return this.fronteggUserSubscriptionService.getUserManipulatorSubscription<Entitlement>(
      (user: User) => {
        // the entitlemenets-common npm doesn't know to overcome the case of signed out user, then we get console errors
        if (user) {
          return this.fronteggAppService.fronteggApp.getFeatureEntitlements(feature, customAttributes);
        }
        return { isEntitled: false, justification: NotEntitledJustification.MISSING_FEATURE };
      },
      observer,
    );
  }

  /**
   * @param permission permission key
   * @param observer For receiving the permission entitlements result including if the user is entitled to the given permission.
   *                 Attaching the justification if not entitled
   * @param customAttributes consumer attributes
   * @returns a subscription to be able to unsubscribe
   */
  public permissionEntitlements$(permission: string,
                                 observer: PartialObserver<Entitlement>,
                                 customAttributes?: CustomAttributes): Subscription {
    return this.fronteggUserSubscriptionService.getUserManipulatorSubscription<Entitlement>(
      (user: User) => {
        if (user) {
          return this.fronteggAppService.fronteggApp.getPermissionEntitlements(permission, customAttributes);
        }
        return { isEntitled: false, justification: NotEntitledJustification.MISSING_PERMISSION };
      },
      observer,
    );
  }

  /**
   * @param options permissionKey or featureKey in an options object
   * @param observer For receiving the permission entitlements result including if the user is entitled to the given permission.
   *                 Attaching the justification if not entitled
   * @param customAttributes consumer attributes
   * @returns a subscription to be able to unsubscribe
   */
  public entitlements$(options: EntitledToOptions,
                       observer: PartialObserver<Entitlement>,
                       customAttributes?: CustomAttributes): Subscription {
    return this.fronteggUserSubscriptionService.getUserManipulatorSubscription<Entitlement>(
      (user: User) => {
        if (user) {
          return this.fronteggAppService.fronteggApp.getEntitlements(options, customAttributes);
        }

        const justification = 'featureKey' in options ?
          NotEntitledJustification.MISSING_FEATURE : NotEntitledJustification.MISSING_PERMISSION;

        return { isEntitled: false, justification };
      },
      observer,
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
