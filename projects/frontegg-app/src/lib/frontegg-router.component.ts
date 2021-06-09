import { Component, OnInit, OnDestroy } from '@angular/core';
import { FronteggAppService } from './frontegg-app.service';
import { Routes } from '@angular/router';

@Component({
  selector: 'frontegg-router',
  template: `
    <div *ngIf='!loading && !isAuthRoute'>
      <router-outlet></router-outlet>
    </div>`,
})
export class FronteggRouterComponent implements OnInit, OnDestroy {
  name: string;
  loading: boolean;
  isAuthRoute: boolean;

  constructor(private fronteggAppService: FronteggAppService) {
    this.name = 'FronteggRouter';
    this.loading = false;
    this.isAuthRoute = false;
  }

  ngOnDestroy(): void {
    this.fronteggAppService?.fronteggApp?.unmountAdminPortal();
  }

  ngOnInit(): void {
    this.fronteggAppService.isLoading$.subscribe((loading) => {
      this.loading = loading;
    });
    this.fronteggAppService.isAuthRoute$.subscribe((isAuthRoute) => {
      this.isAuthRoute = isAuthRoute;
    });
  }

}


export const connectFronteggRouter = (vendorRoutes: Routes): Routes => {
  const defaultRoute = vendorRoutes.find(s => s.path === '**');

  return [
    ...vendorRoutes.filter(s => s.path !== '**'),
    {
      path: '**',
      component: FronteggRouterComponent,
      children: [{
        ...defaultRoute,
      }],
    },
  ];
};


