import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FronteggAppService } from './frontegg-app.service';
import { NavigationStart, Router } from '@angular/router';

@Component({
  selector: 'frontegg-router',
  template: `
    <div *ngIf='!loading && !isAuthRoute'>
      <router-outlet></router-outlet>
    </div>`,
})
export class FronteggRouterComponent implements OnInit {
  name: string;
  loading: boolean;
  isAuthRoute: boolean;

  constructor(private fronteggAppService: FronteggAppService, private router: Router, private cdr: ChangeDetectorRef) {
    this.name = 'FronteggRouter';
    this.loading = false;
    this.isAuthRoute = false;
  }


  ngOnInit(): void {
    this.fronteggAppService.isLoading$.subscribe((loading) => {
      this.loading = loading;
      this.cdr?.detectChanges();
    });
    this.fronteggAppService.isAuthRoute$.subscribe((isAuthRoute) => {
      this.isAuthRoute = isAuthRoute;
      this.cdr?.detectChanges();
    });
  }
}
