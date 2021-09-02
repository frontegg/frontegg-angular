import { ChangeDetectorRef, Component, OnChanges, OnDestroy, OnInit } from '@angular/core';
import { FronteggAppService } from './frontegg-app.service';
import { Router } from '@angular/router';


@Component({
  selector: 'frontegg-router',
  template: `
    <div *ngIf='!loading && !isAuthRoute'>
      <router-outlet></router-outlet>
    </div>`,
})
export class FronteggRouterComponent implements OnInit, OnDestroy, OnChanges {
  name: string;
  loading: boolean;
  isAuthRoute: boolean;

  constructor(private fronteggAppService: FronteggAppService, private router: Router, private cdr: ChangeDetectorRef) {
    this.name = 'FronteggRouter';
    this.loading = false;
    this.isAuthRoute = true;

    console.log('FronteggRouterComponent constuct');
  }


  ngOnInit(): void {
    console.log('FronteggRouterComponent ngOnInit');
    this.fronteggAppService.isLoading$.subscribe((loading) => {
      this.loading = loading;
      this.cdr?.detectChanges();

      const authRoutes = this.fronteggAppService.getAuthRoutes();
      const prevIsAuthRoute = Boolean(this.fronteggAppService.isAuthRouteSubject$.getValue());
      if (authRoutes.includes(window.location.pathname) && !prevIsAuthRoute) {
        this.fronteggAppService.isAuthRouteSubject$.next(true);
      } else if (!authRoutes.includes(window.location.pathname) && prevIsAuthRoute) {
        this.fronteggAppService.isAuthRouteSubject$.next(false);
        this.router.navigateByUrl(window.location.pathname);
      }
    });
    // this.fronteggAppService.isAuthRoute$.subscribe((isAuthRoute) => {
    //   this.isAuthRoute = isAuthRoute;
    //   this.cdr?.detectChanges();
    //   console.log('fronteggAppService.isAuthRoute$', isAuthRoute, this.cdr);
    // });
  }

  ngOnDestroy() {
    console.log('FronteggRouterComponent ngOnDestroy');
  }

  ngOnChanges(changes: any) {
    console.log('FronteggRouterComponent ngOnChanges', changes);
  }
}
