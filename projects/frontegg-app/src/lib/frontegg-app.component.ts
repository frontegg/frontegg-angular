import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { FronteggAppService } from './frontegg-app.service';

@Component({
  selector: 'frontegg-app',
  template: `<div *ngIf="!loading && !isAuthRoute">
    <ng-content></ng-content>
  </div>`,
})
export class FronteggAppComponent implements OnInit, OnDestroy {
  name: string;
  loading: boolean;
  isAuthRoute: boolean;

  constructor(private fronteggAppService: FronteggAppService, private cdr: ChangeDetectorRef) {
    this.name = 'FronteggApp';
    this.loading = false;
    this.isAuthRoute = false;
  }

  ngOnDestroy(): void {
    this.fronteggAppService?.fronteggApp?.unmountAdminPortal()
  }

  ngOnInit(): void {
    this.fronteggAppService.isLoading$.subscribe((loading) => {
      this.loading = loading
      this.cdr.detectChanges();
    })
    this.fronteggAppService.isAuthRoute$.subscribe((isAuthRoute) => {
      this.isAuthRoute = isAuthRoute
    })
  }

}
