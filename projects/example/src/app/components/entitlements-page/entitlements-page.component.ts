import { Component, NgZone, OnDestroy, OnInit } from '@angular/core';
import { FronteggAppService, FronteggEntitlementsService } from '@frontegg/angular';
import { Entitlement } from '@frontegg/types';
import { Subscription } from 'rxjs';
import { User } from '@frontegg/redux-store';

enum EntitlementsQueryType {
  FEATURE = 'featureEntitlements',
  PERMISSION = 'permissionEntitlements',
  ENTITLEMENTS = 'entitlements',
}

@Component({
  selector: 'entitlements-page',
  templateUrl: './entitlements-page.component.html',
  styleUrls: ['./entitlements-page.component.scss']
})
export class EntitlementsPage implements OnDestroy {
  authenticated = false;

  entitlementsResults: {
    [key: string]: { 
      name: string,
      isEntitled: Entitlement['isEntitled'],
      justification?: Entitlement['justification']
    } 
  } = {};

  user?: User;
  subscriptions: Subscription[] = [];
  isAuthenticatedSubscription: Subscription;

  constructor(
      private fronteggAppService: FronteggAppService,
      private fronteggEntitlementsService: FronteggEntitlementsService,
      private ngZone: NgZone,
  ) {
    this.isAuthenticatedSubscription = this.fronteggAppService.isAuthenticated$.subscribe((isAuthenticated: boolean) => {
      this.authenticated = isAuthenticated;
    });

    this.feedEntitlements();
  }

  feedEntitlements() {
    const entitlementsRequests = [
      { queryType: EntitlementsQueryType.FEATURE, arg: 'sso', },
      { queryType: EntitlementsQueryType.FEATURE, arg: 'sso', customAttributes: { env: 'dev' } },
      { queryType: EntitlementsQueryType.ENTITLEMENTS, arg: { featureKey: 'proteins.*' }, customAttributes: { pro: '20gr' }},
      { queryType: EntitlementsQueryType.PERMISSION, arg: 'dora.protein.*', },
      { queryType: EntitlementsQueryType.ENTITLEMENTS, arg: { permissionKey: 'fe.secure.*' } },
      { queryType: EntitlementsQueryType.PERMISSION, arg: 'fe.secure.*', customAttributes: { env: 'dev' } },
    ];

    const subscriptionGenerators: any = {
      featureEntitlements: this.fronteggEntitlementsService.featureEntitlements$.bind(this.fronteggEntitlementsService),
      permissionEntitlements: this.fronteggEntitlementsService.permissionEntitlements$.bind(this.fronteggEntitlementsService),
      entitlements: this.fronteggEntitlementsService.entitlements$.bind(this.fronteggEntitlementsService),
    }

    this.subscriptions = entitlementsRequests.map(({ queryType, arg, customAttributes }) => (
      subscriptionGenerators[queryType](arg, {
        next: (
          result: Entitlement
        ) => {
          this.ngZone.run(() => {
            const customAttributesNamePart = customAttributes ? `, ${JSON.stringify(customAttributes)}` : '';
            const name = `${queryType}$(${JSON.stringify(arg)}${customAttributesNamePart})`;
            this.entitlementsResults[name] = {
              name,
              ...result
            };
          });
        }
      })
    ));
  }

  onLoadEntitlementsClicked() {
    this.fronteggEntitlementsService.loadEntitlements();
  }

  onLoadEntitlementsWithCallbackClicked() {
    this.fronteggEntitlementsService.loadEntitlements(
      (isSucceeded: boolean) => console.log(`Load entitlements on demand ${isSucceeded ? 'succeeded' : 'failed'}`)
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
    this.isAuthenticatedSubscription.unsubscribe();
  }
}
