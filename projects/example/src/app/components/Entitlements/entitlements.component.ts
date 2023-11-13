import { Component, NgZone, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { FronteggAppService, FronteggEntitlementsService } from '@frontegg/angular';
import { Entitlement } from '@frontegg/types';

@Component({
  selector: 'entitlements',
  templateUrl: './entitlements.component.html'
})
export class EntitlementsComponent implements OnInit, OnDestroy {
  feature1EntitlementsSubscription: Subscription;
  permission1EntitlementsSubscription: Subscription;
  feature2EntitlementsSubscription: Subscription;
  permission2EntitlementsSubscription: Subscription;

  feature1EntResult: Entitlement | undefined;
  permission1EntResult: Entitlement | undefined;
  feature2EntResult: Entitlement | undefined;
  permission2EntResult: Entitlement | undefined;

  loadingSubscription: Subscription;
  isLoading = true;
  authenticated = false;

  constructor(
    private fronteggAppService: FronteggAppService,
    private fronteggEntitlementsService: FronteggEntitlementsService,
		private ngZone: NgZone
  ) {
    this.loadingSubscription = fronteggAppService.isLoading$.subscribe((isLoading) => {
      this.isLoading = isLoading;
    });

    this.fronteggAppService.isAuthenticated$.subscribe((isAuthenticated: boolean) => {
      this.authenticated = isAuthenticated;
    });

    this.feature1EntitlementsSubscription = this.fronteggEntitlementsService.featureEntitlements$('accounts', {
      next: (
        result: Entitlement
      ) => {
				this.ngZone.run(() => {
          console.log('render');
	        this.feature1EntResult = result;
				});
      }
    });

    this.permission1EntitlementsSubscription = this.fronteggEntitlementsService.permissionEntitlements$('fe.secure.*', {
      next: (
        result: Entitlement
      ) => {
				this.ngZone.run(() => {
	        this.permission1EntResult = result;
				});
      }
    });

		this.feature2EntitlementsSubscription = this.fronteggEntitlementsService.entitlements$({ featureKey: 'feature2' }, {
      next: (
        result: Entitlement
      ) => {
				this.ngZone.run(() => {
	        this.feature2EntResult = result;
				});
      }
    });

    this.permission2EntitlementsSubscription = this.fronteggEntitlementsService.entitlements$({ permissionKey: 'permission2' }, {
      next: (
        result: Entitlement
      ) => {
				this.ngZone.run(() => {
	        this.permission2EntResult = result;
				});
      }
    });    
  }

  loadEntitlementsOnDemand() {
    this.fronteggEntitlementsService.loadEntitlements();
  }

  ngOnInit(): void {
  }

	ngOnDestroy(): void {
    //...
    this.feature1EntitlementsSubscription.unsubscribe();
    this.feature2EntitlementsSubscription.unsubscribe();
    this.permission2EntitlementsSubscription.unsubscribe();
  }
}