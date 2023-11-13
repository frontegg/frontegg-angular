

import { Component, NgZone, OnDestroy, OnInit } from '@angular/core';
import { FronteggAppService, FronteggAuthService, FronteggEntitlementsService } from '@frontegg/angular';
import { Entitlement } from '@frontegg/types';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  isLoading = true;
  loadingSubscription: Subscription;
  // ssoEntitlementsSubscription: Subscription;
  // unknownFeatureEntitlementsSubscription: Subscription;
  isSSOEnt: boolean | undefined;
  isUnknownFeatureEnt: boolean | undefined;
  authenticated = false;
  entitlementsResults: {
    [key: string]: {
      name: string
      isEntitled: Entitlement['isEntitled'],
      justification?: Entitlement['justification'],
      attrs?: Object
    }
  } = {};

  constructor(
      private fronteggAppService: FronteggAppService,
      private fronteggAuthService: FronteggAuthService,
      private fronteggEntitlementsService: FronteggEntitlementsService,
  		private ngZone: NgZone
  ) {
    this.loadingSubscription = fronteggAppService.isLoading$.subscribe((isLoading) => {
      this.isLoading = isLoading;
    });

    this.fronteggAppService.isAuthenticated$.subscribe((isAuthenticated: boolean) => {
      this.authenticated = isAuthenticated;
    });

    this.fronteggEntitlementsService.featureEntitlements$('sso', {
      next: (
        { isEntitled }: Entitlement
      ) => {
				this.ngZone.run(() => {
          console.log('entitlements change');
          this.isSSOEnt = isEntitled;
        });
      }
    });

    // this.fronteggEntitlementsService.isSteppedUp$({
    //   next: (
    //     isSteppedUp: boolean
    //   ) => {
    //     this.ngZone.run(() => {
    //       this.isSteppedUp = isSteppedUp;
    //       // do operation like LS and transfer
    //     });
    //   }
    // });

    this.feedEntitlements();
  }

  feedEntitlements() {
    const entitlementsRequests = [
      { type: 'featureEntitlements', arg: 'sso', attrs: { env: 'dev' } },
      { type: 'featureEntitlements', arg: 'feature_x', },
      { type: 'permissionEntitlements', arg: 'fe.secure.*', },
      { type: 'permissionEntitlements', arg: 'fe.balagan.*', attrs: { env: 'dev' } },
      { type: 'entitlements', arg: { featureKey: 'ss-no' }, argString: "{ featureKey: 'ss-no' }", attrs: { env: 'dev' }},
      { type: 'entitlements', arg: { featureKey: 'sso' }, argString: "{ featureKey: 'sso' }"},
    ];

    const subscriptionGenerators: any = {
      featureEntitlements: this.fronteggEntitlementsService.featureEntitlements$.bind(this.fronteggEntitlementsService),
      permissionEntitlements: this.fronteggEntitlementsService.permissionEntitlements$.bind(this.fronteggEntitlementsService),
      entitlements: this.fronteggEntitlementsService.entitlements$.bind(this.fronteggEntitlementsService),
    }

    // to unsubscribe
    const subscriptions = entitlementsRequests.forEach(({ type, arg, argString, attrs }) => {
      subscriptionGenerators[type](arg, {
        next: (
          result: Entitlement
        ) => {
				  this.ngZone.run(() => {
            this.entitlementsResults[(argString || arg) as string] = {
              name: `${type}$(<b>${argString || arg}</b>${attrs 
                  ? `, ${(JSON.stringify(attrs) as any).replaceAll('"', '').replaceAll(':', ': ')}` :
                  ''
                })`,
              ...result,
              attrs
            };
          });
        }
      }, attrs);
    });
  }

  onLoadEntitlementsClicked() {
    this.fronteggEntitlementsService.loadEntitlements();
  }

  onLoadEntitlementsWithCallbackClicked() {
    this.fronteggEntitlementsService.loadEntitlements(
      (isSucceeded: boolean) => console.log('load entitlements completed', isSucceeded ? 'succeeded' : 'failed')
    );
  }

  loginWithRedirect(): void {
    this.fronteggAuthService.loginWithRedirect();
  }

  ngOnInit(): void {
    console.log('AppComponent', 'ngOnInit');
  }

  ngOnChanges(): void {
    console.log('ngOnChanges')
  }  

  ngOnDestroy(): void {
    this.loadingSubscription.unsubscribe();
    // this.ssoEntitlementsSubscription.unsubscribe();
  }
}
